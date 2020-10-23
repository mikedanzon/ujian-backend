const Router = require('express').Router()
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'mikedanzon@gmail.com',
        pass: 'rhvzswovsleorvij'
    },
    tls: {
        rejectUnauthorized: false
    }
})

Router.post('/sendmail',(req,res) => {
    const { email } = req.body
    transporter.sendMail({
        from: "Cogan <mikedanzon@gmail.com>",
        to: email,
        subject: "Bang jago confirm email ulang",
        html: "<h1>OTP anda: 1234</h1>"
    },(err)=>{
        if(err){ return res.status(500).send(err) }
        return res.status(200).send("berhasil email terkirim")
    })
})

module.exports = Router