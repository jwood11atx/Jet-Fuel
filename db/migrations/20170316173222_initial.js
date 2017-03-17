exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('urls', function(table) {
            table.increments('id').primary();
            table.string('url');
            table.string("short_url");
            table.string('website_name');
            table.integer("views");
            table.integer('folder_id')
                 .references('id')
                 .inTable('folders');

            table.timestamps();
        }),

        knex.schema.createTable('folders', function(table){
            table.increments('id').primary();
            table.string('folder_name');

            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropTable('urls'),
      knex.schema.dropTable('folders')
    ])
};
