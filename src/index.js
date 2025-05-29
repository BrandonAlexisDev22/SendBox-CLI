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