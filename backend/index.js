'use strict'

//const rand = require('csprng')
const restify = require('restify')
const server = restify.createServer()


server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.authorizationParser())

const bookshop = require('./cinema.js')
const status = {
	ok: 200,
	added: 201,
	badRequest: 400
}
const defaultPort = 8080

server.get('/', (req, res, next) => {
	res.redirect('/books', next)
})

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('cinema api is ready at : ' + port)
	}
})