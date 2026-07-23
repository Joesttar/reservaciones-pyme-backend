const express = require('express')
const router = express.Router()
const { registrar } = require('../controllers/authControllers')

router.post('/registrar', registrar)

module.exports = router