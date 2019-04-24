'use strict'

// import the mongoose package
const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/cinema`, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

// create a user schema
const userSchema = new Schema({
	name: String,
	username: String,
	password: String
})

// create a film schema
const filmSchema = new Schema({
	account: String,
	filmtitle: String,
	year: String,
	runtime: String,
	director: String,
	plot: String,
	imdbID: String,
	filmID: String
})

// create a model using the schema
exports.Film = mongoose.model('Film', filmSchema)
exports.User = mongoose.model('User', userSchema)