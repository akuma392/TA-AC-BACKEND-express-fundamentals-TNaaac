var express = require('express');

var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public`));

app.get('/', (req, res) => {
  res.sendFile(__dirname + `/index.html`);
});
app.get('/new', (req, res) => {
  res.sendFile(__dirname + `/new.html`);
});
app.post('/new', (req, res) => {
  console.log(req.body);
  //   res.json(req.body);
  res.send(`
     <h2> ${req.body.name} </h2>
     <p> ${req.body.email} </p>
     <p> ${req.body.age} </p>
     <p> ${req.body.username} </p>
    
  `);
});

app.get('/users/:username', (req, res) => {
  var username = req.params.username;
  res.send(username);
});
app.listen(3333, () => {
  console.log('Server is running at 3333');
});
