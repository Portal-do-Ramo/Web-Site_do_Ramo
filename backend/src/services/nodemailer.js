const nodemailer = require("nodemailer");
const { google } = require('googleapis')
require('dotenv').config()

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

async function main(whichEmail, ...info) {
    const accessToken = await oAuth2Client.getAccessToken()

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.SENDER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      },
    });

    //mandar email de dúvidas
    if (whichEmail === "email_duvidas") {
      try {
        let sendDoubts = await transporter.sendMail({
          from: `${info.name} <${process.env.SENDER_EMAIL}>`,
          to: `${process.env.GP_EMAIL}`,
          subject: "Dúvida",
          text: `${info.text}`,
          html: '<h1>Olá</h1>',
        });
		    console.log(sendDoubts);
      } catch {
        return false;
      }
    };

    // mandar arquivos csv
    if (whichEmail === "email_arquivos") {
      try {
        let sendCSV = await transporter.sendMail({
          from: `"Ramo Estudantil IEEE CEFET-RJ" <${process.env.SENDER_EMAIL}>`,
          to: `${process.env.GP_EMAIL}`, 
          subject: "Planilha de inscritos PSE",
          text: 'lorem', // Colocar texto explicando o conteúdo do email 
          html: '<h1>Olá</h1>',
          attachments: 
              [
            {
              filename: 'text3.txt',
              //ver o path do csv e pesquisar algumas outras coisas sobre deleção e criaçaõ de CSVs
              path: '/path/to/file.txt' 
            },
          ]
        })
      } catch {
        return false
      }
    };

    if (whichEmail === "email_confirmacao") {
      try {
        let confirmation = await transporter.sendMail({
          from: `"Ramo Estudantil IEEE CEFET-RJ" <${process.env.SENDER_EMAIL}>`,
          to: `${info.email}`,
          subject: "Confirmação de inscrição de no Site do Ramo",
              // Colocar texto explicando o conteúdo do email
          text: `${text}`,
          html: '<h1>Olá</h1>',
        });
      } catch {
        return false;
      }
    };
}

module.exports = main;