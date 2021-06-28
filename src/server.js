require("dotenv").config()
const express = require('express');
const path = require('path');
const app = express();
const routes = require("./controllers/api")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });

// app.get('/', function (req, res) {
//   // res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", (MONGO_URI) => {
  console.log("Connected to DB");

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", routes)

  const port = 8080
  app.listen(port, () => console.log(`App running on port ${port}`)); 
})