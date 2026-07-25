const express = require('express')
const router = express.Router()
const { crearReservaciones, obtenerMisReservaciones } = require('../controllers/reservacionesController')
const verificarToken = require('../middleware/auth')


router.use(verificarToken)

router.post('/', crearReservaciones)
router.get('/', obtenerMisReservaciones)

module.exports = router