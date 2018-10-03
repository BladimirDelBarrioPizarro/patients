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
			this.valoracion=patient.valoracion;
			this.exploracion=patient.exploracion;
			this.diagnostico=patient.diagnostico;
			this.tratamiento=patient.tratamiento;
		}
	}
	
	 getAll() {
	        return new Promise((resolve, reject) => {
	        	console.log('getAll');
	        	const sqlQuery = `SELECT p.id, p.user_id, p.nombre, p.apellido, p.dni, p.telefono, p.direccion, p.localidad, p.profesion, p.email, p.valoracion, p.exploracion, p.diagnostico, p.tratamiento  FROM patient p`;
	        	console.log(sqlQuery);
	        	database.query(sqlQuery, (error, results, fields) => {
	                if (!error) {
	                	console.log(results.rows[0].id);
	                    resolve(results);
	                } else {
	                    reject(error);
	                }
	            });
	        });
	    };
	
	
	
	get(){
		return new Promise((resolve, reject) => {
			
			const sqlQuery=`SELECT  p.id, p.user_id, p.nombre, p.apellido, p.dni, p.telefono, p.direccion, p.localidad, p.profesion, p.email, p.valoracion, p.exploracion, p.diagnostico, p.tratamiento  FROM patient p where id = ${this.id}`;
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

        	const sqlQuery = `INSERT INTO patient (id,user_id,nombre,apellido,dni,telefono,direccion,localidad,profesion,email,valoracion,exploracion,diagnostico,tratamiento)
        	    VALUES (${this.id},${this.user_id},'${this.nombre}', '${this.apellido}','${this.dni}',${this.telefono},'${this.direccion}','${this.localidad}','${this.profesion}','${this.email}','${this.valoracion}','${this.exploracion}','${this.diagnostico}','${this.tratamiento}'
        	    )`;
        	
        	console.log(sqlQuery);
        	database.query(sqlQuery, (err, res) => {
        		  if (err) {
        			    console.log(err.stack)
        			  } else {
        			    console.log('User: '+res.rows[0].name+' created')
        			  }
        			})
        });
    }; //end create
    
    update() {
        return new Promise((resolve, reject) => {
        	const sqlQuery=`UPDATE patient SET telefono = ${this.telefono}, direccion = '${this.direccion}', localidad = '${this.localidad}', profesion = '${this.profesion}', email = '${this.email}', valoracion = '${this.valoracion}', tratamiento = '${this.tratamiento}' WHERE id = ${this.id}`;
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

module.exports = patientModel;