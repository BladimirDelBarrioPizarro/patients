'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const userModel = require('../models/user.js');

/*exports.login = async (req, res, next) => {
    const userModel = new UserModel(req.body);
    let authenticated = false;

    try {
        authenticated = await userModel.authenticate();
    } catch (error) {
        error.message = 'Error authenticating user.';
        error.status = 403;
        return next(error)
    }

    if (authenticated) {
        const token = jwt.sign({ user: authenticated }, constants.jwtSecret, { expiresIn: constants.jwtExpirationTime });
        res.setHeader('Authorization', 'Bearer ' + token);
        return res.status(200).send();
    } else {
        const error = new Error('Invalid credentials.');
        error.status = 403;
        return next(error)
    };
}

exports.getUsers = async (req, res, next) => {
    const userModel = new UserModel();
    let users = [];

    if (req.user.id > 1) {
        return next(new Error('Error. Insufficient access rights.'))
    }

    try {
        users = await userModel.getAll();
    } catch (error) {
        return next(new Error('Error getting user list.'))
    }

    return res.status(200).send(users);
}*/