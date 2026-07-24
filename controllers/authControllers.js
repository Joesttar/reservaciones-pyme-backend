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
        
        const refreshToken = jwt.sign(
            {id: usuario.id},
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: '7d'}
        )

        res.status(201).json(
            {accessToken,
             refreshToken,
             usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email:usuario.email
             }   
            })

        } catch (error){ 
        res.status(500).json({error: error.message})
    }
}

const tokenRefresh = async (req, res) => {
    const { refreshToken } = req.body

    if (!refreshToken) {
        return res.status(401).json({error: 'Refresh token no proporcionando'})
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const resultado = await pool.query(
            'SELECT * FROM usuarios WHERE id = $1 AND refresh_token = $2',
            [payload.id, refreshToken]
        )

        if (resultado.rows.length === 0) {
            return res.status(403).json({ error: 'Refresh token no valido o ya revocado' })
        }

        const newAccessToken = jwt.sign(
            {id: payload.id},
            process.env.JWT_SECRET,
            {expiraIn: '15m'}
        )
        res.json({ accessToken: newAccessToken })
    
    } catch (error){
        res.status(403).json({ error: 'Token invalido o expirado' })
    }
}

module.exports = { registrar, login, tokenRefresh }

