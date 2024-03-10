export async function sendMail (transporter, file, settings) {
  const bodyMail = {
    from: `"${settings.sender}" <${settings.auth.user}>`,
    to: settings.receiver,
    subject: settings.subject,
    text: settings.text,

  }

  if (file) {
    bodyMail.attachments = {
      filename: file.filename,
      path: file.path
    }
  }

  console.log(bodyMail)

  const response = await transporter.sendMail(bodyMail);

  return response;
}