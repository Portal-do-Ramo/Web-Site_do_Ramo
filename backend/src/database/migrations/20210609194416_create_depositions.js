
exports.up = knex => {
    return knex.schema.createTable("depositions", (table) => {
        table.uuid("id");
        table.string("name").notNullable();
        table.string("crew").notNullable();
        table.text("text").notNullable();
        table.timestamp(true, true);
    });
};

exports.down = knex => knex.schema.dropTable("depositions");
