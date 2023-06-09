'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// DISPLAY MOVEMENTS
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}

// CALCULATE BALANCE
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${(acc.balance).toFixed(2)} €`;
}

// CALCULATE SUMMARY 
const calcDisplaySummary = function (acc) {
  const deposits = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${deposits.toFixed(2)} €`;

  const withdrawals = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc - mov, 0);
  labelSumOut.textContent = `${withdrawals.toFixed(2)} €`;

  const interestRate = (acc.interestRate) / 100;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map((mov) => mov * interestRate)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
}

// CREATE USERNAME
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
}
createUsernames(accounts);

// UPDATE UI
const updateUI = function (acc) {
  // DISPLAY MOVEMENTS
  displayMovements(acc.movements)
  // DISPLAY BALANCE
  calcDisplayBalance(acc);
  // DISPLAY SUMMARY
  calcDisplaySummary(acc);
}

// EVENT LISTENERS
let currentAccount;

// LOGIN MANAGEMENT
btnLogin.addEventListener('click', function (e) {
  // PREVENT REFRESHING PAGE
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // DISPLAY UI & MESSAGE
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 1;

    // EMPTY FORM FIELD
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    updateUI(currentAccount);

  }
})

// TRANSFER MANAGEMENT

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  // TRANSFERING CONDITIONS
  if (receiverAcc && amount > 0 && currentAccount.balance >= amount && receiverAcc.username !== currentAccount.username) {
    // UPDATE MOVEMENTS
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
  else {
    console.log('Wrong Transaction');
  }
});

// DELETE ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();


  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === Number(currentAccount.pin)) {

    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    // DELETE ACCOUNT
    accounts.splice(index, 1);

    // HIDE UI
    containerApp.style.opacity = 0;
  }

  inputClosePin.value = inputCloseUsername.value = '';

});

// REQUEST LOAN 
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  // LOAN VALIDATION
  if (currentAccount.movements.some(mov => mov > 0.1 * amount) && amount >= 1) {

    // GRANTING LOAN
    currentAccount.movements.push(Number(amount));
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
})

let sorted = false;
// SORTING MOVEMENTS / TRANSACTIONS
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);

  sorted = !sorted;
});

// PRACTICE SECTION
////////////////////// Lecture 166 - Array Methods Practice //////////////////////
/*
// Assignment No. 1
// const bankDepositSum = accounts.flatMap(acc => acc.movements).filter((mov) => mov > 0).reduce((acc, cur) => acc + cur, 0);
const bankDepositSum = accounts.flatMap(acc => acc.movements).reduce((acc, cur) => {
  return cur > 0 ? acc + cur : acc;

}, 0);
console.log(bankDepositSum);

const bankWithdrawalSum = accounts.flatMap(acc => acc.movements).reduce((acc, cur) => {
  return cur < 0 ? acc + cur : acc;
}, 0);
console.log(bankWithdrawalSum);

console.log(`Total Balance: ${bankDepositSum + bankWithdrawalSum}`);

// Assignment No. 2
// const depositsOf1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length;
const depositsOf1000 = accounts.flatMap(acc => acc.movements).reduce((count, cur) => cur >= 1000 ? ++count : count, 0)
console.log(depositsOf1000);

// Assignment No. 3
const sums = accounts.flatMap(acc => acc.movements).reduce((bhai, cur) => {
  cur > 0 ? bhai.deposits += cur : bhai.withdrawals += cur;
  return bhai;
}, { deposits: 0, withdrawals: 0 });

console.log(sums);

// Assignment No. 3
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'on', 'or', 'with', 'in'];
  const titleCase = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitalize(word)).join(' ');
  return capitalize(titleCase);
}

console.log(convertTitleCase('This is a Behtreen String bhai jan'));
console.log(convertTitleCase('and bhai ki string is also a Behtreen String bhai jan'));
*/

