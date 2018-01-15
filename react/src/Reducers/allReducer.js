import {combineReducers} from 'redux';
import moment from 'moment';

const INITIALSTATE = {
    todos: [],
    newTodo: {
        name: '',
        tags: ['home'],
        completed: 'false',
        date: moment()
    },
    dummy: [
        {
            name: 'jasds',
            startDate: new Date('January 09, 2018 11:13:00'),
            endDate: new Date('January 09, 2018 11:13:00'),
            
        },
        {
            name: 'daaaas',
            startDate: new Date('January 07, 2018 11:13:00'),
            endDate: new Date('January 07, 2018 11:13:00'),
            
        },
        {
            name: 'daaaas',
            startDate: new Date('January 07, 2018 11:13:00'),
            endDate: new Date('January 07, 2018 11:13:00'),
            
        },
        {
            name: 'daaaas',
            startDate: new Date('January 07, 2018 11:13:00'),
            endDate: new Date('January 07, 2018 11:13:00'),
            
        }

    ],

    
    editStatus: false,
    currentEditId: 0,
    searchKey: ''
}

const moveTodo = (state, action) => {
    console.log(action.dragIndex, '+++++++++++++++++++++++++++++');
    console.log(action.hoverIndex, '-------------------------------')
    let todos = [...state];
    let dragTodo = todos[action.dragIndex];
    // need to swap
    todos.splice(action.dragIndex, 1);
    todos.splice(action.hoverIndex, 0, dragTodo);
    return todos;
  }

const allReducer = (state = INITIALSTATE, action) => {
    let changeName = action.changeName;
    let obj = {...state.newTodo};
    let currentTodos = state.todos
    let updatedTodos = [...state.todos, obj];
    // let updatedTodos = currentTodos.push(obj);
    // let updatedTodos = {...currentTodos, todos: currentTodos.push(obj)}
    
    switch (action.type) {
        case 'GET_TODOS':
            return {...state, todos: action.payload};


        case 'DELETE_TODO':
            let tempTodo = state.todos.filter((todo) => {return action.payload.id !== todo.id});
            console.log(tempTodo);
            return {...state, todos: tempTodo}

        case 'HANDLE_CHANGE':
            // let onChange = {...state.newTodo};
            return {
                ...state,
                newTodo: {
                    ...obj,
                    [changeName] : action.payload
                }
            }

        case 'HANDLE_DATE':
            return {
                ...state,
                newTodo: {
                    ...obj,
                    date : action.payload
                }

            }

        case 'ADD_TODO':
            console.log(updatedTodos);
            console.log(obj);
            // debugger;
            return {...state, todos: updatedTodos};

        case 'HANDLE_EDIT_STATUS':
            return {
                ...state,
                editStatus: true,
                currentEditId: action.payload.id,
                newTodo: {
                    ...obj,
                    name : action.payload.name,
                    tags : action.payload.tags,
                    completed : action.payload.done
                }
            }

        case 'EDIT_TODO':
            console.log(updatedTodos);
            console.log(state.todos[2]);
        
            return {...state, todos: currentTodos.map((todo) => {
                
                if(todo.id === state.currentEditId){
                    console.log(todo);
                    todo = obj;
                }
                    
            } )};

        case 'HANDLE_SEARCH':
            return {...state, searchKey: action.payload}
        
        case 'MOVE_TODO':
            return {
              ...state,
              todos: moveTodo(state.todos, action)
            };

        default: 
            return state;
    }
}

export default allReducer;