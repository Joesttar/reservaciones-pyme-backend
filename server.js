const express = require('express');
const app = express();
const PORT = 3000;
const pool = require('./config/db');

app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})

app.get('/test-db', async(req, res) => {
    try {
        const resultado = await pool.query('SELECT NOW()')
        res.json(resultado.rows[0])
    } catch (error) {
        res.status(500).json({error: error.message, code:error.code})
    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})



