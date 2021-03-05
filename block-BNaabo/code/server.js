var express = require('express');

var app = express();
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public`));

app.get('/', (req, res) => {
  res.sendFile(__dirname + `/index.html`);
});
app.post('/json', (req, res) => {
  console.log(req.body);
  res.send('Data sent');
});

app.post('/contact', (req, res) => {
  console.log(req.body);
  res.send('Data sent');
});
app.listen(3333, () => {
  console.log('Server is running at 3333');
});
