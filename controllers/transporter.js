import nodemailer from 'nodemailer';

export async function createTransporter (settings) {
  let transporter = null;
  try {
    transporter = nodemailer.createTransport({
      host: settings.config.host,
      port: settings.config.port,
      secure: settings.config.secure,
      auth: {
        user: settings.auth.user,
        pass: settings.auth.pass,
      },
    });
  } catch (error) {
    throw "[ Transporter error ] " + error.message;
  }


  return transporter;
}