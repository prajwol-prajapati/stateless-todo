import bookshelf from '../db';

import Todo from './todo';

// Tags Model
let Tags = bookshelf.Model.extend({
  tableName: 'tags',
  hasTimestamps: false,
  todo: () => {
    return this.belongsToMany(Todo);
  }
});

export default Tags;
