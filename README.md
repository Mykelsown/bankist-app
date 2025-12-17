Bankist App
A minimalist banking application that allows users to manage their finances, transfer money, and track transactions in real-time. This project focuses on the implementation of core banking logic using modern JavaScript.

🚀 Project Overview
The Bankist App is a functional banking dashboard where users can log in to view their transaction history (movements), check their current balance, and perform actions like transferring funds to other users or closing their accounts.

Key Features
User Authentication: Secure login system using usernames and PINs.

Transaction Tracking: Displays a list of deposits and withdrawals with time stamps.

Real-time Calculations: Dynamically calculates the total balance, deposits, withdrawals, and interest based on the account's unique interest rate.

Money Transfers: Fully functional logic to transfer funds between accounts, including validation checks (e.g., checking for sufficient funds).

Account Management: Ability to close/delete an account from the system.

🛠️ My Contributions: Logic & DOM Manipulation
While the visual layout (HTML and CSS) was provided by my instructor, I was responsible for bringing the application to life. My work focused on data processing and DOM Manipulation to ensure a seamless user experience.

Highlights of my JavaScript Implementation:
Dynamic Data Rendering: I used insertAdjacentHTML to inject transaction rows into the webpage dynamically. This allows the app to display a unique list of movements for every different user.

Username Generation: I implemented a function that automatically generates usernames for all users in the database by taking the initials of their full names (e.g., "Jonas Schmedtmann" becomes "js").

Array Methods: I heavily utilized modern JavaScript array methods such as .map(), .filter(), .reduce(), and .find() to calculate balances and manage account data efficiently.

UI State Management: I handled the "Login" flow by manipulating the CSS opacity of the main application container and updating text content dynamically based on the active user.

💻 Tech Stack
JavaScript (ES6+): Core logic and DOM manipulation.

HTML5/CSS3: Provided by instructor (with minor adjustments by me for content).

📖 How to Use
Login: Use a username (initials) and the corresponding PIN.

Example: User: js, PIN: 1111

View Balance: Once logged in, your balance and transaction history will load automatically.

Transfer: Enter a recipient's username and an amount to send money.

Close Account: Enter your credentials again in the "Close Account" section to delete your profile.

Note: This project was developed as part of a JavaScript learning module. The HTML and CSS architecture are the work of my instructor, while the logic, interactivity, and data management were implemented by me.
