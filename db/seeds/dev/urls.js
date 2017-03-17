exports.seed = function(knex, Promise) {
  return knex('urls').del()
    .then(function () {
      return Promise.all([
        knex('urls')
          .insert({website_name: 'amazon',
                   url: "http://amazon.com",
                   views: 3,
                   folder_id: 1,
                   short_url: "45b2256e",
                   created_at: new Date}),
        knex('urls')
          .insert({website_name: 'etsy',
                   url: "http://www.etsy.com",
                   views: 1,
                   folder_id: 1,
                   short_url: "w23o5bvb",
                   created_at: new Date})
      ]);
    });
};
