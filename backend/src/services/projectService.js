const knex = require("../database");
const {v4} = require("uuid");

module.exports = {
    async index() {
        let projects = await knex("projects").select();
        return projects;
    },

    async show(id){
        try {
            let project = await knex("projects").select().where({id});
            return project;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async create(name, description, image, members, beginning, ended, crew_name){
        let status = false //rever lógica depois

        if(ended === null ){
            status = true;
        }

        try {
            let {id: crew_id} = await crewService.getCrew(crew_name);
            
            if(crew_id != null){
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

                return {message: "Projeto adicionado"};
            } else {
                throw new Error("Equipe necessária");
            }
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