import Todo from '../models/todo';

// get all todo
export function getAllTodos() {
  return Todo.fetchPage({
    page: 1,
    pageSize: 20,
    withRelated: ['tags']
  });
}

// Create new todo
export function createTodo(todo, id) {
  let tempTag = todo.tags;

  return new Todo({ name: todo.name, done: todo.done, user_id: id })
    .save()
    .then(todo => {
      todo.tags().attach(tempTag);
    });
}

// SEARCH todo
export function searchTodo(key) {
  // console.log(Tag.tableName);
  return Todo.query(qb => {
    qb.where('name', 'LIKE', '%' + key + '%');
  }).fetchAll({ withRelated: ['tags'] });
}

// PUT, edit todo with id
export function updateTodo(id, todo) {
  return new Todo({ id })
    .save({ name: todo.name, done: todo.done, user_id: todo.user_id })
    .then(todo => todo.refresh());
}

// delete the todo with id
export function deleteTodo(id) {
  return new Todo({ id }).fetch().then(todo => todo.destroy());
}
