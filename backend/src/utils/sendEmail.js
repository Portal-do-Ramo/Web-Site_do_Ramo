require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter;

function getTransporter() {
	if (!transporter) {
		transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT || 587),
			secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
			pool: true,           
			maxConnections: 5,    
			maxMessages: 100,    
		});
	}
	return transporter;
}

async function sendEmail(recipientEmail) {
	const transporter = getTransporter();

	const html = `
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
          <p>Os próximos contatos serão feitos por e-mail, então não se esqueça de verificar sua caixa de entrada e também a de spam!</p>
          <p>Desejamos um bom processo seletivo!</p>
          <p>Atenciosamente,<br>Ramo Estudantil IEEE</p>
        </div>
      </body>
    </html>
  `;

	try {
		const info = await transporter.sendMail({
			from: process.env.SMTP_FROM,
			to: recipientEmail,
			subject: 'Verificação de Contato',
			html,
		});

		console.log('Processo de envio E-mail de confirmação de inscrição concluído sem erros');
		console.log('E-mail enviado:', {
			messageId: info.messageId,
			accepted: info.accepted,
			rejected: info.rejected,
			response: info.response,
		});
	} catch (error) {
		console.error('Erro no envio do e-mail:', {
			name: error.name,
			code: error.code,
			command: error.command,
			response: error.response,
		});

		throw new Error(
			'Houve um erro interno ao enviar o email de confirmação. Por favor, tente novamente mais tarde ou entre em contato com nossa equipe.'
		);
	}
}

module.exports = sendEmail;






/** 
 * 
 * @deprecated
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
              <p>Os próximos contatos serão feitos por e-mail, então não se esqueça de verificar sua caixa de entrada e também a de spam!</p>
              <p>Desejamos um bom processo seletivo!</p>
              <p>Atenciosamente,<br>Ramo Estudantil IEEE</p>
            </div>
          </body>
        </html>
      `
		};

		await sgMail.send(message);
		console.log('Processo de envio E-mail de confirmação de inscrição concluído sem erros');
	} catch (error) {
		console.log('Erro no envio do email de confirmação de inscrição: ', { code: error.code, body: error.response.body.errors });
		throw new Error('Houve um erro interno ao enviar o email de confirmação. Por favor, tente novamente mais tarde ou entre em contato com nossa equipe.');
	}
}

module.exports = sendEmail;
*/