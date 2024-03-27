exports.up = knex => {
	return knex.schema.createTable('sponsors', (table) => {
		table.uuid('id');
		table.string('name').notNullable().unique();
		table.text('imageURL').notNullable();
		table.text('link').notNullable();
		table.timestamps(true, true);
	});
};

exports.down = knex => knex.schema.dropTable('sponsors');
