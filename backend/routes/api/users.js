// --Imports--
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// --Utility Imports--
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// --Sequelize Imports--
const { User } = require('../../db/models');



// --Middleware TO Protect Incoming Data For Sign Up Route--
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
];


// --New User Sign Up--
router.post('/', validateSignup, async (req, res, next) => {
  try {

    const { email, password, username, firstName, lastName } = req.body;
    const lowercasedEmail = email.toLowerCase();
    const lowercasedUsername = username.toLowerCase();

    const existingEmail = await User.findOne({
      where: {
        email: lowercasedEmail
      }
    })

    if (existingEmail !== null) {
      const invalidEmail = new Error("User already exists");
      invalidEmail.status = 500;
      invalidEmail.errors = {
        "email": "Email already in use"
      }
      throw invalidEmail;
    }

    const existingUsername = await User.findOne({
      where: {
        username: lowercasedUsername
      }
    })

    if (existingUsername !== null) {
      const invalidUsername = new Error("User already exists");
      invalidUsername.status = 500;
      invalidUsername.errors = {
        "username": "Username already taken"
      };
      throw invalidUsername
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email: lowercasedEmail, username: lowercasedUsername, hashedPassword, firstName, lastName });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,

    };

    await setTokenCookie(res, safeUser);
    return res.json({
      user: safeUser
    });

  } catch (e) {
    next(e)
  }
}
);






module.exports = router;
