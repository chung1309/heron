exports.up = async (knex) => {
    // Define table columns and data types
    return knex.schema.createTableIfNotExists('todos', (table) => {
        table.integer('id').primary().notNullable();
        table.string('title');
        table.string('description');
        table.bigInteger('created_at');
        table.bigInteger('updated_at');
    })
};

exports.down = async (knex) => {
    // Drop table
    return knex.schema.dropTableIfExists('todos');
};
