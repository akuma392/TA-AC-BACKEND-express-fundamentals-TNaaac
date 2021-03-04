var express = require('express');
var app = express();

function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
  //   res.send('Welcome to Node');
}
app.use('/about', logger);
app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(4000, () => {
  console.log('server is running at 4k');
});
