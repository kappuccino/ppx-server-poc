const express = require('express')
const bodyParser = require('body-parser')

const errorHandlers = require('./error')


const app = express()

app.set('port', 7777)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next){
	res.header("Access-Control-Allow-Origin",  "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Auth, Locat")
	res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
	res.header("X-Frame-Options", "GOFORIT");

	if('OPTIONS' === req.method) return res.sendStatus(200)

	next()
})

app.use(express.static('storage'))

app.use('/', require('./router'))
app.use(errorHandlers.notFound)

app.get('/favicon.ico', (req, res)  => res.status(204))

module.exports = app