const knex = require("../database");
const {v4} = require("uuid");

module.exports = {

    async index(){
        let projects = await knex("projects").select();
        return projects;
    },

    async show(id){
		let project = await knex("projects").select().where({id});
        return project;
    },

    async create(name, description, image, members, beginning, ended, crew_id){
        let status = false //rever lógica depois

        if(ended === null ){
            status = true;
        }
        
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
    },

    async update(id, project){
        await knex("projects").where({id}).update(project); //trocar o timestamp do updated_at
    },

    async delete(id){
        let confirmation = await knex("projects").where({id}).delete();
        return confirmation;
    }

}