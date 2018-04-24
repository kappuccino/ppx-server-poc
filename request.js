const {notAuthorized} = require('./error')

async function checkAuth(key, req, res, next){
	if(req.user.auth) return Promise.resolve()
	notAuthorized(req, res, next)
}

/**
 * Réponse de l'API pour une requête ou tout s'est bien passé
 *
 * @param data
 * @param req
 * @param res
 */
function success(data, req, res){
	res.json(data);
}

/**
 * Réponse de l'API quand on souhaite effectuer une action sur un element introuvable
 *
 * @param req
 * @param res
 */
function notFound(req, res, next){
	const err = new Error('not found')
	err.status = 404
	next(err)
}

/**
 * Réponse de l'API en cas d'echec
 *
 * @param err
 * @param req
 * @param res
 * @param next
 *
 * @returns {*}
 */
function fail(err, req, res, next){
	return next(err)
}


module.exports = {
	checkAuth,
	success,
	fail,
	notFound
}