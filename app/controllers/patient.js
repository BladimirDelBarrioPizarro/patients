'use strict'
const PatientModel = require('../models/patient');



exports.getPatients = async (req, res, next) => {
    const patientModel = new PatientModel();
    console.log(patientModel);
    let patients = [];

    try {
        patients = await patientModel.getAll();
    } catch (error) {
        return next(new Error('Error getting patient list.'))
    }

    return res.status(200).send(patients);
}


exports.getPatient = async (req, res, next) => {
    const patientModel = new PatientModel({ id: req.params.id });

    let patient = {};

    try {
        patient = await patientModel.get();
    } catch (error) {
        return next(new Error('Error getting patient.'))
    }

    return res.status(200).send(patient);
}


exports.createPatient = async  (req, res, next) => {
	console.log('Controller createPatient')
    const patientModel = new PatientModel(req.body);
    
    let patient = req.body;
   
    try {
    	patient.id= await patientModel.create();  
    } catch (error) {
        return next(new Error('Error creating patient in controller.'))
    }

    return res.status(200).send(patient);
}

exports.updatePatient = async (req, res, next) => {
    const patientModel = new PatientModel(req.body);
    let patient = req.body;
    let affectedRows = 0;
    console.log(patient);
    try {
        affectedRows = await patientModel.update();
    } catch (error) {
        return next(new Error('Error updating patient.'))
    }

    if (affectedRows === 0) {
        return next(new Error('Patient not found.'))
    } else {
        return res.status(200).send(patient);
    }
}

exports.deletePatient = async(req,res,next) =>{
    const patientModel = new PatientModel({ id: req.params.id });
    let patient = {};
    let affectedRows = 0;

    try {
        patient = await patientModel.delete();
    } catch (error) {
        console.log(error);
        return next(new Error('Error deleting the patient.'))
    }
    return res.status(200).send(patient);



}