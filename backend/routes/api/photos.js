// --Imports--
const express = require('express');
const router = express.Router();

// --Utility Imports--
const { requireAuth } = require('../../utils/auth');

// --Sequelize Imports--
const { Photo } = require('../../db/models');



//--Get All Photos--

router.get('/', async (req, res, next) => {
  try {
    const photos = await Photo.findAll({
    attributes: ["id", "url", "userId", "username", "title", "description", "albumId", "favoriteId", "labelId"]
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
            attributes: ["id", "url", "userId", "username", "title", "description", "albumId", "labelId" ]
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
        userId: parseInt(userId)
      },
      attributes: ["id", "url", "userId", "username", "title", "description", "albumId", "favoriteId", "labelId"]
    });

    return res.json(photos)
  } 
    catch (error) {
    next(error);
  }
});

//--Post A New Photo--

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { url, title, description, albumId, favoriteId, labelId } = req.body

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

router.put('/:id', requireAuth, async (req, res, next) => {
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
      throw error;
    }

    const { url, title, description, albumId, favoriteId, labelId } = req.body;

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
