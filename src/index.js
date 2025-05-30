"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const inquirer_1 = __importDefault(require("inquirer"));
const validator_1 = __importDefault(require("validator"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
dotenv.config();
const prompt = inquirer_1.default.createPromptModule();
function saveData(email, token) {
    const envContent = `EMAIL_USER=${email}\nTOKEN_USER=${token}`;
    const envPath = path.join(__dirname, "../.env");
    fs.writeFileSync(envPath, envContent);
    console.log("Datos guardados correctamente");
    dotenv.config({ path: envPath });
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
        }
        else {
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
        if (!validator_1.default.isEmail(answers.email)) {
            console.log("El email ingresado no es correcto");
            return;
        }
        saveData(answers.email, answers.token);
        const transporter = nodemailer_1.default.createTransport({
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
                if (!validator_1.default.isEmail(answers.receiver)) {
                    console.log("El email ingresado no es correcto");
                    return;
                }
                sendEmail(transporter, answers.receiver, answers.subject, answers.message);
            })
                .catch((err) => {
                console.log("Ha ocurrido un error en el envio del correo electronico", err);
            });
        })
            .catch((err) => {
            console.log("Ha ocurrido un error en la verificacion de los credenciales", err);
        });
    });
}
main();
