# Gym Reservation API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

Una API REST robusta y profesional para la gestión de reservas de salas en un gimnasio. Este proyecto ha sido desarrollado siguiendo las mejores prácticas de arquitectura de software, separación de responsabilidades y calidad de código.

## Características y Tecnologías

#### _Backend & Core_

- **Node.js & Express**: Entorno de ejecución y framework web.
- **Arquitectura en Capas**: Separación clara entre Rutas, Controladores, Servicios y Repositorios.
- **Prisma ORM**: Gestión de base de datos MySQL con tipado seguro y migraciones.
- **MySQ**L: Base de datos relacional para persistencia de datos.

#### _Calidad y Documentación_

- **Swagger / OpenAPI**: Documentación interactiva de la API accesible desde el navegador.
- **JSDoc**: Documentación interna del código para mejorar la experiencia de desarrollo (DX).
- **Vitest**: Suite de tests unitarios para asegurar la lógica de negocio en los servicios.
- **CORS**: Configuración de seguridad para permitir conexiones desde clientes externos.

## Entorno de Pruebas

Este proyecto está diseñado para que se pueda interactuar con él libremente.
Se pueden crear reservas, eliminar salas o editar horarios.

Si en algún momento quieres devolver la aplicación a su estado original:

- **En el Frontend:** Encontrarás un botón de "Restablecer Base de Datos" en la interfaz.
- **En la API:** Puedes hacer un `POST` a `/api/v1/database/reset` a través de la documentación de Swagger.

Esto limpiará la base de datos y volverá a inyectar la información de prueba (`mockData.json`).

## Instalación y Configuración

1. Clonar el repositorio

```
git clone git@github.com:marbobe/gym-reservation-api.git
```

2. Instalar dependencias

```
npm install
```

3. Configuración de variables de entorno

Crea un archivo .env en la raíz del proyecto y configura tus credenciales de MySQL:

```
PORT=
DB_HOST=
DB_USER=root
DB_PASSWORD=
DB_NAME=
DB_PORT=
DATABASE_URL=
```

4. Inicializar Base de Datos con Prisma

```
#Generar el cliente de Prisma
npx prisma generate

#Sincronizar el esquema con la base de datos
npx prisma db push

#Poblar la base de datos con datos de prueba (Seed)
npx prisma db seed
```

## Uso y Documentación

### Ejecución

Desarrollo:

```
npm run dev (usando nodemon)
```

Producción:

```
npm start
```

### Documentación Interactiva

Una vez levantado el servidor, puedes explorar y probar los endpoints en:

```
http://localhost:4000/api-docs
```

### Tests

Para ejecutar la suite de pruebas unitarias:

```
npm run test
```

## Arquitectura del Proyecto

- **Routes**: Define los endpoints y conecta con los controladores.
- **Controllers**: Gestiona las peticiones HTTP y extrae los datos necesarios.
- **Services**: Contiene la lógica de negocio (validaciones de fecha, solapamientos, etc.). Es la capa protegida por tests.
- **Repositories**: Capa de acceso a datos pura usando Prisma Client.

## Endpoints Principales

#### Salas (Rooms)

`GET /api/v1/rooms - Obtener todas las salas.`

`GET /api/v1/rooms/:id - Obtener una sala por id`

`POST /api/v1/rooms - Registrar una nueva sala.`

`PATCH /api/v1/rooms/:id - Editar los datos de una sala existente.`

`DELETE /api/v1/rooms/:id - Eliminar una sala (Soft Delete).`

#### Reservas (Reservations)

`GET /api/v1/reservations - Listar reservas (con filtro opcional por sala).`

`GET /api/v1/reservations/:id - Obtiene una reserva por id`

`POST /api/v1/reservations - Crear una reserva (valida disponibilidad de horario).`

`PATCH /api/v1/reservations/:id - Edita los datos de una reserva existente`

`PATCH /api/v1/reservations/:id - Cancelar una reserva (Soft Delete).`

#### Database

`POST /api/v1/database/reset - Restablecer la base de datos e inyectar los datos de prueba `
