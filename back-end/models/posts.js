"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init(
    {
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: {
            args: [20],
            msg: "Title minimal 20 karakter",
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [200],
            msg: "Content minimal 200 karakter",
          },
        },
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: {
            args: [3],
            msg: "Category minimal 3 karakter",
          },
        },
      },
      status: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isIn: {
            args: [["publish", "draft", "thrash"]],
            msg: "Status harus 'publish', 'draft', or 'thrash'",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
