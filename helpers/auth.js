const jwt = require('jsonwebtoken')

module.exports={
    auth:(req,res,next) => {
        if (req.method !== 'OPTIONS') {
            // console.log(req.token)
            var katakunci = process.env.ENCRYPT_KEY
            jwt.verify(req.token, katakunci, (error, decoded)=>{
                if (error) { 
                    return res.status(401).json(error)
                }
                // console.log(decoded,'ini decoded')
                req.user = decoded
                next()
            })
        } else {
            next()
        }
    }
}