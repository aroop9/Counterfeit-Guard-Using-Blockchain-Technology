  document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var identity=document.getElementById("role").value.toLowerCase();
    try {
      const response = await fetch('http://localhost:9000/login', { // Send login request to /login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        document.getElementById("message").textContent = data.message;
        // Redirect user to dashboard or homepage after successful login
        window.location.href = `/${identity}.html`; // Example URL
      } else {
        document.getElementById("message").textContent = data.message;
      }
    } catch (error) {
      console.error('Error:', error.message);
      document.getElementById("message").textContent = 'Server error';
    }
  });

  document.getElementById("signupForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    var username = document.getElementById("signupUsername").value;
    var password = document.getElementById("signupPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var email = document.getElementById("email").value;

    // Validate if passwords match
    if (password !== confirmPassword) {
      document.getElementById("message").textContent = 'Passwords do not match';
      return;
    }

    try {
      const response = await fetch('http://localhost:9000/signup', { // Send signup request to /signup endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
      });

      const data = await response.json();

      if (response.ok) {
        document.getElementById("message").textContent = data.message;
        // Redirect user to dashboard or homepage after successful signup
        window.location.href = '/manufacturer.html'; // Example URL
      } else {
        document.getElementById("message").textContent = data.message;
      }
    } catch (error) {
      console.error('Error:', error.message);
      document.getElementById("message").texContent = 'Server error';
    }
  });
