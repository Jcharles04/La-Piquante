"use strict";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const dotenv = require("dotenv").config();
const MaskData = require('maskdata');


exports.signup =(req, res, next) => {

    const maskedEmail = MaskData.maskEmail2(req.body.email);

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: maskedEmail,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {

    const maskedEmail = MaskData.maskEmail2(req.body.email);

    console.log('Requête login', req);
    User.findOne({ email: maskedEmail })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET_TOKEN,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };