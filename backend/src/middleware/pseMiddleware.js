const knex = require("../database");

async function pseMiddleware(req, res, next) {

  console.log('Log in pseMiddleware\n')
  console.log('Body do Forms do PSE')
  console.log(req.body)

    let response = await knex("pse").select("*");
    let currentDate = new Date();
    try{
        
        if(response.length == 0){
            return res.status(403).json("PSE has not been scheduled");    
        }
        return next();
        if(currentDate >= response[0].start && currentDate <= response[0].end){
            return next();
        }

        return res.status(403).json("PSE has not been scheduled");

    } catch(err){
        throw new Error(err.message);
    }

}

module.exports = pseMiddleware;