exports.seed = function(knex, Promise) {
  return knex('folders').del()
    .then(function () {
      return Promise.all([
        knex('folders')
          .insert({id: 1,
                   folder_name: 'shopping',
                   created_at: new Date}),
      ]);
    });
};
