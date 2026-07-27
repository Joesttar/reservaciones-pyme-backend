const registroUsuario = async (datosUsuario) => {
    const response = await fetch('http://localhost:3000/api/auth/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
    })
    
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error)
    }
    return data

}

export default registroUsuario;