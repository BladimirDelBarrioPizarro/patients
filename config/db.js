const {Client} = require('pg');

const conString = "postgres://postgres:Bladi;:_1985@localhost:5432/test";
const client = new Client(conString);
if(client.connect()){console.log('Connect '+conString)}
module.exports=client;