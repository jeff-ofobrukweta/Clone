// Add active class to the current button (highlight it)
const header = window.document.getElementById("UnderlineNav-body");

const btns = header.getElementsByClassName("UnderlineNav-item");


for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    let current = window.document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
