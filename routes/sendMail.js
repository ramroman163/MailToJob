import fs from 'node:fs/promises';
import { Router } from 'express';
import { bodyParser } from '../parsers/bodyParser.js';
import { myUpload } from '../controllers/upload.js';
import { createTransporter } from '../controllers/transporter.js';
import { sendMail } from '../controllers/mail.js';

export const sendMailRouter = Router();

sendMailRouter.post("/", myUpload, async (req, res) => {
  const settings = await bodyParser(req.body);
  console.log(settings)
  if (settings.error) {
    res.json(settings);
    return;
  }

  const transporter = await createTransporter(settings);

  const responseInfo = await sendMail(transporter, req.file, settings);

  console.log("Message sent: %s", responseInfo.messageId);

  if (responseInfo.messageId) {
    res.status(200).json({
      "message": "Email enviado!"
    })

    fs.rm(req.file.path)
      .then(() => {
        console.log("file deleted")
      })
      .catch((e) => {
        console.log(e)
      })
  } else {
    res.status(500);
  }
});