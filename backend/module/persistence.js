
'use strict'

const schema = require('../database_schema/schema')

//ac
exports.addAccount = details => new Promise( (resolve, reject) => {
	if (!'username' in details && !'password' in details && !'name' in details&& !'email' in details) {
		reject(new Error('invalid user object'))
	}
	const user = new schema.User(details)

	user.save( (err, user) => {
		if (err) {
			reject(new Error('error creating account'))
		}
		delete details.password
		resolve(details)
	})
})

exports.accountExists = account => new Promise( (resolve, reject) => {
	schema.User.find({username: account.username}, (err, docs) => {
		if (docs.length) reject(new Error(`username already exists`))
		resolve()
	})
})

exports.getCredentials = credentials => new Promise( (resolve, reject) => {
	schema.User.find({username: credentials.username}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (docs.length) resolve(docs)
		reject(new Error(`invalid username`))
	})
})

//film
exports.filmExists = (username, filmid) => new Promise( (resolve, reject) => {
	schema.Film.find({account: username, imdbID: filmid}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (docs.length) reject(new Error('film already in favourite'))
		resolve()
	})
})

exports.getFilmsInFavourite = user => new Promise( (resolve, reject) => {
	schema.Film.find({account: user}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (!docs.length) reject(new Error('favourite list empty'))
		resolve(docs)
	})
})

exports.saveFilm = filmDetails => new Promise( (resolve, reject) => {
	if (!'title' in filmDetails && !'director' in filmDetails && !'imdbID' in filmDetails) {
		reject(new Error('invalid film object'))
	}
	const film = new schema.Film(filmDetails)
	film.save( (err, film) => {
		if (err) {
			reject(new Error('an error saving film'))
		}
		resolve(film)
	})
})

exports.deleteFilm = (user,imdbID) => new Promise( (resolve, reject) => {
	schema.Film.findOne({account: user, imdbID: imdbID}).deleteOne().then(	result => {
			if(result.deletedCount == 0){
				reject(new Error('cannot delete the film'))
			}else{
				resolve(result)
			}
		})
})
//film
//comment
exports.getComment = user => new Promise( (resolve, reject) => {
	schema.Film.find({account: user}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (!docs.length) reject(new Error('favourite list empty'))
		resolve(docs)
	})
})

exports.saveComment = filmDetails => new Promise( (resolve, reject) => {
	if (!'title' in filmDetails && !'director' in filmDetails && !'imdbID' in filmDetails) {
		reject(new Error('invalid film object'))
	}
	const film = new schema.Film(filmDetails)
	film.save( (err, film) => {
		if (err) {
			reject(new Error('an error saving film'))
		}
		resolve(film)
	})
})

exports.deleteComment = (user,imdbID) => new Promise( (resolve, reject) => {
	resolve(schema.Film.findOne({account: user, imdbID: imdbID}).deleteOne())
})