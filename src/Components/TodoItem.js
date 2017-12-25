import React from 'react';
import axiosService from '../Services/axiosService';


function TodoItem(props){
  function deleteTodo() {
    props.deleteTodo(props.todo.id);
    
  } 
  function editTodo(){
    props.deleteTodo(props.todo.id);
  
  } 
  return (
    <li className="todoItem">
      <strong> {props.todo.id} </strong> : {props.todo.name} 
      <span className="tagName"></span>
      <button className="deleteButton" onClick={deleteTodo}>delete</button>
      <button className="deleteButton" onClick={editTodo}>edit</button>
    </li>
  )
}

export default TodoItem;