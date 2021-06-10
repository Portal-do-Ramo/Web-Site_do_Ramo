const {v4} = require("uuid");

exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: v4(), 
          name: 'Cleitin do Rasta', 
          email: "cleitin@123.com", 
          password: "cleitin1234567", 
          role: "Diretoria de Marketing"
        }
      ]);
    });
};
