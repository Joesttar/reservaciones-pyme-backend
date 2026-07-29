import { useState } from 'react';
import { crearReservacion } from '../services/reservacionesService';

const FormularioReservacion = () => {
        const [formData, setFormData] = useState({
            servicio: '',
            fecha: '',
            hora: '',
            notas: '',
        })
        
        const handleChange = (event) => {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            })
        }

        const handleSumbit = async (event) => {
            event.preventDefault()
            try {
                const resultado = await crearReservacion(formData)
                console.log('Reservacion creada', resultado)
            } catch(error){
                console.log('Error:', error.message)
            }
        }
        
        return (
            <form onSubmit={handleSumbit}>
                <input 
                    type='text'
                    name='servicio'
                    value={formData.servicio}
                    onChange={handleChange}
                    placeholder='Servicio (ej. Hotel, Concierto)'
                />

                <input 
                    type='date'
                    name='fecha'
                    value={formData.fecha}
                    onChange={handleChange}
                />

                  <input 
                    type='date'
                    name='hora'
                    value={formData.hora}
                    onChange={handleChange}
                />

                  <input 
                    type='text'
                    name='notas'
                    value={formData.notas}
                    onChange={handleChange}
                    placeholder='Notas (opcional)'
                />
                <button type='submit'>Crear reservacion</button>
            </form>
        )
}

export default FormularioReservacion;