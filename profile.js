$(document).ready(function() {
    // Show dropdown on click for edit profile
  $('#profileDropdown').click(function(e) {
    e.preventDefault();
    $(this).siblings('.dropdown-menu').toggle();
    // Close other dropdowns
    $('.dropdown-menu').not($(this).siblings('.dropdown-menu')).hide();
  });
    // Close dropdown when clicking outside of it or hovering over another navbar item
    $(document).on('click mouseenter', function(e) {
      if (!$(e.target).closest('.nav-item.dropdown').length) {
        $('.dropdown-menu').hide();
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Event listener for profile picture editing
    const editProfileLink = document.getElementById("editProfile");
    editProfileLink.addEventListener("click", function (event) {
        event.preventDefault();
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".jpg,.jfif,.png"; // Allow only JPG, JFIF, or PNG files
        fileInput.addEventListener("change", function () {
            handleProfilePictureUpload(fileInput.files);
        });
        fileInput.click();
    });
  
    // Event listener for logout
    const logoutLink = document.getElementById("logout");
    logoutLink.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html"; // Redirect to login page after logout
    });
  
    // Function to handle profile picture upload
    function handleProfilePictureUpload(files) {
        if (files.length === 0) return;
  
        const file = files[0];
        const allowedTypes = ["image/jpeg", "image/jfif", "image/png"];
        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a JPG, JFIF, or PNG file.");
            return;
        }
  
        const profilePic = document.getElementById("profile-pic");
        const reader = new FileReader();
  
        reader.onload = function (event) {
            const imageUrl = event.target.result;
            profilePic.src = imageUrl;
            updateStoredProfilePicture(imageUrl); // Update stored URL
        };
  
        reader.readAsDataURL(file);
    }
  
    // Function to update stored profile picture URL
    function updateStoredProfilePicture(imageUrl) {
        localStorage.setItem("profilePicture", imageUrl);
    }
  
    // Function to get stored profile picture URL
    function getStoredProfilePicture() {
        return localStorage.getItem("profilePicture");
    }
  
    // Check for stored profile picture on page load
    const storedProfilePicture = getStoredProfilePicture();
    if (storedProfilePicture) {
        const profilePic = document.getElementById("profile-pic");
        profilePic.src = storedProfilePicture;
    }
  });

  // Event listener for Service Request form submission
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get form input values
  const serviceName = document.getElementById("name").value;
  const serviceCategory = document.querySelector("select.form-control").value; // Get selected category value
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const phone = document.getElementById("phone").value;
  const mail = document.getElementById("email").value;
  const description = document.getElementById("description").value;

  // Check if required fields are empty
  if (!serviceName || !serviceCategory || !country || !state || !phone || !mail || !description) {
    alert("Please fill in all required fields.");
    return;
  }

  // Display success message
  alert("Form submitted successfully.A notification has been sent to your email!");

  // Send notification to the registered email address (implement this part)
 

  // Clear the text area for service description
  const descriptionTextArea = document.getElementById("description");
  descriptionTextArea.value = "";

  // Add the submitted service to the service table
  const serviceTable = document.getElementById("requestedServices");
  const dateTime = new Date().toLocaleString(); // Get current date and time
  const newRow = serviceTable.insertRow(-1);
  const serialNumberCell = newRow.insertCell(0);
  const dateTimeCell = newRow.insertCell(1);
  const serviceCell = newRow.insertCell(2);
  const categoryCell = newRow.insertCell(3);
  const countryCell = newRow.insertCell(4);
  const stateCell = newRow.insertCell(5);
  const phoneCell = newRow.insertCell(6);
  const mailCell = newRow.insertCell(7);
  const statusCell = newRow.insertCell(8);
  const nameCell = newRow.insertCell(8);

  
  serialNumberCell.textContent = serviceTable.rows.length - 1; // Calculate serial number
  dateTimeCell.textContent = dateTime;
  serviceCell.textContent = serviceName;
  categoryCell.textContent = serviceCategory;
  countryCell.textContent = country;
  stateCell.textContent = state;
  phoneCell.textContent = phone;
  mailCell.textContent = mail;
  statusCell.textContent = "Pending";
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
 
