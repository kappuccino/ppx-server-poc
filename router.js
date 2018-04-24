const express = require('express')
const router = express.Router()

const request = require('./request')
const {catchErrors} = require('./error')

const storage = process.cwd()+'/storage'

router.get('/files', catchErrors(async function searchMedia(req, res, next){

	const fs = require('fs')

	fs.readdir(storage, function(err, files){
		if(err) return next(err)

		files = files
			.filter(f => f.includes('upload_'))
			.map(f => url(f))

		return request.success(files, req, res)

	})


}))

router.post('/upload', catchErrors(async function uploadMedia(req, res, next){

	const formidable = require('formidable')
	const path = require('path')

	const form = new formidable.IncomingForm()

	form.uploadDir = storage
	form.keepExtensions = true

	form.parse(req, async function(err, fields, files){
		if(err) return next(err)

		const medium = {
			url: url(path.basename(files.file.path))
		}

		request.success(medium, req, res, next)

	})

}))

function url(file){
	return 'http://localhost:7777/' + file
}

module.exports = router