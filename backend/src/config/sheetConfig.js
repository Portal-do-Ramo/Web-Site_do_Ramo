const { google } = require("googleapis");

module.exports = {
    async getAuthSheets(){
        const auth = new google.auth.GoogleAuth({
            keyFile: "src/config/sheetCredentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets"
        })

        const client = await auth.getClient();

        const googleSheets = google.sheets({
            version: "v4",
            auth: client
        })

        const spreadsheetId = "1k9IDuj_kY9P1zOGuNmwAmeaEtLpS9leuTQgMgoLD-Jc"

        return {
            auth, 
            client, 
            googleSheets,
            spreadsheetId
        }
    }
}