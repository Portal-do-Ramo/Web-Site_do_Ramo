const knex = require('../database');
const { v4 } = require('uuid');
const { scheduleJob, scheduledJobs } = require('node-schedule');
const { isBefore } = require('date-fns');
const Joi = require('joi');
const { db } = require('../database/firebase');
const registerPSE = db.collection('registerPSE');
const sheetController = require('../controllers/sheetController');
const moment = require('moment');
const sendEmail = require('../utils/sendEmail');

function validateDate(date) {
	const currentDate = new Date();

	if (isBefore(currentDate, date)) {
		throw new Error('Data de aniversário inválida!');
	}
}

module.exports = {
	async create(info) {
		console.log('Validando dados de inscrição do pse');
		const pseValidation = Joi.object({
			fullname: Joi.string().min(3).required(),
			phone: Joi.string().pattern(/^[0-9]+$/).required(),
			email: Joi.string().min(6).email().required(),
			birthday: Joi.date().required(),
			linkedin: Joi.string().allow(null, '').optional(),
			instagram: Joi.string().allow(null, '').optional(),
			gender: Joi.string().required(),
			neuroatypicality: Joi.string().required(),
			PcD: Joi.string().required(),
			selfDeclaration: Joi.string().required(),
			register: Joi.string().allow(null, '').optional(),
			course: Joi.string().required(),
			currentPeriod: Joi.string().required(),
			crew: Joi.string().required(),
			area: Joi.string().required(),
			availableDate: Joi.array().required(),
			HowFoundIeee: Joi.string().required(),
			reason: Joi.string().required(),
			experience: Joi.string().required(),
		});

		const { error, value } = pseValidation.validate(info);
		if (error) {
			throw new Error(error.message);
		}

		if (value.linkedin === undefined) {
			value.linkedin = '';
		}

		if (value.instagram === undefined) {
			value.instagram = '';
		}

		validateDate(value.birthday);
		value.birthday = moment.utc(value.birthday).format('DD/MM/YYYY');

		console.log('Dados do formulário de inscrição válidos.');

		const personalInformation = {
			fullname: value.fullname,
			phone: value.phone,
			email: value.email,
			birthday: value.birthday,
			linkedin: value.linkedin,
			instagram: value.instagram,
			gender: value.gender,
			neuroatypicality: value.neuroatypicality,
			PcD: value.PcD,
			selfDeclaration: value.selfDeclaration
		};

		const registrationData = {
			register: value.register,
			course: value.course,
			currentPeriod: value.currentPeriod,
			crew: value.crew,
			area: value.area,
			availableDate: value.availableDate,
			HowFoundIeee: value.HowFoundIeee,
			reason: value.reason,
			experience: value.experience
		};

		const data = {
			personalInformation,
			registrationData
		};

		console.log('Verificando duplicação de email e telefone.');

		const subscriberEmail = await registerPSE.where('personalInformation.email', '==', value.email).get();
		const subscriberPhone = await registerPSE.where('personalInformation.phone', '==', value.phone).get();
		const subscriberRegister = await registerPSE.where('registrationData.register', '==', value.register).get();

		if (!subscriberEmail.empty) {
			throw new Error('Email inserido já foi cadastrado!');
		}

		if (!subscriberPhone.empty) {
			throw new Error('Número de telefone inserido já foi cadastrado!');
		}

		if (!subscriberRegister.empty) {
			throw new Error('Matrícula inserida já foi cadastrada!');
		}

		await registerPSE.add(data);
		await sheetController.insert(data);
		await sendEmail(personalInformation.email);
		return { 'message': 'usuário cadastrado!' };
	},

	async getSchedulePSE() {
		try {
			console.log('Buscando informações do pse.');
			const data = await knex('pse').select('start', 'end', 'dinamycDate_1', 'dinamycDate_2', 'dinamycDate_3', 'dinamycDate_4', 'dinamycDate_5').first();

			if (!data) {
				console.log('Informações do pse não encontradas. ', data);
				throw new Error('PSE has not been scheduled!');
			}	

			console.log('Informações do pse encontradas: ', data);


			return data;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	async getDinamycDatesPSE() {
		try {
			console.log('Buscando datas de dinâmica do processo seletivo.');
			let data = await knex('pse').select('dinamycDate_1', 'dinamycDate_2', 'dinamycDate_3', 'dinamycDate_4', 'dinamycDate_5').first();

			if (!data) {
				throw new Error('PSE has not been scheduled!');
			}

			console.log('Datas de dinâmicas encontradas.', data);

			let dinamycDate_1, dinamycDate_2, dinamycDate_3, dinamycDate_4, dinamycDate_5;

			if (data.dinamycDate_1) {
				dinamycDate_1 = `Dia ${moment(data.dinamycDate_1).utcOffset(-3).locale('pt').format('D/MM (dddd) - kk:mm')}`;
			}
			if (data.dinamycDate_2) {
				dinamycDate_2 = `Dia ${moment(data.dinamycDate_2).utcOffset(-3).locale('pt').format('D/MM (dddd) - kk:mm')}`;
			}
			if (data.dinamycDate_3) {
				dinamycDate_3 = `Dia ${moment(data.dinamycDate_3).utcOffset(-3).locale('pt').format('D/MM (dddd) - kk:mm')}`;
			}
			if (data.dinamycDate_4) {
				dinamycDate_4 = `Dia ${moment(data.dinamycDate_4).utcOffset(-3).locale('pt').format('D/MM (dddd) - kk:mm')}`;
			}
			if (data.dinamycDate_5) {
				dinamycDate_5 = `Dia ${moment(data.dinamycDate_5).utcOffset(-3).locale('pt').format('D/MM (dddd) - kk:mm')}`;
			}

			data.dinamycDate_1 = dinamycDate_1;
			data.dinamycDate_2 = dinamycDate_2;
			data.dinamycDate_3 = dinamycDate_3;
			data.dinamycDate_4 = dinamycDate_4;
			data.dinamycDate_5 = dinamycDate_5;

			return data;
		} catch (error) {
			console.log('Erro no service getDinamycDatesPSE:  ', error);
			throw new Error(error.message);
		}
	},

	async deleteSubscribersData() {
		try {
			console.log('Removendo inscritos do firebase.');
			const getDocuments = await registerPSE.get();
			const batch = db.batch();

			console.log('Documentos: ', getDocuments);

			getDocuments.forEach(doc => batch.delete(doc.ref));

			await batch.commit();
			console.log('Documentos deletados.');
			return { message: 'Documents deleted!' };
		} catch (err) {
			console.log('Erro ao deletar inscritos do firebase: ', err);
			throw new Error(err.message);
		}
	},

	async schedulePSE(startDate, endDate, dinamycDate_1, dinamycDate_2, dinamycDate_3, dinamycDate_4, dinamycDate_5) {
		const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}-03:00$/;
		try {
			const endDateFormatted = new Date(endDate);
			const startDateFormatted = new Date(startDate);
			const dinamycDates = [dinamycDate_1, dinamycDate_2, dinamycDate_3, dinamycDate_4, dinamycDate_5];
			const dinamycDatesFormatted = [];

			const jobExists = scheduledJobs['scheduleJobPSE'];

			console.log('Verificação se job de agendamento existe.', jobExists);
			console.log('ScheduleJobs: ', scheduledJobs);

			if (jobExists) {
				console.log('Erro: Job já existe!');
				throw new Error('Job already exists!');
			}

			if (!regex.test(startDate) || !regex.test(endDate)) {
				console.log('Erro: Data mal formatada');
				throw new Error('Date bad formatted');
			}
	
			if (!dinamycDate_1 || !dinamycDate_2 || !dinamycDate_3 || !dinamycDate_4) {
				console.log('Erro: Requer 4 datas dinâmicas');
				throw new Error('Requires 4 dinamyc dates');
			}
	
			for (let i = 0; i < 5; i++) {
				if (dinamycDates[i]) {
					if (!regex.test(dinamycDates[i])) {
						console.log(`Erro: Data dinâmica ${i + 1} mal formatada`);
						throw new Error('Dinamyc date bad formatted');
					}
				}
	
				if (!dinamycDates[i]) {
					dinamycDatesFormatted.push(dinamycDates[i]);
				} else {
					dinamycDatesFormatted.push(new Date(dinamycDates[i]));
				}
			}
	
			if (isBefore(endDateFormatted, startDateFormatted)) {
				console.log('Erro: Data de início não pode ser maior que a data de término');
				throw new Error('start date can\'t be greater than end date');
			}
	
			const data = await knex('pse').select('*');
	
			if (data.length === 0) {
				let currentDate = new Date();
	
				if (isBefore(startDateFormatted, currentDate)) {
					console.log('Erro: Data atual não pode ser maior que a data de início');
					throw new Error('current date can\'t be greater than start date');
				}
	
				for (let i = 0; i < 5; i++) {
					if (dinamycDatesFormatted[i]) {
						if (isBefore(dinamycDatesFormatted[i], currentDate)) {
							console.log('Erro: Data atual não pode ser maior que a data dinâmica');
							throw new Error('current date can\'t be greater than dinamyc date');
						}
	
						if (isBefore(dinamycDatesFormatted[i], startDateFormatted)) {
							console.log('Erro: Data de início não pode ser maior que a data dinâmica');
							throw new Error('start date can\'t be greater than dinamyc date');
						}
	
						if (isBefore(dinamycDatesFormatted[i], endDateFormatted)) {
							console.log('Erro: Data de término não pode ser maior que a data dinâmica');
							throw new Error('end date can\'t be greater than dinamyc date');
						}
					}
				}
				
				console.log('Inserindo informações do pse no banco de dados.');
				await knex('pse').insert({
					id: v4(),
					start: startDate,
					end: endDate,
					dinamycDate_1: dinamycDatesFormatted[0],
					dinamycDate_2: dinamycDatesFormatted[1],
					dinamycDate_3: dinamycDatesFormatted[2],
					dinamycDate_4: dinamycDatesFormatted[3],
					dinamycDate_5: dinamycDatesFormatted[4]
				});


				console.log('Apagando informações dos inscritos da planilha e do firebase.');
				await sheetController.delete();
				await this.deleteSubscribersData();
				console.log('Informações do firebase apagadas com sucesso!');
				//console.log('Informações dos inscritos da planilha e do firebase apagados com sucesso.');
	
			} else {
				console.log('Erro: PSE já agendado!');
				throw new Error('pse already scheduled!');
			}
	
			scheduleJob('scheduleJobPSE', endDateFormatted, async () => {
				try {
					await knex('pse').delete();
				} catch (error) {
					console.log('Erro: ', error.message);
				}
			});
			
			console.log('Serviço agendado: ', scheduledJobs);
			console.log('Serviço agendado para ', endDate);
			return { message: 'service scheduled to ' + endDate };
		} catch (err) {
			console.log('Service - erro ao agendar PSE: ', err);
			throw new Error(err.message);
		}
	},

	async updateSchedulePSE(pse) {
		console.log('Iniciando atualização do agendamento PSE.');
		const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}-03:00$/;
		const pseDatesFormatted = {};
		let verifyUpdateSchedule = false;
		const jobExists = scheduledJobs['scheduleJobPSE'];
		const { end, dinamycDate_1, dinamycDate_2, dinamycDate_3, dinamycDate_4, dinamycDate_5 } = await knex('pse').select('*').first();
		let dinamycDatesList = [dinamycDate_1, dinamycDate_2, dinamycDate_3, dinamycDate_4, dinamycDate_5];
		let endDate;

	
		try {
			if (!jobExists) {
				console.log('Agendamento não existe.', jobExists);
				throw new Error('scheduling does not exist!');
			}
	
			console.log('Verificando e formatando datas.');
			if (pse.startDate && regex.test(pse.startDate)) {
				pseDatesFormatted.start = new Date(pse.startDate);
			}
			if (pse.endDate && regex.test(pse.endDate)) {
				pseDatesFormatted.end = new Date(pse.endDate);
				verifyUpdateSchedule = true;
			}
	
			if (pse.dinamycDate_1 && regex.test(pse.dinamycDate_1)) {
				pseDatesFormatted.dinamycDate_1 = new Date(pse.dinamycDate_1);
				dinamycDatesList[0] = new Date(pse.dinamycDate_1);
			}
	
			if (pse.dinamycDate_2 && regex.test(pse.dinamycDate_2)) {
				pseDatesFormatted.dinamycDate_2 = new Date(pse.dinamycDate_2);
				dinamycDatesList[1] = new Date(pse.dinamycDate_2);
			}
	
			if (pse.dinamycDate_3 && regex.test(pse.dinamycDate_3)) {
				pseDatesFormatted.dinamycDate_3 = new Date(pse.dinamycDate_3);
				dinamycDatesList[2] = new Date(pse.dinamycDate_3);
			}
	
			if (pse.dinamycDate_4 && regex.test(pse.dinamycDate_4)) {
				pseDatesFormatted.dinamycDate_4 = new Date(pse.dinamycDate_4);
				dinamycDatesList[3] = new Date(pse.dinamycDate_4);
			}
	
			if (pse.dinamycDate_5 && regex.test(pse.dinamycDate_5)) {
				pseDatesFormatted.dinamycDate_5 = new Date(pse.dinamycDate_5);
				dinamycDatesList[4] = new Date(pse.dinamycDate_5);
			}
	
			endDate = pse.endDate ? pseDatesFormatted.end : end;
	
			let currentDate = new Date();
	
			if (pseDatesFormatted.end && pseDatesFormatted.start) {
				if (isBefore(pseDatesFormatted.end, pseDatesFormatted.start)) {
					console.log('Data de início não pode ser maior que a data de término.');
					throw new Error('start date can\'t be greater than end date');
				}
			} else if (pseDatesFormatted.start) {
				if (isBefore(end, pseDatesFormatted.start)) {
					console.log('Data de início não pode ser maior que a data de término.');
					throw new Error('start date can\'t be greater than end date');
				}
	
				if (isBefore(pseDatesFormatted.start, currentDate)) {
					console.log('Data atual não pode ser maior que a data de início.');
					throw new Error('current date can\'t be greater than start date');
				}
			}
	
			if (verifyUpdateSchedule && isBefore(pseDatesFormatted.end, currentDate)) {
				console.log('Data atual não pode ser maior que a data de término.');
				throw new Error('current date can\'t be greater than end date');
			}
	
			if (isBefore(pseDatesFormatted.dinamycDate_1, currentDate) ||
				isBefore(pseDatesFormatted.dinamycDate_2, currentDate) ||
				isBefore(pseDatesFormatted.dinamycDate_3, currentDate) ||
				isBefore(pseDatesFormatted.dinamycDate_4, currentDate) ||
				isBefore(pseDatesFormatted.dinamycDate_5, currentDate)) {
				console.log('Data atual não pode ser maior que a data dinâmica.');
				throw new Error('current date can\'t be greater than dinamyc date');
			}
	
			for (let i = 0; i < 5; i++) {
				if (isBefore(dinamycDatesList[i], endDate)) {
					console.log('Data de término não pode ser maior que a data dinâmica.');
					throw new Error('end pse date can\'t be greater than dinamyc date');
				}
			}
	
			if (jobExists && verifyUpdateSchedule) {
				console.log(`Cancelando agendamento do pse. Job: ${jobExists}, verifyUpdateSchedule: ${verifyUpdateSchedule}`);
				jobExists.cancel();
				console.log('Agendamento cancelado.');
			}
	
			console.log('Atualizando PSE no banco de dados.');
			await knex('pse').select('*').update(pseDatesFormatted);
	
			if (verifyUpdateSchedule) {
				console.log('Agendando novo job.');
				scheduleJob('scheduleJobPSE', pseDatesFormatted.end, async () => {
					try {
						await knex('pse').delete();
					} catch (error) {
						console.log('Erro: ', error.message);
					}
				});
			}
	
			console.log('Atualização concluída com sucesso.');
			return { pseDatesFormatted };
		} catch (err) {
			console.log('Erro na atualização do agendamento PSE: ', err.message);
			throw new Error(err.message);
		}
	},

	async deleteSchedulePSE() {
		const jobScheduled = scheduledJobs['scheduleJobPSE'];

		console.log('deleteSchedulePSE service executado.');
		console.log('ScheduleJobs: ', scheduledJobs);

		try {
			if (jobScheduled) {
				console.log('Job encontrado: ', jobScheduled);
				jobScheduled.cancel();
				await knex('pse').delete();

				console.log('Agendamento do pse deletado.');
				return { message: 'PSE schedule deleted!' };
			}

			console.log('Agendamento não existe.', jobScheduled);
			throw new Error('Schedule does not exists');
		} catch (err) {
			console.log('Erro no deleteSchedulePSE service: ', err);
			throw new Error(err.message);
		}
	},

	async deleteOnePseDate(date) {
		try {
			console.log('Iniciando a função deleteOnePseDate com a data:', date);
	
			if (date === 'startDate' || date === 'endDate') {
				const errorMessage = 'Não é permitido deletar os horários de agendamento do PSE';
				console.log(errorMessage);
				throw new Error(errorMessage);
			}
	
			const updateDate = {};
			updateDate[date] = null;
			let cont = 0;
			console.log('Preparando para buscar datas dinâmicas do PSE no banco de dados.');
			const pseDates = await knex('pse').select('dinamycDate_1', 'dinamycDate_2', 'dinamycDate_3', 'dinamycDate_4', 'dinamycDate_5').first();
			const arrayPseDates = Object.keys(pseDates);
			console.log('Datas dinâmicas obtidas:', pseDates);
	
			if (pseDates[date] == null) {
				const errorMessage = 'A data dinâmica não existe';
				console.log(errorMessage);
				throw new Error(errorMessage);
			}
	
			arrayPseDates.forEach((pseDate) => {
				if (pseDates[pseDate]) {
					cont++;
				}
			});
			console.log('Contagem de datas dinâmicas não nulas:', cont);
	
			if (cont == 1 && pseDates[date] != null) {
				const errorMessage = 'Deve haver pelo menos uma data dinâmica';
				console.log(errorMessage);
				throw new Error(errorMessage);
			}
	
			console.log('Atualizando banco de dados para remover a data:', date);
			await knex('pse').update(updateDate);
			const successMessage = 'Data removida';
			console.log(successMessage);
			return { message: successMessage };
		} catch (err) {
			console.log('Erro ao executar deleteOnePseDate:', err.message);
			throw new Error(err.message);
		}
	},

	async checkSchedulePSE() {
		try {
			console.log('Buscando PSE no banco de dados.');
			const data = await knex('pse').select('*');
			console.log('Dados obtidos do banco de dados:', data);
	
			if (data[0]) {
				console.log('Formatando data de término do pse:', data[0]);
				const endDateFormatted = new Date(data[0].end);
				console.log('Data de término formatada:', endDateFormatted);
	
				if (endDateFormatted < new Date()) {
					console.log('Data de término já passou, deletando registro.');
					await knex('pse').delete();
				} else {
					console.log('Agendando job para deletar registro na data de término.');
					scheduleJob('scheduleJobPSE', endDateFormatted, async () => {
						try {
							console.log('Executando job agendado para deletar registro.');
							await knex('pse').delete();
						} catch (error) {
							console.log('Erro ao deletar registro no job agendado:', error.message);
						}
					});
				}
	
				return '';
			} else {
				const errorMessage = '⛔ Schedule não existe!';
				console.log(errorMessage);
				throw new Error(errorMessage);
			}
		} catch (error) {
			console.log('Erro na execução de checkSchedulePSE:', error.message);
			throw new Error(error.message);
		}
	}
};
