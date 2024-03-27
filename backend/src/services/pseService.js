const knex = require('../database');
const { v4 } = require('uuid');
const { scheduleJob, scheduledJobs } = require('node-schedule');
const { isBefore } = require('date-fns');
const Joi = require('joi');
const db = require('../database/firebase');
const registerPSE = db.collection('registerPSE');
const sheetController = require('../controllers/sheetController');
const moment = require('moment');

function validateDate(date){
	const currentDate = new Date();

	if (isBefore(currentDate, date)){
		throw new Error('Data de aniversário inválida!');
	}
}

module.exports = {
	async create(info){
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
			register: Joi.string().required(),
			course: Joi.string().required(),
			currentPeriod: Joi.string().required(),
			crew: Joi.string().required(),
			area: Joi.string().required(),
			availableDate: Joi.array().required(),
			HowFoundIeee: Joi.string().required(),
			reason: Joi.string().required(),
			experience: Joi.string().required(),
		});
        
		const {error, value} = pseValidation.validate(info);
		if (error){
			throw new Error(error.message);
		}

		if (value.linkedin === undefined){
			value.linkedin = '';
		}

		if (value.instagram === undefined){
			value.instagram = '';
		}

		validateDate(value.birthday);
		value.birthday = moment.utc(value.birthday).format('DD/MM/YYYY');
		
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
	
		const subscriberEmail = await registerPSE.where('personalInformation.email', '==', value.email).get();
		const subscriberPhone = await registerPSE.where('personalInformation.phone', '==', value.phone).get();

		if (subscriberEmail.empty && subscriberPhone.empty){
			await registerPSE.add(data);	
			await sheetController.insert(data);
			return {'message': 'usuário cadastrado!'};
		}
		
		throw new Error('Email ou número inserido já foi cadastrado!');
	},
	
	async getSchedulePSE() {
		try {	
			const data = await knex('pse').select('start', 'end', 'dinamycDate_1', 'dinamycDate_2', 'dinamycDate_3', 'dinamycDate_4', 'dinamycDate_5').first();
			
			if (!data) {
				throw new Error('PSE has not been scheduled!');
			}

			return data;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	async getDinamycDatesPSE(){
		try {
			let data = await knex('pse').select('dinamycDate_1', 'dinamycDate_2', 'dinamycDate_3', 'dinamycDate_4', 'dinamycDate_5').first();
		
			if (!data) {
				throw new Error('PSE has not been scheduled!');
			}

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
			if (data.dinamycDate_5){
				dinamycDate_5 = `Dia ${moment(data.dinamycDate_5).utcOffset(-3).locale('pt').format('D/MM (dddd) - kk:mm')}`;
			}
		
			data.dinamycDate_1 = dinamycDate_1;
			data.dinamycDate_2 = dinamycDate_2;
			data.dinamycDate_3 = dinamycDate_3;
			data.dinamycDate_4 = dinamycDate_4;
			data.dinamycDate_5 = dinamycDate_5;

			return data;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	async deleteSubscribersData(){
		try{
			const getDocuments = await registerPSE.get();
			const batch = db.batch();

			getDocuments.forEach(doc => batch.delete(doc.ref));

			await batch.commit();
			return {message: 'Documents deleted!'};
		} catch(err){
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

			if (jobExists) {
				throw new Error('Job already exists!');
			}

			if (!regex.test(startDate) || !regex.test(endDate)) {
				throw new Error('Date bad formatted');
			}
			
			for (let i = 0; i<5; i++) {
				if (dinamycDates[i]) {
					if (!regex.test(dinamycDates[i])) {
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
				throw new Error('start date can\'t be greater than end date');
			}

			const data = await knex('pse').select('*');

			if(data.length === 0) {
				let currentDate = new Date();

				if (isBefore(startDateFormatted, currentDate)) {
					throw new Error('current date can\'t be greater than start date');
				}

				for(let i = 0; i<5; i++) {
					if (dinamycDatesFormatted[i]) {
						if (isBefore(dinamycDatesFormatted[i], currentDate)) {
							throw new Error('current date can\'t be greater than dinamyc date');
						}

						if (isBefore(dinamycDatesFormatted[i], startDateFormatted)) {
							throw new Error('start date can\'t be greater than dinamyc date');
						}

						if (isBefore(dinamycDatesFormatted[i], endDateFormatted)) {
							throw new Error('end date can\'t be greater than dinamyc date');
						}
					}
				}
				
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

				await sheetController.delete();
				await this.deleteSubscribersData();
				
			} else {
				throw new Error('pse already scheduled!');
			}
		
			scheduleJob('scheduleJobPSE', endDateFormatted, async () => {
				try {
					await knex('pse').delete();
				} catch (error) {
					console.log('Error: ', error.message);
				}
			});

			return { message: 'service scheduled to ' + endDate};
		} catch(err) {
			throw new Error(err.message);
		}
	},

	async updateSchedulePSE(pse) {
		const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}-03:00$/;
		const pseDatesFormatted = {};
		let verifyUpdateSchedule = false;
		const jobExists = scheduledJobs['scheduleJobPSE'];
		const {end, dinamycDate_1, dinamycDate_2, dinamycDate_3, dinamycDate_4, dinamycDate_5} = await knex('pse').select('*').first();
		let dinamycDatesList = [dinamycDate_1, dinamycDate_2, dinamycDate_3, dinamycDate_4, dinamycDate_5];
		let endDate;
		
		try {
			if (!jobExists) {
				throw new Error('scheduling does not exist!');
			}
			
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
					throw new Error('start date can\'t be greater than end date');
				}
			} 
			else if (pseDatesFormatted.start) {
				if (isBefore(end, pseDatesFormatted.start)){
					throw new Error('start date can\'t be greater than end date');
				}

				if (isBefore(pseDatesFormatted.start, currentDate)) {
					throw new Error('current date can\'t be greater than start date');
				}
			}

			if (verifyUpdateSchedule && isBefore(pseDatesFormatted.end, currentDate)) {
				throw new Error('current date can\'t be greater than end date');
			}

			if (isBefore(pseDatesFormatted.dinamycDate_1, currentDate) || 
				isBefore(pseDatesFormatted.dinamycDate_2, currentDate) ||
				isBefore(pseDatesFormatted.dinamycDate_3, currentDate) ||
				isBefore(pseDatesFormatted.dinamycDate_4, currentDate) ||
				isBefore(pseDatesFormatted.dinamycDate_5, currentDate)) {
				throw new Error('current date can\'t be greater than dinamyc date');
			}

			for (let i = 0; i < 5; i++){
				if (isBefore(dinamycDatesList[i], endDate)){
					throw new Error('end pse date can\'t be greater than dinamyc date');
				}
			}

			if (jobExists && verifyUpdateSchedule) {
				jobExists.cancel();
			}
	
			await knex('pse').select('*').update(pseDatesFormatted);
			
			if (verifyUpdateSchedule) {
				scheduleJob('scheduleJobPSE', pseDatesFormatted.end, async () => {
					try {
						await knex('pse').delete();
					} catch (error) {
						console.log('Error: ', error.message);
					}
				});
			}

			return { pseDatesFormatted };
		} catch(err) {
			throw new Error(err.message);
		}
	},

	async deleteSchedulePSE() {
		const jobScheduled = scheduledJobs['scheduleJobPSE'];

		try {
			if (jobScheduled) {
				jobScheduled.cancel();
				await knex('pse').delete();
				
				return {message: 'PSE schedule deleted!'};
			}
			
			throw new Error('Schedule does not exists');
		} catch(err) {
			throw new Error(err.message);
		}
	},

	async deleteOnePseDate(date) {
		try{

			if (date === 'startDate' || date === 'endDate'){
				throw new Error('Não é permitido apagar horário de agendamento do pse');
			}

			const updateDate = {};
			updateDate[date] = null;

			await knex('pse').update(updateDate);
			return {message: 'Data removida'};
		} catch (err){
			throw new Error(err.message);
		}
	},

	async checkSchedulePSE() {
		try {
			const data = await knex('pse').select('*');
			
			if (data[0]) {
				const endDateFormatted = new Date(data[0].end);
				
				if (endDateFormatted < new Date()) {
					await knex('pse').delete();
				} else {
					scheduleJob('scheduleJobPSE', endDateFormatted, async () => {
						try {
							await knex('pse').delete();
						} catch (error) {
							console.log('Error: ', error.message);
						}
					});
				}

				return '';
			} else {
				throw new Error('⛔ Schedule does not exists!');
			}
		} catch (error) {
			throw new Error(error.message);
		}
	}
};