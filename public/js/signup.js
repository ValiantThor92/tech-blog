const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector('#first_name-signup').value.trim();
  const last_name = document.querySelector('#last_name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (first_name && last_name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ first_name, last_name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert("Fill out all the blanks and use an existing email. \nPassword must contain at least 1 number and must be more than 8 characters.");
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);