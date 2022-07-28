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
        try {
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
        } catch (error) {
            throw new Error("crew does not exists");
        }
    },
        
    // Talvez tenha que existir uma tabela só pra membros de projetos, com uma lógica de 1 membro para muitos projetos.
    async create(name, description, members, crew_name, beginning, ended) { //Repensar a lógica dos members
        let imageURL = name.toLowerCase() + "_banner.png";
        let logoURL = name.toLowerCase() + "_avatar.png";
        let miliseconds = Date.parse(beginning)
        
        const projectValidation = Joi.object({
            name: Joi.string().required(),    
            description: Joi.string().required(),
            members: Joi.array().items(Joi.string()).required(),
            beginning: Joi.date().timestamp(),
            ended: Joi.date().timestamp(),
            crew_name: Joi.string(),
        });
            
        const {error} = projectValidation.validate({name, description, members, beginning: miliseconds, ended, crew_name});
        if (error){
            throw new Error(error.message);
        }

        const crew = await crewService.getCrewByName(crew_name);
        
        if (!crew) {
            throw new Error("Equipe não existe!");
        }
            
        const project = await knex("projects").where({name, crew_id: crew.id}).first();
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
    },

    async update(id, project){
        let Project = await knex("projects").where({id}).first();
        if(!Project){
            throw new Error("Projeto não existe!");
        }

        await knex("projects").where({id}).update(project); //trocar o timestamp do updated_at
        return {message: "Projeto atualizado!"}
     
    },

    async delete(id){
        let project = await knex("projects").where({id}).first();
        if(!project){
            throw new Error("Projeto não existe!");
        }

        let confirmation = await knex("projects").where({id}).delete();
        if(confirmation > 1){
			return {message: "Projetos deletados"};
		}

        return {message: "Projeto deletado"};
    }
}