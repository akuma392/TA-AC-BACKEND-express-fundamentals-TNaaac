var express = require('express');

var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public`));

app.get('/', (req, res) => {
  res.sendFile(__dirname + `/home.html`);
});
app.get('/about', (req, res) => {
  res.sendFile(__dirname + `/about.html`);
});
app.get('/error', (req, res) => {
  res.sendFile(__dirname + `/error.html`);
});

app.get('/price', (req, res) => {
  res.sendFile(__dirname + `/price.html`);
});
app.get('/service', (req, res) => {
  res.sendFile(__dirname + `/service.html`);
});
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + `/contact.html`);
});

app.get('/users', (req, res) => {
  res.send('Users');
});

app.use((req, res, next) => {
  res.status(404).send('Page not found');
});
app.listen(4000, () => {
  console.log('Server is running at 4k');
});
