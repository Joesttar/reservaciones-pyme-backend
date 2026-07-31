import { useState } from "react";
import { loginUsuario } from "../services/authService"

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    const [mensaje, setMensaje] = useState('')

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const resultado = await loginUsuario(formData)
            localStorage.setItem('token', resultado.token)
            setMensaje('Login exitoso')
        } catch (error) {
            setMensaje(error.message)
        }
    }
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            />

            <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            />
            <button type="submit">Iniciar Sesion</button>
        </form>

        {mensaje && <p>{mensaje}</p>}
    </div>
    )
}

export default LoginForm;