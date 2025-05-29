require("dotenv").config(); // CARGAR VARIABLES DE ENTORNO
const nodemailer = require("nodemailer");
const inquirer = require("inquirer");
const validator = require("validator");
const prompt = inquirer.createPromptModule();
const fs = require("node:fs");

function saveData(email, token) {
  const envContent = `EMAIL_USER=${email}\nTOKEN_USER=${token}`;
  fs.writeFileSync("../.env", envContent);
  console.log("Datos guardados correctamente");
  require("dotenv").config({ path: "../.env" });
}

function sendEmail(transporter, receiver, subject, message_user) {
  const emailSender = process.env.EMAIL_USER;
  let mailOptions = {
    from: `${emailSender}`,
    to: `${receiver}`,
    subject: `${subject}`,
    text: `${message_user}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el email", error.message);
    } else {
      console.log("Correo enviado: ", info.response);
    }
  });
}

function main() {
  prompt([
    { type: "input", name: "email", message: "Introduce tu email: " },
    {
      type: "password",
      name: "token",
      message: "Introduce tu token de seguridad: ",
    },
  ]).then((answers) => {
    if(!validator.isEmail(answers.email)) {
        console.log("El email ingresado no es correcto");
        return;
    }
    saveData(answers.email, answers.token);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.TOKEN_USER,
      },
    });
    transporter
      .verify()
      .then(() => {
        prompt([
          {
            type: "input",
            name: "receiver",
            message: "Introduce el email de destinatario: ",
          },
          { type: "input", name: "subject", message: "Introduce el asunto: " },
          { type: "input", name: "message", message: "Introduce el mensaje: " },
        ])
          .then((answers) => {
            if(!validator.isEmail(answers.receiver)) {
                console.log("El email ingresado no es correcto");
                return;
            }
            sendEmail(transporter, answers.receiver, answers.subject, answers.message);
          })
          .catch((err) => {
            console.log(
              "Ha ocurrido un error en el envio del correo electronico",
              err
            );
          });
      })
      .catch((err) => {
        console.log(
          "Ha ocurrido un error en la verificacion de los credenciales",
          err
        );
      });
  });
}

main();