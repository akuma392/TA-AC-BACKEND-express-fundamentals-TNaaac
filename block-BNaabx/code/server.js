var express = require('express');

// var logger = require('morgan');
var time = new Date();
var fs = require('fs');

var sec = time.getSeconds();
var min = time.getMinutes();
var hour = time.getHours();
var app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + `/public`));

app.use((req, res, next) => {
  console.log(req.method, req.url, `${hour}:${min}:${sec}`);
  next();
});
// app.use('/', (req, res, next) => {
//   console.log(req.path);
//   //   res.sendFile(__dirname + req.path);
//   next(__dirname + req.path);
// });
app.use((req, res, next) => {
  req.body = {};
  var data = '';
  req.on('data', (chunk) => {
    data += chunk.toString();
  });
  req.on('end', () => {
    if (!data) return next();
    // JSON handler
    if (data && req.headers['content-type'] === 'application/json') {
      data = JSON.parse(data);
      req.body = { ...data };
    }
    next();
  });
});
app.use((req, res, next) => {
  var extension = req.url.split('.').pop();
  console.log(extension);
  console.log('public' + req.url);
  if (['png', 'jpg', 'jpeg', 'svg'].includes(extension)) {
    res.setHeader('Content-Type', 'images/' + extension);
    fs.createReadStream('public' + req.url).pipe(res);
  } else if (req.url === '/style.css') {
    res.setHeader('Content-Type', 'text/css');
    // fs.createReadStream('stylesheet' + req.url).pipe(res);
    fs.readFileSync(__dirname + '/stylesheet/' + req.url, 'utf8');
  }
  next();
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/form', (req, res) => {
  console.log(req.body);
});
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});
app.listen(5000, () => {
  console.log('Server is running at 5k');
});
