const userController = require('../app/controllers/user.js');
const patientController = require('../app/controllers/patient.js')
const sesionController = require('../app/controllers/sesion.js')


module.exports = function(app){
	
	//app.post('/login', userController.login);
	
	app.get('/users',userController.getUsers);
	app.get('/user/:id', userController.getUser);
	app.post('/user/',userController.createUser);
	app.put('/user/', userController.updateUser);
	
	app.get('/patients',patientController.getPatients);
	app.get('/patient/:id',patientController.getPatient);
	app.post('/patient/',patientController.createPatient);
	app.put('/patient/',patientController.updatePatient);
	
	app.get('/sesions',sesionController.getSesions);
	app.get('/sesion/:id',sesionController.getSesion);
	app.post('/sesion/',sesionController.createSesion);
	app.put('/sesion/',sesionController.updateSesion);
	
	
}