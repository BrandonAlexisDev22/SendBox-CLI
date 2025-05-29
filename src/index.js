require("dotenv").config(); // CARGAR VARIABLES DE ENTORNO
const nodemailer = require("nodemailer");
const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();
const fs = require("node:fs");