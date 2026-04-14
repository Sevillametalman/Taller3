CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    cedula VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    edad INTEGER,
    genero VARCHAR(50) NOT NULL,
    telefono1 VARCHAR(20) NOT NULL,
    telefono2 VARCHAR(20),
    correo1 VARCHAR(255) NOT NULL,
    correo2 VARCHAR(255),
    estadoCivil VARCHAR(50) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    departamento VARCHAR(100),
    cargo VARCHAR(100)
);

CREATE TABLE admins(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO admins (username, password) VALUES ('admin', 'admin123');