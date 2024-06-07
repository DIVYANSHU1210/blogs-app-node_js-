const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require("./routes/userRoutes")
const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session")(session);


const app = express();

const dbURI =
  "mongodb+srv://divyanshu:12345@cluster0.p0iu5fb.mongodb.net/node-tuts";

const store = new mongoDBSession({
  uri:dbURI,
  collection:"mySessions"
})

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen("3000", () => {
      console.log("listning");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret : "this is the secret key",
  resave : false,
  saveUninitialized : false,
  store:store
}))

// const isAuth = (req, res, next)=>{
//   if(req.session.isAuth){
//     next();
//   }
//   res.redirect("/user/signup")
// }

app.get("/", (req, res) => {
  if(!req.session.isAuth){
    res.redirect("/user/signup")
  }
    res.redirect("/blogs")
  });


app.get("/about", (req, res) => {
  if(!req.session.isAuth){
    res.redirect("/user/signup")
  }
  res.render("about", { title: "About" });
});




// blog routes
app.use("/blogs", blogRoutes);

app.use("/user", userRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});


