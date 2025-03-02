const express = require('express');
const app = express();
const port = 3000;
const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt  = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render("login");
});

app.get('/login', (req, res) => {
  res.render("login");
});

app.get('/register', (req, res) => {
  res.render("index");
});

app.get('/logout', async(req, res) => {
  res.clearCookie("token");
  res.redirect("login");
});

app.get('/profile', isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({email: req.user.email}).populate("posts");
  res.render("profile", {user});
  // console.log(user);
});

app.post('/post', isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({email: req.user.email});
  let {content} = req.body;
  
  let post = await postModel.create({
    user: user._id,
    content: content
  })

  user.posts.push(post._id);
  await user.save();
  res.redirect("profile");
});


app.post('/register', async(req, res) => {
  // console.log("Received data:", req.body); 
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
      res.redirect("profile")
    }
  });
});

// middleware to check if user is logged in
function isLoggedIn(req, res, next){
   if(req.cookies.token == ""){
      res.send("You are not logged in");
   }
   else{
    const data = jwt.verify(req.cookies.token, "xyz");
    req.user = data;
   }
   next();

}

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    
});