//logging out
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', function () {
  localStorage.removeItem('loggedin_username');
  localStorage.removeItem('loggedin_email');
  localStorage.removeItem('loggedin_password');
  window.location = 'index.html';
});

const loggedin_username = localStorage.getItem('loggedin_username');
const loggedin_email = localStorage.getItem('loggedin_email');
const loggedin_password = localStorage.getItem('loggedin_password');

if (loggedin_username && loggedin_email && loggedin_password != null) {
  document.getElementById('logout-button').className = '';
  document.getElementById('login').className = 'hidden';
  document.getElementById('sign-up').className = 'hidden';
  document.getElementById('transactions').className = '';
}
