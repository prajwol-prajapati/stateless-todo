import React, {Component} from 'react';
import TodoItem from './TodoItem';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


function Todos(props){
  
    let todoItems;
    console.log(props.todos);
    if(props.todos){
        todoItems = props.todos.map((todo, i) => {
          return (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              deleteTodo={props.deleteTodo} 
              editTodo={props.editTodo}
              index = {i}
              moveTodo={props.moveTodo}
            />
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

export default DragDropContext(HTML5Backend)(Todos);