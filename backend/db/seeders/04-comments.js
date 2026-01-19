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
        comment: "AMAZING! How did you capture such a beautiful array of colors??",
        photoId: 5
      },
      {
        userId: 1,
        comment: "My favorite color, absolutely LOVE it!",
        photoId: 7
      },
      {
        userId: 3,
        comment: "lol piception is dope!",
        photoId: 1
      },
      {
        userId: 2,
        comment: "Have to agree with the above comment!!!",
        photoId: 1
      },
      {
        userId: 2,
        comment: "I've been looking for a place like this to vacation. Where is this?",
        photoId: 3
      },
      {
        userId: 2,
        comment: "2 of my favorite things. Lovely!",
        photoId: 2
      },
      {
        userId: 3,
        comment: "How on earth did you take this???",
        photoId: 6
      },
      {
        userId: 2,
        comment: "I've always LOVED going to Myrtle Beach!",
        photoId: 9
      },
      {
        userId: 1,
        comment: "Sailing is so much fun, you really need to try it. This might be my next stop, where did you take this?",
        photoId: 8
      },
      {
        userId: 3,
        comment: "This was at clearwater beach in Florida. I think I'll finally give a shot the next time I'm out there!",
        photoId: 8
      },
      {
        userId: 3,
        comment: "Breathtaking",
        photoId: 18
      },
      {
        userId: 2,
        comment: "That really is such a perfect shot.",
        photoId: 13
      },
      {
        userId: 3,
        comment: "Thanks! Honestly it was a complete accident. I just thought that pose would look cool, but I had no idea the Epcot ball was right there behind me lol",
        photoId: 13
      },
      {
        userId: 1,
        comment: "Super cool! Who took this?",
        photoId: 13
      },
      {
        userId: 3,
        comment: "One of the photographers they have placed throughout Disney during their races!",
        photoId: 13
      },
      {
        userId: 1,
        comment: "Congratulations man!",
        photoId: 15
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
