const express = require('express')
const router = express.Router()
const { registrar, login, tokenRefresh } = require('../controllers/authControllers')
const verificarToken = require('../middleware/auth')
const loginLimiter = require('../middleware/rateLimiter')
const { body, validationResult } = require('express-validator')

const validacionesRegistro = [
    body('email').isEmail().withMessage('El formato de emial no es valido').normalizeEmail(),
    body('password').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()){
            return res.status(400).json({ errores: errores.array() })
        }
        next();
    }
]


router.get('/perfil', verificarToken, (req, res) => {
    res.json({mensaje: 'Acceso autorizado', usuario: req.usuario})
})
router.post('/registrar', registrar)
router.post('/refresh', tokenRefresh)
router.post('/login', loginLimiter, login)

module.exports = router