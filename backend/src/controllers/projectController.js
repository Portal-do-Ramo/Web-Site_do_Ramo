const projectService = require("../services/projectService");
const crewService = require("../services/crewService");

//Fazer os tratamentos com try-catch e retornar os status codes corretos para cada situação.
module.exports = {

    async index(req, res){
        let projects = await projectService.index();;
        return res.status(200).json({"projects": projects});
    },

	async show(req,res) {
		let { id } = req.params;
        let project = await projectService.show(id);
		return res.status(200).json(project);
	},
	
	//pensar no fato de no futuro existirem projetos de várias equipes!!!! Teriamos problemas com o first -> pensar em uma solução
    async create(req, res){ 
        let { name, description, image, members, crew_name, beginning, ended } = req.body;
        let status = false //rever lógica depois

        if(ended === null ){
            status = true;
        }
        
        let {id: crew_id} = await crewService.getCrew(crew_name).first();
		if(crew_id != null){
            try {
                await projectService.create(name, description, image, members, beginning, ended, crew_id, status);
                return res.status(201).json({"message": "Projeto adicionado"});
            } catch(err) {
                return res.status(422).json({"message": err.message})
            }
	    } 
		return res.json({"message": "Equipe necessária"});
    },

    async update(req, res){
		let { id, project } = req.body;
		try {
			await projectService.update(id, project);
			return res.status(200).json({"message": "Projeto atualizado!!"});
		} catch(err){
			return res.status(405).json({"message": err.message});
		}
    },
    
    async delete(req, res){

        try{
            let {id} = req.body;
            let confirmation = await projectService.delete(id);
			if(confirmation > 1){
				return res.status(200).json({"message": "Projetos deletados"});
			}
            return res.status(200).json({"message": "Projeto deletado"});
        } catch(err) {
            return res.status(405).json({"message": err.message})
        }
    }
}

/*

    Conteúdo dos projetos:

    "id": 1,
    "name": "Site do Ramo",
    "description": "site boladao",
    "image": "link foto do ben 10 com a cabeça amassada",
    "members": "Eu, Tu e ele",
    "created_at" = "30 de fevereiro",
    "updated_at" = "32 de Dezembro"

*/