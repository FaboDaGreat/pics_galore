'use strict';
const { Model, DataTypes } = require('sequelize');
const { Validator } = require('sequelize')

module.exports = (sequelize) => {
  class Photo extends Model {
    static associate(models) {
      Photo.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      
      Photo.belongsTo(models.Album, {
        foreignKey: 'albumId'
      });
      
    }
  }

  Photo.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      albumId: {
        type: DataTypes.INTEGER
      },
      favoriteId: {
        type: DataTypes.INTEGER
      },
      labelId: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Photo'
    }
  );

  return Photo;
};