const User = require("../models/user");
const bcrypt = require("bcrypt");
const { application } = require("express");


const user_signup_get = (req, res) => {
  res.render("register", { title: "register" });
};

const user_signup_post = async (req, res) => {
  const email = req.body.email;
  const olduser = await User.findOne({ email : email });
  if (olduser) {
    console.log(
      "user is already registered. Please login or register with a new email id"
    );
    res.render("register", { title: "register" });
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  await newUser.save();
  res.render("login", { title: "login" });
};

const user_login_get = (req, res) => {
  res.render("login", { title: "login" });
};

const user_login_post = async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email })
  if(!user){
    console.log("no user found with this email")
    res.render("login", {title:"login"});
  }

   const isMatch =  bcrypt.compare(password, user.password);
   if(!isMatch){
    console.log("invalid Pasword");
    res.render("login", {title:"login"});
   }

   req.session.isAuth = true;
   req.session.user = user;
   res.render("profile", { title: "profile page", user : user})
    
};

const user_profile = (req, res) => {
  if(!req.session.isAuth){
    res.redirect("/user/signup")
  }
  console.log(req.session.isAuth);
  res.render("profile", { title: "profile" , user : req.session.user});
};


const user_logout = (req, res) => {
    req.session.destroy(err=>{
        if(err)throw err;
        res.redirect("/user/signup")
    })
};

module.exports = {
  user_profile,
  user_signup_get,
  user_signup_post,
  user_login_get,
  user_login_post,
  user_logout,
};
