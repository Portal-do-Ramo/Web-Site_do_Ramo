const fs = require("fs");

path = `${__dirname}/../../uploads/pse.csv`;

dataColumns = ["nomeCompleto", "dataDeNascimento", "celular", "eMail", "facebook", "linkedIn", "instagram", "matricula", "curso", "periodo", "equipe", "porQuaisMotivos", "area", "experiencia", "diaDaDinamica"];


function csvHandler(input){ //array com as informações do usuário -> como o dataColumns
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