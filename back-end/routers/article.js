const express = require("express");
const Controller = require("../controllers/articleController");
const article = express.Router();

article.post("/", Controller.addArticle);
article.get("/:id", Controller.detailArticle);
article.put("/:id", Controller.updateArticle);
article.delete("/:id", Controller.deleteArticle);
article.get("/:limit/:offset", Controller.getArticles);

module.exports = article;
