
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('list').del()
    .then(function () {
      // Inserts seed entries
      return knex('list').insert([
        {id: 1, name: 'name1', details: 'details1', createdAt: Date.now(), updatedAt: Date.now()},
        {id: 2, name: 'name2', details: 'details2', createdAt: Date.now(), updatedAt: Date.now()},
        {id: 3, name: 'name3', details: 'details3', createdAt: Date.now(), updatedAt: Date.now()},
        {id: 4, name: 'name4', details: 'details4', createdAt: Date.now(), updatedAt: Date.now()},
      ]);
    });
};
