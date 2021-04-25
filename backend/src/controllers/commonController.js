//importação do banco de dados
const database = require('../database');

module.exports = {
    async index(req, res){
        res.send('Olá Mundo');
    }
}