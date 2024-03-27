exports.up = knex => {
	return knex.schema.alterTable('pse', (table) => {
		table.timestamp('dinamycDate_1');
		table.timestamp('dinamycDate_2');
		table.timestamp('dinamycDate_3');
		table.timestamp('dinamycDate_4');
		table.timestamp('dinamycDate_5');
	});
};
  
exports.down = knex => {
	return knex.schema.alterTable('pse', (table) => {
		table.dropColumn('dinamycDate_1');
		table.dropColumn('dinamycDate_2');
		table.dropColumn('dinamycDate_3');
		table.dropColumn('dinamycDate_4');
		table.dropColumn('dinamycDate_5');
	}); 
};
  