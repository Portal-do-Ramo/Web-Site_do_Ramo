
exports.up = knex => {
  return knex.schema.createTable("roles", table => {
      table.uuid("id");
      table.string("name").notNullable();
      table.integer("number").notNullable();
      table.timestamps(true, true);
      table.uuid("crew_id").references("id").inTable("crews").onDelete("CASCADE");
  });
};

exports.down = knex => knex.schema.dropTable("roles");