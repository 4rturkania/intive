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

if (!loggedin_username && !loggedin_email && !loggedin_password) {
  window.location = 'index.html';
}

document.getElementById('loggedin-user').innerHTML = loggedin_username;

document.getElementById('logout-button').className = '';

async function getDataForCharts() {
  const res = await fetch(
    'https://api.npoint.io/38edf0c5f3eb9ac768bd/transactions'
  );
  let obj = await res.json();
  dataForBarChart(obj);
  dataForPieChart(obj);
}

function dataForBarChart(arrAPI) {
  for (let i = 0; i < arrAPI.length; i++) {
    barChart.data.labels.unshift(arrAPI[i]['date']);
    barChart.data.datasets[0].data.unshift(arrAPI[i]['balance']);
  }
  barChart.update();
}

function dataForPieChart(arrAPI) {
  //get types from API
  const transTypesArr = [];
  for (let i = 0; i < arrAPI.length; i++) {
    transTypesArr.unshift(arrAPI[i]['type']);
  }
  //get unique types (without repetition) = labels
  const totalItems = transTypesArr.length;
  const uniqueItems = [...new Set(transTypesArr)];
  for (let i = 0; i < uniqueItems.length; i++) {
    pieChart.data.labels.unshift(getType(uniqueItems[i]));
  }
  //get arr of % of each type
  uniqueItems.forEach((currItem) => {
    const numItems = transTypesArr.filter((item) => item === currItem);
    pieChart.data.datasets[0].data.unshift(
      (numItems.length * 100) / totalItems
    );
  });
  pieChart.update();
}

getDataForCharts();

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
  labels: [],
  datasets: [
    {
      label: 'My First Dataset',
      data: [],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(0, 204, 102)',
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
      document.getElementById('output').innerHTML = output;
    });
}
