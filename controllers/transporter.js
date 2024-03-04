import nodemailer from 'nodemailer';

export async function createTransporter (settings) {
  const transporter = nodemailer.createTransport({
    host: settings.config.host,
    port: settings.config.port,
    secure: settings.config.secure,
    auth: {
      user: settings.auth.user,
      pass: settings.auth.pass,
    },
  });

  return transporter;
}