// $(function(){
//     $('.f a').click(function(){
//         var text=$(this).text().toLowerCase();
//         $('.a li').hide();
//         var li=$('.a li').filter(function(){
//             return $(this).attr('class').indexOf(text)>-1;
//         });
//         li.show();
//     });
//
// });


function select(cat, elem) {
    var btns = document.getElementsByClassName('filter');
    var elems_all = document.getElementsByClassName('filter_item');
    var elems_selected = document.getElementsByClassName(cat);
    // elems_all.style.display='none';
    // elems_all.style.style.visibility='visible';
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

    console.log('select');


}

