'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const UserModel = require('../models/user.js');

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
*/

exports.getUser = async (req, res, next) => {
    const userModel = new UserModel({ id: req.params.id });
    let user = {};
  /*  if (req.user.profileId > 1 && req.params.userId != req.user.id) {
        return next(new Error('Error. Insufficient access rights.'))
    }
*/
    try {
        user = await userModel.get();
    } catch (error) {
        return next(new Error('Error getting user.'))
    }

    return res.status(200).send(user);
}


exports.getUsers = async (req, res, next) => {
    const userModel = new UserModel();
    console.log(userModel);
    let users = [];

   /* if (req.user.id > 1) {
        return next(new Error('Error. Insufficient access rights.'))
    }
*/
    try {
        users = await userModel.getAll();
    } catch (error) {
        return next(new Error('Error getting user list.'))
    }

    return res.status(200).send(users);
}


exports.createUser = async (req, res, next) => {
    const userModel = new UserModel(req.body);
    let user = req.body;
    let existingUsers = [];
    
    existingUsers = await userModel.getByName();
    
    console.log(existingUsers);
    if (existingUsers.rowCount > 0) {
        const error = new Error('User exist.')
        error.status = 422;
        return next(error)
    }
    else{
    	try {
            user.id = await userModel.create();
        } catch (error) {
            return next(new Error('Error creating user.'))
        }
    }
    

  //  delete user.password;
    return res.status(200).send(user);
}

exports.updateUser = async (req, res, next) => {
    const userModel = new UserModel(req.body);
    let user = req.body;
    let affectedRows = 0;
    let existingUsers = [];

  /*  try {
        existingUsers = await userModel.getByName();
    } catch (error) {
        return next(new Error('Error cheking if user exist.'))
    }*/

  /*  if ((existingUsers.length === 1 && (existingUsers[0].id !== user.id)) || existingUsers.length > 1) {
        const error = new Error('User exist.')
        error.status = 422;
        return next(error)
    }
*/
    /*if (req.user.profileId > 1 && user.id != req.user.id) {
        return next(new Error('Error. Insufficient access rights.'))
    }
*/
    try {
        affectedRows = await userModel.update();
    } catch (error) {
        console.log(error);
        return next(new Error('Error updating user.'))
    }

   /* if (affectedRows === 0) {
        return next(new Error('User not found.'))
    } else {
       // delete user.password;
       // return res.status(200).send(user);
    }*/
    return res.status(200).send(user);
}
