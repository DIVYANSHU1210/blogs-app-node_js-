const Blog = require("../models/blog");

const blog_index = (req, res) => {
  if(!req.session.isAuth){
    res.render("register",  { title: "register" })
  }
  Blog.find()
    .then((result) => {
      res.render("index", { title: "Home", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  if(!req.session.isAuth){
    res.render("register",  { title: "register" })
  }
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  if(!req.session.isAuth){
    res.render("register",  { title: "register" })
  }
  res.render("create", { title: "Create a new blog" });
};

const blog_create_post = (req, res) => {
  if(!req.session.isAuth){
    res.render("register", { title: "register" })
  }
  const blog = new Blog(req.body);
  // console.log(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
