const knex = require("../database");
const { v4 } = require("uuid");
const csvHandler = require("../services/csvHandler");
const { scheduleJob, scheduledJobs } = require("node-schedule");

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

      const jobExists = scheduledJobs["scheduleJobPSE"]

      if (jobExists) {
        throw new Error("Job already exists!");
      }

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
    
      scheduleJob("scheduleJobPSE", endDateFormatted, async () => {
        console.log("Job run on " + new Date(Date.now()).toTimeString());
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
      if (!(startDateFormatted instanceof Date && !isNaN(startDateFormatted)) || !(endDateFormatted instanceof Date && !isNaN(endDateFormatted))) {
        throw new Error("date bad formatted");
      }

      if (currentDate > startDateFormatted || currentDate > endDateFormatted) {
        throw new Error("start date must be greater than the current date!");
      }

      if (jobExists) {
        jobExists.cancel();
      }
      
      await knex("pse").select("*").update({start: startDate, end: endDate});
      
      scheduleJob("scheduleJobPSE", endDateFormatted, async () => {
        console.log("Job run on " + new Date(Date.now()).toTimeString());
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
        
        const job = scheduleJob("scheduleJobPSE", endDateFormatted, async () => {
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