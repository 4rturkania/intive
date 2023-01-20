const loggedin_username = localStorage.getItem('loggedin_username');
const loggedin_email = localStorage.getItem('loggedin_email');
const loggedin_password = localStorage.getItem('loggedin_password');

if (loggedin_username && loggedin_email && loggedin_password != null) {
  window.location = 'transactions.html';
}

const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', signIn);

function signIn(e) {
  let usernameOrEmailValue = document.getElementById('usernameOrEmail').value;
  let passwordValue = document.getElementById('password').value;
  let formData = JSON.parse(localStorage.getItem('formData')) || [];
  let exist =
    formData.length &&
    JSON.parse(localStorage.getItem('formData')).some(
      (data) =>
        (data.usernameValue.toLowerCase() == usernameOrEmailValue &&
          data.passwordValue.toLowerCase() == passwordValue) ||
        (data.emailValue.toLowerCase() == usernameOrEmailValue &&
          data.passwordValue.toLowerCase() == passwordValue)
    );
  const allUsers = JSON.parse(localStorage.getItem('formData'));

  if (!exist) {
    alert(
      'Niepoprawne dane logowania. Błędne hasło i/lub nazwa użytkownika/e-mail.'
    );
    if (
      JSON.parse(localStorage.getItem('formData')).some(
        (data) => data.emailValue.toLowerCase() != usernameOrEmailValue
      )
    ) {
      alert('Podany adres e-mail jest wolny. Zarejestruj się.');
    }
  } else {
    for (let i = 0; i < allUsers.length; i++) {
      if (
        usernameOrEmailValue.includes('@') &&
        allUsers[i].emailValue == usernameOrEmailValue
      ) {
        localStorage.setItem('loggedin_email', usernameOrEmailValue);
        localStorage.setItem('loggedin_username', allUsers[i].usernameValue);
        localStorage.setItem('loggedin_password', passwordValue);
      } else {
        localStorage.setItem('loggedin_username', usernameOrEmailValue);
        localStorage.setItem('loggedin_email', allUsers[i].emailValue);
        localStorage.setItem('loggedin_password', passwordValue);
      }
    }

    window.location = 'transactions.html';
  }
  e.preventDefault();
}
