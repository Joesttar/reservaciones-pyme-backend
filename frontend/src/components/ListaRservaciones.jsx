const ListaReservaciones = ({reservaciones}) => {

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