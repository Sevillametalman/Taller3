# Taller 3

## Descripción
Esta aplicación es un sistema CRUD (Crear, Leer, Actualizar, Borrar) y manejo de registros de personas, desarrollado como parte de un taller académico. Permite gestionar usuarios con múltiples campos, autenticación de administradores y carga masiva de datos desde archivos JSON. El objetivo es practicar y demostrar el manejo completo de operaciones CRUD sobre una base de datos, así como la integración de frontend y backend.

## Funcionalidades principales
- **CRUD de usuarios**: Crear, consultar, editar y borrar registros de personas.
- **Autenticación de administradores**: Login y logout con protección de rutas mediante JWT.
- **Carga masiva**: Permite cargar un archivo JSON para poblar la base de datos, eliminando previamente los registros existentes.
- **Descarga de registros**: Exporta todos los usuarios a un archivo JSON.
- **Interfaz dinámica**: Formularios y tablas generados dinámicamente a partir de la estructura de campos.
- **Validaciones**: Validación de datos tanto en frontend como en backend.

## Inicialización del proyecto

1. **Clona el repositorio y entra a la carpeta:**
	```bash
	git clone <url-del-repo>
	cd Taller3
	```

2. **Instala las dependencias:**
	```bash
	npm install
	```

3. **Configura las variables de entorno:**
	Crea un archivo `.env` en la raíz con el siguiente contenido (ajusta según tu entorno):
	```env
	DB_USER=tu_usuario
	DB_PASSWORD=tu_contraseña
	DB_HOST=localhost
	DB_NAME=taller3
	DB_PORT=5432
	```

4. **Crea la base de datos y las tablas:**
	- Asegúrate de tener PostgreSQL instalado y ejecutando.
	- Ejecuta el script `database/db.sql` en tu base de datos:
	  ```bash
	  psql -U tu_usuario -d taller3 -f database/db.sql
	  ```

5. **Inicia el servidor:**
	```bash
	npm start
	```
	El servidor se ejecutará en `http://localhost:4000`.

6. **Accede a la aplicación:**
	- Abre `public/index.html` o `public/form.html` en tu navegador para usar la interfaz.

## Estructura de carpetas

- `src/` - Código fuente del backend (Express, controladores, rutas, conexión a BD)
- `public/` - Archivos estáticos del frontend (HTML, JS, CSS)
- `database/` - Script SQL para crear las tablas necesarias

## Notas
- El sistema está pensado para fines académicos y de práctica.
- Puedes modificar los campos de usuario editando `public/campos.json` y el script SQL.

---
**Temática:**
Esta aplicación es un ejemplo completo de CRUD y manejo de registros, cumpliendo con los requisitos de creación, consulta, edición, borrado, autenticación y carga masiva de datos, ideal para aprender integración fullstack y buenas prácticas de validación y persistencia.