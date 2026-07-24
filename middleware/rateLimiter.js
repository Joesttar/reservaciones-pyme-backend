const rateLimit = require('express-rate-limit') 

const loginLimiter = rateLimit({
    windowMs: 12 * 60 * 1000,
    max: 5,
    message: ({error: 'Demasiados intentos de login, intenta de nuevo mas tarde'})
})

module.exports = loginLimiter