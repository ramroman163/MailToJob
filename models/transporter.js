import nodemailer from 'nodemailer';

export class Transporter {
  static async create (settings) {
    return await createTransportObj(settings);
  }

  static async send (settings) {
    return await sendMail(settings);
  }
}

async function createTransportObj (settings) {
  const objTransporter = {
    host: settings.config.host,
    port: settings.config.port,
    secure: settings.config.secure,
    auth: {
      user: settings.user,
      pass: settings.pass,
    },
  }

  console.log(objTransporter)

  return objTransporter;
}

async function sendMail (settings) {
  const info = await settings.transporter.sendMail({
    from: '"Fred Foo 👻" <ramroman163@gmail.com>', // sender address
    to: settings.receiver, // list of receivers
    subject: settings.content.subject, // Subject line
    text: settings.content.text, // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  return info.messageId;
}