var items = document.getElementsByClassName("rotator");

for (var i = 0; i < items.length; i++) {
    items[i].setAttribute("onmouseover", "start(this)");
    items[i].setAttribute("onmouseout", "stop(this)");
}

function start(elem) {
    b = setInterval(function () {
        var src = elem.getAttribute("src");
        var tmp = src.match(/_[0-9]./g);
        var sub = parseInt(tmp[0].match(/[0-9]/g)[0]);
        if (sub < 8) {
            var nextsub = sub + 1;
        } else {
            var nextsub = 1;
        }
        var new_src = src.replace("_" + sub, "_" + nextsub);
        elem.setAttribute("src", new_src);
    }, 1000);
}

function stop(elem) {
    clearInterval(b);
    var src = elem.getAttribute("src");
    var tmp = src.match(/_[0-9]./g);
    var sub = parseInt(tmp[0].match(/[0-9]/g)[0]);
    var new_src = src.replace("_" + sub, "_1");
    elem.setAttribute("src", new_src);
}
