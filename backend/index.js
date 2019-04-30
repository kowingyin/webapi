'use strict'

//const rand = require('csprng')
const restify = require('restify')
const server = restify.createServer()


server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())
server.use(restify.plugins.authorizationParser())

const cinema = require('./cinema.js')
const status = {
	ok: 200,
	added: 201,
	badRequest: 400
}
const defaultPort = 8080

server.get('/', (req, res, next) => {
	res.redirect('/films', next)
})

//
//@api ...
//1st get: search film
server.get('/films', (req, res) => {
	cinema.search(req, (err, data) => {
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

//1st post: add favourite
server.post('/favourite', (req, res) => {
	cinema.addToFavourite(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.added, {film: data})
		}
		res.end()
	})
})

//2nd get: get favourite list
server.get('/favourite', (req, res) => {
	cinema.showFavourite(req, (err, data) => {
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
//1st delete: delete favourite
server.del('/favourite', (req, res) => {
	cinema.deleteFavourite(req, (err, data) => {
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
//2nd post: add comment
//3rd get: get comment list
//1st put: edit comment
//2nd put: edit star rating
//2nd delete: delete comment

//end of main function

//account and login section
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

//end api
//

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('cinema api is ready at : ' + port)
	}
})