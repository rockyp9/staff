const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

const mailgun = require('mailgun-js');
app.use(bodyParser.json());
console.log(process.env.MAILGUN_API_KEY)
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});



app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABSE
});

app.post('/add-user', (req, res) => {
    const user = req.body.userDetails;
    if (!user) {
        return res.status(400).send('No user data provided');
    }
    console.log('Received user data:', user);
    pool.getConnection((err, connection) => {

        if (err) {
            console.error('Error getting MySQL connection:', err);
            return res.status(500).send('Database connection failed');
        }
        connection.query('SELECT * FROM users WHERE email = ?', [user.emailAddress], (error, results) => {
            if (error) {
                console.log(error);
                return callback(error, null);
            }
            if (results.length === 0) {
                connection.query('INSERT INTO users ( user_id, email, fullName) VALUES(?,?,?)',
                    [user.id, user.emailAddress, user.fullName], (error, results) => {
                        connection.release(); // Release the connection back to the pool

                        if (error) {
                            console.error('Query error:', error);
                            return res.status(500).send('Database query failed');
                        }
                        res.send(results);
                    });
            }
        });

    });
});

app.post('/create-txid', (req, res) => {
    const txidData = req.body.txidData;
    if (!txidData) {
        return res.status(400).send('No txid data provided');
    }
    console.log('Received txid data:', txidData);
    pool.getConnection((err, connection) => {

        if (err) {
            console.error('Error getting MySQL connection:', err);
            return res.status(500).send('Database connection failed');
        }

        connection.query('INSERT INTO txids ( amount,recieveAmount,fullName,userName,email,number,txid) VALUES(?,?,?,?,?,?,?)',
            [txidData.amount,
            txidData.recieveAmount,
            txidData.fullName,
            txidData.userName,
            txidData.email,
            txidData.number,
            txidData.txid], (error, results) => {
                connection.release(); // Release the connection back to the pool

                if (error) {
                    console.error('Query error:', error);
                    return res.status(500).send('Database query failed');
                }
                res.send(results);
            });

    });
});
app.post('/create-transaction', (req, res) => {
    const transaction = req.body.newTransaction;
    if (!transaction) {
        return res.status(400).send('No transaction data provided');
    }
    console.log('Received transaction:', transaction);
    pool.getConnection((err, connection) => {

        if (err) {
            console.error('Error getting MySQL connection:', err);
            return res.status(500).send('Database connection failed');
        }
        connection.query('INSERT INTO transactions ( amount,recieveAmount,fullName,userName,email,number,status) VALUES(?,?,?,?,?,?,?)',
            [transaction.amount, transaction.recieveAmount, transaction.fullName, transaction.userName, transaction.email, transaction.number, transaction.status], (error, results) => {
                connection.release(); // Release the connection back to the pool

                if (error) {
                    console.error('Query error:', error);
                    return res.status(500).send('Database query failed');
                }

                res.send(results);
            });
    });
});

app.post('/send-email', (req, res) => {
    const { recipient, subject, text, email } = req.body;
    const msg = {
        to: [recipient, 'newcentury720@gmail.com'], // Recipient's email
        from: !email ? 'PlusExchange <joe@exchange.com>' : `Customer ${email}`, // Verified sender
        subject: subject,
        text: text,
    };

    mg.messages().send(msg, (error, body) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Sending email failed');
        }
        console.log('sent', body);
        return res.status(200).send('Email sent successfully.')
    });

});


app.get('/get-transactions', (req, res) => {
    pool.getConnection((err, connection) => {

        if (err) {
            console.error('Error getting MySQL connection:', err);
            return res.status(500).send('Database connection failed');
        }
        const query = 'SELECT * FROM transactions'; // Adjust the query to your table structure

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err.stack);
                return;
            }
            console.log('Transactions:', results.length);
            return res.status(200).send(results)
        });
    });

});

app.listen(3001, () => {
    console.log('Server is running on the port 3001!')
})