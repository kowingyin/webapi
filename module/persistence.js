'use strict'

const schema = require('../database_schema/schema')

//ac
exports.addAccount = details => new Promise((resolve, reject) => {
    if (!'username' in details && !'password' in details && !'name' in details && !'email' in details) {
        reject(new Error('invalid user object'))
    }
    const user = new schema.User(details)

    user.save((err, user) => {
        if (err) {
            reject(new Error('error creating account'))
        }
        delete details.password
        resolve(details)
    })
})

exports.accountExists = account => new Promise((resolve, reject) => {
    schema.User.find({ username: account.username }, (err, docs) => {
        if (docs.length) reject(new Error(`username already exists`))
        resolve()
    })
})

exports.getCredentials = credentials => new Promise((resolve, reject) => {
        schema.User.find({ username: credentials.username }, (err, docs) => {
            if (err) reject(new Error('database error'))
            if (docs.length) resolve(docs)
            reject(new Error(`invalid username`))
        })
    })
    //ac end
    //film
exports.filmExists = (username, filmid) => new Promise((resolve, reject) => {
    schema.Film.find({ account: username, imdbID: filmid }, (err, docs) => {
        if (err) reject(new Error('database error'))
        if (docs.length) reject(new Error('film already in favourite'))
        resolve()
    })
})

exports.getFilmsInFavourite = user => new Promise((resolve, reject) => {
    schema.Film.find({ account: user }, (err, docs) => {
        if (err) reject(new Error('database error'))
        if (!docs.length) reject(new Error('favourite list empty'))
        resolve(docs)
    })
})

exports.saveFilm = filmDetails => new Promise((resolve, reject) => {
    if (!'title' in filmDetails && !'director' in filmDetails && !'imdbID' in filmDetails) {
        reject(new Error('invalid film object'))
    }
    const film = new schema.Film(filmDetails)
    film.save((err, film) => {
        if (err) {
            reject(new Error('an error saving film'))
        }
        resolve(film)
    })
})

exports.deleteFilm = (user, imdbID) => new Promise((resolve, reject) => {
        schema.Film.findOne({ account: user, imdbID: imdbID }).deleteOne().then(result => {
            if (result.deletedCount == 0) {
                reject(new Error('cannot delete the film'))
            } else {
                resolve(result)
            }
        })
    })
    //film end
    //comment
exports.getCommentByFilm = imdbid => new Promise((resolve, reject) => {
    schema.Comment.find({ imdbID: imdbid }, (err, docs) => {
        if (err) reject(new Error('database error'))
        if (!docs.length) reject(new Error('comment list empty'))
        resolve(docs)
    })
})

exports.getCommentByUser = username => new Promise((resolve, reject) => {
    schema.Comment.find({ account: username }, (err, docs) => {
        if (err) reject(new Error('database error'))
        if (!docs.length) reject(new Error('comment list empty'))
        resolve(docs)
    })
})

exports.saveComment = commentDetails => new Promise((resolve, reject) => {
    if (!'title' in commentDetails && !'imdbID' in commentDetails && !'account' in commentDetails) {
        reject(new Error('invalid comment object'))
    }
    var date = new Date()
    commentDetails.time = date.toGMTString()
    const comment = new schema.Comment(commentDetails)
    comment.save((err, comment) => {
        if (err) {
            reject(new Error('an error saving comment'))
        }
        resolve(comment)
    })
})

exports.editComment = commentDetails => new Promise((resolve, reject) => {
    if (!'title' in commentDetails && !'imdbID' in commentDetails && !'account' in commentDetails) {
        reject(new Error('invalid comment object'))
    }
    var date = new Date()
    var time = date.toGMTString()

    schema.Comment.findOneAndUpdate({ account: commentDetails.account, imdbID: commentDetails.imdbID }, { comment: commentDetails.comment, time: time }, (err, res) => {
        if (err) reject(new Error('cannot edit the comment'))
        resolve(res)
    })
})

exports.deleteComment = (user, imdbID) => new Promise((resolve, reject) => {
        schema.Comment.findOne({ account: user, imdbID: imdbID }).deleteOne().then(result => {
            if (result.deletedCount == 0) {
                reject(new Error('cannot delete the comment'))
            } else {
                resolve(result)
            }
        })
    })
    //comment end
    //rating
exports.getRatingByFilm = imdbid => new Promise((resolve, reject) => {
    schema.Rating.find({ imdbID: imdbid }, (err, docs) => {
        if (err) reject(new Error('database error'))
        if (!docs.length) reject(new Error('rating list empty'))
        resolve(docs)
    })
})

exports.getRatingByUser = username => new Promise((resolve, reject) => {
    schema.Rating.find({ account: username }, (err, docs) => {
        if (err) reject(new Error('database error'))
        if (!docs.length) reject(new Error('rating list empty'))
        resolve(docs)
    })
})

exports.saveRating = ratingDetails => new Promise((resolve, reject) => {
    if (!'title' in ratingDetails && !'imdbID' in ratingDetails && !'account' in ratingDetails) {
        reject(new Error('invalid rating object'))
    }
    const rating = new schema.Rating(ratingDetails)
    rating.save((err, rating) => {
        if (err) {
            reject(new Error('an error saving rating'))
        }
        resolve(rating)
    })
})

exports.editRating = ratingDetails => new Promise((resolve, reject) => {
    if (!'title' in ratingDetails && !'imdbID' in ratingDetails && !'account' in ratingDetails) {
        reject(new Error('invalid rating object'))
    }
    schema.Rating.findOneAndUpdate({ account: ratingDetails.account, imdbID: ratingDetails.imdbID }, { rating: ratingDetails.rating }, (err, res) => {
        if (err) reject(new Error('cannot edit the rating'))
        resolve(res)
    })
})