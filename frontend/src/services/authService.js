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

const loginUsuario = async (credenciales) => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credenciales)
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error)
    }
    return data
}

export { registroUsuario, loginUsuario };