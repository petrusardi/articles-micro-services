const { Posts } = require("../models");

class Controller {
  static async addArticle(req, res) {
    try {
      const post = await Posts.create(req.body);
      if (!post) {
        throw { error: error.message };
      }
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async detailArticle(req, res) {
    try {
      let article = await Posts.findByPk(req.params.id);
      res.status(200).json(article);
    } catch (error) {
      res.status(404).json({ error: "Article not found" });
    }
  }
  static async updateArticle(req, res) {
    try {
      const article = await Posts.findByPk(req.params.id);
      if (!article) {
        throw { error: "Article not found" };
      }
      await article.update(req.body);
      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async deleteArticle(req, res) {
    try {
      const article = await Posts.findByPk(req.params.id);
      if (!article) {
        throw { name: "error not found" };
      }
      await article.destroy();
      res.status(200).json({ message: `Article success to delete` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getArticles(req, res) {
    try {
      const limit = parseInt(req.params.limit, 10);
      const offset = parseInt(req.params.offset, 10);

      if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
        return res.status(400).json({ error: "Invalid limit or offset" });
      }

      const articles = await Posts.findAll({
        limit: limit,
        offset: offset,
      });

      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = Controller;
