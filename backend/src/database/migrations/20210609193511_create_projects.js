exports.up = knex => {
    return knex.schema.createTable("projects", (table) => {
      table.uuid("id").unique();
      table.string("name").notNullable();
      table.string("description", 1400).notNullable();
      table.string("image").notNullable();
      table.string("members").notNullable();
      table.timestamp("beginning").notNullable();
      table.timestamp("ended");
      table.string("status").notNullable();
      table.timestamps(true, true);
      table.uuid("crew_id").notNullable().references("id").inTable("crews").onDelete("SET NULL");
    });
  };
  
exports.down = knex => knex.schema.dropTable("projects");