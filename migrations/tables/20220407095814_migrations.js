
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('list', (table) => {
        table.integer('id').primary().notNullable();
        table.string('name');
        table.string('details');
        table.bigInteger('createdAt');
        table.bigInteger('updatedAt');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('list');
};
