const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('*', function (req, res) {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));


const port = 8080
app.listen(port, () => console.log(`App running on port ${port}`)); 