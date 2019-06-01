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
//@api routing
//1st get: search film
server.get('/films', (req, res) => {
    cinema.search(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET')
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (err) {
            res.send(status.badRequest, { error: err.message })
        } else {
            res.send(status.ok, data)
        }
        res.end()
    })
})

//favourite...
//1st post: add favourite
server.post('/favourite', (req, res) => {
    cinema.addToFavourite(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (err) {
            res.send(status.badRequest, { error: err.message })
        } else {

            res.send(status.added, { film: data })
        }
        res.end()
    })
})

//2nd get: get favourite list
server.get('/favourite', (req, res) => {
        cinema.showFavourite(req, (err, data) => {
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET, POST')
            res.setHeader("Access-Control-Allow-Origin", "*")
            if (err) {
                res.send(status.badRequest, { error: err.message })
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
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (err) {
            res.send(status.badRequest, { error: err.message })
        } else {
            res.send(status.ok, { deleteFilmResult: data })
        }
        res.end()
    })
})

//comment...
//2nd post: add comment
server.post('/comment', (req, res) => {
    cinema.addToComment(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (err) {
            res.send(status.badRequest, { error: err.message })
        } else {

            res.send(status.added, { film: data })
        }
        res.end()
    })
})

//3rd get: get comment list by film/user
server.get('/comment', (req, res) => {
    cinema.showCommentOfFilm(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (err) {
            res.send(status.badRequest, { error: err.message })
        } else {

            res.send(status.added, data)
        }
        res.end()
    })
})

//1st put: edit comment
server.put('/comment', (req, res) => {
    cinema.editComment(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (err) {
            res.send(status.badRequest, { error: err.message })
        } else {

            res.send(status.added, { edited_comment: data })
        }
        res.end()
    })
})

//2nd delete: delete comment
server.del('/comment', (req, res) => {
    cinema.deleteComment(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (err) {
            res.send(status.badRequest, { error: err.message })
        } else {

            res.send(status.added, { deleteCommentResult: data })
        }
        res.end()
    })
})

//rating....
//2nd put: edit star/score rating
server.put('/rating', (req, res) => {
    cinema.editRating(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (err) {
            res.send(status.badRequest, { error: err.message })
        } else {

            res.send(status.added, { edited_rating: data })
        }
        res.end()
    })
})

//3rd post: add comment
server.post('/rating', (req, res) => {
    cinema.addToRating(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (err) {
            res.send(status.badRequest, { error: err.message })
        } else {

            res.send(status.added, { rating: data })
        }
        res.end()
    })
})

//4rd get: get rating list by film/user
server.get('/rating', (req, res) => {
    cinema.showRatingOfFilm(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (err) {
            res.send(status.badRequest, { error: err.message })
        } else {

            res.send(status.added, { ratingList: data })
        }
        res.end()
    })
})

//@end of main function routing

//account and login section
server.post('/accounts', (req, res) => {
    cinema.addUser(req, (err, data) => {
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        res.setHeader("Access-Control-Allow-Origin", "*")
        if (err) {
            res.send(status.badRequest, { error: err.message })
        } else {
            res.send(status.added, { user: data })
        }
        res.end()
    })
})

//@end api routing
//

const port = process.env.PORT || defaultPort

server.listen(port, err => {
    if (err) {
        console.error(err)
    } else {
        console.log('cinema api is ready at : ' + port)
    }
})