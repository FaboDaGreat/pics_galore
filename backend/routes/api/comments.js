// --Imports--
const express = require('express');
const router = express.Router();

// --Utility Imports--
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// --Sequelize Imports--
const { Comment, Photo, User } = require('../../db/models');

const validateComment = [
  check('comment')
    .exists({ checkFalsy: true })
    .withMessage('Please type your comment'),
  check('comment')
    .isLength({ min: 5 })
    .withMessage('Your comment must be at least 5 characters long'),
  check('comment')
    .isLength({ max: 1000 })
    .withMessage('Your comment must be less than 1000 characters'),
  handleValidationErrors
];



//--Leave a Comment--

router.post('/', requireAuth, validateComment, async (req, res, next) => {
  try {
    const { comment, photoId } = req.body

    const photo = await Photo.findByPk(photoId);
    if (!photo) {
      const error = new Error("The photo you are trying to comment on does not exist");
      error.status = 404;
      throw error;
    }

    if (comment.trim().length < 5) {
      const error = new Error("Bad request.");
      error.status = 400;
      error.errors = { "comment": "Please enter at least 5 characters for your comment" }
      throw error;
    }

    const newComment = await Comment.create({
      userId: req.user.id, comment, photoId
    });

    return res.json(newComment);

  } catch (error) {
    next(error);
  }
});

//--Edit a Comment--

router.put('/:id', requireAuth, validateComment, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingComment = await Comment.findByPk(id);
    if (!existingComment) {
      const error = new Error("Comment could not be found");
      error.status = 404;
      throw error;
    }

    if (existingComment.userId !== userId) {
      const error = new Error("Forbidden");
      error.status = 403;
      error.errors = { message: 'You are not authorized to edit this comment!' };
      throw error;
    }

    const { comment } = req.body;

    if (comment.trim().length < 5) {
      const error = new Error("Bad request.");
      error.status = 400;
      error.errors = { "comment": "Please enter at least 5 characters for your comment" }
      throw error
    }

    existingComment.comment = comment;

    await existingComment.save();

    return res.json(existingComment);
  } catch (error) {
    next(error);
  }
});


//--Delete a Comment--

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const comment = await Comment.findByPk(id);

    if (!comment) {
      const error = new Error("Comment could be found");
      error.status = 404;
      throw error;
    }

    if (comment.userId !== userId) {
      const error = new Error('Forbidden');
      error.status = 403;
      throw error;
    }

    await comment.destroy();
    return res.json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
});

//--Get All of a Photo's Comments--

router.get('/photos/:id', async (req, res, next) => {
  try {

    const photoId = req.params.id;
    const comments = await Comment.findAll({
      where: {
        photoId: photoId
      },
      include: User
    });

    return res.json(comments)
  }
  catch (error) {
    next(error);
  }
});





module.exports = router;
