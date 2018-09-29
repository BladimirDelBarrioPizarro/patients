'use strict'

const moongose = require('mongoose')
const Schema = moongose.Schema

const PatientSchema = new Schema({
	name:String,
	lastName:String,
	dni:String
/*	birthdate:Date,
	phone:Number,
	address:String,
	city:String,
	profession:String,
	email:String,
	assessment:String,
	exploration:String,
	diagnosis:String
	treatment:String */
})

module.exports=moongose.model('Patient',PatientSchema)
