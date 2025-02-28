const express = require('express');
const app = express();
const port = 3000;
const userModel = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render("index");
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    
});