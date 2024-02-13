$(document).ready(function() {
  $('.nav-item.dropdown').hover(function() {
    // Show current dropdown
    $(this).find('.dropdown-menu').show();
    // Close other dropdowns
    $('.nav-item.dropdown').not(this).find('.dropdown-menu').hide();
  });

  // Close dropdown when clicking outside of it or hovering over another navbar item
  $(document).on('click mouseenter', function(e) {
    if (!$(e.target).closest('.nav-item.dropdown').length) {
      $('.dropdown-menu').hide();
    }
  });
});


//pricing 
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

// Register
document.addEventListener("DOMContentLoaded", function() {
  const registerForm = document.getElementById("registerForm");
  const loginLink = document.getElementById("loginLink");

  // Check if a user is already registered using stored email address or username
  const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const registeredUser = storedUsers.find(user => user.email === storedUsers.email);

  if (registeredUser) {
      loginLink.style.display = "block"; // Show the Login button if registered
  }

  registerForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const email = document.getElementById("email").value.toLowerCase();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      
      // Check for empty fields
    if (!email || !username || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
     
    }
      // check for password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
  }
       // Validate the password against a specific pattern
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.{8,})/;
  if (!passwordPattern.test(password)) {
  alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
  return;
}
     
   
 
     

      // Check if the email or username is already registered
      const userExists = storedUsers.some(user => user.email === email || user.username === username);
      if (userExists) {
          alert("Email address or username already registered");
          return;
      }

      // Store registered user data in localStorage
      storedUsers.push({ email, username, password });
      localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));

      alert("Registration successful");
      loginLink.style.display = "block"; // Show the Login button after successful registration
      window.location.href = "login.html";          
    });
});
  
   //login 
   document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const loginInput=document.getElementById('loginInput').value.trim();
    const loginPassword = document.getElementById("loginPassword").value;
    
    if (!loginInput || !loginPassword) {
    alert("Please fill in all fields");
    return;
    }
    
    const loginInputLower= loginInput.includes('@') ? loginInput.toLowerCase(): loginInput;
  
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const foundUser = registeredUsers.find(user =>
    user.email === loginInputLower || user.username === loginInput
    );
    
    if (foundUser && foundUser.password === loginPassword) {
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    alert("Login successful");
    window.location.href = "profile.html"; // Redirect to details page
    } else {
    alert("Invalid credentials or user not found");
    }
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
   
   


