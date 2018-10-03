const userController = require('../app/controllers/user.js');
const patientController = require('../app/controllers/patient.js')

module.exports = function(app){
	
//	app.post('/login', userController.login);
	
	app.get('/patients',patientController.getPatients);
	app.get('/patient/:id',patientController.getPatient);
	app.post('/patient/',patientController.createPatient);
	app.put('/patient/',patientController.updatePatient);
}