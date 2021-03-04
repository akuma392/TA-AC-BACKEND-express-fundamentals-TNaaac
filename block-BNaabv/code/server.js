var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public`));

app.use('/about', (req, res, next) => {
  console.log(req.cookies);
  var count = req.cookies.count;
  if (count) {
    res.cookie('count', Number(count) + 1);
  } else {
    res.cookie('count', 1);
  }
  console.log(count);
  next();
});
app.use('/admin', (req, res, next) => {
  next('Unauthorized page');
});
app.get('/', (req, res) => {
  res.send(`<h2>Welcome to Express</h2>`);
});
app.get('/about', (req, res) => {
  res.send('My name is qwerty');
});
app.post('/form', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});
app.post('/json', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
app.get('/users/:username', (req, res) => {
  var username = req.params.username;
  res.send(username);
});
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});
app.listen(3000, () => {
  console.log('Server is running at 3k');
});
