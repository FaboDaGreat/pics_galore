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
        username: "demo-lition",
        title: "PiCeption",
        description: "A picture within a picture! Pretty cool huh?"
      },
      {
        url: "https://www.stockvault.net/data/2011/02/21/117750/preview16.jpg",
        userId: 1,
        username: "demo-lition",
        title: "Tequila Sunrise",
        albumId: 1
      },
      {
        url: "https://www.stockvault.net/data/2016/08/28/208633/preview16.jpg",
        userId: 1,
        username: "demo-lition",
        title: "Desolate Paradise",
        description: "The time I found beauty where most others would find just barren land.",
        albumId: 1
      },
      {
        url: "https://www.stockvault.net/data/2015/08/14/176770/preview16.jpg",
        userId: 2,
        username: "pstar",
        title: "Colors of the Sunset",
        albumId: 2
      },
      {
        url: "https://www.stockvault.net/data/2017/02/07/222329/preview16.jpg",
        userId: 2,
        username: "pstar",
        title: "Rainbow Bridge",
        description: "Almost reminds me of Mario Kart",
        albumId: 2
      },
      {
        url: "https://www.stockvault.net/data/2016/04/23/194988/preview16.jpg",
        userId: 2,
        username: "pstar",
        title: "Howl At the Moon",
        description: "If I was a werewolf...",
        albumId: 3
      },
      {
        url: "https://www.stockvault.net/data/2016/05/21/199248/preview16.jpg",
        userId: 3,
        username: "fabodagreat",
        title: "Shades of Blue"
      },
      {
        url: "https://www.stockvault.net/data/2013/07/12/146526/preview16.jpg",
        userId: 3,
        username: "fabodagreat",
        title: "Gone Sailing",
        description: "A beautiful depiction that reminds me of my dream to sail away"
      },
      {
        url: "https://visitmurrellsinlet.com/wp-content/uploads/sites/4753/2024/06/istockphoto-805157896-2048x2048-transformed.jpeg?w=1000&h=1000&zoom=2",
        userId: 1,
        username: "demo-lition",
        title: "Myrtle Beach Baby",
        description: "The happiest place on earth, honestly!",
        albumId: 1
      },
      {
        url: "https://images.photowall.com/products/50406/row-of-palm-trees.jpg?h=699&q=85",
        userId: 3,
        username: "fabodagreat",
        title: "Palms Galore",
        description: "I always love being surrounded by palm trees and water."

      },
      {
        url: "https://www.moonvalleynurseries.com/_next/image?url=https%3A%2F%2Fcdn.mvncorp.dev%2Fmedia%2Fproducts%2Fimages%2Fcucuban%20royal%20palm%20trees.jpg&w=3840&q=50",
        userId: 3,
        username: "fabodagreat",
        title: "Sun and Palms"
      },
      {
        url: "https://t4.ftcdn.net/jpg/07/04/26/59/360_F_704265931_NQNJabIZrl3bClguREmCMRJcygTzXErN.jpg",
        userId: 1,
        username: "demo-lition",
        title: "Family of Beaks",
        description: "I couldn't tell you how I got so lucky to get this shot!"
      },
      {
        url: "https://images.stockcake.com/public/c/f/5/cf5b6fb1-b0fe-49d7-bd03-c4806ab3967c_large/cotton-candy-skies-stockcake.jpg",
        userId: 1,
        username: "demo-lition",
        title: "Cotton Candy Sky",
        albumId: 1
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
