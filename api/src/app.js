const express = require("express");

const server = express();
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const routes = require('./routes/index.js');
/* const { urlencoded } = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors"); */
require('dotenv').config();



/* server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json()); */

// express.json(); && express.urlencoded(true)

server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser());
server.use(morgan('dev'));



server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use('/', routes);

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err, "CARCAMELO");
    res.status(status).send(message);
});

module.exports = server;