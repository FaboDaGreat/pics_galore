'use strict';
const { Model, DataTypes } = require('sequelize');
const { Validator } = require('sequelize')

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Comment.belongsTo(models.Photo, {
        foreignKey: 'photoId'
      });
      
    }
  }

  Comment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photoId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Comment'
    }
  );

  return Comment;
};