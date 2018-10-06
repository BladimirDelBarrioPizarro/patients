'use strict'

const database = require('../../config/db')

class sesionModel{
	
	constructor(sesion){
		if(sesion){
			this.id=sesion.id;
			this.fecha=sesion.fecha;
			this.paciente_id=sesion.paciente_id;
			this.diagnostico=sesion.diagnostico;
		}
	} //end constructor
	
	getAll() {
        return new Promise((resolve, reject) => {
        	console.log('getAll sesions');
        	const sqlQuery = `SELECT s.id, s.fecha, s.paciente_id, s.diagnostico  FROM sesion s`;
        	console.log(sqlQuery);
        	database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                	console.log(results.rows[0].diagnostico);
                    resolve(results);
                } else {
                    reject(error);
                }
            });
        });
    };
    
    
    get(){
		return new Promise((resolve, reject) => {
			
			const sqlQuery=`SELECT  s.id, s.fecha, s.paciente_id, s.diagnostico  FROM sesion s where id = ${this.id}`;
            console.log(sqlQuery);
			database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject(error);
                }
            });
        });
	};//end get

	create() {
        return new Promise((req, res) => {
        	const sqlQuery = `INSERT INTO sesion (id,fecha,paciente_id,diagnostico)
        	    VALUES (${this.id},current_date,${this.paciente_id}, '${this.diagnostico}')`;
        	console.log(sqlQuery);
        	database.query(sqlQuery, (err, res) => {
        		  if (err) {
        			    console.log(err.stack)
        			  } else {
        			    console.log('Sesion created')
        			  }
        			})
        });
    }; //end create
    
    update() {
        return new Promise((resolve, reject) => {
        	const sqlQuery=`UPDATE sesion SET  diagnostico = '${this.diagnostico}' WHERE id = ${this.id}`;
            console.log(sqlQuery);
        	database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results.affectedRows);
                } else {
                    reject(error);
                }
            });
        });
    };

}

module.exports = sesionModel;
