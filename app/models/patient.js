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
	        	
	        	const sqlQuery = ` SELECT  * FROM patient `;
	        	
	            database.query(sqlQuery, (error, results, fields) => {
	            	 if (err) {
	        			    console.log(err.stack)
	        			  } else {
	        			    console.log(res.rows[0].nombre)
	        			  }
	            });
	        });
	    };
	
	
	
	
	
	create() {
        return new Promise((req, res) => {
        	console.log('model Patient create()'+req.body);
        	const id = req.body.id;
        	const userId = req.body.user_id;
        	const nombre = req.body.nombre;
        	const apellido = req.body.apellido;
        	const dni = req.body.dni;
        	const telefono = req.body.telefono;
        	const direccion = req.body.direccion;
        	const localidad = req.body.localidad;
        	const profesion = req.body.profesion;
        	const email = req.body.email;
        	const valoracion = req.body.valoracion;
        	const exploracion = req.body.exploracion;
        	const diagnostico = req.body.diagnostico;
        	const tratamiento  = req.body.tratamiento;
        	
        	
        	
        	const sqlQuery = `INSERT INTO patient (id,user_id,nombre,apellido,dni,telefono,direccion,localidad,profesion,email,valoracion,exploracion,diagnostico,tratamiento)
        	    VALUES (${id},${userId},'${nombre}', '${apellido}','${dni}',${telefono},'${direccion}','${localidad}','${profesion}','${email}','${valoracion}','${exploracion}','${diagnostico}','${tratamiento}'
        	    )`;
        	
        	console.log(sqlQuery);
        	database.query(sqlQuery, (err, res) => {
        		  if (err) {
        			    console.log(err.stack)
        			  } else {
        			    console.log(res.rows[0].nombre)
        			  }
        			})
        });
    }; //end create
    
    
    
}

module.exports=patientModel;