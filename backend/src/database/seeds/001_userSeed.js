const {v4} = require("uuid");
const bcrypt = require("bcrypt");

exports.seed = async function(knex) {

	
	const hash = await bcrypt.hash("cleitin1234567", 10);
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: v4(), 
          name: 'Cleitin do Rasta', 
          email: "cleitin@123.com", 
          password: hash, 
          role: "Diretoria de Marketing"
        }
      ]);
    });
};
