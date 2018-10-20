'use strict'

const SesionModel = require('../models/sesion');



exports.getSesions = async  (req, res, next) => {
    const sesionModel = new SesionModel();
    console.log(sesionModel);
    let sesions = [];

    try {
        sesions = await sesionModel.getAll();
    } catch (error) {
        return next(new Error('Error getting sesion list.'))
    }

    return res.status(200).send(sesions);
}


exports.getSesion = async (req, res, next) => {
    const sesionModel = new SesionModel({ id: req.params.id });
    let sesion = {};

    try {
        sesion = await sesionModel.get();
    } catch (error) {
        return next(new Error('Error getting sesion.'))
    }

    return res.status(200).send(sesion);
}


exports.createSesion = async  (req, res, next) => {
	console.log('Controller createSesion')
    const sesionModel = new SesionModel(req.body);
    
    let sesion = req.body;
   
    try {
    	sesion.id= await sesionModel.create();  
    } catch (error) {
        return next(new Error('Error creating sesion.'))
    }

    return res.status(200).send(sesion);
}

exports.updateSesion = async (req, res, next) => {
    const sesionModel = new SesionModel(req.body);
    let sesion = req.body;
    let affectedRows = 0;
    
    try {
        affectedRows = await sesionModel.update();
    } catch (error) {
        return next(new Error('Error updating sesion.'))
    }

    if (affectedRows === 0) {
        return next(new Error('Sesion not found.'))
    } else {
        return res.status(200).send(sesion);
    }
}

exports.deleteSesion = async(req,res,next) =>{
    const sesionModel = new SesionModel({ id: req.params.id });
    let sesion = {};
    let affectedRows = 0;
    

    try {
        sesion = await sesionModel.delete();
    } catch (error) {
        console.log(error);
        return next(new Error('Error deleting the sesion.'))
    }
    return res.status(200).send(sesion);
}