export const getTodos = (payload) => {
    return {
        type: 'GET_TODOS',
        payload
    };
}

export const deleteTodo = (payload) => {
    return {
        type: 'DELETE_TODO',
        payload
    }
}

export const handleChange = (changeName, payload) => {
    return {
        type: 'HANDLE_CHANGE',
        payload: payload,
        changeName: changeName
    }
}

export const handleDate = (date) => {
    return {
        type: 'HANDLE_DATE',
        payload: date
    }
}

export const addTodo = () => {
    return {
        type: 'ADD_TODO'
    }
}

export const handleEditStatus = (payload) => {
    return {
        type: 'HANDLE_EDIT_STATUS',
        payload
    }
}

export const editTodo = () => {
    return {
        type: 'EDIT_TODO'
    }
}

export const handleSearch = (searchKey) => {
    return {
        type: 'HANDLE_SEARCH',
        payload: searchKey
    }
}

export function moveTodo(dragIndex, hoverIndex) {
    return {
      type: 'MOVE_TODO',
      dragIndex,
      hoverIndex
    };
  }

