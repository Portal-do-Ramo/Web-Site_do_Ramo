exports.up = knex => {
  return knex.schema.createTable("users", (table) => {
      table.uuid("id").unique();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = knex => knex.schema.dropTable("users");

