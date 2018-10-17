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
	
	
	
	 authenticate() {
	        return new Promise((resolve, reject) => {
	        	const sqlQuery = `select role_id ur, password u  from user_role ur inner join users u on ur.user_id = u.id where u.nombre = '${this.nombre}'`; 
	        	console.log(sqlQuery);
	            database.query(sqlQuery, (error, results, fields) => {
	            	console.log(results);
	            	//console.log(results.rows[0].u);
	            	//console.log(this.password);
	                if (!error) {
	                    if (results.rows[0].ur === 1  && bcrypt.compareSync(this.password, results.rows[0].u)) { //
	                        delete results.rows[0].password;
	                        //resolve(results.rows[0].ur);
	                        resolve(true)
	                    } else {
	                        resolve(false)
	                    };
	                } else {
	                    reject(error);
	                }
	            });
	        });
	    };
	
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

    
    
    updatePassword() {
        return new Promise((resolve, reject) => {
        	const password = bcrypt.hashSync(this.password);
        	const id = this.id;
        	const sqlQuery = `UPDATE users SET password = '${password}' WHERE id = ${id}`;
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
    
    deleteUserRole(){
        return new Promise((resolve, reject) => {
            const sqlQuery = `DELETE FROM user_role WHERE user_id = ${this.id}`;
            console.log(sqlQuery);
            database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results.affectedRows);
                } else {
                    reject(error);
                }
            });
        });
    }

    delete(){
        return new Promise((resolve, reject) => {
            const sqlQuery = `DELETE FROM users WHERE id = ${this.id}`;
            console.log(sqlQuery);
            database.query(sqlQuery, (error, results, fields) => {
                if (!error) {
                    resolve(results);
                } else {
                    reject(error);
                }
            });
        });
    }

   /* checkPassword() {
        return new Promise((resolve, reject) => {
        	const id = this.id;
        	const sqlQuery = `SELECT u.password FROM users u WHERE u.id = ${id}`;
        	console.log(sqlQuery);
            database.query(sqlQuery, (error, results, fields) => {
            	//console.log(results.length);
            	//console.log(results[0].password);
            	console.log(error);
                if (!error) {
                    if (results.length === 1 && bcrypt.compareSync(this.password, results[0].password)) {
                        resolve(true);
                    } else {
                        resolve(false)
                    };
                } else {
                    reject(error);
                }
            });
        });
    };*/
}
        
	module.exports=userModel;