const express = require('express');
const ExpressError = require('./expressError')
const app = express();
const itemRoutes = require('./routes/itemRoutes')
const middleware = require('./middleware')

app.use(express.json())

app.use('/items', itemRoutes)

module.exports = app 