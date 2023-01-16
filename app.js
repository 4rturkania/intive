//in barChart fix red label "Saldo" at the top

window.onload = function () {
  //localStorage.clear();
  const form = document.getElementById('form');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const email2 = document.getElementById('email2');
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

    //if username and email are free create account
    if (!exist) {
      formData.push({ usernameValue, emailValue, passwordValue });
      localStorage.setItem('formData', JSON.stringify(formData));
      alert('Utworzono konto.');
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

// fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd/')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd')
//   .then((res) => res.json())
//   .then((data) => {
//     document.getElementById('output').innerHTML = data;
//   });

// // getTransacationTypes() {
// fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd/transacationTypes')
//   .then((res) => res.json())
//   .then((data) => {
//     let output = [];
//     data.forEach(function (transacationTypes){
//       output+=
//     });
//     console.log(output)
//   })
// // }

let transactionDates = [];

async function getDataForCharts() {
  const res = await fetch(
    'https://api.npoint.io/38edf0c5f3eb9ac768bd/transactions'
  );

  let obj = await res.json();

  for (let i = 0; i < obj.length; i++) {
    barChart.data.labels.push(obj[i]['date']);
    barChart.data.datasets[0].data.push(obj[i]['balance']);
    barChart.update();
    pieChart.data.labels.push(obj[i]['type']);
    pieChart.data.datasets[0].data.push(obj[i]['balance']);
    pieChart.update();
  }
}

getDataForCharts();

// if (Array === transactionDates.constructor) {
//   console.log('Its an array');
// }

// let transactionDates = [];

// fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd/transactions')
//   .then((res) => res.json())
//   .then((data) => {
//     for (let i = 0; i < data.length; i++) {
//       transactionDates.push(data[i]['date']);
//     }
//   })
//   .then(() => {
//     console.log(transactionDates);
//   });

// console.log(transactionDates);

// let obj=[]

// fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd/transactions')
//   .then((res) => res.json())
//   .then((data) => {
//   data.forEach(function (objInTrans) {
//     obj.push(objInTrans.date);
//     // obj = data;
//   })
//   .then(() => {
//     console.log(obj);
//   });

// const api_url = 'https://api.npoint.io/38edf0c5f3eb9ac768bd/transactions';
// async function fetchDates() {
//   const response = await fetch(api_url);
//   const data = await response.json();
//   let dates = [];
//   data.forEach(function (objInTrans) {
//     dates.push(objInTrans.date);
//   });
//   return JSON.stringify(dates);
// }
// console.log(fetchDates());

// setup barchart
const barData = {
  labels: [],
  datasets: [
    {
      label: 'Saldo',
      data: [],
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)',
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// setup piechart
const pieData = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      hoverOffset: 4,
    },
  ],
};

// config barchart
const barConfig = {
  type: 'bar',
  data: barData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

// config piechart
const pieConfig = {
  type: 'pie',
  data: pieData,
};

// render barchart
const barChart = new Chart(document.getElementById('barChart'), barConfig);

//render piechart
const pieChart = new Chart(document.getElementById('pieChart'), pieConfig);

function getType(type) {
  switch (type) {
    case 1:
      return 'Wpływy - inne';
      break;
    case 2:
      return 'Wydatki - zakupy';
      break;
    case 3:
      return 'Wpływy - wynagrodzenie';
      break;
    case 4:
      return 'Wydatki - inne';
      break;
  }
}

function getIcon(type) {
  switch (type) {
    case 1:
      return './icons/profits.png';
      break;
    case 2:
      return 'icons/grocery.png';
      break;
    case 3:
      return 'icons/salary.png';
      break;
    case 4:
      return 'icons/spending.png';
      break;
  }
}

getTransactions();
function getTransactions() {
  fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd/transactions')
    .then((res) => res.json())
    .then((data) => {
      let output = '<h2>Transactions</h2>';
      data.forEach(function (transactions) {
        output += `
  <table><tr>
  <th>${transactions.date}</th>
  <th><img src=${getIcon(transactions.type)} class='icon'></th>
  <th>Opis: ${transactions.description} - ${getType(transactions.type)}</th>
  <th>Kwota: ${transactions.amount}</th>
  <th>Saldo: ${transactions.balance}</th>
  </tr>
  </table>
  `;
      });
      // document.getElementById('output').innerHTML = output;
    });
}

// document.body.appendChild(
//   buildHtmlTable([
//     {
//       name: 'abc',
//       age: 50,
//     },
//     {
//       age: '25',
//       hobby: 'swimming',
//     },
//     {
//       name: 'xyz',
//       hobby: 'programming',
//     },
//   ])
// );
