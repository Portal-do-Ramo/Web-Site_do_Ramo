const { v4 } = require("uuid");

exports.seed = function(knex) {
  return knex('sponsors').del()
    .then(function () {
      return knex('sponsors').insert([
        {id: v4(), name: "Patrocinador 1", imageURL: "patrocinador1_avatar.png", link: "sitedoramo.com/patrocinador1"},
        {id: v4(), name: "Patrocinador 2", imageURL: "patrocinador2_avatar.png", link: "sitedoramo.com/patrocinador2"},
        {id: v4(), name: "Patrocinador 3", imageURL: "patrocinador3_avatar.png", link: "sitedoramo.com/patrocinador3"},
        {id: v4(), name: "Patrocinador 4", imageURL: "patrocinador4_avatar.png", link: "sitedoramo.com/patrocinador4"}
      ]);
    });
};
