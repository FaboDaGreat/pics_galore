'use strict';

const { Comment } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Comment.bulkCreate([
      {
        userId: 1,
        username: "demo-lition",
        comment: "AMAZING! How did you capture such a beautiful array of colors??",
        photoId: 5
      },
      {
        userId: 1,
        username: "demo-lition",
        comment: "My favorite color, absolutely LOVE it!",
        photoId: 7
      },
      {
        userId: 3,
        username: "fabodagreat",
        comment: "lol piception is dope!",
        photoId: 1
      },
      {
        userId: 2,
        username: "pstar",
        comment: "Have to agree with the above comment!!!",
        photoId: 1
      },
      {
        userId: 2,
        username: "pstar",
        comment: "I've been looking for a place like this to vacation. Where is this?",
        photoId: 3
      },
      {
        userId: 2,
        username: "pstar",
        comment: "2 of my favorite things. Lovely!",
        photoId: 2
      },
      {
        userId: 3,
        username: "fabodagreat",
        comment: "How on earth did you take this???",
        photoId: 6
      },
      {
        userId: 2,
        username: "pstar",
        comment: "I've always LOVED going to Myrtle Beach!",
        photoId: 9
      },
      {
        userId: 1,
        username: "demo-lition",
        comment: "Sailing is so much fun, you really need to try it. This might be my next stop, where did you take this?",
        photoId: 8
      },
      {
        userId: 3,
        username: "fabodagreat",
        comment: "This was at clearwater beach in Florida. I think I'll finally give a shot the next time I'm out there!",
        photoId: 8
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Comments';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
