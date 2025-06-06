'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: 'Leroy',
        lastName: 'Jenkins',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Patrick',
        lastName: 'Star',
        email: 'star@user.io',
        username: 'PStar',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Spongebob',
        lastName: 'Squarepants',
        email: 'spongebob@user.io',
        username: 'Spongebob123',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Fabian',
        lastName: 'Richmond',
        email: 'fabian.richmond92@gmail.com',
        username: 'Chocolatebear92',
        hashedPassword: bcrypt.hashSync('Chocolate1')
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
