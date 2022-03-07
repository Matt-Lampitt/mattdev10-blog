const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

// references the article route from server
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

// gets the created article, then shows it
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
});

// form on new posts
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    res.render("articles/new", { article: article });
  }
});

// export the router to the server
module.exports = router;
