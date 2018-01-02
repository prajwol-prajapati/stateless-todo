export const getTodo = () => {
    return ((dispatch) => {
     return TodoService.getApiCall( 'todo', config)
      .then( res => {
       return dispatch(receiveTodos(res.data.data))
      })
      .catch((err) =>{
        return dispatch(errorTodo(err))
        })
      })
  }

const addTodo = (name, tags, completed) => {
    console.log('adding a user');
    return {
        type: 'ADD_TODO',
        payload: {
            name: name,
            tags: tags,
            completed: completed
        }
    }
}

export default {getTodos, addTodo}