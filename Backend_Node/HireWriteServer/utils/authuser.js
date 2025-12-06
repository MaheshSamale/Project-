const jwt = require('jsonwebtoken')
const result = require('./results')
const congig = require('./congig')

function authorizeUser(req, res, next) {
    // For checking the incoming request and the token
    const url = req.url
    console.log(url)
    if (url == '/users/login' || url == '/users/register') // for these 2 routes no token is required
        next()
    else {
        const token = req.headers.token
        if (token) {
            try {
                const payload = jwt.verify(token, congig.SECRET)
                req.headers.uid = payload.uid
                next()
            } catch (ex) {
                res.send(result.createResult('Invalid Token'))
            }
        } else
            res.send(result.createResult('Token is Missing'))
    }
}

module.exports = authorizeUser