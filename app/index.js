import express, { Router } from 'express'
import bodyParser from 'body-parser'
import config from 'config'
import router from './routes'
import { hasValue } from './utilities/funcs'
import db from './db'

db.sequelize.init()
const hostConfig = config.get('host')
const app = express()

app.use(bodyParser.json())
app.use('/api', router)
app.use(resHandler)
app.use(errorHandler)

function resHandler(req, res, next) {
    res.status(200)
    res.send({
        hasError: false,
        message: '',
        data: hasValue(req.data) ? req.data : null
    })
}

function errorHandler(err, req, res, next) {
    res.status(hasValue(err.status) ? err.status : 500)
    res.send({
        hasError: true,
        message: err.message,
        data: null
    })
}

app.listen(hostConfig.port, hostConfig.address, () => {
    console.log(`Listening on ${hostConfig.address}:${hostConfig.port}!`)
    console.log(`NODE_ENV ${process.env.NODE_ENV}`)
})

export default app