"use strict";

const { body, validationResult } = require('express-validator');

exports.validateUser = async (req, res, next) => {
    await body('email')
    .isEmail()
    .run(req);

    await body('password')
    .isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character")
    .not()
    .isEmpty()
    .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next();     
}};

