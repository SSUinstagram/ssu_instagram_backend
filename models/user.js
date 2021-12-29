const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          primaryKey: true,
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
      },

      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "user",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
}
module.exports = User;
