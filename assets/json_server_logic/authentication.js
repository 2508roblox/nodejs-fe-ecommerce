document.addEventListener('DOMContentLoaded', () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userData = localStorage.getItem('auth_user');

    // Function to update UI based on login status
    const updateUI = () => {
        const logoutButton = document.getElementById('logoutButton');
        const loginForm = document.getElementById('loginForm');

        if (userData) {
            // User is logged in
            logoutButton.style.opacity = 1;
        } else {
            // User is logged out
            logoutButton.style.opacity = 0;

        }
    };

    // Update UI on page load
    updateUI();

    document.getElementById('loginForm').addEventListener('submit', async(e) => {
        e.preventDefault();

        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;

        const formData = {
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                // Store tokens in local storage
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('auth_user', JSON.stringify(data.user));
                // Update UI
                updateUI();
                console.log('User logged in successfully');
                console.log(data); // Access token, refresh token, and user data
                location.reload()
            } else {
                const error = await response.text();
                console.error('Error logging in:', error);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });

    document.getElementById('logoutButton').addEventListener('click', () => {
        // Clear local storage and update UI
        console.log('logout');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('auth_user');
        updateUI();
        location.reload()
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signupForm').addEventListener('submit', async(e) => {
        e.preventDefault();

        const firstName = document.querySelector('input[name="firstName"]').value;
        const lastName = document.querySelector('input[name="lastName"]').value;
        const email = document.querySelector('#register_email').value;
        const password = document.querySelector('#register_pass').value;

        const formData = {
            firstName,
            lastName,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                // Store tokens in local storage
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('auth_user', JSON.stringify(data.user));

                // Handle successful registration
                console.log('User registered successfully');
                console.log(data); // Access token and refresh token
                location.reload()
            } else {
                const error = await response.text();
                // Handle registration error
                console.error('Error registering user:', error);
            }
        } catch (err) {
            // Handle network or server error
            console.error('Error:', err);
        }
    });
});








document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async(e) => {
        e.preventDefault();

        const email = document.querySelector('#login_email').value;
        const password = document.querySelector('#login_pass').value;

        const formData = {
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                // Store tokens in local storage
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('auth_user', JSON.stringify(data.user));
                if (data.user.role === "1") {
                    console.log('User role is admin:', data.user.role);
                    window.location.href = './admin-dashboard.html'; // Chuyển hướng đến trang admin-dashboard.html
                }
                
                console.log(localStorage.getItem('auth_user'))
                    // Handle successful login
                console.log('User logged in successfully');
            } else {
                const error = await response.text();
                // Handle login error
                console.error('Error logging in:', error);
            }
        } catch (err) {
            // Handle network or server error
            console.error('Error:', err);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('changePasswordForm').addEventListener('submit', async(e) => {
        e.preventDefault();

        const email = document.querySelector('input[name="email"]').value;
        const currentPassword = document.querySelector('input[name="currentPassword"]').value;
        const newPassword = document.querySelector('input[name="newPassword"]').value;

        const formData = {
            email,
            currentPassword,
            newPassword
        };

        try {
            const response = await fetch('http://localhost:3000/users/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Password changed successfully');
                // Perform any further actions or display success message
                const statusMessage = document.getElementById('status_mess');
                statusMessage.style.color = 'green';
                statusMessage.textContent = "đổi mật khẩu thành công, vui lòng đăng nhập lại ";
            } else {
                const error = await response.text();
                console.error('Error changing password:', error);
                // Display error message to the user
                const statusMessage = document.getElementById('status_mess');
                statusMessage.style.color = 'red';
                statusMessage.textContent = "đổi mật thất bại ";
            }
        } catch (err) {
            console.error('Error:', err);
            // Display error message to the user
        }
    });

})


document.addEventListener('DOMContentLoaded', () => {

document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('change_password_email').value;
  
    const formData = {
      email
    };
  
    try {
      const response = await fetch('http://localhost:3000/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        console.log('Password reset email sent successfully');
        // Perform any further actions or display success message
        const statusMessage = document.getElementById('status_mess');
        statusMessage.style.color = 'green';
        statusMessage.textContent = "Email sent for password reset";
      } else {
        const error = await response.text();
        console.error('Error sending password reset email:', error);
        // Display error message to the user
        const statusMessage = document.getElementById('status_mess');
        statusMessage.style.color = 'red';
        statusMessage.textContent = "Failed to send password reset email";
      }
    } catch (err) {
      console.error('Error:', err);
      // Display error message to the user
    }
  });



})
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('newPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const otp = urlParams.get('otp');
    const email = urlParams.get('email');
  
    const newPasswordForm = document.getElementById('newPasswordForm');
    const newPasswordInput = document.getElementById('change_password');
  
    newPasswordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const newPassword = newPasswordInput.value;
  
      const formData = {
        email,
        otp,
        newPassword
      };
  
      try {
        const response = await fetch('http://localhost:3000/users/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          console.log('Password reset successful');
          // Perform any further actions or display success message
        } else {
          const error = await response.text();
          console.error('Error resetting password:', error);
          // Display error message to the user
        }
      } catch (err) {
        console.error('Error:', err);
        // Display error message to the user
      }
    });
  });
})