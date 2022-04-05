const emailService = require("../services/emailService");

// Precisa ser deletado!
module.exports = {
    async sendCSV(req, res){
        try{
            // Descobrir como criar e pegar o arquivo csv para passar na função.
            const response = await emailService.sendCSV();

            res.status(200).json(response);
        } catch(err) {
            res.status(405).json({message: err.message});
        }
    }
}