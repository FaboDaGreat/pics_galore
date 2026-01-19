'use strict';

const { Album } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Album.bulkCreate([
      {
        userId: 1,
        title: "Views",
        description: "Some of the best views I've ever found"
      },
      {
        userId: 2,
        title: "Greatest Nature"
      },
      {
        userId: 2,
        title: "Imagination Run Wild"
      },
      {
        userId: 3,
        title: "Disney Race 2024",
        description: "Disney's 2024 Wine and Dine weekend, my ever first half-marathon! I can't wait for my next race."
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Albums';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};