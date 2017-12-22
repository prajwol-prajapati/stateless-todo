import React, { Component } from 'react';
import Todos from './Components/Todos';
import Search from './Components/Search';
import AddTodo from './Components/AddTodo';
import EditTodo from './Components/EditTodo';
import axiosService from'./Services/axiosService';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos: [],
      editStatus: false
    }
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
  }

  getTodos(){
    
    axiosService.get('todos')
    .then(
      (value) => {
        this.setState({
          todos: value.data.data

        });
      }
    );
  }

  handleDeleteTodo(id){
    axiosService.delete('todos/' + id).then(() =>{
      this.getTodos();
    });
  }

  componentDidMount(){
    this.getTodos();
  }

  render() {
    return (
      <div className="App">
        <Search />
        <Todos todos = {this.state.todos} deleteTodo={this.handleDeleteTodo}/>
        <AddTodo />
        <EditTodo />
      </div>
    );
  }
}

export default App;
