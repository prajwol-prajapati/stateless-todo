/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          first_name: 'sachit',
          last_name: 'shrestha',
          email: 'sachit@gmail.com',
          password: 'password'
        }),
        knex('users').insert({
          first_name: 'prajwol',
          last_name: 'prajwol',
          email: 'prajwol@gmail.com',
          password: 'password'
        })
      ]);
    });
}
