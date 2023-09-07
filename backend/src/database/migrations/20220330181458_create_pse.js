exports.up = knex => {
  return knex.schema.createTable("pse", (table) => {
    table.uuid("id").unique();
    table.timestamp("start").notNullable();
    table.timestamp("end").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = knex => knex.schema.dropTable("pse");
