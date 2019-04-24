
'use strict'

const auth = require('./modules/auth')
const persistence = require('./modules/persistence')
const OMDB = require('./modules/OMDB')

// ------------------ ROUTE FUNCTIONS ------------------ 

exports.addUser = (request, callback) => {
	let data
	auth.getHeaderCredentials(request).then( credentials => {
		return auth.hashPassword(credentials)
	}).then( credentials => {
		data = credentials
		return persistence.accountExists(credentials)
	}).then( () => {
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
	extractParam(request, 'q')
		.then( query => OMDB.searchByString(query))
		.then( data => this.cleanArray(request, data))
		.then( data => callback(null, data))
		.catch( err => callback(err))
}

//

exports.addToCartOld = (request, callback) => {
	extractBodyKey(request, 'id')
	.then( id => google.getByID(id))
	.then( book => persistence.saveBook(book))
	.catch( err => callback(err))
}

exports.addToCart = (request, callback) => {
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
		return google.getByID(id)
	}).then( (book) => {
		this.book = book
		return persistence.bookExists(this.username, this.id)
	}).then( book => {
		this.book.account = this.username
		return persistence.saveBook(this.book)
	}).then( book => {
		delete book.account
		callback(null, book)
	}).catch( err => {
		callback(err)
	})
}

exports.showCart = (request, callback) => {
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
		return persistence.getBooksInCart(this.username)
	}).then( books => {
		return this.removeMongoFields(request, books)
	}).then( books => {
		callback(null, books)
	}).catch( err => {
		callback(err)
	})
}
