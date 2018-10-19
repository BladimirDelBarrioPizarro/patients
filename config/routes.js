const userController = require('../app/controllers/user.js');
const patientController = require('../app/controllers/patient.js')
const sesionController = require('../app/controllers/sesion.js')


module.exports = function(app){
	
	app.post('/login',userController.login);
	
	app.get('/users',userController.getUsers);
	app.get('/user/:id', userController.getUser);
	app.post('/user/',userController.createUser);
	app.put('/user/', userController.updateUser);
	app.put('/user/password', userController.updatePassword);
	app.delete('/user/:id',userController.deleteUser);
	
	app.get('/patients/',patientController.getPatients);
	app.get('/patient/:id',patientController.getPatient);
	app.post('/patient/',patientController.createPatient);
	app.post('/email',patientController.patientSendMail);
	app.put('/patient/',patientController.updatePatient);
	app.delete('/patient/:id',patientController.deletePatient);

	app.get('/sesions',sesionController.getSesions);
	app.get('/sesion/:id',sesionController.getSesion);
	app.post('/sesion/',sesionController.createSesion);
	app.put('/sesion/',sesionController.updateSesion);
	app.delete('/sesion/:id',sesionController.deleteSesion);
	
}