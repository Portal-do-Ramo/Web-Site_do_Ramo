const db = require("../database/firebase");
const registerPSE = db.collection("registerPSE");
const sheetConfig = require("../config/sheetConfig");

module.exports = {
    async insert(values){
        const { googleSheets, auth, spreadsheetId } = await sheetConfig.getAuthSheets();

        const row = await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: values,
            }
        })
    },
    async delete(values){
        
    }

}