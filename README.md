# reservaciones-pyme-backend
Plataforma fullstack de reservaciones para pequeños negocios, con un sistema de autenticación construido priorizando buenas prácticas de seguridad: hashing de contraseñas, JWT con refresh tokens, rate limiting y validación de inputs.

Demo

🔗 Backend · Frontend https://reservaciones-pyme-backend-dzok5vkps-joesttar1.vercel.app

Características
Registro y login seguros: contraseñas hasheadas con bcrypt (nunca en texto plano), nunca comparadas en texto plano.
Autenticación con JWT: access tokens de corta duración + refresh tokens de larga duración, para mantener la sesión sin exponer credenciales repetidamente.
Rate limiting en login: máximo de intentos por ventana de tiempo, para mitigar ataques de fuerza bruta.
Validación y sanitización de inputs: con express-validator, antes de que cualquier dato llegue a la base de datos.
Rutas protegidas: middleware de autenticación que verifica el JWT en cada petición a rutas sensibles (crear/consultar reservaciones).
CRUD de reservaciones: cada usuario solo puede ver y crear sus propias reservaciones, filtradas por su identidad autenticada.
Seguridad: por qué bcrypt y no un hash simple

A diferencia de un hash rápido como SHA-1 (útil para verificar integridad de datos), bcrypt está diseñado intencionalmente para ser lento, con un "cost factor" configurable, dificultando ataques de fuerza bruta contra contraseñas filtradas. Además, genera automáticamente un salt único por contraseña, así que dos usuarios con la misma contraseña nunca producen el mismo hash.

Seguridad: prevención de enumeración de usuarios

Tanto si el email no existe como si la contraseña es incorrecta, el login responde exactamente con el mismo mensaje genérico y el mismo código de estado — evitando que un atacante pueda deducir qué emails están registrados en el sistema.

Stack técnico

Backend

Node.js + Express
PostgreSQL (pg)
bcrypt (hashing de contraseñas)
jsonwebtoken (JWT + refresh tokens)
express-validator (validación/sanitización de inputs)
express-rate-limit (protección anti fuerza bruta)
dotenv (variables de entorno)

Frontend

React (hooks: useState, useEffect)
Vite
Arquitectura
reservaciones-pyme-backend/
  server.js                    # Punto de entrada, middlewares globales
  config/
    db.js                      # Pool de conexión a PostgreSQL
  controllers/
    authController.js          # Registro, login, refresh de tokens
    reservacionesController.js # Crear y listar reservaciones
  middleware/
    auth.js                    # Verificación de JWT
    rateLimiter.js             # Rate limiting de login
  routes/
    authRoutes.js
    reservacionesRoutes.js
  frontend/
    src/
      components/
        RegistroForm.jsx
        LoginForm.jsx
        FormularioReservacion.jsx
        ListaReservaciones.jsx
      services/
        authService.js         # Llamadas a la API de autenticación
        reservacionesService.js

El estado de las reservaciones vive en el componente App (lifting state up), compartido entre el formulario de creación y la lista mediante props — al crear una reservación, la lista se actualiza automáticamente sin recargar la página.

Modelo de datos

usuarios: id, nombre, apellido_paterno, apellido_materno (opcional), email (único), password_hash, refresh_token, fecha_creacion

reservaciones: id, user_id (llave foránea a usuarios), servicio, fecha, hora, notas, fecha_creacion

Correr el proyecto localmente

Backend:

bash
cd reservaciones-pyme-backend
npm install
# crear archivo .env con las credenciales de PostgreSQL y los JWT secrets
npm run dev

Frontend:

bash
cd reservaciones-pyme-backend/frontend
npm install
npm run dev
Autor

Joe García — LinkedIn · GitHub