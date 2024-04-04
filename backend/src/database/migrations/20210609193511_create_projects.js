exports.up = knex => {
	return knex.schema.createTable('projects', (table) => {
		table.uuid('id').unique();
		table.string('name').notNullable();
		table.string('description', 1400).notNullable();
		table.string('imageURL').notNullable();
		table.string('logoURL').notNullable();
		table.string('members', 1000);
		table.timestamp('beginning').notNullable();
		table.timestamp('ended');
		table.timestamps(true, true);
		table.uuid('crew_id').notNullable().references('id').inTable('crews').onDelete('CASCADE');
	});
};
  
exports.down = knex => knex.schema.dropTable('projects');