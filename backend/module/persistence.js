
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
exports.filmExists = (username, film) => new Promise( (resolve, reject) => {
	schema.Film.find({account: username, filmID: film}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (docs.length) reject(new Error('film already in cart'))
		resolve()
	})
})

exports.getfilmsInCart = user => new Promise( (resolve, reject) => {
	schema.Film.find({account: user}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (!docs.length) reject(new Error('shopping cart empty'))
		resolve(docs)
	})
})

exports.savefilm = filmDetails => new Promise( (resolve, reject) => {
	if (!'title' in filmDetails && !'authors' in filmDetails && !'description' in filmDetails) {
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
