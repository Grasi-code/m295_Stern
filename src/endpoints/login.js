/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 3001;
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false
}));

// Regex from https://www.w3resource.com/javascript/form/email-validation.php#:~:text=To%20get%20a%20valid%20email,%5D%2B)*%24%2F.
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (emailRegex.test(email) && password === 'm295') {
    req.session.authenticated = true;
    req.session.email = email;
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});


app.get('/verify', (req, res) => {
  if (req.session.authenticated) {
    res.status(200).json({ email: req.session.email });
  } else {
    res.sendStatus(401);
  }
});


app.delete('/logout', (req, res) => {
  req.session.authenticated = false;
  req.session.email = null;
  res.sendStatus(204);
});

//Help from ChatGPT
app.use(function(req, res, next) {
  res.status(404).send('404 Not Found');
}); 

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
});