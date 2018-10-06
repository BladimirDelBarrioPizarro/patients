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
	
	
	
	getAll() {
        return new Promise((resolve, reject) => {
        	const sqlQuery = `SELECT u.id, u.nombre, u.password from users u`;
            database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject(error);
                }
            });
        });
    };	
	
    get() {
        return new Promise((resolve, reject) => {
            const id = this.id;
        	const sqlQuery = `SELECT u.id, u.nombre, u.password from users u WHERE u.id = ${id}`;
            database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject(error);
                }
            });
        });
    };
	
    getByName() {
        return new Promise((resolve, reject) => {
        	const name = this.nombre;
        	const sqlQuery = `SELECT u.id, u.nombre, u.password from users u WHERE u.nombre = '${name}'`;
        	console.log(sqlQuery);
            database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject(error);
                }
            });
        });
    };
    
    
    
    create() {
        return new Promise((resolve, reject) => {
        	const password = bcrypt.hashSync(this.password);
        	const sqlQuery = `INSERT INTO users (id,nombre,password) values(${this.id},'${this.nombre}','${password}')`;
        	console.log(sqlQuery);
            database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject(error);
                }
            });
        });
    };
    
    
    update() {
        return new Promise((resolve, reject) => {
        	const password = bcrypt.hashSync(this.password);
        	const sqlQuery = `UPDATE users SET  nombre = '${this.nombre}', password = '${password}' WHERE id = ${this.id}`;
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
        
	module.exports=userModel;