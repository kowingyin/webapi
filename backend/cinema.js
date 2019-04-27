
'use strict'

const auth = require('./module/auth')
const persistence = require('./module/persistence')
const OMDB = require('./module/OMDB')

// ------------------ ROUTE FUNCTIONS ------------------ 

exports.addUser = (request, callback) => {
	let data
	auth.getHeaderCredentials(request).then( credentials => {
		return auth.hashPassword(credentials)
	}).then( credentials => {
		data = credentials
		return persistence.accountExists(credentials)
	}).then( () => {
		return extractBodyKey(request, 'email')
	}).then( email => {
		data.email = email
		return extractBodyKey(request, 'name')
	}).then( name => {
		data.name = name
		return persistence.addAccount(data)
	}).then( data => {
		callback(null, data)
	}).catch( err => {
		callback(err)
	})
}

exports.search = (request, callback) => {
	//console.log(request.query)
	//extractParam(request, 'q')
		//.then( query => 
		if(request.query.i != null){
			OMDB.getByIMDBID(request.query.i,"")
			.then( data => this.cleanArray(request, data))
			.then( data => callback(null, data))
			.catch( err => callback(err))
		}else{
			OMDB.searchByString(request.query.q,"")
			.then( data => this.cleanArray(request, data))
			.then( data => callback(null, data))
			.catch( err => callback(err))
		}
		
}

//.................

exports.addToFavourite = (request, callback) => {
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.username
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return extractBodyKey(request, 'id')
	}).then( id => {
		this.id = id
		return OMDB.getByIMDBID(id)
	}).then( (film) => {
		this.film = film
		return persistence.filmExists(this.username, this.id)
	}).then( film => {
		this.film.account = this.username
		return persistence.saveFilm(this.film)
	}).then( film => {
		delete film.account
		callback(null, film)
	}).catch( err => {
		callback(err)
	})
}

exports.showFavourite = (request, callback) => {
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.username
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return persistence.getFilmsInFavourite(this.username)
	}).then( films => {
		return this.removeMongoFields(request, films)
	}).then( films => {
		callback(null, films)
	}).catch( err => {
		callback(err)
	})
}
exports.addToComment = (request, callback) => {
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.username
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return extractBodyKey(request, 'id')
	}).then( id => {
		this.id = id
		return OMDB.getByIMDBID(id)
	}).then( (film) => {
		this.film = film
		return persistence.filmExists(this.username, this.id)
	}).then( film => {
		this.film.account = this.username
		return persistence.saveFilm(this.film)
	}).then( film => {
		delete film.account
		callback(null, film)
	}).catch( err => {
		callback(err)
	})
}

exports.showComment = (request, callback) => {
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.username
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return persistence.getFilmsInFavourite(this.username)
	}).then( films => {
		return this.removeMongoFields(request, films)
	}).then( films => {
		callback(null, films)
	}).catch( err => {
		callback(err)
	})
}

// ------------------ UTILITY FUNCTIONS ------------------

const extractParam = (request, param) => new Promise( (resolve, reject) => {
	if (request.params === undefined || request.params[param] === undefined) reject(new Error(`${param} parameter missing`))
	resolve(request.params[param])
})

const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})

exports.cleanArray = (request, data) => new Promise((resolve) => {
	const host = request.host || 'http://localhost'
	//console.log(data)
	//console.log(data.Search)
	var clean = ''
	if(data.Search!=null){
		clean = data.Search.map(element => {
			return {
				title: element.Title,
				link: `${host}:8080/films?i=${element.imdbID}`
			}
		})
	}else{
		clean = data
	}
	resolve({films: clean})
})

exports.removeMongoFields = (request, data) => new Promise( (resolve, reject) => {
	const host = request.host || 'http://localhost'
	const clean = data.map(element => {
		return {
			title: element.title,
			link: `${host}/films/${element.filmID}`
		}
	})

	resolve({films: clean})
})
