const knex = require("../database");
const {v4} = require("uuid");



//Fazer os tratamentos com try-catch e retornar os status codes corretos para cada situação.
module.exports = {

    async index(req, res){
        let projects = await knex("projects");
        return res.json({"projects": projects});
    },
	
	//pensar no fato de no futuro existirem projetos de várias equipes!!!! Teriamos problemas com o first -> pensar em uma solução
    async create(req, res){ 
        let { name, description, image, members, crew_name } = req.body;
        let {id: crew_id} = await knex("crews").select("id").where({"name": crew_name}).first();
		if(crew_id != null){
            try {
                await knex("projects").insert({
                    id: v4(),
                    name,
                    description,
                    image,
                    members,
                    crew_id
                });
                return res.json({"message": "Projeto adicionado"});
            } catch(err) {
                return res.json({"message": err.message})
            }
	    } 
		return res.json({"message": "Equipe necessária"});
    },


    async delete(req, res){
        let {id} = req.body;
        let confirmation = await knex("projects").where({id}).delete();
        return res.json({"message": confirmation});
    }

}

/*

    Conteúdo dos projetos:

    "id": 1,
    "name": "Site do Ramo",
    "description": "site boladao",
    "image": "link foto do ben 10 com a cabeça amassada",
    "members": "Eu, Tu e ele",
    "created_at" = "30 de fevereiro",
    "updated_at" = "32 de Dezembro"

*/