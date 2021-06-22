const { v4 } = require("uuid");
const knex = require("../database");

module.exports = {

    async index(req,res) { 
            let news = await knex("news");
            return res.json(news);
    },
    
    async show(req,res) { //mostrar só um
        let {id} = req.params;
			let news = await knex("news").select().where({id});
            return res.json(news);
    },
	
    async create(req,res) {
		let { title, body, img} = req.body;

        try {
            await knex("news").insert({
				id: v4(),
                title,
                body,
                img,
				user_id: v4() //teste
            });
            return res.status(201).json({"message": "Notícia criada"});
        } catch(err) {
            return res.json({"message": err.message});
        }
    },

    async update(req, res) {
        let { news, data, update } = req.body;
        try{
            await knex('news').where(news).update(data, update);
            return res.status(200).json({"message": "Notícia atualizada"});
        } catch(err){
            return res.status(400).json({"message": err.message});
        }
    },

    //Padronizar o parâmetro a ser passado para o delete. Alguns controllers estão utilizando ID's, outros o nome do objeto desejado
    async delete(req,res) {
		try{
			let {news} = req.body;   
			let confirmation = await knex('news').where({"name": news}).delete();
			return res.json({'message': confirmation});
		} catch(err) {
			return res.json({"message": err.message})
		}
    }

}