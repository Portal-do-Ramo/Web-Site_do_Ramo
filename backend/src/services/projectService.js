const {v4} = require("uuid");
const knex = require("../database");
const Joi = require("joi");
const crewService = require("./crewService");

module.exports = {
    async index() {
        let projects = await knex("projects")
        .select (
            "id", 
            "name", 
            "description", 
            "imageURL", 
            "logoURL", 
            "members", 
            "beginning", 
            "ended",
            "crew_id"
        );
        return projects;
    },

    async getByCrewId(crew_id) {
        
        let projects = await knex("projects")
        .select (
            "id", 
            "name", 
            "description", 
            "imageURL", 
            "logoURL", 
            "members", 
            "beginning", 
            "ended",
            "crew_id"
            ).where({crew_id});
            
            return projects;
        },
        
    // Talvez tenha que existir uma tabela só pra membros de projetos, com uma lógica de 1 membro para muitos projetos.
    async create(name, description, imageURL, logoURL, members, crew_name, beginning, ended) { //Repensar a lógica dos members
        try {
            const projectValidation = Joi.object({
                name: Joi.string().required(),    
                description: Joi.string().required(),
                imageURL: Joi.string().required(),
                logoURL: Joi.string().required(),
                members: Joi.array().items(Joi.string()).required(),
                beginning: Joi.date().timestamp(),
                ended: Joi.date().timestamp(),
                crew_name: Joi.string(),
            });
            
            projectValidation.validate({name, description, imageURL, logoURL, members, beginning, ended, crew_name});
            
            const crew = await crewService.getCrewByName(crew_name);

            if (!crew) {
                throw new Error("Equipe não existe!");
            }
            
            const project = await knex("projects").select("id").where({name, crew_id: crew.id}).first();

            if (project) {
                throw new Error("Projeto já existe!");
            }
            
            const membersString = members.join();

            await knex("projects").insert({
                id: v4(),
                name,
                description,
                imageURL,
                logoURL,
                members: membersString,
                beginning, 
                ended,
                crew_id: crew.id
            });

            return {message: "Projeto adicionado"};
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async update(id, project){
        try {
            await knex("projects").where({id}).update(project); //trocar o timestamp do updated_at
            return {message: "Projeto atualizado!"}
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async delete(id){
        try {
            let confirmation = await knex("projects").where({id}).delete();

            if(confirmation > 1){
				return res.status(200).json({"message": "Projetos deletados"});
			}

            return {message: "Projeto deletado"};
        } catch (error) {
                   
        }
    }
}