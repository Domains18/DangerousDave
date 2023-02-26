const express = require('express');
const mysql = require('mysql');


const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
});




const app = express();



app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.get('/api/books', (req, res) => {
    const query = 'SELECT * FROM books';
    database.query(query, (err, results) => {
        err?  res.send(err)  : res.send(results);
    });
});


app.listen(5000, () => console.log('Listening on port 5000'));
