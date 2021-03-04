var express = require('express');

// var logger = require('morgan');
var time = new Date();

var sec = time.getSeconds();
var min = time.getMinutes();
var hour = time.getHours();
var app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + `/public`));

app.use((req, res, next) => {
  //   console.log(req.method, req.url, `${hour}:${min}:${sec}`);
  next();
});
app.use('/', (req, res, next) => {
  console.log(req.path);
  //   res.sendFile(__dirname + req.path);
  next(__dirname + req.path);
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use((req, res, next) => {
  res.status(404).send('Page not found');
});
app.listen(5000, () => {
  console.log('Server is running at 5k');
});
