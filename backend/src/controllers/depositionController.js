const knex = require("../database");
const {v4} = require("uuid");

module.exports = {

    async index(req, res){
        let depositions = await knex("depositions");
        return res.json(depositions);
    },

    async create(req, res){
        try{
            let {name, crew, text} = req.body;
            let deposition = knex("depositions").insert({

                id: v4(),
                name,
                crew,
                text 
            });

            return res.status(200).json(deposition);
        }
        catch(err){
            return res.status(404).json({"message": "Something was wrong. Failed create operation."});
        }
    },

    async delete(req, res){
        try{

            let {id} = req.params;
            let confirmation = await knex("depositions").where({id}).delete();
            return res.status(200).json({"message": confirmation});
        }
        catch(err){
            return res.status(404).json({"message": "Something was wrong. Failed delete operation"});
        }
    },

    async update(req, res){

        try{

            let {deposition} = req.params;
            let {data, update} = req.body;
            let confirmation = await knex("depositions").where({deposition}).update({data, update});
            return res.status(200).json({"message": confirmation});
        }
        catch(err){
            return res.status(404).json({"message": "Something was wrong. Failed patch operation."});
        }

    }
}