const forgotPasswordService = require("../services/forgotPasswordService");

module.exports = {

    async resetPassword(req, res){
        const { email } = req.body;
        try {
            const response = await forgotPasswordService.resetPassword(email);
            return res.status(200).json(response);

        } catch (err) {
            return res.json({message: err.message});
        }
    }
}
