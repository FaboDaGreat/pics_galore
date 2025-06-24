'use strict';
const { Model, DataTypes } = require('sequelize');
const { Validator } = require('sequelize')

module.exports = (sequelize) => {
  class Album extends Model {
    static associate(models) {
      Album.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Album.hasMany(models.Photo, {
        foreignKey: 'albumId',
        onDelete: "SET NULL",
        hooks: true
      });
      
    }
  }

  Album.init(
    {
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
      }
    },
    {
      sequelize,
      modelName: 'Album'
    }
  );

  return Album;
};