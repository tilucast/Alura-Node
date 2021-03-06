require('marko/node-require').install()
require('marko/express')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use('/static', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(methodOverride((req, res) =>{
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

const sessionAuth = require('./sessionAuth')
sessionAuth(app)

const routes = require('../app/routes/routes')
routes(app)

app.use((req, res, next) =>{
    return res.status(404).marko(require('../app/views/errors/404.marko'))
})

app.use((err, req, res, next) =>{
    return res.status(500).marko(require('../app/views/errors/500.marko'))
}) 

module.exports = app