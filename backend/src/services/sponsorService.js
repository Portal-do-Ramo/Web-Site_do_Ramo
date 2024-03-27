const knex = require('../database');
const {v4} = require('uuid');

module.exports = {
	async index() {
		let sponsors = await knex('sponsors').select('*');
		return sponsors;
	},

	async create(name, link) {
		const id = v4();

		let imageURL = id.toLowerCase() + '_avatar.png';
		let sponsor = await knex('sponsors').where({name}).first();
		if (sponsor){
			throw new Error('Patrocinador já existe!');
		}

		await knex('sponsors').insert({
			id, 
			name,
			imageURL, 
			link
		});

		return {message: 'Patrocinador criado!'};
	},

	async update(id, sponsor) {
		let Sponsor = await knex('sponsors').where({id}).first();
        
		if (!Sponsor){
			throw new Error('Patrocinador não existe!');
		}

		await knex('sponsors').where({id}).update(sponsor); //trocar o timestamp do updated_at
		return {message: 'Patrocinador atualizado!'};
        
	},

	async delete(id){
		let sponsor = await knex('sponsors').where({id}).first();
		if (!sponsor){
			throw new Error('Patrocinador não existe!');
		}

		let confirmation = await knex('sponsors').where({id}).delete();
		if(confirmation > 1){
			return {message: 'Patrocinadores foram deletados'};
		} 

		return {message: 'Patrocinador deletado!'};
	}

};