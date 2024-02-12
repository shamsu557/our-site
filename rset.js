$(document).ready(function() {
    //show dropdown on hover 
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
  
  document.getElementById("resetPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const resetInput = document.getElementById("resetInput").value;

    if (!resetInput) {
        alert("Please enter your email or username");
        return;
    }

    document.getElementById("resetCodeForm").style.display = "block";
    document.getElementById("resetPasswordForm").style.display = "none";

    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const foundUser = storedUsers.find(user =>
        user.email === resetInput || user.username === resetInput
    );

    if (foundUser) {
        sendPasswordResetLink(foundUser.email); // Send reset link or code to registered email
        alert("Password reset code has been sent to your registered email address");
    } else {
        // If user not found, check if the input is a registered email directly
        const registeredEmails = JSON.parse(localStorage.getItem("registeredEmails")) || [];
        const foundEmail = registeredEmails.includes(resetInput);

        if (foundEmail) {
            sendPasswordResetLink(resetInput); // Send reset link or code
            alert("Password reset code has been sent to the provided email address");
        } else {
            alert("User or email not found");
            return;
        }
    }
});

document.getElementById("resetCodeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const resetCode = document.getElementById("resetCode").value;

    // Check if reset code matches any of the predefined codes
    if (resetCode === "1234" || resetCode === "1122" || resetCode === "2233") {
        alert("Code successful");
        document.getElementById("setNewPasswordForm").style.display = "block";
        document.getElementById("resetCodeForm").style.display = "none";
    } else {
        alert("Invalid code");
        return;
    }
});

document.getElementById("setNewPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!newPassword || !confirmPassword) {
        alert("Please enter both new password and confirm password.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Validate the new password against specific criteria
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.{8,})/;
    if (!passwordPattern.test(newPassword)) {
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        return;
    }

    // Check if the new password matches any of the stored old passwords
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const oldPasswords = storedUsers.filter(user => user.email === loggedInUser.email || user.username === loggedInUser.username).map(user => user.password);
    if (oldPasswords.includes(newPassword)) {
        alert("Password cannot be the same as one of your previous passwords");
        return;
    }

    // Additional code to update the stored password for the logged-in user
    loggedInUser.password = newPassword;

    // Update the password in the list of registered users in local storage
    const updatedUsers = storedUsers.map(user => {
        if (user.email === loggedInUser.email || user.username === loggedInUser.username) {
            return loggedInUser;
        }
        return user;
    });

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    alert("Password updated successfully");
    window.location.href = "login.html"; // Redirect to login page
});

function sendPasswordResetLink(email) {
    // Here, integrate with your email service to send an email to the provided email address
    // Code to send email 
    // Add your logic to send the reset code in  the backend for validation
}

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
  