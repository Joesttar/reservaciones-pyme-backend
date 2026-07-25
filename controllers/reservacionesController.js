const pool = require('../config/db')


const crearReservaciones = async(req, res) => {
    try {
        
        const { servicio, fecha, hora, notas } = req.body;
        const usuario_id = req.usuario.id; 


        const nuevaReservacion = await pool.query(
            'INSERT INTO reservaciones (user_id, servicio, fecha, hora, notas) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [usuario_id, servicio, fecha, hora, notas]
        )

        res.status(201).json(nuevaReservacion.rows[0])
    } catch (error){
        res.status(500).json({error: error.message})
    }
};

const obtenerMisReservaciones = async (req, res) => {
    try {
        const usuario_id = req.usuario.id;
        const reservas = await pool.query(
            'SELECT * FROM reservaciones WHERE user_id = $1 ORDER BY fecha ASC',
            [usuario_id]
        )
        res.json(reservas.rows)
    } catch (error){
        res.status(500).json({error: error.message})

    }
}

module.exports = { crearReservaciones, obtenerMisReservaciones }