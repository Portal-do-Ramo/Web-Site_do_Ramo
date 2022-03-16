const { v4 } = require("uuid");

exports.seed = function(knex) {
  return knex('sponsors').del()
    .then(function () {
      return knex('sponsors').insert([
        {id: v4(), name: "Patrocinador 1", imageURL: "http://localhost:5000/api/uploads/patrocinador1.png", link: "sitedoramo.com/patrocinador1"},
        {id: v4(), name: "Patrocinador 2", imageURL: "http://localhost:5000/api/uploads/patrocinador2.png", link: "sitedoramo.com/patrocinador2"},
        {id: v4(), name: "Patrocinador 3", imageURL: "http://localhost:5000/api/uploads/patrocinador3.png", link: "sitedoramo.com/patrocinador3"},
        {id: v4(), name: "Patrocinador 4", imageURL: "http://localhost:5000/api/uploads/patrocinador4.png", link: "sitedoramo.com/patrocinador4"}
      ]);
    });
};
