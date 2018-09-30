'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// routes
require('./config/routes.js')(app)

app.listen(port, () => {
	console.log(`API REST patient in http://localhost:${port}`)
})

/*//controllers
app.get('/patient/',(req,res) => {
	
	
	res.status(200).send({patient:[]})
	
	const resp = client.query("SELECT * FROM patient");
    console.log(resp);
	
})

app.get('/patient/:id',(req,res) => {
	
})

app.post('/patient/',(req,res) => {
	console.log(req.body);
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
	
	client.query(sqlQuery, (err, res) => {
		  if (err) {
			    console.log(err.stack)
			  } else {
			    console.log(res.rows[0].nombre)
			  }
			})
	

})
app.put('/patient/:id',(req,res) => {
	
})

app.put('/patient/:id',(req,res) => {
	
})*/





exports = module.exports = app;
