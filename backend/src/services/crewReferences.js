const knex = require("../database");

module.exports = {
	getCrew(crew_name){
		let crew = knex('crews').where({"name": crew_name}).select();
		return crew;
	}	
}