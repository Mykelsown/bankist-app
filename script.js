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

// this function mutates the accounts in the accounts arrray by adding a new property(username) to each of the account
const usernameAppend = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
usernameAppend(accounts);

// this function displays deposits and withdrawals to the console
const accountSummary = function (curAcc) {
  const deposit = curAcc?.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const withdrawal = curAcc?.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const interest = curAcc?.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * curAcc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${deposit} €`;
  labelSumOut.textContent = `${Math.abs(withdrawal)} €`;
  labelSumInterest.textContent = `${interest} €`;
};

// this function attach elements to the html (this is DOM manipulation baby 😋)
const displayMovement = function (movements) {
  containerMovements.innerHTML = '';

  movements?.forEach(function (mov, i) {
    const movType = mov > 0 ? 'deposit' : 'withdrawal';

    const movementsHtml = `
      <div class="movements__row">
        <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', movementsHtml);
  });
};

// calculate and displays the total balance to the page
const displayBalance = function (acc) {
  const balance = acc?.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} €`;
  return balance;
};

// To clear the inputBox after click
const inputClear = function (firstBox, secondBox) {
  firstBox.value = secondBox.value = '';
  secondBox.blur();
};

function reloadData() {
  // displays the transaction movements
  displayMovement(currentAccount?.movements);

  // displays the account balance
  displayBalance(currentAccount?.movements);

  // displays the summary of total funds in and out
  accountSummary(currentAccount);
}

// event listener login button
let currentAccount;
const accountActivityLog = function (e) {
  e.preventDefault();

  // this gets an entire object if an input of the object matches eg:'jd' matches account2.
  currentAccount = accounts?.find(
    acc =>
      acc?.username === inputLoginUsername.value &&
      acc?.pin === Number(inputLoginPin.value)
  );

  labelWelcome.textContent = `Welcome, ${currentAccount?.owner}`;
  containerApp.style.opacity = 1;

  // this reloads all neccessary data after a certain action
  reloadData();

  // clearing the input field
  inputClear(inputLoginUsername, inputLoginPin);

  // Funds Transfer Implementation
  const fundsTransfer = function (e) {
    e.preventDefault();

    const accUsername = inputTransferTo.value;
    const amount = Number(inputTransferAmount.value);

    const executionOfTransfer = function (receiver, sendersMov) {
      if (
        displayBalance(currentAccount.movements) - amount >= 0 &&
        amount >= 0
      ) {
        const sendersUpdatedBal = [...sendersMov, -amount];

        function displayAccount() {
          for (const acc of accounts) {
            if (acc.username === accUsername) {
              if (accUsername !== currentAccount.username) {
                return acc;
              } else {
                alert("You can't send funds to your account");
              }
            }
          }
        }
        const receiversUpdatedBal = displayAccount()?.movements.push(amount);

        // sendersMov = sendersUpdatedBal;
        if (displayAccount()) {
          receiver.movements = receiversUpdatedBal;

          currentAccount.movements = sendersUpdatedBal;
          // this reloads all neccessary data after a certain action
          reloadData();
        }
      } else {
        alert('Insufficient Balance');
      }
      inputClear(inputTransferTo, inputTransferAmount);
    };
    // currentAccount.movements = executionOfTransfer(accounts, currentAccount.movements)
    executionOfTransfer(accounts, currentAccount.movements);

    // to clear the inputs after click event
    inputClear(inputTransferTo, inputTransferAmount);
  };
  btnTransfer.addEventListener('click', fundsTransfer);

  // Implementing the function of account deletion
  const deleteAccount = function (e) {
    e.preventDefault();
    const accUsername = inputCloseUsername.value;
    const accPin = inputClosePin.value;

    if (
      currentAccount.username === accUsername &&
      currentAccount.pin === Number(accPin)
    ) {
      const accToDel = accounts.find(acc => currentAccount == acc);
      const indexOfDeletedAcc = accounts.indexOf(accToDel);
      accounts.splice(indexOfDeletedAcc, 1);
      console.log(accounts);
    }
    console.log(currentAccount);
    // console.log(accounts)

    inputClear(inputCloseUsername, inputClosePin);
    containerApp.style.opacity = 0;
  };
  btnClose.addEventListener('click', deleteAccount);
};
btnLogin.addEventListener('click', accountActivityLog);
