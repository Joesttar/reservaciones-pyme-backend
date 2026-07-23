const bcrypt = require('bcrypt');
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

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

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const resultado = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        )

        if (resultado.rows.length === 0) {
            return res.status(401).json({error: 'Credenciales invalidas'})
            }

        const usuario = resultado.rows[0]
        const passwordValida = await bcrypt.compare(password, usuario.password_hash)

        if (!passwordValida) {
            return res.status(401).json({error: 'Credenciales Invalidas'})
        }

        const token = jwt.sign(
            {id: usuario.id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        res.status(200).json({ token })

        } catch (error){ 
        res.status(500).json({error: error.message})
    }
}

module.exports = { registrar, login }

