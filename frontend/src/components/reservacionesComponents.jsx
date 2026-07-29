import { useState, useEffect } from "react";
import { obtenerReservaciones } from "../services/reservacionesService";

const ListaReservaciones = () => {
    const [reservaciones, setReservaciones] = useState([])

    useEffect(() => {
        const cargarReservaciones = async () => {
            try {
                const data = await obtenerReservaciones()
                    setReservaciones(data)
            } catch (error) {
            console.log('Error:', error.message)
            } 
        }
    cargarReservaciones()
    }, [])

    return ( 
        <div>
            <h2>Mis Reservaciones</h2>
            {reservaciones.map((reservacion) => (
                <p key={reservacion.id}>{reservacion.servicio} - {reservacion.fecha} - {reservacion.hora} - {reservacion.notas}</p>
            ))}
        </div>
    )
}

export default ListaReservaciones;