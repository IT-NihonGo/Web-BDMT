'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'user_id' })
      Post.belongsTo(models.Store, { foreignKey: 'store_id' })
      Post.hasMany(models.Like, { foreignKey: 'post_id' })
      Post.hasMany(models.Comment, { foreignKey: 'post_id' })
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    images: DataTypes.ARRAY(DataTypes.STRING),
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};