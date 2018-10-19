'use strict'

const database = require('../../config/db')

class sesionModel{
	
	constructor(sesion){
		if(sesion){
			this.id=sesion.id;
			this.fecha=sesion.fecha;
			this.paciente_id=sesion.paciente_id;
			this.diagnostico=sesion.diagnostico;
            this.valoracion=sesion.valoracion;
            this.exploracion=sesion.exploracion;
            this.tratamiento=sesion.tratamiento;
		}
	} //end constructor
	
	getAll() {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT s.id, s.fecha, s.paciente_id, s.exploracion, s.valoracion, s.diagnostico, s.tratamiento  FROM sesion s order by fecha DESC`;
            database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject(error);
                }
            });
        });
    };
    
    
    get(){
		return new Promise((resolve, reject) => {
			const sqlQuery=`SELECT s.id, s.fecha, s.paciente_id, s.exploracion, s.valoracion, s.diagnostico, s.tratamiento  FROM sesion s where id = ${this.id}`;
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
        	const sqlQuery = `INSERT INTO sesion (id,fecha,paciente_id,exploracion,valoracion,diagnostico,tratamiento)
        	    VALUES (${this.id},current_date,${this.paciente_id}, '${this.exploracion}', '${this.valoracion}', '${this.diagnostico}', '${this.tratamiento}')`;
        	console.log(sqlQuery);
        	database.query(sqlQuery, (err, res) => {
        		  if (err) {
        			    console.log(err.stack)
        			  } else {
        			    console.log('Sesion created')
                        req(res);
        			  }
        			})
        });
    }; //end create
    
    update() {
        return new Promise((resolve, reject) => {
        	const sqlQuery=`UPDATE sesion SET  exploracion = '${this.exploracion}', valoracion = '${this.valoracion}', diagnostico = '${this.diagnostico}', tratamiento = '${this.tratamiento}'  WHERE id = ${this.id}`;
            console.log(sqlQuery);
        	database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results.affectedRows);
                } else {
                    reject(error);
                }
            });
        });
    }; //end update

    delete(){
        return new Promise((resolve, reject) => {
            const sqlQuery=`DELETE FROM sesion WHERE id = ${this.id}`;
            console.log(sqlQuery);
            database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results.affectedRows);
                } else {
                    reject(error);
                }
            });
        });
    }; //end update

}

module.exports = sesionModel;
