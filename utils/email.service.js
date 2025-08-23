//Importaciones:
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

//variable de entorno.
dotenv.config();

// Configuración del transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verificación inicial
transporter.verify((error, success) => {
  if (error) {
    console.error('Error al conectar con el servicio de correo:', error.message);
  } else {
    console.log('Servicio de correo listo para enviar mensajes');
  }
});

// Función para enviar correo
function enviarCorreo(destinatario, asunto, mensajeHtml) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: asunto,
    html: mensajeHtml
  };

  return transporter.sendMail(mailOptions)
    .then(info => {
      console.log('Correo enviado:', info.response);
      return true;
    })
    .catch(error => {
      console.error('Error al enviar el correo:', error.message);
      return false;
    });
}

export default enviarCorreo;
