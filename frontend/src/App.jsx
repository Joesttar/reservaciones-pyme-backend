import { useState, useEffect } from 'react'
import  RegistroForm  from './components/RegistroForm'
import  LoginForm  from './components/LoginForm'
import  ListaReservaciones from './components/ListaRservaciones'
import FormularioReservacion from './components/FormularioReservacion'
import { obtenerReservaciones } from './services/reservacionesService'
import './App.css'

function App() {
const [reservaciones, setReservaciones ] = useState([])

const cargarReservaciones = async () => {
  try{
    const data = await obtenerReservaciones()
    setReservaciones(data)
  } catch (error) {
    console.log('Error', error.message)
  }
}

useEffect(() => {
  cargarReservaciones()
}, [])

  return (
    <div className='app.container'>
        <h1>Reservaciones PyME</h1>
        <RegistroForm />
        <LoginForm />
        <FormularioReservacion onReservacionCreada={cargarReservaciones} />
        <ListaReservaciones reservaciones={reservaciones} />
    </div>
  )
}

export default App
