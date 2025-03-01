const express = require('express');
const app = express();
const port = 3000;
const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/login', (req, res) => {
  res.render("login");
});

app.get('/register', (req, res) => {
  res.render("index");
});

app.post('/register', async(req, res) => {
  let { username, name, email, age, password } = req.body;

  let user = await userModel.findOne({email});
  if(user){
    res.send("User already exists");
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, async function(err, hash){
      let user = await userModel.create({
        username,
        name,
        email,
        age,
        password: hash
      });
   const token = jwt.sign({email: email, userid: user._id}, "xyz");
   res.cookie("token", token)
   res.redirect("login")
    })
  });
});

app.post('/login', async(req, res) => {
  let {email, password } = req.body;

  let user = await userModel.findOne({email});
  if(!user){
    return res.status(400).send("User not found");
  }
  bcrypt.compare(password, user.password, function(err, result){
    if(result){
      const token = jwt.sign({email: email, userid: user._id}, "xyz");
      res.cookie("token", token)
      res.send("you can login")
    }else{
      res.redirect("login");
    }
  });
});

app.get('/logout', async(req, res) => {
  res.clearCookie("token");
  res.redirect("login");
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    
});