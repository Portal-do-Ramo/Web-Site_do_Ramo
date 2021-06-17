exports.up = knex => {
  return knex.schema.createTable("awards", (table) => {
      table.uuid("id");
      table.text("name");
      table.text("description");
      table.text("img");
      table.timestamps(true, true);
      table.uuid("crew_id").references("id").inTable("crews").onDelete("SET NULL");
  });
};

exports.down = knex => knex.shema.dropTable("awards");

