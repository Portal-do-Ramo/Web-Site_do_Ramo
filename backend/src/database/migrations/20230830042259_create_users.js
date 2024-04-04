exports.up = knex => {
	return knex.schema.alterTable('users', (table) => {
		table.boolean('isAdmin').defaultTo(false);
		table.uuid('crew_id').references('id').inTable('crews').onDelete('CASCADE').defaultTo(null);
	});
};

exports.down = knex => {
	return knex.schema.alterTable('users', (table) => {
		table.dropColumn('isAdmin');
		table.dropColumn('crew_id');
	}); 
};
