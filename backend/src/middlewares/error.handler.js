const mongoose = require('mongoose');
const { ConflictError, NotFoundError, BadRequestError } = require('../errors/errors.js');

const errorHandler = (error, req, res, next) => {
    if (error instanceof ConflictError || error instanceof BadRequestError || error instanceof NotFoundError) {
        console.log(error);
        return res.status(error.statusCode).json({ error: error.message });
    }

    if (error instanceof mongoose.Error.ValidationError) {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ error: validationErrors });
    }

    if (error.status === 429) {
        return res.status(429).json({
            error: error.message || 'Too many requests, please try again later.',
        });
    }
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = { errorHandler };
