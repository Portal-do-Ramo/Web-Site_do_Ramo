const knex = require("../database");
const {v4} = require("uuid");

//Fazer os tratamentos com try-catch e retornar os status codes corretos para cada situação.
module.exports = {

    async index(req, res){
        let projects = await knex("projects");
        return res.status(200).json({"projects": projects});
    },

	async show(req,res) {
		let { id } = req.params;
		let project = await knex("projects").select().where({id});
		return res.status(200).json(project);
	},
	
	//pensar no fato de no futuro existirem projetos de várias equipes!!!! Teriamos problemas com o first -> pensar em uma solução
    async create(req, res){ 
        let { name, description, image, members, crew_name, beginning, ended } = req.body;
        let status = false //rever lógica depois

        if(ended === null ){
            status = true;
        }

        let {id: crew_id} = await knex("crews").select("id").where({"name": crew_name}).first();
		if(crew_id != null){
            try {
                await knex("projects").insert({
                    id: v4(),
                    name,
                    description,
                    image,
                    members,
                    beginning, 
                    ended,
                    crew_id, 
                    status
                });
                return res.status(201).json({"message": "Projeto adicionado"});
            } catch(err) {
                return res.status(422).json({"message": err.message})
            }
	    } 
		return res.json({"message": "Equipe necessária"});
    },

    async update(req, res){
        try{
            let{ project, data, update } = req.body;
            let confirmation = await knex("projects").where({project}).update();
            return res.status(200).json({"message": confirmation});
        } catch(err) {
            return res.status(405).json({"message": err.message});
        }  
    },
    
    async delete(req, res){

        try{
            let {id} = req.body;
            let confirmation = await knex("projects").where({id}).delete();
            return res.status(200).json({"message": confirmation});
        } catch(err) {
            return res.status(405).json({"message": err.message})
        }
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