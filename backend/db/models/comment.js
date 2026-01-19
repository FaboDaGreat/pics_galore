'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Photo, { foreignKey: 'photoId' });
    }
  }

  Comment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      photoId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comment: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
          len: [5, 1000]
        }
      }
    },
    {
      sequelize,
      modelName: 'Comment'
    }
  );

  return Comment;
};