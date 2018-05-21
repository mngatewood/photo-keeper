
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable()
  ])
};

exports.down = function(knex, Promise) {
  
};
