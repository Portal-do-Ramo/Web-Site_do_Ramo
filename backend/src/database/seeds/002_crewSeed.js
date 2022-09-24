const {v4} = require("uuid");

exports.seed = function(knex) {
  
  return knex('crews').del()
    .then(function () {
      
      return knex('crews').insert([
		    {id: v4(), name: "WIE", about: "", imageURL: "wie_crew_avatar.svg"},
        {id: v4(), name: "Gestão", about: "", imageURL: "gestao_crew_avatar.svg"}, 
        {id: v4(), name: "Marketing", about: "", imageURL: "marketing_crew_avatar.svg"},
        {id: v4(), name: "RocketWolf", about: "", imageURL: "rocketwolf_crew_avatar.svg"},
        {id: v4(), name: "SocialWolf", about:"", imageURL: "socialwolf_crew_avatar.svg"},
        {id: v4(), name: "WolfBotz", about: "", imageURL: "wolfbotz_crew_avatar.svg"},
        {id: v4(), name: "WolfByte", about: "", imageURL: "wolfbyte_crew_avatar.svg"},
        {id: v4(), name: "WolfPower", about: "", imageURL: "wolfpower_crew_avatar.svg"}
      ]);
    });
};
