'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Albums',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        title: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        description: {
          type: Sequelize.STRING(500)
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      },
      {
        ...options,
        indexes: [
          {
            unique: true,
            fields: ['userId', 'title']
          }
        ]
      }
    );
  },

  async down(queryInterface) {
    options.tableName = 'Albums';
    await queryInterface.dropTable('Albums', options);
  }
};