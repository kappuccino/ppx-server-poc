process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at:', p, 'reason:', reason)
})

const app = require('./server')
const server = app.listen(app.get('port'), () => {
	console.log(`Express running → PORT ${server.address().port}`)
})
