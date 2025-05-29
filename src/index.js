require("dotenv").config(); // CARGAR VARIABLES DE ENTORNO
const nodemailer = require("nodemailer");
const inquirer = require("inquirer");
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