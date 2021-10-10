const { v4 } = require("uuid");

exports.seed = function(knex) {
  return knex('sponsors').del()
    .then(function () {
      return knex('sponsors').insert([
        {id: v4(), name: "Patrocinador 1", image: "./patrocinador1.png", link: "sitedoramo.com/patrocinador1"},
        {id: v4(), name: "Patrocinador 2", image: "./patrocinador2.png", link: "sitedoramo.com/patrocinador2"},
        {id: v4(), name: "Patrocinador 3", image: "./patrocinador3.png", link: "sitedoramo.com/patrocinador3"},
        {id: v4(), name: "Patrocinador 4", image: "./patrocinador4.png", link: "sitedoramo.com/patrocinador4"}
      ]);
    });
};
