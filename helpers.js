const jwt = require('jsonwebtoken')
const User = require('./models/user');

const secret = process.env.SECRET;

function authenticate(req, res, next) {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if(!token) {
        return res.status(401).json({
            error: true,
            message: 'user not authenticated'
        })
    } else {
        jwt.verify(token, secret, async (err, usr) => {
            if(err){
                return res.status(403).json({
                    error: true,
                    message: 'invalid token'
                })
            } else {
                const user = await User.findOne({ email: usr.email })
                req.user = user
                next()
            }
        })
    }
}

module.exports = { authenticate }