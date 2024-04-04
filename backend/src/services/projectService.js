const {v4} = require('uuid');
const knex = require('../database');
const Joi = require('joi');
const crewService = require('./crewService');
const fs = require('fs');

module.exports = {
	async index() {
		let projects = await knex('projects')
			.select (
				'id', 
				'name', 
				'description', 
				'imageURL', 
				'logoURL', 
				'members', 
				'beginning', 
				'ended',
				'crew_id'
			);
		return projects;
	},

	async getProject(id) {
		try {
			let project = await knex('projects')
				.select (
					'id', 
					'name', 
					'description', 
					'imageURL', 
					'logoURL', 
					'members', 
					'beginning', 
					'ended',
					'crew_id'
				).where({id}).first();

			return project;
		} catch (error) {
			throw new Error('project does not exists');
		}
	},

	async getByCrewId(crew_id) {    
		try {
			let projects = await knex('projects')
				.select (
					'id', 
					'name', 
					'description', 
					'imageURL', 
					'logoURL', 
					'members', 
					'beginning', 
					'ended',
					'crew_id'
				).where({crew_id}).orderBy([ {column: 'created_at', order: 'desc'} ]);
			return projects;
		} catch (error) {
			throw new Error('crew does not exists');
		}
	},
        
	async create(name, description, members, crew_id, beginning, ended) {
		const id = v4();

		let imageURL = id.toLowerCase() + '_project_banner.png';
		let logoURL = id.toLowerCase() + '_project_avatar.png';
		let beginningMilliseconds = Date.parse(beginning);
		let endedMilliseconds = Date.parse(beginning);
        
		const projectValidation = Joi.object({
			name: Joi.string().required(),  
			description: Joi.string().required(),
			members: Joi.string(),
			beginning: Joi.date().timestamp(),
			ended: Joi.date().timestamp(),
			crew_id: Joi.string(),
		});
            
		const {error} = projectValidation.validate({name, description, members, beginning: beginningMilliseconds, ended: endedMilliseconds, crew_id});
        
		if (error){
			throw new Error(error.message);
		}

		const crew = await crewService.getCrew(crew_id);
        
		if (!crew) {
			throw new Error('Equipe não existe!');
		}

		const projectExists = await knex('projects').where({name, crew_id}).first();

		if (projectExists) {
			throw new Error('Projeto já existe!');
		}
        
		const project = await knex('projects').insert({
			id,
			name,
			description,
			imageURL,
			logoURL,
			members,
			beginning, 
			ended,
			crew_id: crew.id
		}).returning('id');

		return { id: project[0] };
	},

	async update(id, project){
		let Project = await knex('projects').where({id}).first();
        
		if(!Project){
			throw new Error('Projeto não existe!');
		}

		if (project.members && project.name) {
			project = {
				...project,
				members: project.members,
			};
		}

		await knex('projects').where({id}).update(project);
		return {message: 'Projeto atualizado!'};
     
	},

	async delete(id){
		let project = await knex('projects').where({id}).first();

		if(!project){
			throw new Error('Projeto não existe!');
		}

		if (fs.existsSync(`./uploads/${project.imageURL}`))
			fs.unlinkSync(`./uploads/${project.imageURL}`);

		if (fs.existsSync(`./uploads/${project.logoURL}`))
			fs.unlinkSync(`./uploads/${project.logoURL}`);

		let confirmation = await knex('projects').where({id}).delete();
		if(confirmation > 1){
			return {message: 'Projetos deletados'};
		}

		return {message: 'Projeto deletado'};
	}
};