import * as dotenv from "dotenv";
import nodemailer, { Transporter } from "nodemailer";
import inquirer from "inquirer";
import validator from "validator";
import * as fs from "fs";
import * as path from "path";

dotenv.config();
const prompt = inquirer.createPromptModule();

function saveData(email: string, token: string): void {
  const envContent = `EMAIL_USER=${email}\nTOKEN_USER=${token}`;
  const envPath = path.join(__dirname, "../.env");
  fs.writeFileSync(envPath, envContent);
  console.log("Datos guardados correctamente");
  dotenv.config({ path: envPath });
}

function sendEmail(
  transporter: Transporter,
  receiver: string,
  subject: string,
  message_user: string
): void {
  const emailSender = process.env.EMAIL_USER;
  let mailOptions = {
    from: `${emailSender}`,
    to: `${receiver}`,
    subject: `${subject}`,
    text: `${message_user}`,
  };
  transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
    if (error) {
      console.log("Error al enviar el email", error.message);
    } else {
      console.log("Correo enviado: ", info.response);
    }
  });
}

async function verifyToken(email:string, token:string): Promise<boolean>{
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:email,
      pass:token,
    },
  });

  try {
    await transporter.verify();
    return true
  } catch(error) {
    return false;
  }
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
    if (!validator.isEmail(answers.email)) {
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
            if (!validator.isEmail(answers.receiver)) {
              console.log("El email ingresado no es correcto");
              return;
            }
            sendEmail(
              transporter,
              answers.receiver,
              answers.subject,
              answers.message
            );
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