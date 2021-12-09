const Sequelize = require('sequelize');

class Follow extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
     number:{
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey:true,
        allowNull:true,
        autoIncrement: true,
     },
     following_id:{
        type: Sequelize.STRING(100),
        allowNull:false,
     },
     followed_id:{
        type: Sequelize.STRING(100),
        allowNull:false,
     }
    }, 
    
    {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Follow',
      tableName: 'follow',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){}
};
module.exports = Follow;