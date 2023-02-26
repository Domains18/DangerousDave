const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
});
const app = express();
app.use(express.json());
app.use(cors())


app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.get('/api/books', (req, res) => {
    const query = 'SELECT * FROM books';
    database.query(query, (err, results) => {
        err ? res.send(err) : res.send(results);
    });
});

app.post("/api/books", (req, res) => {
    const query = 'INSERT INTO books (`title`, `desc`, `cover`) VALUES(?)';
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    database.query(query, [values], (err, results) => {
        err ? res.send(err) : res.json("Book added successfully");
    });
});

app.listen(5000, () => console.log('Listening on port 5000'));
