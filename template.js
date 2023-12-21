document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.getElementById("navbar");
  const navbarToggle = navbar.querySelector(".navbar-toggler");

  navbarToggle.addEventListener("click", function() {
    navbar.classList.toggle("opened");
    navbarToggle.setAttribute("aria-expanded", navbar.classList.contains("opened") ? "true" : "false");
  });

  const navbarMenu = navbar.querySelector("#navbar-menu");
  const navbarLinksContainer = navbar.querySelector(".navbar-links");

  navbarLinksContainer.addEventListener("click", function(clickEvent) {
    clickEvent.stopPropagation();
  });

  navbarMenu.addEventListener("click", function() {
    navbar.classList.remove("opened");
    navbarToggle.setAttribute("aria-expanded", "false");
  });

  const options = document.getElementById("options");
  if (options) {
    options.querySelectorAll("input[name='navtype']").forEach(function(option) {
      option.addEventListener("change", function(e) {
        const navType = e.target.id.split("-").join(" ");
        navbarMenu.classList = navType;
      });
    });
  }
});
 // Activate the carousel and set the interval
 $(document).ready(function(){
        $('.carousel').carousel({
            interval: 3000 // Slide changes every 3 seconds
        });
    });
// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
mybutton.style.display = "block";
} else {
mybutton.style.display = "none";
}
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
} 
// pricing
function check() {
  var checkBox = document.getElementById("checbox");
  var text1 = document.getElementsByClassName("text1");
  var text2 = document.getElementsByClassName("text2");
  
  for (var i = 0; i < text1.length; i++) {
    if (checkBox.checked == true) {
      text1[i].classList.remove("d-none");
      text2[i].classList.add("d-none");
    } else if (checkBox.checked == false) {
      text1[i].classList.add("d-none");
      text2[i].classList.remove("d-none");
    }
  }
}
check();