import React from 'react';
import TodoItem from './TodoItem';


function Todos(props){
    let todoItems;
    console.log(props.todos);
    if(props.todos){
        todoItems = props.todos.map((todo) => {
          return (
            <TodoItem key={todo.id} todo={todo} deleteTodo={props.deleteTodo} editTodo={props.editTodo}/>
          );
        });
        
    }
    return (
      <div className="todos">
        <h1> inside Todos </h1>
        {todoItems}
      </div>
    );
}

export default Todos;