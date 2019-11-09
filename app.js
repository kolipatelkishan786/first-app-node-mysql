let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');

app.use(bodyParser.json());

let port = 8080;

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'kishan',
    password: 'kishan123',
    database: 'mydb',
    multipleStatement: true
});


connection.connect((err) => {
    if (err) throw err;
    console.log('Database Connected!');
});

//rest api to get
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, row, fields) => {
        if ((!error))
            res.send(row);
        else
            console.log(error);
    });
});


// GetById Api
app.get('/users/:id', (req, res) => {
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (error, row, fields) => {
        if ((!error))
            res.send(row);
        else
            console.log(error);
    });
});

//Delete Record

app.delete('/users/:id', (req, res) => {
    connection.query('DELETE FROM users WHERE id = ?', [req.params.id], (error, row, fields) => {
        if ((!error))
            res.send('Deleted successfully.');
        else
            console.log(error);
    });
});

//Insert Data
//Post Api
app.post('/users', (request, res) => {
    connection.query('INSERT INTO users SET ?', request.body, (error, result) => {
        if (error) throw error;

        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

//Update Data
//Put Api
app.put('/users/:id', (req, res) => {
    const id = req.params.id;

    connection.query('UPDATE users SET ? WHERE id = ?', [req.body, id], (error, result) => {
        if (error) throw error;

        res.send('User updated successfully.');
    });
});

app.listen(port, function () {
    console.log('app listening on port:' + port);
});
module.exports = app;
