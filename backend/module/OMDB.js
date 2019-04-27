//http://www.omdbapi.com/?apikey=b27d06db&
'use strict'

const request = require('request')

//search by string
exports.searchByString = (query,year) => new Promise( (resolve, reject) => {
	const url = `http://www.omdbapi.com/?apikey=b27d06db&s=${query}&page=1&y=${year}`

	request.get(url, (err, res, body) => {
		if (err) {
			reject(Error('failed to make API search'))
		}
		const data = JSON.parse(body)
		resolve(data)
	})
})

exports.getByIMDBID = (imdbid,year) => new Promise( (resolve, reject) => {
	const url = `http://www.omdbapi.com/?apikey=b27d06db&plot=full&i=${imdbid}&y=${year}`

	request.get( url, (err, res, body) => {
		if (err) reject(Error('could not complete request'))
		const json = JSON.parse(body)

		if (json.totalItems === 0) {
			reject(Error('book not found'))
		}
		const data = {
			Title: json.Title,
            Year:json.Year,
            Rated:json.Rated,
            Released:json.Released,
            Runtime:json.Runtime,
            Genre:json.Genre,
            Director:json.Director,
            Writer:json.Writer,
            Actors:json.Actors,
            Plot:json.Plot,
            Language:json.Language,
            Country:json.Country,
            Awards:json.Awards,
            Poster:json.Poster,
            Ratings:json.Ratings,
            Metascore:json.Metascore,
            imdbRating:json.imdbRating,
            imdbVotes:json.imdbVotes,
            imdbID:json.imdbID,
            Type:json.Type,
            DVD:json.DVD,
            BoxOffice:json.BoxOffice,
            Production:json.Production,
            Website:json.Website,
            Response:json.Response
		}

		resolve(data)
	})
})

exports.getByTitle = (title,year) => new Promise( (resolve, reject) => {
	const url = `http://www.omdbapi.com/?apikey=b27d06db&plot=full&t=${title}&y=${year}`

	request.get( url, (err, res, body) => {
		if (err) reject(Error('could not complete request'))
		const json = JSON.parse(body)

		if (json.totalItems === 0) {
			reject(Error('book not found'))
		}
		const data = {
			Title: json.Title,
            Year:json.Year,
            Rated:json.Rated,
            Released:json.Released,
            Runtime:json.Runtime,
            Genre:json.Genre,
            Director:json.Director,
            Writer:json.Writer,
            Actors:json.Actors,
            Plot:json.Plot,
            Language:json.Language,
            Country:json.Country,
            Awards:json.Awards,
            Poster:json.Poster,
            Ratings:json.Ratings,
            Metascore:json.Metascore,
            imdbRating:json.imdbRating,
            imdbVotes:json.imdbVotes,
            imdbID:json.imdbID,
            Type:json.Type,
            DVD:json.DVD,
            BoxOffice:json.BoxOffice,
            Production:json.Production,
            Website:json.Website,
            Response:json.Response
		}

		resolve(data)
	})
})