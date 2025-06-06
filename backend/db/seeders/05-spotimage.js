'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=252&fit=crop&h=408",
        preview: true
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/4258279/pexels-photo-4258279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/8100754/pexels-photo-8100754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?auto=compress&cs=tinysrgb&w=600",
        preview: true
      },
      {
        spotId: 6,
        url: "https://maps.googleapis.com/maps/api/streetview?channel=rdc-streetview&client=gme-movesalesinc&location=2087%20SE%20South%20Buttonwood%20Dr%2C%20Port%20St%20Lucie%2C%20FL%2034952&size=932x420&source=outdoor&signature=qgodbiNFiDjqSuXLHQUXWlRSI-w=",
        preview: true
      },
      {
        spotId: 6,
        url: "https://imagescdn.homes.com/i2/e06w1xnzDTUqNeC0LhSNzkX4109eHNLihePgKDqiHVw/102/canal-pointe-port-saint-lucie-fl-neighborhoodphoto.jpg?p=1"
      }

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
