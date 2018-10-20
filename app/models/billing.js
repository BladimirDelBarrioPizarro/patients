'use strict'

const database = require('../../config/db');

class billingModel{

	constructor(billing){
		if(billing){
			this.id=billing.id;
			this.patient_id=billing.patient_id;
			this.amount=billing.amount;
			this.sesion_id=patient.sesion_id;
		}
	}
	
	getAll() {
        return new Promise((resolve, reject) => {
            const sqlQuery = `select s.fecha, b.id, b.patient_id, b.amount, b.sesion_id from billing b inner join sesion s ON b.patient_id=s.paciente_id AND b.sesion_id = s.id`;
            database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject(error);
                }
            });
        });
    }; // end getAll

}; // end class

module.exports = billingModel;