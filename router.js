const path = require('path')
const fs = require('fs')
const util = require('util')
const stat = util.promisify(fs.stat)

const express = require('express')
const router = express.Router()

const request = require('./request')
const {catchErrors} = require('./error')

const storage = process.cwd() + '/storage'

router.get('/files', catchErrors(async function searchMedia(req, res, next) {

	fs.readdir(storage, async function (err, files) {
		if (err) return next(err)

		files = files
			.filter(f => f.includes('upload_'))
			.map(f => item(f))

		const results = await Promise.all(files)

		return request.success(results, req, res)
	})

}))

router.post('/upload', catchErrors(async function uploadMedia(req, res, next) {

	const formidable = require('formidable')

	const form = new formidable.IncomingForm()

	form.uploadDir = storage
	form.keepExtensions = true

	form.parse(req, async function (err, fields, files) {
		if (err) return next(err)

		const f = await item(files.file.path)

		request.success(f, req, res, next)

	})

}))

async function item(file) {

	const basename = path.basename(file)
	const fStat = await stat(storage + '/' + basename)

	return {
		name: basename,
		time: fStat.mtime,
		url: 'http://localhost:7777/' + basename
	}
}

module.exports = router