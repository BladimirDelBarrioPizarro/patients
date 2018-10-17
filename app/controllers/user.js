'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const UserModel = require('../models/user.js');
const constants = require('../../config/constants.js');

var token;
exports.login = async (req, res, next) => {
    const userModel = new UserModel(req.body);
    let authenticated = null;
    try {
        authenticated = await userModel.authenticate();
    } catch (error) {
        error.message = 'Error authenticating user.';
        error.status = 403;
        return next(error)
    }
    
    console.log('authenticated '+authenticated);
    if (authenticated) {
        token = jwt.sign({ user: authenticated }, constants.jwtSecret, { expiresIn: constants.jwtExpirationTime });
        res.setHeader('Authorization',token);
        return res.status(200).send();
    } else {
        const error = new Error('Invalid credentials.');
        error.status = 403;
        return next(error)
    };
}


exports.getUser = async (req, res, next) => {
    const userModel = new UserModel({ id: req.params.id });
    let user = {};
  
    console.log(req.headers.authorization);
    console.log(token);
    if(req.headers.authorization != token){
    	return next(new Error('Error. Insufficient access rights.'));
    }
    
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
   // let existingUsers = [];

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

exports.updatePassword = async (req, res, next) => {
    const userModel = new UserModel(req.body);

    console.log(req.body.id);
    //console.log(req.user.id);

    /*if (req.user.profileId > 1 && req.body.id !== req.user.id) {
        return next(new Error('Error. Insufficient access rights.'))
    }*/
    
   /* try {
        const validPassword = await userModel.checkPassword();
        if (!validPassword) {
            return next(new Error('Error updating user password. Wrong password.'))
        }
    } catch (error) {
        return next(new Error('Error updating user password. Error checking current password.'))
    }*/

   // console.log(req.body.newPassword);
   // userModel.password = req.body.newPassword;

    try {
        await userModel.updatePassword();
    } catch (error) {
        return next(new Error('Error updating user password.'))
    }

    return res.status(200).send();
}

exports.deleteUser = async(req,res,next) =>{
    const userModel = new UserModel({ id: req.params.id });
    let user = {};
    let user_role = {};
    let affectedRows = 0;

    try {
        user_role = await userModel.deleteUserRole();
        user = await userModel.delete();
    } catch (error) {
        console.log(error);
        return next(new Error('Error deleting the user.'))
    }
    return res.status(200).send(user);
}


