const knex = require("../database");
const { v4 } = require("uuid");
const csvHandler = require("../services/csvHandler");
const { scheduleJob } = require("node-schedule");

module.exports = {
	async create(info){
		try {
			csvHandler(info);
			return {message: "usuário cadastrado"};
		} catch(err) {
			throw new Error(err.message);
		}
	},

  async schedulePSE(startDate, endDate) {
    try {
      const endDateFormatted = new Date(endDate);
      const startDateFormatted = new Date(startDate);

      if (!(startDateFormatted instanceof Date && !isNaN(startDateFormatted)) || !(endDateFormatted instanceof Date && !isNaN(endDateFormatted))) {
          throw new Error("date bad formatted");
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
    
      const job = scheduleJob(endDateFormatted, async () => {
        console.log("Job run on " + new Date(Date.now()).toTimeString());
        await knex("pse").delete();
      });

      return job;
		} catch(err) {
			throw new Error(err.message);
		}
  },

	async updateSchedulePSE(startDate, endDate) {
        const endDateFormatted = new Date(endDate);
		try {
            await knex("pse").select("*").update(startDate, endDate);
            const job = scheduleJob(endDateFormatted, async () => {
                console.log("Job run on " + new Date(Date.now()).toTimeString());
                await knex("pse").delete();
              });
            return job;
		} catch(err) {
			throw new Error(err.message);
		}
	},

	async deleteSchedulePSE(jobScheduled) {
		try {
        jobScheduled.cancel();
        await knex("pse").delete();
        return {message: "PSE schedule deleted!"};
		} catch(err) {
			throw new Error(err.message);
		}
	},

  async checkSchedulePSE() {
    try {
      const data = await knex("pse").select("*");
      
      if (data[0]) {
        const endDateFormatted = new Date(data[0].end);
  
        const job = scheduleJob(endDateFormatted, async () => {
          console.log("Job run on " + new Date(Date.now()).toTimeString());
          await knex("pse").delete();
        });
        
        return job;
      } else {
        throw new Error("⛔ Schedule does not exists!");
      }
    } catch (error) {
      throw new Error(error.message);
    }
	}
}