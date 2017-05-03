$(function () {
    $("#mymenu").on("click", ".getchild", function () {
        list[$(this).parent().data('id')].opened = (list[$(this).parent().data('id')].opened) ? 0 : 1;
        json.all[$(this).parent().data('id')].opened = list[$(this).parent().data('id')].opened;
        savetofile();
        $(this).children().toggleClass('glyphicon-folder-close').toggleClass('glyphicon-folder-open');
        $(this).parent().find('.collapse').first().collapse('toggle');
    });
    $("#mymenu").on("click", ".moveinlist", function (event) {
        moveinlist(this);
    });
    $("#mymenu").on("click", ".delete", function (event) {
        del(this);
    });
    $("#mymenu").on("click", ".move", function (event) {
        edit(this);
    });
    $(".edit").on("click", "li>.btn", function () {
        if ($(".edit").hasClass('getparent')) {
            var elem = ($(this).parent());
            var new_el = {};
            new_el.name = $('#addname').val();
            new_el.id = json.last_id + 1;
            new_el.order = new_el.id;
            new_el.parent_id = elem.attr('data-id');
            list[new_el.id] = new_el;
            json.last_id = new_el.id;
            $('#addname').val('');
            rebuild(list);
            savetofile();
            $('.edit').removeClass('getparent').modal('hide');
            return
        }
        var new_elem = $(this).parent();
        var new_el_id = new_elem.data('id');
        var id = $('.edit .modal-title').attr('data-id');
        list[id].parent_id = new_el_id;
        rebuild(list);
        savetofile();
        $('.edit').modal('hide');
    });
    list = json.all;
    rebuild(list);
})

function rebuild(json_list) {
    var ul = $('<ul/>').addClass('list-group root');
    var tree = makeTree(json_list);
    buildUL(ul, tree);
    jQuery('#mymenu').html(ul);
}
var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'url': "menu_id.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    console.log(json);
    return json;
})();
var makeTree = function (data, parent_id) {
    parent_id = parent_id || -1;
    var childs = [];
    var temp_array = $.map(data, function (value, index) {
        return [value];
    });
    $.grep(temp_array, function (e, k) {
        if (e.parent_id == parent_id) {
            childs[e.order] = e;
            var child_of_child = [];
            child_of_child = makeTree(data, e.id);
            if (child_of_child.length > 0) {
                childs[e.order].child = child_of_child;
            } else {
                delete childs[e.order].child;
            }
        }
    });
    return childs;
}
var buildUL = function (parent, items) {
    $.each(items, function () {
        if (this.id) {
            var li = $("<li/>").text(this.name).addClass('list-group-item').attr('data-id', this.id);
            li.appendTo(parent);
            var btns = $('<div class="btn-group pull-right" role="group"><button type="button" class="btn btn-default moveinlist up" data-action="up"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></button><button type="button" class="btn btn-default moveinlist down" data-action="down"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></button><button type="button" class="btn btn-default move"><span class="glyphicon glyphicon-move" aria-hidden="true"></span></button><button type="button" class="btn btn-default delete"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></div>');
            var extrabtns = $('<button type="button" class="btn btn-default"><span class="glyphicon glyphicon glyphicon-file" aria-hidden="true"></span></button>');
            if (this.child && this.child.length > 0) {
                var ul = $("<ul/>").addClass('list-group');
                extrabtns.addClass('getchild').removeClass('disabled').children().removeClass('glyphicon-file');
                ul.appendTo(li).wrap('<div/>').parent().addClass('collapse');
                if (this.opened) {
                    ul.parent().addClass('in');
                    extrabtns.children().addClass('glyphicon-folder-open');
                } else {
                    extrabtns.children().addClass('glyphicon-folder-close')
                }
                buildUL(ul, this.child);
            }
            btns.prependTo(li);
            extrabtns.prependTo(li);
        }
    });
}

function moveinlist(el) {
    var direction = $(el).data('action');
    var elem = $(el).parent().parent();
    var el_id = elem.data('id');
    var el_order = list[el_id].order;
    if (direction == 'up') {
        var new_elem = elem.prev();
    } else if (direction == 'down') {
        var new_elem = elem.next();
    }
    if (new_elem.prop("tagName") == 'LI') {
        var new_el_id = new_elem.data('id');
        list[el_id].order = list[new_el_id].order;
        list[new_el_id].order = el_order;
        rebuild(list);
        savetofile();
    }
}

function checkChildsDel(id) {
    var temp_array = $.map(list, function (value, index) { /////////////////!!!!!!!!!!!!!!!!!!!!
        return [value];
    });
    var childs = $.grep(temp_array, function (e, k) {
        return e.parent_id == id;
    });
    if (childs.length) {
        $.each(childs, function () {
            if (this.id) {
                list[this.id].parent_id = list[id].parent_id;
            }
        })
    }
}

function edit(el) {
    var elem = $(el).parent().parent();
    var el_id = elem.data('id');
    var el_name = list[el_id].name;
    var childs = [];
    var temp_list = {};
    temp_list = $.extend({}, list);
    var childs = allchild(el_id);
    if (childs.length > 0) {
        $.each(childs, function (k, v) {
            delete temp_list[v];
        })
    }
    var ul = $('<ul/>');
    var tree = makeTree(temp_list);
    buildUL(ul, tree);
    var tempmenu = jQuery('#tempmenu');
    tempmenu.html(ul);
    tempmenu.find('.collapse').removeClass('collapse');
    tempmenu.find('.list-group-item').removeClass('list-group-item');
    tempmenu.find('.list-group').removeClass('list-group');
    $('.edit .modal-title').text('Rename or replace ' + el_name).attr('data-id', el_id);
    $('#torename').val(el_name).data('id', el_id);
    $('.edit').addClass('replace').modal('show');
}

function allchild(id) {
    var blacklist = [];
    var temp_array = $.map(list, function (value, index) {
        return [value];
    });
    $.grep(temp_array, function (e, k) {
        if (e.parent_id == id) {
            var child_of_child = [];
            child_of_child = allchild(e.id);
            if (child_of_child.length > 0) {
                blacklist = blacklist.concat(child_of_child);
            }
        }
    });
    blacklist.push(id);
    return blacklist;
}

function del(el) {
    var elem = $(el).parent().parent();
    var el_id = elem.data('id');
    checkChildsDel(el_id);
    delete list[el_id];
    rebuild(list);
    savetofile();
}

function save() {
    var el_id = $('#torename').data('id');
    list[el_id].name = $('#torename').val();
    $('#torename').val('');
    rebuild(list);
    savetofile();
    $('.edit').modal('hide');
}

function toelem() {
    if (!$('#addname').val()) {
        console.log('no name!');
        return;
    }
    $('.edit .modal-title').text('Choose parent please');
    var ul = $('<ul/>');
    buildUL(ul, makeTree(list));
    var tempmenu = jQuery('#tempmenu');
    tempmenu.html(ul);
    tempmenu.find('.collapse').removeClass('collapse');
    tempmenu.find('.list-group-item').removeClass('list-group-item');
    tempmenu.find('.list-group').removeClass('list-group');
    $('.edit').addClass('getparent').modal('show');
}

function savetofile() {
    $.each(json.all, function () {
        delete this.child;
    })
    var jsonstr = JSON.stringify(json);
    $.ajax({
        url: "save.php",
        data: {
            data: jsonstr
        },
        type: "POST",
        dataType: "json",
    }).done(function (json) {
        console.log('saved');
    });
}