import { config } from "../config/emailConfig.js";
import { Transporter } from "../models/transporter.js";
import nodemailer from 'nodemailer';


export class MailController {
  static async sendMail (req, res) {

    const username = req.body.email;
    const password = req.body.password;
    const type = req.body.type;


    const receiver = req.body.receiver;
    const subject = req.body.subject;
    const text = req.body.text;

    const settings = config.find(obj => {

      if (obj.type == type) {
        return obj
      }
    });

    console.log(settings);

    const transporter = await nodemailer.createTransport(Transporter.create({
      user: username,
      pass: password,
      config: settings
    }));

    transporter.verify().then(async () => {

      console.log(transporter.options.host)
      const info = await Transporter.send({
        transporter: transporter,
        receiver: receiver,
        content: {
          subject,
          text
        }
      });
      res.status(200).json({ "info": info })
    }).catch((error) => {
      const myError = JSON.stringify(error)
      console.log(error)
      res.status(500).json({ "info": "error", "description": myError })
    })
  }
}