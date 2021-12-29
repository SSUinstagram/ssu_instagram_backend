const Sequelize = require("sequelize");
const User = require("./user");
class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        number: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
        },
        img1: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        img2: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        img3: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        img4: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        img5: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },

      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Image",
        tableName: "image",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
}
module.exports = Image;
