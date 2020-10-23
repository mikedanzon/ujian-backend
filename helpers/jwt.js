const jwt = require('jsonwebtoken')

module.exports = {
    createJWToken(payload) {
        var katakunci = process.env.ENCRYPT_KEY
        return jwt.sign(payload, katakunci, {expiresIn:'12h'})
    }
}