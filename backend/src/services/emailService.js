const googleTransport = require("../config/emailConfig");
const fs = require("fs");
const path = require("path");

module.exports = {
    async sendCSV () {
        let transporter = await googleTransport();

        try {
            fs.stat('./uploads/pse.csv', (err, stats) => {
                console.log(stats);
            })

            await transporter.sendMail({
                from: `"Ramo Estudantil IEEE CEFET-RJ" <${process.env.SENDER_EMAIL}>`,
                to: `${process.env.GP_EMAIL}`,
                subject: "Planilha de inscritos PSE",
                html: '<h1>Inscritos</h1>',
                attachments:
                    [
                        {
                            filename: 'pse.csv',
                            path: `${process.env.BASE_URL}/api/uploads/pse.csv`
                        },
                    ]
            })

            if (fs.existsSync('./uploads/pse.csv'))
                fs.unlinkSync('./uploads/pse.csv');

            return {message: "arquivo csv enviado"};
        } catch (error)  {
            throw new Error(error.message);
        }
    },

    async sendResetPassword(email, password){
        let transporter = await googleTransport();
        
        try {
            await transporter.sendMail({
                from: `"Ramo Estudantil IEEE CEFET-RJ" <${process.env.SENDER_EMAIL}>`,
                to: `${email}`,
                subject: "Recuperação de senha",
                html: `<h1>Sua nova senha é ${password}</h1>`
            })
            return {message: "Email de recuperação de senha enviado"};
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
