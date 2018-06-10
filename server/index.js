const express = require('express')
const jsonServer = require('json-server')

const app = express()

//app.use('/api', jsonServer.router('database/db.json'))

module.exports = {
    path: '/',
    handler: app
}
