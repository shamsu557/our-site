// Reset password form submission
document.getElementById("resetPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const resetInput = document.getElementById("resetInput").value;

    if (!resetInput) {
        alert("Please enter your email or username");
        return;
    }

    // Here you can implement your logic to send the reset link/code
    // For now, we'll transition to the enter code form
    document.getElementById("resetCodeForm").style.display = "block";
    document.getElementById("resetPasswordForm").style.display = "none";
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
            // Here, you can trigger a function to send a password reset link/code to the user's email or phone number
            // Example:
            sendPasswordResetLink(foundUser.email, foundUser.phoneNumber); // Replace with your actual function to send the link

            alert("Password reset code has been sent to your registered phone number and email address");
        } else {
            alert("User not found");
            return;
        }
    });


// Function to send password reset link (replace this with your actual implementation)
function sendPasswordResetLink(email, phoneNumber) {
     // Here, integrate with your email service to send an email to the provided email address
        // Code to send email 

        // Integrate with your SMS service to send a message to the provided phone number
        //code to send to phoneNumber
        // Add your logic to send the reset code in  the backend for validation
    
    
}


document.getElementById("resetCodeForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const resetCode = document.getElementById("resetCode").value;
    
    if (resetCode == 1234|| resetCode==1122|| resetCode==2233) {
                    alert("code successiful");
                    // Transition to the set new password form
        document.getElementById("setNewPasswordForm").style.display = "block";
        document.getElementById("resetCodeForm").style.display = "none";
                }
        
                else{
                alert("invalid code")
                return;
            }
    
    // Add your logic to send the reset code, new password, and confirm password to the backend for validation
    // Ensure the backend verifies the code and updates the password accordingly


  });
  //set New Password
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
