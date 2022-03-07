const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const app = express();

mongoose.connect("mongodb://localhost/blog");

// views set up
app.set("view engine", "ejs");

// article router
app.use(express.urlencoded({ extended: false }));

// get to render main index page
// variable created to start with -- TEMP
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

// listening port
app.listen(5000);
