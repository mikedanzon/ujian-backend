const crypto = require('crypto')

module.exports=(password)=>{
    var katakunci = process.env.ENCRYPT_KEY
    return crypto.createHmac('sha256',katakunci).update(password).digest('hex')
}