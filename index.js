const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const bearerToken = require('express-bearer-token')
require('dotenv').config()
const crypto = require('crypto')
app.use(cors())
app.use(bearerToken())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static('public'))
const { EmailRoutes, ReportRoutes } = require('./routes')
app.use('/mail',EmailRoutes)
app.use('/report',ReportRoutes)

app.get('/',(req,res)=>{
    res.status(200).send(`
    <center>
    <h1>Welcome to Ujian Backend with Michael Max</h1>
    </center>
    `)
})

app.listen(5050,()=>{
    console.log('API Active Port 5050')
})