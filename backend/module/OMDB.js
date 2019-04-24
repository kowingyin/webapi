//http://www.omdbapi.com/?apikey=b27d06db&
'use strict'

const request = require('request')

//search by string
exports.searchByString = (query,year) => new Promise( (resolve, reject) => {
	const url = `http://www.omdbapi.com/?apikey=b27d06db&s=${query}&y=${year}`

	request.get(url, (err, res, body) => {
		if (err) {
			reject(Error('failed to make API call'))
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
			Title: json.items[0].Title,
            Year:json.items[0].Year,
            Rated:json.items[0].Rated,
            Released:json.items[0].Released,
            Runtime:json.items[0].Runtime,
            Genre:json.items[0].Genre,
            Director:json.items[0].Director,
            Writer:json.items[0].Writer,
            Actors:json.items[0].Actors,
            Plot:json.items[0].Plot,
            Language:json.items[0].Language,
            Country:json.items[0].Country,
            Awards:json.items[0].Awards,
            Poster:json.items[0].Poster,
            Ratings:json.items[0].Ratings,
            Metascore:json.items[0].Metascore,
            imdbRating:json.items[0].imdbRating,
            imdbVotes:json.items[0].imdbVotes,
            imdbID:json.items[0].imdbID,
            Type:json.items[0].Type,
            DVD:json.items[0].DVD,
            BoxOffice:json.items[0].BoxOffice,
            Production:json.items[0].Production,
            Website:json.items[0].Website,
            Response:json.items[0].Response
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
			Title: json.items[0].Title,
            Year:json.items[0].Year,
            Rated:json.items[0].Rated,
            Released:json.items[0].Released,
            Runtime:json.items[0].Runtime,
            Genre:json.items[0].Genre,
            Director:json.items[0].Director,
            Writer:json.items[0].Writer,
            Actors:json.items[0].Actors,
            Plot:json.items[0].Plot,
            Language:json.items[0].Language,
            Country:json.items[0].Country,
            Awards:json.items[0].Awards,
            Poster:json.items[0].Poster,
            Ratings:json.items[0].Ratings,
            Metascore:json.items[0].Metascore,
            imdbRating:json.items[0].imdbRating,
            imdbVotes:json.items[0].imdbVotes,
            imdbID:json.items[0].imdbID,
            Type:json.items[0].Type,
            DVD:json.items[0].DVD,
            BoxOffice:json.items[0].BoxOffice,
            Production:json.items[0].Production,
            Website:json.items[0].Website,
            Response:json.items[0].Response
		}

		resolve(data)
	})
})