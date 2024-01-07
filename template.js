$(document).ready(function() {
  $('.nav-item.dropdown').mouseenter(function() {
    $('.dropdown-menu').slideUp(); // Close other dropdowns
    $(this).find('.dropdown-menu').slideDown();
  });

  $('.nav-item.dropdown').mouseleave(function() {
    $(this).find('.dropdown-menu').slideUp();
  });

  // Close dropdown when clicking outside of it
  $(document).click(function(e) {
    if (!$(e.target).closest('.nav-item.dropdown').length) {
      $('.dropdown-menu').slideUp();
    }
  });
});

      // Activate Carousel
      $("#carouselIClass").carousel();

      // Display the card associated with the active carousel item after a delay
      $("#carouselIClass").on('slid.bs.carousel', function () {
        var activeIndex = $(".carousel-item.active").index() + 1; // Get the index of active carousel item
        $(".carousel-card").hide(); // Hide all cards

        // Show the corresponding card after a delay
        setTimeout(function() {
          $("#card" + activeIndex).show();
        }, 1000); // Adjust the delay time in milliseconds (1000ms = 1 second)
      });
function check() {
    var checkBox = document.getElementById("checkbox");
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
      $(document).ready(function() {
        $('#nairaButton').click(function() {
          $('#nairaContainer').removeClass('d-none');
          $('#dollarContainer').addClass('d-none');
          $('#nairaButton').addClass('d-none');
          $('#dollarButton').removeClass('d-none');
        });
  
        $('#dollarButton').click(function() {
          $('#nairaContainer').addClass('d-none');
          $('#dollarContainer').removeClass('d-none');
          $('#dollarButton').addClass('d-none');
          $('#nairaButton').removeClass('d-none');
        });
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
//back to top
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  } 
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
