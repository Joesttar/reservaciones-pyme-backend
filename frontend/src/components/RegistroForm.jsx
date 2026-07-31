 import { useState } from 'react';
 import { registroUsuario } from '../services/authService';
 
 const RegistroForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const resultado = await registroUsuario(formData)
            console.log('Registro exitoso', resultado)
        } catch (error) {
            console.log('Error:', error.message)
        }
    }

 return (
    <form onSubmit={handleSubmit}>
        <div className='fila'>
        <input
        type='text'
        name='nombre'
        value={formData.nombre}
        onChange={handleChange}
        placeholder='Nombre'
        />
        </div>
        <div className='fila'>
        <input
        type='text'
        name='apellido_paterno'
        value={formData.apellidos_paterno}
        onChange={handleChange}
        placeholder='Apellidos Paterno'
        />
        
        <input
        type='text'
        name='apellido_materno'
        value={formData.apellidos_materno}
        onChange={handleChange}
        placeholder='Apellido Materno'
        />
        </div>

        <div className='fila'>
        <input 
        type='email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        placeholder='Email'
        />
        <input
        type='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
        placeholder='Contraseña'
        />
        </div>
        <button className='registrame' type='submit'>Registrarme</button>
    </form>
 )
}

export default RegistroForm;