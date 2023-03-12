const fs = require("fs");

path = `${__dirname}/../../uploads/pse.csv`;

dataColumns = ["nomeCompleto", "endereco", "celular", "Email", "facebook", "linkedIn", "instagram", "matricula", "curso", "periodo", "equipe", "area", "dataDinamicaPrincipal", "dataDinamicaSecundaria", "porQuaisMotivos", "experiencia"];

function csvHandler(input){
	if(fs.existsSync(path)){
		fs.appendFile(path, `${input.join(",")}\n`, err => {
			if(err){
				throw err;
			}
		});
	} else {
		fs.writeFile(path, `${dataColumns.join(",")}\n`, err => {
			if(err){
				throw err;
			}
			csvHandler(input); //recursivamente
		});
	}
}

module.exports = csvHandler;