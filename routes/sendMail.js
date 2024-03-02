import { Router } from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { bodyParser } from '../parsers/bodyParser.js';
import { myUpload } from '../controllers/upload.js';
import fs from 'node:fs/promises'

export const sendMailRouter = Router();

sendMailRouter.post("/", myUpload, async (req, res) => {
  const settings = await bodyParser(req.body);
  console.log(req.file)
  if (settings.error) {
    res.json(settings);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: settings.config.host,
    port: settings.config.port,
    secure: settings.config.secure,
    auth: {
      user: settings.auth.user,
      pass: settings.auth.pass,
    },
  });

  const info = await transporter.sendMail({
    from: `<${settings.username}>`,
    to: settings.receiver,
    subject: settings.subject,
    text: settings.text,
    attachments: {
      filename: req.file.filename,
      path: req.file.path
    }
  });

  console.log("Message sent: %s", info.messageId);

  if (info.messageId) {
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