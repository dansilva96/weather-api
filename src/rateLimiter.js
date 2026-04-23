const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too many requests, slow down."
    }
})

module.exports = limiter