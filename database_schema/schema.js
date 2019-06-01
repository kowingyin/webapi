'use strict'

// import the mongoose package
const mongoose = require('mongoose')
mongoose.connect(`mongodb://heroku_n33prb6t:67jnoflgu9n421u88sqiu9s6qk@ds231307.mlab.com:31307/heroku_n33prb6t`, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

// create a user schema
const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String
})

// create a film schema
const filmSchema = new Schema({
    account: String,
    Title: String,
    Year: String,
    Runtime: String,
    Director: String,
    Plot: String,
    imdbID: String,
})

const commentSchema = new Schema({
    account: String,
    Title: String,
    Year: String,
    Director: String,
    imdbID: String,
    comment: String,
    time: String
})

const ratingSchema = new Schema({
    account: String,
    Title: String,
    Director: String,
    imdbID: String,
    rating: String,
})

// create a model using the schema
exports.Film = mongoose.model('Film', filmSchema)
exports.User = mongoose.model('User', userSchema)
exports.Comment = mongoose.model('Comment', commentSchema)
exports.Rating = mongoose.model('Rating', ratingSchema)