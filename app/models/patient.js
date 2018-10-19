'use strict'

const database = require('../../config/db')

class patientModel{
	
	constructor(patient){
		if(patient){
			this.id=patient.id;
			this.user_id=patient.user_id;
			this.nombre=patient.nombre;
			this.apellido=patient.apellido;
			this.dni=patient.dni;
			this.telefono=patient.telefono;
			this.direccion=patient.direccion;
			this.localidad=patient.localidad;
			this.profesion=patient.profesion;
			this.email=patient.email;
			this.diagnostico=patient.diagnostico;
		
		}
	}
	
	 getAll() {
        return new Promise((resolve, reject) => {
            const sqlQuery = `SELECT id, nombre, apellido, dni, telefono, direccion, localidad, profesion, email, diagnostico from patient p order by nombre asc`;
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
			const sqlQuery=`SELECT  p.id, p.user_id, p.nombre, p.apellido, p.dni, p.telefono, p.direccion, p.localidad, p.profesion, p.email, p.diagnostico  FROM patient p where id = ${this.id}`;
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

        	const sqlQuery = `INSERT INTO patient (id,user_id,nombre,apellido,dni,telefono,direccion,localidad,profesion,email,diagnostico)
        	    VALUES (${this.id},${this.user_id},'${this.nombre}', '${this.apellido}','${this.dni}',${this.telefono},'${this.direccion}','${this.localidad}','${this.profesion}','${this.email}',${this.diagnostico})`;
        	
        	console.log(sqlQuery);
        	database.query(sqlQuery, (err, results) => {
        		  if (err) {
        			    console.log(err.stack)
        			  } else {
        			    console.log('User: '+this.nombre+' created')
        			    req(results)
        			  }
        			})
        });
    }; //end create
    
    update() {
        return new Promise((resolve, reject) => {
        	const sqlQuery=`UPDATE patient SET telefono = ${this.telefono}, direccion = '${this.direccion}', localidad = '${this.localidad}', profesion = '${this.profesion}', email = '${this.email}' WHERE id = ${this.id}`;
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
        	const sqlQuery=`DELETE FROM patient WHERE id = ${this.id}`;
            console.log(sqlQuery);
        	database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject(error);
                }
            });
        });
    };//end delete
	
    getMail(){
           return new Promise((resolve, reject) => {
			const sqlQuery=`SELECT p.email  FROM patient p where p.email = '${this.email}'`;
            console.log(sqlQuery);
			database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject(error);
                }
            });
        });
	};//end getMail
    
}

	
module.exports = patientModel;