"use strict";

const express = require('express');
const helmet = require("helmet");

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const rateLimit = require("express-rate-limit");

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://admin:2aZ125Cb<uvb@cluster0.bjgo4.mongodb.net/SoPecocko?retryWrites=true&w=majority',
    {   useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(helmet());

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 100
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
    
app.use(bodyParser.json());
    
app.use(limiter);

app.use('/images', express.static(path.join(__dirname, 'images')));
    
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
    
module.exports = app;
