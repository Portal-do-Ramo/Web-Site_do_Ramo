const { compareSync } = require("bcrypt");
const knex = require("../database");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = {
  async create(email, password) {
    const userValidation = Joi.object({
      email: Joi.string().min(6).email().required(),
      password: Joi.string().min(8).pattern(new RegExp("^[a-zA-z0-9]{3,30}$")).required()     
    });

    const {error} = userValidation.validate({email, password});
    
    if (error){
      throw new Error(error.message);
    }

    const user = await knex("users").select("email", "password", "name", "isAdmin", "crew_id").where({email}).first();
    if(!user) {
      throw new Error("Email não existe!");
    }

    if (!(compareSync(password, user.password))) {
      throw new Error('Senha incorreta!');
    }
  
    const token = jwt.sign(
      {name: user.name, email: user.email, isAdmin: user.isAdmin, crew_id: user.crew_id},
      process.env.TOKEN_HASH, 
      {expiresIn: '48h'}
    );

    return token;
  }
}