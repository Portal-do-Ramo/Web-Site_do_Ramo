const {v4} = require("uuid");
const knex = require("../database");
const Joi = require("joi");
const crewService = require("./crewService");
const fs = require("fs");

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

    async getProject(id) {
        try {
            let project = await knex("projects")
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
                ).where({id}).first();

                return project;
        } catch (error) {
            throw new Error("project does not exists");
        }
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
        
    async create(name, description, members, crew_id, beginning, ended) {
        let imageURL = name.toLowerCase() + "_banner.png";
        let logoURL = name.toLowerCase() + "_avatar.png";
        let miliseconds = Date.parse(beginning)
        
        const projectValidation = Joi.object({
            name: Joi.string().required(),    
            description: Joi.string().required(),
            members: Joi.array().items(Joi.string()).required(),
            beginning: Joi.date().timestamp(),
            ended: Joi.date().timestamp(),
            crew_id: Joi.string(),
        });
            
        const {error} = projectValidation.validate({name, description, members, beginning: miliseconds, ended, crew_id});
        if (error){
            throw new Error(error.message);
        }

        const crew = await crewService.getCrew(crew_id);
        
        if (!crew) {
            throw new Error("Equipe não existe!");
        }
            
        const project = await knex("projects").where({name, crew_id}).first();
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

        return {message: "Projeto adicionado!"};
    },

    async update(id, project){
        let Project = await knex("projects").where({id}).first();
        
        if(!Project){
            throw new Error("Projeto não existe!");
        }

        if (project.members && project.name) {
            project = {
                ...project,
                members: project.members.join(),
            }
        }

        if (project.name) {
            project = {
                ...project,
                imageURL: `${project.name}_banner.${Project.imageURL.split(".")[1]}`,
                logoURL: `${project.name}_avatar.${Project.logoURL.split(".")[1]}`
            }
        }

        if (fs.existsSync(`./uploads/${Project.imageURL}`))
            fs.rename(
                `./uploads/${Project.imageURL}`, 
                `./uploads/${project.name}_avatar.${Project.imageURL.split(".")[1]}`,
                () => {}
            );

        if (fs.existsSync(`./uploads/${Project.logoURL}`))
            fs.rename(
                `./uploads/${Project.logoURL}`, 
                `./uploads/${project.name}_avatar.${Project.logoURL.split(".")[1]}`,
                () => {}
            );

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