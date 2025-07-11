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
        username: "demo-lition",
        title: "Views",
        description:"Some of the best views I've ever found"
      },
      {
        userId: 2,
        username: "pstar",
        title: "Greatest Nature"
      },
      {
        userId: 2,
        username: "pstar",
        title: "Imagination Run Wild"
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