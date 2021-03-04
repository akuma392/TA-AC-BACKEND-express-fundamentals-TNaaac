var express = require('express');

var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public`));

app.get('/', (req, res) => {
  res.send('Welcome to home page');
});
app.get('/about', (req, res) => {
  res.send('About page');
});

app.use((req, res, next) => {
  if (req.url == '/admin') {
    res.end('Unauthorized');
  } else {
    res.end('Page not found');
  }
});
app.listen(3333, () => {
  console.log('Server is running at 3333');
});
