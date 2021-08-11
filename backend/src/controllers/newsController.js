const { v4 } = require("uuid");
const knex = require("../database");

module.exports = {

    async index(req, res) { 
            let news = await knex("news");
            return res.status(200).json(news);
    },
    
    async show(req, res) { //mostrar só um
        let { id } = req.params;
			let news = await knex("news").select().where({id});
            return res.status(200).json(news);
    },
	
    async create(req, res) {
		let { title, resume, body, user_id} = req.body;
		
		const requestImages = req.files;
		
		const img = requestImages.map(image => {
            return { path:image.filename}
        })

        try {
            await knex("news").insert({
				id: v4(),
                title,
				resume,
                body,
                img,
				user_id
            });
            return res.status(201).json({"message": "Notícia criada"});
        } catch(err) {
            return res.status(422).json({"message": err.message});
        }
    },

    async update(req, res) {
        let { id, news } = req.body;
		try {
			await knex("news").update(news).select({id}); //trocar o timestamp do updated_at
			return res.status(200).json({"message": "Notícia atualizada!!"});
		} catch(err){
			return res.status(405).json({"message": err.message});
		}
    },

    //Padronizar o parâmetro a ser passado para o delete. Alguns controllers estão utilizando ID's, outros o nome do objeto desejado
    async delete(req, res) {
		try{
			let {news} = req.body;   
			let confirmation = await knex("news").where({"title": news}).delete();
			if(confirmation > 1){
				return res.status(200).json({"message": "Notícias deletadas"});
			}
			return res.status(200).json({"message": "Notícia deletada"});
		} catch(err) {
			return res.status(405).json({"message": err.message});
		}
    }

}