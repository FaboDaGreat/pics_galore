// --Imports--
const express = require('express');
const router = express.Router();

// --Utility Imports--
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// --Sequelize Imports--
const { Photo, Album, Comment } = require('../../db/models');


const validatePost = [
  check('url')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isURL()
    .withMessage('Please enter a valid link'),
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a title for your post'),
  check('title')
    .isLength({ min: 5, max: 50 })
    .withMessage('Title must be between 5 and 50 characters'),
  check('description')
    .isLength({ max: 500 })
    .withMessage('Please limit your description to 500 character'),
  handleValidationErrors
];



//--Get All Photos--

router.get('/', async (req, res, next) => {
  try {
    const photos = await Photo.findAll({
      attributes: ["id", "url", "userId", "username", "title", "description", "albumId"]
    });

    return res.json(photos)

  } catch (error) {
    next(error)
  }
}
);


//--Get Photo Details By Id--

router.get('/:id', async (req, res, next) => {
  try {
    const photo = await Photo.findByPk(req.params.id,
      {
        attributes: ["id", "url", "userId", "username", "title", "description", "albumId", "createdAt"],
        include: [
          { model: Album },
          { model: Comment }
        ]
      }
    );

    if (!photo) {
      const error = new Error("Photo couldn't be found");
      error.status = 404;
      return next(error);
    }

    return res.json(photo);

  } catch (error) {
    next(error);
  }
});


//--Get All of a User's Photos--

router.get('/users/:id', async (req, res, next) => {
  try {

    const userId = req.params.id;
    const photos = await Photo.findAll({
      where: {
        userId: userId
      },
      attributes: ["id", "url", "userId", "username", "title", "description", "albumId"]
    });

    return res.json(photos)
  }
  catch (error) {
    next(error);
  }
});

//--Post A New Photo--

router.post('/', requireAuth, validatePost, async (req, res, next) => {
  try {
    const { url, title, description, albumTitle, favoriteId, labelId } = req.body

    if (title.trim().length < 5) {
      const error = new Error("Bad request.");
      error.status = 400;
      error.errors = {"title": "Please enter at least 5 characters for your picture's title"}
      throw error
    }

    const samePhoto = await Photo.findOne({
      where: {
        url: url
      }
    })

    if (samePhoto) {
      const err = new Error('Forbidden');
      err.errors = { url: 'Cannot post a photo that has already been posted!' };
      err.status = 401;
      return next(err);
    }

    const sameName = await Photo.findOne({
      where: {
        title: title,
        userId: req.user.id
      }
    })

    if (sameName) {
      const err = new Error('Forbidden');
      err.errors = { title: 'You already have a photo with that title.' };
      err.status = 401;
      return next(err);
    }

    let albumId;

    if (albumTitle) {

      if (albumTitle.trim().length < 5) {
      const error = new Error("Bad request.");
      error.status = 400;
      error.errors = {"album": "Please enter at least 5 characters for your album's title"}
      throw error
    }

      const album = await Album.findOne({
        where: {
          userId: req.user.id,
          title: albumTitle
        }
      })

      if (!album) {
        const newAlbum = await Album.create({
          userId: req.user.id, username: req.user.username, title: albumTitle
        })
        albumId = newAlbum.id
      } else {
        albumId = album.id
      }
    }

    const post = await Photo.create({
      userId: req.user.id, username: req.user.username,
      url, title, description, albumId, favoriteId, labelId
    });

    return res.json(post);

  } catch (error) {
    next(error);
  }
});

//--Edit a Post--

router.put('/:id', requireAuth, validatePost, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Photo.findByPk(id);
    if (!post) {
      const error = new Error("Photo couldn't be found");
      error.status = 404;
      throw error;
    }

    if (post.userId !== userId) {
      const error = new Error("Forbidden");
      error.status = 403;
      error.errors = { message: 'You are not authorized to edit this post!' };
      throw error;
    }

    const { url, title, description, albumTitle, favoriteId, labelId } = req.body;

    if (title.trim().length < 5) {
      const error = new Error("Bad request.");
      error.status = 400;
      error.errors = {"title": "Please enter at least 5 characters for your picture's title"}
      throw error
    }

    let albumId = null;

    if (albumTitle) {

      if (albumTitle.trim().length < 5) {
      const error = new Error("Bad request.");
      error.status = 400;
      error.errors = {"album": "Please enter at least 5 characters for your album's title"}
      throw error
    }

      const album = await Album.findOne({
        where: {
          userId: req.user.id,
          title: albumTitle
        }
      })

      if (!album) {
        const newAlbum = await Album.create({
          userId: req.user.id, username: req.user.username, title: albumTitle
        })
        albumId = newAlbum.id
      } else {
        albumId = album.id
      }
    }

    post.url = url;
    post.title = title;
    post.description = description;
    post.albumId = albumId;
    post.favoriteId = favoriteId;
    post.labelId = labelId;

    await post.save();

    return res.json(post);
  } catch (error) {
    next(error);
  }
});


//--Delete a Post--

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const post = await Photo.findByPk(id);

    if (!post) {
      const error = new Error("Photo couldn't be found");
      error.status = 404;
      throw error;
    }

    if (post.userId !== userId) {
      const error = new Error('Forbidden');
      err.status = 403;
      throw error;
    }

    await post.destroy();
    return res.json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
});





module.exports = router;
