const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require("./user")
const Post = require('./post');
const Image = require('./images');
const Follow = require("./follow");


const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Image = Image;
db.Follow = Follow;
// db.Hashtag = Hashtag;

User.init(sequelize);
User.associate(db);

Post.init(sequelize);
Post.associate(db);

Image.init(sequelize);
Image.associate(db);

Follow.init(sequelize);
Follow.associate(db);

module.exports = db;
