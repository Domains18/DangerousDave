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
    const query = 'INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES(?)';
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]

    database.query(query, [values], (err, results) => {
        err ? res.send(err) : res.json("Book added successfully");
    });
});

//delete

app.delete("/api/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ? ";

    database.query(q, [bookId], (err, data) => {
        err ? res.json(err) : res.json("Book Has been deleted succesfully");
    });
});

app.put("/api/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ?  WHERE id = ? ";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]


    database.query(q, [...values, bookId], (err, data) => {
        err ? res.json(err) : res.json("Book Updated Succesfully");
    });
});

app.listen(5000, () => console.log('Listening on port 5000'));
