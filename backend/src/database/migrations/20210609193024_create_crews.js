exports.up = knex => {
    return knex.schema.createTable("crews", table => {
        table.uuid("id").unique();
        table.string("name").notNullable().unique();
        table.text("about").notNullable();
        table.timestamps(true, true);
    });
}

exports.down = knex => knex.schema.droptable("crews");
