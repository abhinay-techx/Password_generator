console.log("Hello");

// Slider value
var slider = document.getElementById("passwordLength");
var output = document.getElementById("value");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}



// Function to update the password string based on checkbox selections
function updatePwdString() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+";

  let pwd_string = "";

  if (document.getElementById("uppercase").checked) {
      pwd_string += upper;
  }
  if (document.getElementById("lowercase").checked) {
      pwd_string += lower;
  }
  if (document.getElementById("numbers").checked) {
      pwd_string += numbers;
  }
  if (document.getElementById("symbols").checked) {
      pwd_string += symbols;
  }

  // If no checkbox is selected, include all character sets by default
  if (!pwd_string) {
    pwd_string = upper + lower + numbers + symbols;
  }

  return pwd_string;
}

// Function to generate the password
function generatePassword() {
  const pwd_string = updatePwdString();
  // window.alert(pwd_string);
  const len = parseInt(document.getElementById("passwordLength").value);
  // window.alert(len);
  let password = "";
  for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * pwd_string.length);
      password += pwd_string[randomIndex];
      // window.alert(password);
  }

  return password;
}


// Function to update the password box with the generated password
function updatePasswordBox() {
  const password = generatePassword();
  document.getElementById("passwordbox").value = password;
  const passwordStrength = evaluatePasswordStrength(password);
  updateStrengthIndicator(passwordStrength);
}


// Function to evaluate the strength of the password
function evaluatePasswordStrength(password) {
  // Criteria for password strength evaluation
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[^A-Za-z0-9]/.test(password);

  // Determine the strength based on criteria
  if (password.length < minLength) {
      return "Weak";
  } else if (hasUpperCase && hasLowerCase && hasNumbers && hasSymbols) {
      return "Strong";
  } else if ((hasUpperCase && hasLowerCase) || (hasUpperCase && hasNumbers) || (hasUpperCase && hasSymbols) || (hasLowerCase && hasNumbers) || (hasLowerCase && hasSymbols) || (hasNumbers && hasSymbols)) {
      return "Moderate";
  } else {
      return "Weak";
  }
}


// Function to update the strength indicator color
function updateStrengthIndicator(passwordStrength) {
  const strengthIndicator = document.getElementById("strength-indicator");
  switch (passwordStrength) {
      case "Strong":
          strengthIndicator.style.backgroundColor = "green";
          break;
      case "Moderate":
          strengthIndicator.style.backgroundColor = "orange";
          break;
      case "Weak":
          strengthIndicator.style.backgroundColor = "red";
          break;
      default:
          strengthIndicator.style.backgroundColor = "gray";
  }
}




// Function to copy the generated password to the clipboard
function copyPassword() {
  const passwordBox = document.getElementById("passwordbox");
  const password = passwordBox.value;
  if (password) {
      navigator.clipboard.writeText(password)
          .then(() => {
              console.log("Password copied to clipboard");
              // Show success message bubble next to the password box
              showBubble("Password copied!", passwordBox);
          })
          .catch(err => {
              console.error("Error copying password to clipboard:", err);
              // Show error message bubble next to the password box
              showBubble("Error copying password!", passwordBox);
          });
  } else {
      console.error("No password to copy");
      // Show feedback to the user that there's no password to copy
      showBubble("No password to copy!", passwordBox);
  }
}


// Function to show a message bubble next to an element
function showBubble(message, element) {
  // Create a new div element for the bubble
  const bubble = document.createElement("div");
  // Add classes to style the bubble
  bubble.className = "message-bubble";
  // Set the message content
  bubble.textContent = message;
  
  // Get the position of the password box
  const boxRect = element.getBoundingClientRect();
  // Position the bubble next to the password box
  bubble.style.top = (boxRect.top - 40) + "px"; // Adjust the vertical position as needed
  bubble.style.left = (boxRect.right + 10) + "px"; // Adjust the horizontal position as needed
  
  // Append the bubble to the body element
  document.body.appendChild(bubble);
  
  // Hide the bubble after 3 seconds
  setTimeout(() => {
      bubble.remove();
  }, 3000);
}
