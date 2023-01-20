window.onload = function () {
  const form = document.getElementById('form');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const email2 = document.getElementById('email2');

  const loggedin_username = localStorage.getItem('loggedin_username');
  const loggedin_email = localStorage.getItem('loggedin_email');
  const loggedin_password = localStorage.getItem('loggedin_password');

  if (loggedin_username && loggedin_email && loggedin_password != null) {
    window.location = 'transactions.html';
  }
};
const signUp = (e) => {
  // set vars, trim whitespaces
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const email2Value = email2.value.trim();
  const passwordValue = password.value.trim();

  // username required, between 6 and 16 chars, only letters and numbers
  checkUsername();
  function checkUsername() {
    if (usernameValue === '') {
      setErrorFor(username, 'To pole musi być wypełnione.');
    } else if (usernameValue.length < 6) {
      setErrorFor(username, 'Długość nazwy użytkownika minimum 6 znaków.');
    } else if (usernameValue.length > 16) {
      setErrorFor(username, 'Długość nazwy użytkownika maksimum 16 znaków.');
    } else if (!/^[A-Za-z0-9]*$/.test(usernameValue)) {
      setErrorFor(
        username,
        'Nazwa użytkownika może składać się tylko z liter i cyfr.'
      );
    } else {
      setSuccessFor(username);
      return true;
    }
  }

  checkEmail();
  function checkEmail() {
    if (emailValue === '') {
      setErrorFor(email, 'To pole musi być wypełnione.');
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, 'Wprowadź prawdziwy adres e-mail.');
    } else {
      setSuccessFor(email);
      return true;
    }
  }

  checkEmail2();
  function checkEmail2() {
    if (email2Value === '') {
      setErrorFor(email2, 'To pole musi być wypełnione.');
    } else if (emailValue !== email2Value) {
      setErrorFor(email2, 'Adresy e-mail się różnią');
    } else {
      setSuccessFor(email2);
      return true;
    }
  }

  checkPassword();
  function checkPassword() {
    if (passwordValue === '') {
      setErrorFor(password, 'To pole musi być wypełnione.');
    } else if (passwordValue.length < 6) {
      setErrorFor(password, 'Długość hasła minimum 6 znaków.');
    } else {
      setSuccessFor(password);
      return true;
    }
  }

  //if all inputs are filled out correctly check if username or email are taken
  if (checkUsername() && checkEmail() && checkEmail2() && checkPassword()) {
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist =
      formData.length &&
      JSON.parse(localStorage.getItem('formData')).some(
        (data) =>
          data.usernameValue.toLowerCase() == usernameValue.toLowerCase() &&
          data.emailValue.toLowerCase() == emailValue.toLowerCase()
      );

    //if username and email are free create account and log in
    if (!exist) {
      formData.push({ usernameValue, emailValue, passwordValue });
      localStorage.setItem('formData', JSON.stringify(formData));
      localStorage.setItem('loggedin_username', usernameValue);
      localStorage.setItem('loggedin_email', emailValue);
      localStorage.setItem('loggedin_password', passwordValue);
      alert('Utworzono konto.');
      window.location = 'transactions.html';
    } else {
      alert('Nazwa użytkownika i/lub adres email są ją zajęte.');
    }
  }

  //add style to correct inputs
  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
  }
  //add style to wrong inputs
  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }

  //regex for email
  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }
  e.preventDefault();
};

function signIn(e) {
  let usernameValue = document.getElementById('username').value;
  let passwordValue = document.getElementById('password').value;
  let formData = JSON.parse(localStorage.getItem('formData')) || [];
  let exist =
    formData.length &&
    JSON.parse(localStorage.getItem('formData')).some(
      (data) =>
        data.usernameValue.toLowerCase() == usernameValue &&
        data.passwordValue.toLowerCase() == passwordValue
    );
  if (!exist) {
    alert('Incorrect login credentials');
  } else {
    location.href = '/';
  }
  e.preventDefault();
}
