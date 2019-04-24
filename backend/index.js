'use strict'

//const rand = require('csprng')
const restify = require('restify')
const server = restify.createServer()


server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser())
//server.use(restify.queryParser())
server.use(restify.plugins.authorizationParser())

const cinema = require('./cinema.js')
const status = {
	ok: 200,
	added: 201,
	badRequest: 400
}
const defaultPort = 8080

server.get('/', (req, res, next) => {
	res.redirect('/books', next)
})

//
//@api ...
server.get('/films', (req, res) => {
	bookshop.search(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})

server.post('/favourite', (req, res) => {
	bookshop.addToCart(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.added, {book: data})
		}
		res.end()
	})
})

server.get('/favourite', (req, res) => {
	bookshop.showCart(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})

server.post('/accounts', (req, res) => {
	cinema.addUser(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.added, {user: data})
		}
		res.end()
	})
})
//

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('cinema api is ready at : ' + port)
	}
})