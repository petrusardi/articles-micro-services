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
}

module.exports = Controller;
