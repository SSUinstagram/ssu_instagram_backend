const Sequelize = require("sequelize");
const Image = require("./images");

class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        number: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
        },
        id: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        date: {
          type: Sequelize.DATE,
          allowNull: true,
          defalutValue: sequelize.literal("now()"),
        },
        contents: {
          type: Sequelize.STRING(100),
          allowNull: true,
          allowNull: false,
        },
      },

      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Post",
        tableName: "post",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
}
module.exports = Post;
