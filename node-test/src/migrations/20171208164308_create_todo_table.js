/**
 * Create todo table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
exports.up = function(knex) {
  return knex.schema.createTable('todo', table => {
    table.increments();
    table.string('name').notNull();
    table.dateTime('date');
    
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull().defaultTo(knex.raw('now()'));
    table
      .boolean('done')
      .notNull()
      .defaultTo(false);
    table
      .integer('user_id')
      .unsigned()
      .notNull();
    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');
  });
};

/**
 * Drop todo table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
exports.down = function(knex) {
  return knex.schema.dropTable('todo');
};
