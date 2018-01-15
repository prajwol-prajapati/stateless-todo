import React from 'react';
import axiosService from '../Services/axiosService';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const todoSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
}

const todoTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveTodo(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


function TodoItem(props){
  function deleteTodo() {
    props.deleteTodo(props.todo);
    
  }
  const { connectDragSource, connectDropTarget, isDragging } = props;
  
  function editTodo() {
    props.editTodo(props.todo);
  }
  
  return connectDragSource(
    connectDropTarget(
      <div>
        <li className="todoItem">
          <strong> {props.todo.id} </strong> : {props.todo.name} 
          <span className="tagName"></span>
          <button className="deleteButton" onClick={() => props.deleteTodo(props.todo)}>delete</button>
          <button className="deleteButton" onClick={editTodo}>edit</button>
        </li>
      </div>
    )
    
  )
}

export default DropTarget('todo', todoTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource('todo', todoSource, (connect,monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(TodoItem)
);
