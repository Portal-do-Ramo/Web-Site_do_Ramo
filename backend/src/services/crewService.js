const knex = require('../database');
const {v4} = require('uuid');
const fileService = require('./fileService');

module.exports = {
	async index() {
		let crews = await knex('crews')
			.select('id', 'name', 'about', 'imageURL')
			.orderBy([ {column: 'created_at', order: 'desc'} ]);
		return crews;
	},

	async getCrew(id) {
		const crew = await knex('crews').select('id', 'name', 'about', 'imageURL').where({id}).first();
        
		if(!crew) {
			throw new Error('Equipe não existe!');
		}
        
		return crew;
	},

	async create(name, about) {
		let crewExists = await knex('crews').where({name}).first();
    
		if(crewExists){
			throw new Error('Equipe já existe!');
		}

		const id = v4();

		const crew = await knex('crews').insert({
			id: id,
			name, 
			about,
			imageURL: id.toLowerCase() + '_crew_avatar.png'
		}).returning('id');

		return { id: crew[0] };
	},

	async update(id, crew) {
		let Crew = await knex('crews').where({id}).first();
        
		if (!Crew){
			throw new Error('Equipe não existe!');
		}

		await knex('crews').where({id}).update(crew);

		return {message: 'Equipe atualizada!'};
	},

	async delete(id) {
		let crew = await knex('crews').where({id}).first();
		if(!crew){
			throw new Error('Equipe não existe!');
		}

		let project = await knex('projects').where({crew_id: id}).first()
		
		await fileService.removeImage(crew.imageURL);
		await fileService.removeImage(project.imageURL);
		await fileService.removeImage(project.logoURL);
		
		let confirmation = await knex('crews').where({id}).delete();

		if(confirmation > 1) {
			return {message: 'Equipes deletadas!'};
		}

            
		return {message: 'Equipe deletada!'};
	}
};