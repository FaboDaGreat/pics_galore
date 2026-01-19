'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Photo extends Model {
    static associate(models) {
      Photo.belongsTo(models.User, { foreignKey: 'userId' });
      Photo.belongsTo(models.Album, { foreignKey: 'albumId' });
      Photo.hasMany(models.Comment, {
        foreignKey: 'photoId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }

  Photo.init(
    {
      url: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        unique: true,
        validate: {
          isUrl: true,
          len: [1, 2048]
        }
      },
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
      },
      albumId: {
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
