// --Imports--
const express = require('express');
const router = express.Router();

// --Utility Imports--
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// --Sequelize Imports--
const { Photo, Album, User } = require('../../db/models');

const validateAlbum = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a title for your post'),
  check('title')
    .isLength({ min: 5, max: 50 })
    .withMessage('Title must be between 5 and 50 characters'),
  check('description')
    .isLength({ max: 500 })
    .withMessage('Please limit your description to 500 characters'),
  handleValidationErrors
];



//--Get All Albums by User--

router.get('/users/:id', async (req, res, next) => {
  try {

    const userId = req.params.id;
    const albums = await Album.findAll({
      where: {
        userId: userId
      },
      include: Photo,
      attributes: ["id", "userId", "title", "description", "createdAt"]
    });

    const newAlbumArr = [];

    for (let album of albums) {

      const albumObj = await album.toJSON();
      albumObj.photoCount = album.Photos.length;

      if (album.Photos.length) {
        albumObj.coverPhoto = album.Photos[album.Photos.length - 1].url;
      } else {
        albumObj.coverPhoto = "https://picsgalore-bucket-aws-us-gov.s3.us-east-2.amazonaws.com/Blank+Photo.jpg";
      };

      newAlbumArr.push(albumObj);

    };

    return res.json(newAlbumArr);

  } catch (error) {

    next(error);

  };
});



//--Get Album's Details By Id--

router.get('/:id', async (req, res, next) => {
  try {
    const album = await Album.findByPk(req.params.id,
      {
        attributes: ["id", "userId", "title", "description", "createdAt"],
        include: [Photo, User]
      }
    );

    if (!album) {
      const error = new Error("Album couldn't be found");
      error.status = 404;
      return next(error);
    }

    return res.json(album);

  } catch (error) {
    next(error);
  }
});

//--Create a New Album--

router.post('/', requireAuth, validateAlbum, async (req, res, next) => {
  try {
    const { title, description } = req.body

    if (title.trim().length < 5) {
      const error = new Error("Bad request.");
      error.status = 400;
      error.errors = { "title": "Please enter at least 5 characters for your album's title" }
      throw error
    }

    const sameAlbum = await Album.findOne({
      where: {
        title: title,
        userId: req.user.id
      }
    });

    if (sameAlbum) {
      const err = new Error('Forbidden');
      err.errors = { title: 'You already have an album with this name!' };
      err.status = 401;
      return next(err);
    }

    const album = await Album.create({
      userId: req.user.id, title, description
    });

    return res.json(album);

  } catch (error) {
    next(error);
  }
});

//--Edit an Album--

router.put('/:id', requireAuth, validateAlbum, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const album = await Album.findByPk(id);
    if (!album) {
      const error = new Error("Album couldn't be found");
      error.status = 404;
      throw error;
    }

    if (album.userId !== userId) {
      const error = new Error("Forbidden");
      error.status = 403;
      error.errors = { message: 'You are not authorized to edit this album!' };
      throw error;
    };

    const { title, description } = req.body;

    if (title.trim().length < 5) {
      const error = new Error("Bad request.");
      error.status = 400;
      error.errors = { "title": "Please enter at least 5 characters for your album's title" }
      throw error;
    };

    if (title !== album.title) {
      const sameAlbum = await Album.findOne({
        where: {
          title: title,
          userId: req.user.id
        }
      });

      if (sameAlbum) {
        const err = new Error('Forbidden');
        err.errors = { title: 'You already have an album with this name!' };
        err.status = 401;
        return next(err);
      };

    };

    album.title = title;
    album.description = description;

    await album.save();

    const albumWithUserAndPhotos = await Album.findByPk(album.id, {
      include: [User, Photo]
    });

    return res.json(albumWithUserAndPhotos);
  } catch (error) {
    next(error);
  }
});


//--Delete an Album--

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const album = await Album.findByPk(id);

    if (!album) {
      const error = new Error("Album couldn't be found");
      error.status = 404;
      throw error;
    }

    if (album.userId !== userId) {
      const error = new Error('Forbidden');
      error.status = 403;
      throw error;
    }

    await album.destroy();
    return res.json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
});





module.exports = router;
