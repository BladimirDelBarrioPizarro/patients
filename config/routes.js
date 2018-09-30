const userController = require('../app/controllers/user.js');
const patientController = require('../app/controllers/patient.js')

module.exports = function(app){
	
//	app.post('/login', userController.login);
	
	app.get('/patients',patientController.getAll);
	app.post('/patient/',patientController.createPatient);
	
}