const Joi = require("joi");

const validation = (data) => {
    const user = Joi.object({
        name: Joi.string().min(3).required(),    
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(8).pattern(new RegExp("^[a-zA-z0-9]{3,30}$")).required(),
        role: Joi.string().required()           
    });

    try {
        return user.validate(data);
    } catch(err) {
        return err.message;
    }
}

module.exports = validation;