const mailer = require("../services/emailService");

// VERIFICAR STATUS CODE.

module.exports = {
    async sendDoubt(req, res){
        try { //pensar em implementar o joi depois 
            await mailer("email_duvidas", req.body);
            res.status(200).json({
                "message": "email enviado", 
            })
        } catch(err) {
            res.status(405).json({"message": err.message})
        }
    },
    
    async sendCSV(req, res){
        try{
            // Descobrir como criar e pegar o arquivo csv para passar na função.
            await mailer("email_arquivos", filename)
            res.status(200).json({
                    "message": "arquivo csv enviado",
                });
        } catch(err) {
            res.status(405).json({"message": err.message});
        }
    }
}