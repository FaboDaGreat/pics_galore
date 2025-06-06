'use strict';
const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 4,
        spotId: 1,
        review: 'Such a lovely place to stay at!',
        stars: 5,
        name: 'Fabian'
      },
      {
        userId: 3,
        spotId: 2,
        review: 'Had a lot of fun staying at this place.',
        stars: 4,
        name: 'Spongebob'
      },{
        userId: 2,
        spotId: 4,
        review: 'The heat was not working! Do not recommend!!',
        stars: 2,
        name: 'Patrick'
      }, {
        userId: 2,
        spotId: 5,
        review: 'Got to create so many memories with my family. I will definitely be back!',
        stars: 5,
        name: 'Patrick'
      }, {
        userId: 1,
        spotId: 5,
        review: 'The owner did not cooperate at all! Whenever we needed something, there was no response like when we asked for help turning on the heat. We ended up being up all night in the cold!!',
        stars: 2,
        name: 'Leroy'
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
