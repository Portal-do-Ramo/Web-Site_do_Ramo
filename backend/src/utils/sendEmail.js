require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail (recipientEmail) {
	try {
		const senderEmail = process.env.SENDGRID_SENDER_EMAIL;

		const message = {
			to: recipientEmail,
			from: senderEmail,
			subject: 'Verificação de Contato',
			html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8">
            <title>Verificação de E-mail Concluída</title>
          </head>
          <body>
            <div>
              <h1>Verificação de E-mail Concluída</h1>
              <p>Olá,</p>
              <p>Este é um e-mail de confirmação para verificar o seu endereço de e-mail.</p>
              <p>Ficamos felizes em informar que a verificação foi concluída com sucesso! Agora, sabemos que podemos entrar em contato com você sempre que necessário.</p>
			  <p>Desejamos um bom processo seletivo!</p>
              <p>Atenciosamente,<br>Ramo Estudantil IEEE</p>
            </div>
          </body>
        </html>
      `
		};

		await sgMail.send(message);
	} catch (error) {
		throw new Error(error.message);
	}
}

module.exports = sendEmail;
