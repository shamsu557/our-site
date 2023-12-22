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
// Get references to the search icon, search input, and search button elements
const searchIcon = document.getElementById('searchIcon');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Add an event listener to the search icon
searchIcon.addEventListener('click', function() {
  // Toggle the 'd-none' class to show/hide the search input
  searchInput.classList.toggle('d-none');
  searchButton.classList.toggle('d-none');

  // Focus on the search input when it's displayed
  if (!searchInput.classList.contains('d-none')) {
    searchInput.focus();
  }
});

// Event listener for the search button (submit button)
searchButton.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Retrieve the search query from the input field
  const query = searchInput.value.trim();
  
  //search logic
  
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
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.newsletter-form');

  form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get the email input value
      const emailInput = form.querySelector('.form-control').value;

      // Validate the email format (simple validation)
      if (!validateEmail(emailInput)) {
          // Display error message or handle invalid email format
          alert('Please enter a valid email address.');
          return;
      }

      //  form submission or send data to your server
      //  logic for form submission

      // Show success message (temporarily an alert)
      alert('Thank you for subscribing!');
      // Optionally, you can reset the form after successful submission
      form.reset();
  });

  // Function to validate email format
  function validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
  }
});
