const {v4} = require("uuid");

exports.seed = function(knex) {
  
  return knex('crews').del()
    .then(function () {
      
      return knex('crews').insert([
		    {id: v4(), name: "WIE", about: "Essa é braba", imageURL: "http://localhost:5000/api/uploads/wie.svg"},
        {id: v4(), name: "Gestão", about: "depressão e mt sofrimento", imageURL: "http://localhost:5000/api/uploads/gestao.svg"}, 
        {id: v4(), name: "Marketing", about: "bo vender uma viagem pra um cara com o dinheiro do auxilio apenas kk", imageURL: "http://localhost:5000/api/uploads/marketing.svg"},
        {id: v4(), name: "RocketWolf", about: "ovo lança fuguetin", imageURL: "http://localhost:5000/api/uploads/rocketwolf.svg"},
        {id: v4(), name: "SocialWolf", about:"ajuda uns velhinho", imageURL: "http://localhost:5000/api/uploads/socialwolf.svg"},
        {id: v4(), name: "WolfBotz", about: "ih bo criar robô que briga kkk", imageURL: "http://localhost:5000/api/uploads/wolfbotz.svg"},
        {id: v4(), name: "WolfByte", about: "n ve a luz do sol", imageURL: "http://localhost:5000/api/uploads/wolfbyte.svg"},
        {id: v4(), name: "WolfPower", about: "vamo estoca vento", imageURL: "http://localhost:5000/api/uploads/wolfpower.svg"}
      ]);
    });
};
