'use strict';

const { Photo } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Photo.bulkCreate([
      {
        url: "https://buffer.com/resources/content/images/2024/11/free-stock-image-sites.png",
        userId: 1,
        username: "Demo-lition",
        title: "PiCeption",
        description: "A picture within a picture! Pretty cool huh?"
      },
      {
        url: "https://www.stockvault.net/data/2011/02/21/117750/preview16.jpg",
        userId: 1,
        username: "Demo-lition",
        title: "Tequila Sunrise",
        albumId: 1
      },
      {
        url: "https://www.stockvault.net/data/2016/08/28/208633/preview16.jpg",
        userId: 1,
        username: "Demo-lition",
        title: "Desolate Paradise",
        description: "The time I found beauty where most others would find just barren land.",
        albumId: 1
      },
      {
        url: "https://www.stockvault.net/data/2015/08/14/176770/preview16.jpg",
        userId: 2,
        username: "PStar",
        title: "Colors of the Sunset",
        albumId: 2
      },
      {
        url: "https://www.stockvault.net/data/2017/02/07/222329/preview16.jpg",
        userId: 2,
        username: "PStar",
        title: "Rainbow Bridge",
        description: "Almost reminds me of Mario Kart",
        albumId: 2
      },
      {
        url: "https://www.stockvault.net/data/2016/04/23/194988/preview16.jpg",
        userId: 2,
        username: "PStar",
        title: "Howl At the Moon",
        description: "If I was a werewolf...",
        albumId: 3
      },
      {
        url: "https://www.stockvault.net/data/2016/05/21/199248/preview16.jpg",
        userId: 3,
        username: "FaboDaGreat",
        title: "Shades of Blue"
      },
      {
        url: "https://www.stockvault.net/data/2013/07/12/146526/preview16.jpg",
        userId: 3,
        username: "FaboDaGreat",
        title: "Gone Sailing",
        description: "A beautiful depiction that reminds me of my dream to sail away"
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Photos';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
