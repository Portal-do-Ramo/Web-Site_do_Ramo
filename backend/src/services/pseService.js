const knex = require("../database");
const { v4 } = require("uuid");
const { scheduleJob, scheduledJobs } = require("node-schedule");
const { isBefore } = require("date-fns");
const Joi = require("joi");
const db = require("../database/firebase");
const registerPSE = db.collection("registerPSE");
const sheetController = require("../controllers/sheetController")

module.exports = {
	async create(info){
		const pseValidation = Joi.object({
            fullname: Joi.string().min(3).required(),
			phone: Joi.string().pattern(/^[0-9]+$/).required(),
            email: Joi.string().min(6).email().required(),
            linkedin: Joi.string(),
			instagram: Joi.string(),
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
			reason: Joi.string().required(),
			experience: Joi.string().required(),
        });
        
        const {error, value} = pseValidation.validate(info);
        if (error){
            throw new Error(error.message);
        }

		const personalInformation = {
			fullname: value.fullname,
			phone: value.phone,
            email: value.email,
            linkedin: value.linkedin,
			instagram: value.instagram,
			gender: value.gender,
			neuroatypicality: value.neuroatypicality,
			PcD: value.PcD,
			selfDeclaration: value.selfDeclaration
		}

		const registrationData = {
			register: value.register,
			course: value.course,
			currentPeriod: value.currentPeriod,
			crew: value.crew,
			area: value.area,
			availableDate: value.availableDate,
			reason: value.reason,
			experience: value.experience
		}

		const data = {
			personalInformation,
			registrationData
		}
	
		const subscriberEmail = await registerPSE.where('personalInformation.email', '==', value.email).get();
		const subscriberPhone = await registerPSE.where('personalInformation.phone', '==', value.phone).get();

		await registerPSE.add(data)	

		if (subscriberEmail.empty && subscriberPhone.empty){
			await sheetController.insert(data)
			return {"message": "usuário cadastrado!"};
		}
		
		return {"message": "Email ou número inserido já foi cadastrado!"};
	},

	async getSchedulePSE(){
		try {
		const data = await knex("pse").select("*").first();

		if (!data) {
			throw new Error("PSE has not been scheduled!");
		}

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
			return {message: "Documents deleted!"}
		} catch(err){
			throw new Error(err.message);
		}
	},

	async schedulePSE(startDate, endDate) {
		try {
			const endDateFormatted = new Date(endDate);
			const startDateFormatted = new Date(startDate);

			const jobExists = scheduledJobs["scheduleJobPSE"]

			if (jobExists) {
				throw new Error("Job already exists!");
			}

			if (
				!(startDateFormatted instanceof Date && 
				!isNaN(startDateFormatted)) || 
				!(endDateFormatted instanceof Date && 
				!isNaN(endDateFormatted))
			) {
				throw new Error("date bad formatted");
			}

			if (isBefore(endDateFormatted, startDateFormatted)) {
				throw new Error("Data de inicio não pode ser maior que a data de fim!");
			}

			const data = await knex("pse").select("*");

			if(data.length === 0) {
				let currentDate = new Date();

				if (isBefore(startDateFormatted, currentDate)) {
					throw new Error("data de inicio precisa ser maior que a data atual!");
				}
				
				await knex("pse").insert({
					id: v4(),
					start: startDate,
					end: endDate
				});
				
			} else {
				throw new Error("pse already scheduled!");
			}
		
			scheduleJob("scheduleJobPSE", endDateFormatted, async () => {
				try {
					await knex("pse").delete();
				} catch (error) {
					console.log("Error: ", error.message);
				}
			});

			return { message: "service scheduled to " + endDate };
		} catch(err) {
			throw new Error(err.message);
		}
	},

	async updateSchedulePSE(startDate, endDate) {
		const endDateFormatted = new Date(endDate);
		const startDateFormatted = new Date(startDate);
		
		const jobExists = scheduledJobs["scheduleJobPSE"];

		try {
			if (!jobExists) {
				throw new Error("agendamento não existe!");
			}

			if (!(startDateFormatted instanceof Date && !isNaN(startDateFormatted)) || !(endDateFormatted instanceof Date && !isNaN(endDateFormatted))) {
				throw new Error("data mal formatada!");
			}

			if ( isBefore(endDateFormatted, startDateFormatted)) {
				throw new Error("start date can't be greater than end date");
			}

			let currentDate = new Date();

			if (isBefore(endDateFormatted, currentDate)) {
				throw new Error("data de fim precisa ser maior que a data atual!");
			}

			if (jobExists) {
				jobExists.cancel();
			}
			
			await knex("pse").select("*").update({start: startDate, end: endDate});
			
			scheduleJob("scheduleJobPSE", endDateFormatted, async () => {
				try {
					await knex("pse").delete();
				} catch (error) {
					console.log("Error: ", error.message);
				}
			});

			return { message: "service rescheduled to " + endDate};
		} catch(err) {
			throw new Error(err.message);
		}
	},

	async deleteSchedulePSE() {
		const jobScheduled = scheduledJobs["scheduleJobPSE"];

		try {
			if (jobScheduled) {
				jobScheduled.cancel();
				await knex("pse").delete();
				
				return {message: "PSE schedule deleted!"};
			}
			
			throw new Error("Schedule does not exists");
		} catch(err) {
			throw new Error(err.message);
		}
	},

	async checkSchedulePSE() {
		try {
			const data = await knex("pse").select("*");
			
			if (data[0]) {
				const endDateFormatted = new Date(data[0].end);
				
				if (endDateFormatted < new Date()) {
				await knex("pse").delete();
				} else {
				scheduleJob("scheduleJobPSE", endDateFormatted, async () => {
					try {
						await knex("pse").delete();
					} catch (error) {
						console.log("Error: ", error.message);
					}
				});
				}

				return "";
			} else {
				throw new Error("⛔ Schedule does not exists!");
			}
		} catch (error) {
			throw new Error(error.message);
		}
	}
}