const bcrypt = require('bcrypt');
const pool = require('../config/db');

const registrar = async (req, res) => {
    try {
    const { nombre, apellido_paterno, apellido_materno, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10)

    const resultado = await pool.query(
        'INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, email, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, email',
        [nombre, apellido_paterno, apellido_materno, email, hashPassword]
    )
    res.status(201).json(resultado.rows[0])
    } catch (error) {
    res.status(500).json({error: error.message})
    }
}

module.exports = { registrar }

