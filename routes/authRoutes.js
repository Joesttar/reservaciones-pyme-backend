const express = require('express')
const router = express.Router()
const { registrar, login } = require('../controllers/authControllers')
const verificarToken = require('../middleware/auth')

router.get('/perfil', verificarToken, (req, res) => {
    res.json({mensaje: 'Acceso autorizado', usuario: req.usuario})
})
router.post('/registrar', registrar)
router.post('/login', login)

module.exports = router