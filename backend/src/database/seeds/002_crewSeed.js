const {v4} = require("uuid");

exports.seed = function(knex) {
  
  return knex('crews').del()
    .then(function () {
      
      return knex('crews').insert([
		{id: v4(), name: "WIE", about: "Essa é braba", image: "./WIE_logo.svg"},
        {id: v4(), name: "Gestão", about: "depressao e mt sofrimento", image: "./Gestao_logo.svg"}, 
        {id: v4(), name: "Marketing", about: "bo vender uma viagem pra um cara com o dinheiro do auxilio apenas kk", image: "./Marketing_logo.svg"},
        {id: v4(), name: "RocketWolf", about: "ovo lança fuguetin", image: "./Rocketwolf_logo.svg"},
        {id: v4(), name: "SocialWolf", about:"ajuda uns velhinho", image: "./Socialwolf_logo.svg"},
        {id: v4(), name: "WolfBotz", about: "ih bo criar robo que briga kkk", image: "./Wolfbotz_logo.svg"},
        {id: v4(), name: "WolfByte", about: "n ve a luz do sol", image: "./Wolfbyte_logo.svg"},
        {id: v4(), name: "WolfPower", about: "vamo estoca vento", image: "./Wolfpower_logo.svg"}
      ]);
    });
};
