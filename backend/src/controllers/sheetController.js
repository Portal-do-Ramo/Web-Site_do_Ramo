const sheetService = require("../services/sheetService");

module.exports = {
  async insert(values) {
    
    values.registrationData.availableDate = values.registrationData.availableDate.join(', ');

    const listValues = Object.values(values.personalInformation).concat(Object.values(values.registrationData))
      
        const data = {
            "values": listValues
    } 
    
        try{
            await sheetService.insert(data);
        } catch (err) {
            throw new Error(err.message);
        }
    },
    async delete(req, res){
        try{
            await sheetService.delete();
        } catch(err){
            return res.status(405).json({message: err.message});
        }
    }
}