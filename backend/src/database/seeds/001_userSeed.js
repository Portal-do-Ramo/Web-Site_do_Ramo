const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
require('dotenv').config();

exports.seed = async function (knex) {
	const hash = await bcrypt.hash(process.env.USER_PASSWORD, 10);
	return knex("users")
		.del()
		.then(function () {
			return knex("users").insert([
				{
					id: v4(),
					name: "Site do Ramo",
					email: process.env.USER_EMAIL,
					password: hash,
					isAdmin: true
				},
			]);
		});
};
