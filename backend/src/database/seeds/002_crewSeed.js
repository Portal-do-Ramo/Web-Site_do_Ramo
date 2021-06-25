const {v4} = require("uuid");

exports.seed = function(knex) {
  
  return knex('crews').del()
    .then(function () {
      
      return knex('crews').insert([
        
        {id: v4(), name: "Gestão", about: "depressao e mt sofrimento", image: "www.sitedoramo.com/gestao"}, 
        {id: v4(), name: "Marketing", about: "bo vender uma viagem pra um cara com o dinheiro do auxilio apenas kk", image: "www.sitedoramo.com/marketing"},
        {id: v4(), name: "RocketWolf", about: "ovo lança fuguetin", image: "www.sitedoramo.com/rocketwolf"},
        {id: v4(), name: "SocialWolf", about:"ajuda uns velhinho", image: "www.sitedoramo.com/socialwolf"},
        {id: v4(), name: "WIE", about: "Essa é braba", image: "www.sitedoramo.com/wie"},
        {id: v4(), name: "WolfBotz", about: "ih bo criar robo que briga kkk", image: "www.sitedoramo.com/wolfbotz"},
        {id: v4(), name: "WolfByte", about: "n ve a luz do sol", image: "www.sitedoramo.com/wolfbyte"},
        {id: v4(), name: "WolfPower", about: "vamo estoca vento", image: "www.sitedoramo.com/wolfpower"}
      ]);
    });
};
