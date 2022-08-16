const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
	const hash = await bcrypt.hash("123456789", 10);
	return knex("users")
		.del()
		.then(function () {
			return knex("users").insert([
				{
					id: v4(),
					name: "Nome Teste",
					email: "teste@teste.com",
					password: hash,
				},
			]);
		});
};
