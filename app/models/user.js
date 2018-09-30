'use strict'
const database = require("../../config/db");
const bcrypt = require('bcrypt-nodejs');

class userModel{
	
	constructor(user){
		if(user){
			this.id=user.id;
			this.nombre=user.nombre;
			this.password=user.password;
		}
	}
	
	
}
        
	module.exports=userModel;