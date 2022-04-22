const googleTransport = require("../config/emailConfig");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

module.exports = {
    async sendCSV () {
        let transporter = await googleTransport();

        const pathTemplate = path.join(__dirname, "..", "views", "emails", "CSVEmail.hbs");

        const templateFileContent = fs.readFileSync(pathTemplate, "utf-8");
        
        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse({name, password});

        try {
            fs.stat('./uploads/pse.csv', (err, stats) => {
                console.log(stats);
            })

            await transporter.sendMail({
                from: `"Ramo Estudantil IEEE CEFET-RJ" <${process.env.SENDER_EMAIL}>`,
                to: `${process.env.GP_EMAIL}`,
                subject: "Planilha de inscritos do PSE!",
                html,
                attachments:
                    [
                        {
                            filename: 'pse.csv',
                            path: `${process.env.BASE_URL}/api/uploads/pse.csv`
                        },
                        {
                            filename: 'logo-ramo-azul.png',
                            path: __dirname + "../../../uploads/logo-ramo-azul.png",
                            cid: 'logo-ramo-azul'
                        }
                    ]
            })

            if (fs.existsSync('./uploads/pse.csv'))
                fs.unlinkSync('./uploads/pse.csv');

            return {message: "arquivo csv enviado"};
        } catch (error)  {
            throw new Error(error.message);
        }
    },

    async sendResetPassword(name, email, password){
        let transporter = await googleTransport();
        
        const pathTemplate = path.join(__dirname, "..", "views", "emails", "resetPasswordMail.hbs");

        const templateFileContent = fs.readFileSync(pathTemplate, "utf-8");
        
        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse({name, password});

        try {
            await transporter.sendMail({
                from: `"Site do Ramo Estudantil IEEE CEFET-RJ" <${process.env.SENDER_EMAIL}>`,
                to: `${email}`,
                subject: "Recuperação de senha!",
                html,
                attachments: [{
                    filename: 'logo-ramo-azul.png',
                    path: __dirname + "../../../uploads/logo-ramo-azul.png",
                    cid: 'logo-ramo-azul'
                }]
            })
            return {message: "Email de recuperação de senha enviado"};
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
