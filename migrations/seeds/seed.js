exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('todos').del()
        .then(function () {
            // Inserts seed entries
            return knex('todos').insert([
                {id: 1, title: 'Todos 1', description: 'Todo 1 Description', created_at: Date.now()},
                {id: 2, title: 'Todos 2', description: 'Todo 2 Description', created_at: Date.now()},
                {id: 3, title: 'Todos 3', description: 'Todo 3 Description', created_at: Date.now()},
            ]);
        });
};
