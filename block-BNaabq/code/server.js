var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public`));

app.use((req, res, next) => {
  console.log(req.cookies);
  res.cookie('username', 'Abhishek');
  var count = req.cookies.count;
  if (count) {
    res.cookie('count', Number(count) + 1);
  } else {
    res.cookie('count', 1);
  }
  console.log(count);
  next();
});

app.get('/about', (req, res) => {
  res.send('Welcome cookies');
});

app.listen(3333, () => {
  console.log('Server is running at 3333');
});
