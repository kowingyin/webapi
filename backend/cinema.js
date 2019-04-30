
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
	var y = request.query.y
	if(y=null){y=" "}
		if(request.query.i != null){
			OMDB.getByIMDBID(request.query.i,y)
			.then( data => this.cleanArray(request, data))
			.then( data => callback(null, data))
			.catch( err => callback(err))
		}else if(request.query.q != null){
			OMDB.searchByString(request.query.q,y)
			.then( data => this.cleanArray(request, data))
			.then( data => callback(null, data))
			.catch( err => callback(err))
		}else{
			callback(null,"wrong parameter format")
		}
		
}
//---
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
		return extractBodyKey(request, 'imdbid')
	}).then( id => {
		this.id = id
		return OMDB.getByIMDBID(id,'')
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

exports.deleteFavourite = (request, callback) => {
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
		return extractBodyKey(request, 'imdbid')
	}).then( id => {
		this.id = id
		return persistence.deleteFilm(this.username,this.id)
	}).then( result => {
		callback(null, result)
	}).catch( err => {
		callback(err)
	})
}
//---
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
		return extractBodyKey(request, 'imdbid')
	}).then( id => {
		this.id = id
		return extractBodyKey(request, 'comment')
	}).then( comment => {
		this.commentStr = comment
		return OMDB.getByIMDBID(this.id)
	}).then( comment => {
		this.comment = comment
		this.comment.account = this.username
		this.comment.comment = this.commentStr
		return persistence.saveComment(this.comment)
	}).then( comment => {
		delete comment.account
		callback(null, comment)
	}).catch( err => {
		callback(err)
	})
}

exports.showCommentOfFilm = (request, callback) => {
	if(request.query.i != null){
		return persistence.getCommentByFilm(request.query.i)
		.then( comments => {
			return this.removeMongoFieldsComment(request, comments)
		}).then( comments => {
			callback(null, comments)
		}).catch( err => {
			callback(err)
		})
	}else if(request.query.u != null){
		return persistence.getCommentByUser(request.query.u)
		.then( comments => {
			return this.removeMongoFieldsComment(request, comments)
		}).then( comments => {
			callback(null, comments)
		}).catch( err => {
			callback(err)
		})
	}
	
}

exports.editComment = (request, callback) => {
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
		return extractBodyKey(request, 'imdbid')
	}).then( id => {
		this.id = id
		return extractBodyKey(request, 'comment')
	}).then( comment => {
		this.commentStr = comment
		return OMDB.getByIMDBID(this.id)
	}).then( comment => {
		this.comment = comment
		this.comment.account = this.username
		this.comment.comment = this.commentStr
		return persistence.editComment(this.comment)
	}).then( comment => {
		delete comment.account
		callback(null, comment)
	}).catch( err => {
		callback(err)
	})
}

exports.deleteComment = (request, callback) => {
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
		return extractBodyKey(request, 'imdbid')
	}).then( id => {
		this.id = id
		return persistence.deleteComment(this.username,this.id)
	}).then( result => {
		callback(null, result)
	}).catch( err => {
		callback(err)
	})
}
//---
exports.addToRating = (request, callback) => {
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
		return extractBodyKey(request, 'imdbid')
	}).then( id => {
		this.id = id
		return extractBodyKey(request, 'rating')
	}).then( rating => {
		this.ratingStr = rating
		return OMDB.getByIMDBID(this.id)
	}).then( rating => {
		this.rating = rating
		this.rating.account = this.username
		this.rating.rating = this.ratingStr
		return persistence.saveRating(this.rating)
	}).then( rating => {
		delete rating.account
		callback(null, rating)
	}).catch( err => {
		callback(err)
	})
}

exports.showRatingOfFilm = (request, callback) => {
	if(request.query.i != null){
		return persistence.getRatingByFilm(request.query.i)
		.then( ratings => {
			return this.removeMongoFieldsRating(request, ratings)
		}).then( ratings => {
			callback(null, ratings)
		}).catch( err => {
			callback(err)
		})
	}else if(request.query.u != null){
		return persistence.getRatingByUser(request.query.u)
		.then( ratings => {
			return this.removeMongoFieldsRating(request, ratings)
		}).then( ratings => {
			callback(null, ratings)
		}).catch( err => {
			callback(err)
		})
	}
	
}

exports.editRating = (request, callback) => {
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
		return extractBodyKey(request, 'imdbid')
	}).then( id => {
		this.id = id
		return extractBodyKey(request, 'rating')
	}).then( rating => {
		this.ratingStr = rating
		return OMDB.getByIMDBID(this.id)
	}).then( rating => {
		this.rating = rating
		this.rating.account = this.username
		this.rating.rating = this.ratingStr
		return persistence.editRating(this.rating)
	}).then( rating => {
		delete rating.account
		callback(null, rating)
	}).catch( err => {
		callback(err)
	})
}


// ------------------ UTILITY FUNCTIONS ------------------

/*const extractParam = (request, param) => new Promise( (resolve, reject) => {
	if (request.params === undefined || request.params[param] === undefined) reject(new Error(`${param} parameter missing`))
	resolve(request.params[param])
})*/

const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})

exports.cleanArray = (request, data) => new Promise((resolve) => {
	const host = request.host || 'http://localhost'
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
			Title: element.Title,
			Director: element.Director,
			Runtime: element.Runtime,
			Year: element.Year,
			link: `${host}/films?i=${element.imdbID}`
		}
	})

	resolve({films: clean})
})

exports.removeMongoFieldsComment = (request, data) => new Promise( (resolve, reject) => {
	const host = request.host || 'http://localhost'
	const clean = data.map(element => {
		return {
			account: element.account,
			Title: element.Title,
			Year: element.Year,
			Director: element.Director,
			imdbID: element.imdbID,
			comment: element.comment,
			commentTime: element.time,
		}
	})

	resolve({comments: clean})
})

exports.removeMongoFieldsRating = (request, data) => new Promise( (resolve, reject) => {
	const host = request.host || 'http://localhost'
	const clean = data.map(element => {
		return {
			account: element.account,
			Title: element.Title,
			Director: element.Director,
			imdbID: element.imdbID,
			rating: element.rating,
		}
	})

	resolve({ratings: clean})
})