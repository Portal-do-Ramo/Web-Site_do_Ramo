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

      const user = await knex("users").select("email", "password", "name").where({email});
      
      if(!user[0]) {
        throw new Error("Email não existe!");
      }

      if (!(compareSync(password, user[0].password))) {
        throw new Error('Password does not match!');
      }

      const token = jwt.sign(
        {name: user[0].name, email: user[0].email},
        process.env.TOKEN_HASH, 
        {expiresIn: '48h'}
      );

      return token;

    } catch(err) {
      return err.message;
    }
  }
}