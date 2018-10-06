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






exports = module.exports = app;
