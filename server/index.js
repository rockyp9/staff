const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: '162.241.24.101',
//     user: 'trsooemy_joe',
//     password: 'admin41@@',
//     database: 'trsooemy_plusexchange'
// });

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'plusexchange'
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

app.get('/empleados', (req, res) => {

    db.query('SELECT * FROM empleados',
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.put('/update', (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?', [nombre, edad, pais, cargo, anios, id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM empleados WHERE id=?', [id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.listen(3001, () => {
    console.log('Server is running on the port 3001!')
})