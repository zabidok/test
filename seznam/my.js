function select(cat, elem) {
    var btns = document.getElementsByClassName('filter');
    var elems_all = document.getElementsByClassName('filter_item');
    var elems_selected = document.getElementsByClassName(cat);
    [].forEach.call(btns, function (el) {
        el.classList.remove('active');
    });
    [].forEach.call(elems_all, function (el) {
        el.style.visibility = 'hidden';
        el.style.display = 'none';
    });
    [].forEach.call(elems_selected, function (el) {
        el.style.visibility = 'visible';
        el.style.display = 'inline-block';
    });
    elem.className += ' active';
}

