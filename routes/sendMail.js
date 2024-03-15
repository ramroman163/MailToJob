import fs from 'node:fs/promises';
import { Router } from 'express';
import { bodyParser } from '../parsers/bodyParser.js';
import { myUpload } from '../controllers/upload.js';
import { createTransporter } from '../controllers/transporter.js';
import { sendMail } from '../controllers/mail.js';
import pc from 'picocolors'

export const sendMailRouter = Router();

sendMailRouter.post("/", myUpload, async (req, res) => {
  console.log(pc.blue("Se recibió un mail"))

  let settings = null;
  try {
    settings = await bodyParser(req.body);
  } catch (error) {
    console.log(pc.red("Error en body parser"))
    return res.status(500).json({ "error": error.message })
  }

  let transporter = null;
  try {
    transporter = await createTransporter(settings);
  } catch (error) {
    console.log(pc.red("Error en createTransporter"))
    console.log(pc.red(error))
    return res.status(500).json({ "error": error.message })
  }

  let responseInfo = null;
  try {
    responseInfo = await sendMail(transporter, req.file, settings);
    console.log("Message sent: %s", responseInfo.messageId);
  } catch (error) {
    console.log(pc.red("Error en enviar mail"))
    console.log(pc.red(error))
    return res.status(500).json({ "error": error.message })
  }

  if (responseInfo.messageId) {
    console.log(pc.green("Email enviado!"))

    res.status(200).json({
      "message": "Email enviado!"
    })

    if (req.file) {
      fs.rm(req.file.path)
        .then(() => {
          console.log("Archivo eliminado")
        })
        .catch((e) => {
          console.log(pc.red(e))
        })
    }
  } else {
    console.log(pc.red("Error en el final"))
    return res.status(500).json({ "message": "No se realizó el envío" });
  }
});