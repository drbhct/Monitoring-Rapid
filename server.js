const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const connection = require('./connection');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM user_details WHERE user_name = '${username}' AND password = '${password}'`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.redirect('/home');
    } else {
      res.send('Invalid login credentials');
    }
  });
});

app.get('/home', (req, res) => {
  res.send('Login successful');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});