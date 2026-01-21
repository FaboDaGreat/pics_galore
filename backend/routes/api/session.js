// --Express imports--
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

// --Security Imports--
const { setTokenCookie, restoreUser } = require('../../utils/auth');

// -- utilities Imports--
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// --Sequelize Imports--
const { User } = require('../../db/models');

const router = express.Router();

// Protection for login input data
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Log in
router.post('/', validateLogin, async (req, res, next) => {

    if (req.user) {
        const alreadyLoggedIn = new Error("Already Logged In");
        alreadyLoggedIn.status = 409;
        alreadyLoggedIn.errors = {
            "credential": "You are already logged into an account!"
        }
        throw alreadyLoggedIn;
    };

    const { credential, password } = req.body;
    const lowercasedCredential = credential.toLowerCase();

    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: lowercasedCredential,
                email: lowercasedCredential
            }
        }
    });

    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'Username/Email does not exist.' };
        return next(err);
    }

    if (!bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'Incorrect password.' };
        return next(err);
    }

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
});

// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
}
);
// restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
}
);

module.exports = router;
