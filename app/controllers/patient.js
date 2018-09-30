'use strict'

const PatientModel = require('../models/patient');



exports.getPatients =  (req, res, next) => {
    const patientModel = new PatientModel();
    let patients = [];

    try {
        patients =  patientModel.getAll();
    } catch (error) {
        return next(new Error('Error getting patient list.'))
    }

    return res.status(200).send(patients);
}



exports.createPatient =  (req, res, next) => {
	console.log('Controller createPatient')
	console.log(req.body);
    const patientModel = new PatientModel(req.body);
    let patient = req.body;
   
    try {
    	patient.id = patientModel.create();  
    } catch (error) {
        return next(new Error('Error creating patient.'))
    }

    return res.status(200).send(patient);
}