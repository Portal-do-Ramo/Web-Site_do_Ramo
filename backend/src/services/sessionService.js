const { compareSync } = require("bcrypt");
const knex = require("../database");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = {
  async create(email, password) {
    try {
      const userValidation = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(8).pattern(new RegExp("^[a-zA-z0-9]{3,30}$")).required()     
      });

      userValidation.validate({email, password});

      const user = await knex("users").select("email", "password", "name").where({email}).first();
      
      if(!user) {
        throw new Error("Email não existe!");
      }

      if (!(compareSync(password, user.password))) {
        throw new Error('Senha incorreta!');
      }

      const token = jwt.sign(
        {name: user.name, email: user.email},
        process.env.TOKEN_HASH, 
        {expiresIn: '48h'}
      );

      return token;

    } catch(err) {
      return err.message;
    }
  }
}