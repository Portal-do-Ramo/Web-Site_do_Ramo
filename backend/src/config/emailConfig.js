const nodemailer = require("nodemailer")
const { google } = require("googleapis")

require("dotenv").config()

module.exports = async function googleTransport() {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    )

    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN})

    const accessToken = await oAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: process.env.SENDER_EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    transporter.set("oauth2_provision_cb", () => {
        accessToken
    });

    return transporter; 
}