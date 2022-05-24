const knex = require("../database");
const { v4 } = require("uuid");
const csvHandler = require("../services/csvHandler");
const { scheduleJob, scheduledJobs } = require("node-schedule");
const emailService = require("../services/emailService");
const fs = require("fs");

module.exports = {
	async create(info){
		try {
			csvHandler(info);
			return {message: "usuário cadastrado"};
		} catch(err) {
			throw new Error(err.message);
		}
	},

  async getSchedulePSE(){
    try {
      const data = await knex("pse").select("start", "end").first();
      return data;
    } catch (error) {
      throw new Error(error.message);
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

      if (!(startDateFormatted instanceof Date && !isNaN(startDateFormatted)) || !(endDateFormatted instanceof Date && !isNaN(endDateFormatted))) {
          throw new Error("date bad formatted");
      }

      if (fs.existsSync('./uploads/pse.csv')) {
          fs.unlinkSync('./uploads/pse.csv');
      }

      const data = await knex("pse").select("*");

      if(data.length === 0) {
          let currentDate = new Date();

          if (currentDate > startDateFormatted || currentDate > endDateFormatted) {
              throw new Error("start date must be greater than the current date!");
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
        await emailService.sendCSV();
        await knex("pse").delete();
      });

      return { message: "service scheduled to " + endDate };
		} catch(err) {
			throw new Error(err.message);
		}
  },

	async updateSchedulePSE(startDate, endDate) {
    const endDateFormatted = new Date(endDate);
    const startDateFormatted = new Date(startDate);
    let currentDate = new Date();
    const jobExists = scheduledJobs["scheduleJobPSE"];

		try {

      if (!jobExists) {
        throw new Error("agendamento não existe!");
      }

      if (!(startDateFormatted instanceof Date && !isNaN(startDateFormatted)) || !(endDateFormatted instanceof Date && !isNaN(endDateFormatted))) {
        throw new Error("data mal formatada!");
      }

      if (currentDate > startDateFormatted || currentDate > endDateFormatted) {
        throw new Error("data de início precisa ser maior que a data atual!");
      }

      if (jobExists) {
        jobExists.cancel();
      }
      
      await knex("pse").select("*").update({start: startDate, end: endDate});
      
      scheduleJob("scheduleJobPSE", endDateFormatted, async () => {
        await emailService.sendCSV();
        await knex("pse").delete();
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

          if (fs.existsSync('./uploads/pse.csv')) {
            fs.unlinkSync('./uploads/pse.csv');
          }
          
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
          await emailService.sendCSV();
        } else {
          scheduleJob("scheduleJobPSE", endDateFormatted, async () => {
            await emailService.sendCSV();
            await knex("pse").delete();
          });
        }

        return "";
      } else {
        throw new Error("⛔ Schedule does not exists!");
      }
    } catch (error) {
      throw new Error(error.message);
    }
	},

  async endPse(){
    const jobExists = scheduledJobs["scheduleJobPSE"];

    try {
      if (!jobExists) {
        throw new Error("agendamento não existe!");
      }

      if (jobExists) {
        jobExists.cancel();
      }
      await emailService.sendCSV();
      await knex("pse").delete();

      return { message: "pse encerrado"}
      
    } catch (err) {
      throw new Error(err.message);
    }
  }
}