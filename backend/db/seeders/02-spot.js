'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Spongebob Way",
        city: "Bikini Bottom",
        state: "Hawaii",
        country: "United States",
        lat: 37.76453,
        lng: -122.47303,
        name: "Pineapple Home",
        description: "A pineapple under the sea",
        price: 55.00
      },
      {
        ownerId: 1,
        address: "555 Vscode St",
        city: "Bikini Top",
        state: "Alaska",
        country: "United States",
        lat: 35.76463,
        lng: -120.77303,
        name: "Coder's Hub",
        description: "Best place to code",
        price: 90.00
      },
      {
        ownerId: 2,
        address: "24 Group 3 Apt 1",
        city: "New York City",
        state: "New York",
        country: "United States",
        lat: 31.76463,
        lng: -128.77303,
        name: "Cool Spot",
        description: "A place where people have fun",
        price: 69.00
      }, {
        ownerId: 3,
        address: "30 Group 1 Apt 3",
        city: "Anchorage",
        state: "Alaska",
        country: "United States",
        lat: 35.76463,
        lng: -120.77303,
        name: "The Igloo",
        description: "Come here if you want to enjoy snow",
        price: 56.00
      }, {
        ownerId: 3,
        address: "27 Group 8 Apt 5",
        city: "Christmas",
        state: "Florida",
        country: "United States",
        lat: 35.22463,
        lng: -127.33303,
        name: "Santa's Paradise",
        description: "Heaven is a place on Earth",
        price: 40.00
      },{
        ownerId: 4,
        address: "2087 SE South Buttonwood Dr",
        city: "Port St. Lucie",
        state: "Florida",
        country: "United States",
        lat: 65.2234,
        lng: 93.56987,
        name: "Fab's Spot",
        description: "You will probably wonder why this place feels so much like home. It was my childhood home so that makes plenty of sense!",
        price: 150.00 
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
