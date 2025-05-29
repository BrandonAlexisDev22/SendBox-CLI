# SendBox-CLI

Herramienta de línea de comandos en Node.js para enviar correos electrónicos de forma rápida y sencilla usando Nodemailer.

## Características

- Envío de correos electrónicos desde la terminal.
- Validación de direcciones de correo electrónico.
- Almacenamiento seguro de credenciales en archivo `.env`.
- Interfaz interactiva usando Inquirer.

## Requisitos

- Node.js >= 14.x
- Cuenta de Gmail (o servicio SMTP compatible)
- Permitir aplicaciones menos seguras en Gmail o usar un token de aplicación

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/CLI-SENDBOX.git
   cd CLI-SENDBOX
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

Ejecuta el programa con:

```bash
node src/index.js
```

Sigue las instrucciones en pantalla:

1. Ingresa tu correo electrónico y token de seguridad (contraseña de aplicación).
2. Ingresa el correo del destinatario, asunto y mensaje.
3. El correo será enviado y recibirás una confirmación en la terminal.

## Variables de entorno

El programa guarda tus credenciales en un archivo `.env` en la raíz del proyecto:

```
EMAIL_USER=tu_email@gmail.com
TOKEN_USER=tu_token
```

## Ejemplo

```bash
$ node src/index.js
? Introduce tu email: tu_email@gmail.com
? Introduce tu token de seguridad: [oculto]
Datos guardados correctamente
? Introduce el email de destinatario: destinatario@gmail.com
? Introduce el asunto: Prueba
? Introduce el mensaje: ¡Hola desde SendBox-CLI!
Correo enviado: 250 2.0.0 OK ...
```

## Notas de seguridad

- No compartas tu archivo `.env`.
- Usa contraseñas de aplicación para mayor seguridad en Gmail.

## Licencia

MIT
