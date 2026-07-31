const obtenerReservaciones = async () => {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:3000/api/reservaciones', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error) 
    }
    return data
}

const crearReservacion = async (datosReservacion) => {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:3000/api/reservaciones',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosReservacion)
    })

    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error)
    }
    return data
}

export { obtenerReservaciones, crearReservacion };