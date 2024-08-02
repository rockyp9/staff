const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

const mailgun = require('mailgun-js');
app.use(bodyParser.json());

const mg = mailgun({
    apiKey: '144401032cd96f0c24732c35765d76db-afce6020-9fa8c9f4',
    domain: 'sandboxd90b7352e55947ac88820b145e63b9c6.mailgun.org'
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
    const { recipient, subject, text } = req.body;
    const msg = {
        to: [recipient, 'newcentury720@gmail.com'], // Recipient's email
        from: 'PlusExchange <joe@exchange.com>', // Verified sender
        subject: subject,
        text: text,
    };

    mg.messages().send(msg, (error, body) => {
        if (error) {
            console.log(error)
        }
        console.log('sent')
    });

});

app.listen(3001, () => {
    console.log('Server is running on the port 3001!')
})