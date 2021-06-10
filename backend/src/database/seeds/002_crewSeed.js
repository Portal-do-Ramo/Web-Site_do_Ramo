const {v4} = require("uuid");

exports.seed = function(knex) {
  
  return knex('crews').del()
    .then(function () {
      
      return knex('crews').insert([
        
        {id: v4(), name: "Gestão", about: "depressao e mt sofrimento"}, 
        {id: v4(), name: "Marketing", about: "bo vender uma viagem pra um cara com o dinheiro do auxilio apenas kk"},
        {id: v4(), name: "RocketWolf", about: "ovo lança fuguetin"},
        {id: v4(), name: "SocialWolf", about:"ajuda uns velhinho"},
        {id: v4(), name: "WIE", about: "Essa é braba"},
        {id: v4(), name: "WolfBotz", about: "ih bo criar robo que briga kkk"},
        {id: v4(), name: "WolfByte", about: "n ve a luz do sol"},
        {id: v4(), name: "WolfPower", about: "vamo estoca vento"}
      ]);
    });
};
