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
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+1.png",
        userId: 1,
        title: "PiCeption",
        description: "A picture within a picture! Pretty cool huh?"
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+2.png",
        userId: 1,
        title: "Tequila Sunrise",
        albumId: 1
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+3.png",
        userId: 1,
        title: "Desolate Paradise",
        description: "The time I found beauty where most others would find just barren land.",
        albumId: 1
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+4.png",
        userId: 2,
        title: "Colors of the Sunset",
        albumId: 2
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+5.png",
        userId: 2,
        title: "Rainbow Bridge",
        description: "Almost reminds me of Mario Kart",
        albumId: 2
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+6.png",
        userId: 2,
        title: "Howl At the Moon",
        description: "If I was a werewolf...",
        albumId: 3
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+7.png",
        userId: 3,
        title: "Shades of Blue"
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+8.png",
        userId: 3,
        title: "Gone Sailing",
        description: "A beautiful depiction that reminds me of my dream to sail away"
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+9.png",
        userId: 1,
        title: "Myrtle Beach Baby",
        description: "The happiest place on earth, honestly!",
        albumId: 1
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+10.png",
        userId: 3,
        title: "Palms Galore",
        description: "I always love being surrounded by palm trees and water."

      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+11.png",
        userId: 3,
        title: "Sun and Palms"
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/1573393467_HIGH.jpg",
        userId: 3,
        title: "Takin Off on My First Half Marathon",
        description: "I'm clearly having a blast...",
        albumId: 4
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/1573143441_HIGH.jpg",
        userId: 3,
        title: "Mysterious as the Dark Side of the Moon",
        albumId: 4
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/1573582297_HIGH.jpg",
        userId: 3,
        title: "Victory is Mine!",
        description: "Sorry to flex on em like that. It was my first time, I had to!",
        albumId: 4
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/IMG-20241103-WA0018.jpg",
        userId: 3,
        title: "Officially a Half-Marathon Man!!!",
        albumId: 4
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+12.png",
        userId: 1,
        title: "Family of Beaks",
        description: "I couldn't tell you how I got so lucky to get this shot!"
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+13.png",
        userId: 1,
        title: "Cotton Candy Sky",
        albumId: 1
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+14v.png",
        userId: 2,
        title: "Denali",
        description: "I never knew Alaska was so beautiful! Definitely worth a second trip.",
        albumId: 2
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+16.jpg",
        userId: 3,
        title: "The Proposal Setting",
        description: "There's no place like home and no better place I could think of to propose!",
        albumId: 5
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+17.jpg",
        userId: 3,
        title: "Dudu and Bubu Love",
        description: "We really do love those bears!",
        albumId: 5
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+18.jpg",
        userId: 3,
        title: "SHE SAID YES!!!",
        albumId: 5
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+19.jpg",
        userId: 3,
        title: "Fiance Photobooth Love",
        albumId: 5
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+20.jpg",
        userId: 3,
        title: "Old School Meets New School: Photoshoot Edition",
        description: "I think the fact that my fiancée used her smartphone to take a picture of photobooth filmstrips for our post is pretty cool!",
        albumId: 5
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+21.jpg",
        userId: 3,
        title: "Her Favorite Flowers and New Favorite Jewelery",
        albumId: 5
      },
      {
        url: "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/PicsGalore+22.jpg",
        userId: 3,
        title: "Happy Go Lucky For Sure!",
        albumId: 5
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
