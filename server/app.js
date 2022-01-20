const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'));
const rotaRotas = require('../routes/rotas')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/',rotaRotas);

module.exports = app;