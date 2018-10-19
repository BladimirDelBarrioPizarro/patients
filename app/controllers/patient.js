'use strict'
const PatientModel = require('../models/patient');
const nodemailer = require('nodemailer');


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

exports.patientSendMail = async(req,res,next) =>{
    console.log('sendmail');
    const patientModel = new PatientModel(req.body)
    let patient = {};
    try {
        patient = await patientModel.getMail();
        //treatment // = await.patientModel.getTreatment();
        console.log(patient.rows[0].email);
          
        var transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
             user: 'bladimaltego@gmail.com',
             pass: 'bladimaltego1985'
            }
        });

        var mailOptions = {
           from: 'bladimaltego@gmail.com',
           to: patient.rows[0].email,
           subject: 'Sending Email Patient API Node.js',
           html: '<h1>Welcome API Patients</h1>'
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        });


    } catch (error) {
        console.log(error);
        return next(new Error('Error send mail.'))
    }
    
    return res.status(200).send(patient);
}