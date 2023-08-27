const sheetConfig = require("../config/sheetConfig");

module.exports = {
    async insert(values){
        const { googleSheets, auth, spreadsheetId } = await sheetConfig.getAuthSheets();
        try{
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: values,
                }
            })
        } catch(err){
            throw new Error(err.message)
        }
        
    },
    async delete(){
        const { googleSheets, auth, spreadsheetId } = await sheetConfig.getAuthSheets();

        try{
            await googleSheets.spreadsheets.values.clear({
                auth,
                spreadsheetId,
                range: "'Sheet1'!A2:Q"
            })
        } catch(err){
            throw new Error(err.message)
        }
    }
}