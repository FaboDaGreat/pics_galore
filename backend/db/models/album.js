'use strict';
const { Model, DataTypes } = require('sequelize');

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
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [5, 50]
        }
      },
      description: {
        type: DataTypes.STRING(500),
        validate: {
          len: [0, 500]
        }
      }
    },
    {
      sequelize,
      modelName: 'Album'
    }
  );

  return Album;
};