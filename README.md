Cryptocurrenty Exchange Platform

Overview

This project is a web application that allows users to exchange various supported currencies into desired cryptocurrencies. 
Built using the MERN stack (React, Node.js, Express, MySQL), the platform provides a seamless and secure user experience.
User authentication and management are handled by Clerk, ensuring secure access to the platform's features.

Features
- Currency Exchange: Convert supported fiat currencies into a range of popular cryptocurrencies.
- User Authentication: Secure user login and registration using Clerk.
- Real-time Exchange Rates: Get up-to-date conversion rates for accurate exchanges.
- Responsive Design: Fully responsive UI built with React, providing a smooth experience across devices.
- Backend Integration: Node.js and Express.js serve as the backend, handling API requests, and processing exchanges.
- Data Storage: User data and transaction history are stored securely in a MySQL database.

Installation

1. Clone the repository:
    git clone https://github.com/rockyp9/staff.git
    cd staff

2. Set up the MySQL database and clerk:
    - Create a new MySQL database.
    - Import the provided SQL script to set up the necessary tables.
    - Sign up for a Clerk account and configure your API keys.
    - Update the .env file with your MySQL credentials and clerk api keys.

3. Install frontend and backend dependencies:
    npm install
    cd /server $$ npm install

4. Run the development servers:

    - npm start && cd /server && npm start

Usage

1. Register or log in to your account using Clerk.
2. Select the currency you wish to exchange.
3. Choose the desired cryptocurrency.
4. Review the conversion rate and confirm the transaction.
5. The exchange will be processed, and your account balance will be updated accordingly.

Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.

License
This project is licensed under the MIT License.

Contact
For any inquiries, please contact aaditakula@plusexchanges.com.