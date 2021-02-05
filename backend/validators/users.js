"use strict";
const { body, validationResult } = require('express-validator');

exports.validateUser = async (req, res, next) => {
    await body('email').isEmail().run(req);
    await body('password').trim().isLength({min:8}).not().isEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }
};