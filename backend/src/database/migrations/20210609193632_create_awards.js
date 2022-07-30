exports.up = knex => {
  return knex.schema.createTable("awards", (table) => {
      table.uuid("id");
      table.text("name");
      table.text("placing");
      table.text("year");
      table.timestamps(true, true);
      table.uuid("crew_id").references("id").inTable("crews").onDelete("CASCADE");
  });
};

exports.down = knex => knex.schema.dropTable("awards");