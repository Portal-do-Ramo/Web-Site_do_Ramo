const knex = require('../database');

module.exports = {
    async createUser(req, res){
        const {name, email, password, role} = req.body;
        await knex('users').insert({
            name, 
            email,
            password, 
            role
        })
        res.send();
    }
}