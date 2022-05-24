const {v4} = require("uuid");

exports.seed = function(knex) {
  
  return knex('crews').del()
    .then(function () {
      
      return knex('crews').insert([
		    {id: v4(), name: "WIE", about: "Essa é braba", imageURL: "wie_avatar.svg"},
        {id: v4(), name: "Gestão", about: "depressão e mt sofrimento", imageURL: "gestao_avatar.svg"}, 
        {id: v4(), name: "Marketing", about: "bo vender uma viagem pra um cara com o dinheiro do auxilio apenas kk", imageURL: "marketing_avatar.svg"},
        {id: v4(), name: "RocketWolf", about: "ovo lança fuguetin", imageURL: "rocketwolf_avatar.svg"},
        {id: v4(), name: "SocialWolf", about:"ajuda uns velhinho", imageURL: "socialwolf_avatar.svg"},
        {id: v4(), name: "WolfBotz", about: "ih bo criar robô que briga kkk", imageURL: "wolfbotz_avatar.svg"},
        {id: v4(), name: "WolfByte", about: "n ve a luz do sol", imageURL: "wolfbyte_avatar.svg"},
        {id: v4(), name: "WolfPower", about: "vamo estoca vento", imageURL: "wolfpower_avatar.svg"}
      ]);
    });
};
