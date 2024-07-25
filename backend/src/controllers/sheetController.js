const sheetService = require('../services/sheetService');

module.exports = {
	async insert(values) {
		console.log('Iniciando a função insert com os valores:', values);
		
		values.registrationData.availableDate = values.registrationData.availableDate.join(', ');
		console.log('Data disponível formatada:', values.registrationData.availableDate);
	
		const listValues = Object.values(values.personalInformation).concat(Object.values(values.registrationData));
		console.log('Valores para inserção na planilha:', listValues);
		
		const data = {
			'values': listValues
		};
	
		try {
			console.log('Inserindo dados na planilha:', data);
			await sheetService.insert(data);
			console.log('Dados inseridos com sucesso.');
		} catch (err) {
			console.log('Erro ao inserir dados na planilha:', err.message);
			throw new Error(err.message);
		}
	},
	
	async delete(req, res) {
		console.log('Iniciando a função de exclusão das informações da planilha.');
		try {	
			await sheetService.delete();
			console.log('Dados deletados com sucesso.');
		} catch (err) {
			console.log('Erro ao deletar dados da planilha:', err);
			return res.status(405).json({message: err.message});
		}
	}
};