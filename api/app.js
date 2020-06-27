const express = require('express');
const debug = require('debug')('app:startup');
const mongoose = require('mongoose');
const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const cors = require('./startup/cors');
const todos = require('./routes/todo.route');

mongoose.connect(config.get('db'), {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then( () => {
        debug(`connected to mongodb. BD : ${config.get('db')}`);
    })
    .catch( error => {
        debug(`error when connected to mongo : ${port}`);
    })

// Create app (instance of express)
const app = express();
// Basics middlewares
app.use(express.json());
app.use(cors);

app.use('/api/todos', todos);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    debug(`listening on port ${port}...`);
});