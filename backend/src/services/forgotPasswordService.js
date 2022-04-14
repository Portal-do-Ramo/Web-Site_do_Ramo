const knex = require("../database");
const bcrypt = require("bcrypt");
const emailService = require("../services/emailService");

module.exports = {

    async resetPassword(email){
        const user = await knex("users").select("email").where({email}).first();

        try {
            if(!user)
                throw new Error("Usuário não existe!");
            
            const newPassword = Math.random().toString(36).substring(0, 10).slice(2);
            const hash = await bcrypt.hash(newPassword, 10);

            await knex("users").update({password: hash}).where({email});
            const response = await emailService.sendResetPassword(user.email, newPassword);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}