const googleTransport = require("../config/emailConfig");
require("dotenv").config




async function sendCSV() {
    let transporter = googleTransport();

    try {
        await transporter.sendMail({
            from: `"Ramo Estudantil IEEE CEFET-RJ" <${process.env.SENDER_EMAIL}>`,
            to: `${"markusvi17@gmail.com"}`,
            subject: "PlGP_EMAILanilha de inscritos PSE",
            text: 'lorem',
            html: '<h1>Olá</h1>',
            // attachments:
            //     [
            //         {
            //             filename: 'pse.csv',
            //             path: '../../uploads/pse.csv'
            //         },
            //     ]
        })
    } catch {
        return false
    }
}
// }

sendCSV()

