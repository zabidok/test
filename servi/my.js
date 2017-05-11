var overlay = document.getElementById('overlay');
var overlay2 = document.getElementById('overlay2');

function openModal() {
    overlay.classList.remove("hidden");
}
function closeModal() {
    overlay.classList.add("hidden");
}

function toggleModal() {
    overlay2.style.visibility = (overlay2.style.visibility == "visible") ? "hidden" : "visible";
}