import { useState } from 'react';
import { crearReservacion } from '../services/reservacionesService';

const FormularioReservacion = ({onReservacionCreada}) => {
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
                await crearReservacion(formData)
                setFormData({servicio: '', fecha: '', hora: '', notas: ''})
                onReservacionCreada()
            } catch(error){
                console.log('Error:', error.message)
            }
        }
        
        return (
            <div>
            <form onSubmit={handleSumbit}>
                <div className='formulario'>
                <input 
                    type='text'
                    name='servicio'
                    value={formData.servicio}
                    onChange={handleChange}
                    placeholder='Servicio (ej. Hotel, Concierto)'
                />
                </div>

                <div className='formulario'>
                <input 
                    type='date'
                    name='fecha'
                    value={formData.fecha}
                    onChange={handleChange}
                />
                </div>

                <div className='formulario'>
                  <input 
                    type='time'
                    name='hora'
                    value={formData.hora}
                    onChange={handleChange}
                />
                </div >

                <div className='formulario'>
                  <input 
                    type='text'
                    name='notas'
                    value={formData.notas}
                    onChange={handleChange}
                    placeholder='Notas (opcional)'
                />
                </div>
                <button className='crear' type='submit'>Crear reservacion</button>
            </form>
            </div>
        )
}

export default FormularioReservacion;