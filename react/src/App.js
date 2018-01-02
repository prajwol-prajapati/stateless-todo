import React, { Component } from 'react';
import Todos from './Components/Todos';
import Search from './Components/Search';
import AddTodo from './Components/AddTodo';
import EditTodo from './Components/EditTodo';
import axiosService from'./Services/axiosService';
import {connect} from 'react-redux';

import * as actions from './Actions/todoAction';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [],
      tags:[],
      newTodo:{
        name: '',
        tags: ['home'],
        completed: 'false'
      },
      editStatus: false,
      currentEditId: 0,
      search: ''
    }
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditStatus = this.handleEditStatus.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  defaultValue = {
    completed: ['false', 'true'],
    tags: ['home', 'work', 'entertainment'],
    edit: {
      name: '',
      tags: [],
      completed: 'false'
    }
  }

  getTodos(){    
    axiosService.get('todos')
    .then(
      (result) => {
        this.setState({
          todos: result.data.data
        });
        this.props.dispatch(actions.getTodos(result.data.data));
      }
    );
  }

  // addTodo(){
  //   console.log(this.refs.name.value);
  // }

  handleDeleteTodo(id){
    axiosService.delete('todos/' + id).then(() =>{
      this.getTodos();
    });
  }

  handleChange(event){
    let eventName = event.target.name;
    let value = event.target.value;
    let prevTags = this.state.newTodo.tags;
    let prevCompleted = this.state.newTodo.completed;
    let prevName = this.state.newTodo.name;
    
    console.log(this.state.newTodo);
    if(eventName === 'name'){
      console.log(value);
      this.setState({newTodo: {
        name : value,
        tags : prevTags,
        completed : prevCompleted
      }});
    }else if(eventName === 'tags'){
      console.log(value);
      
      this.setState({newTodo: {
        name : prevName,
        tags : [value],
        completed : prevCompleted
      }});
   
    }else if(eventName === 'completed'){
      console.log(value);
      
      this.setState({newTodo: {
        name : prevName,
        tags : prevTags,
        completed : value
      }});

    }
    // this.setState({})

  }

  handleAddTodo(){
    let todo = this.state.newTodo;
    let todos =  this.state.todos;
    console.log(todo);
    console.log(todos);
    
    todos.push(todo);
    this.setState({todos: todos});
    debugger;

    axiosService.post('todos', {
      name: todo.name,
      done: todo.completed
    }).then(() => {
      this.getTodos();
    });


  }

  handleEditStatus(todo){
    this.setState({
      editStatus : true
    });
    console.log(todo);

    this.setState({newTodo: {
      name : todo.name,
      tags : todo.tags,
      completed : todo.done
    },
    currentEditId: todo.id
  });
    
    // axiosService.get('todos/' + id).then(() =>{
    //   this.getTodos();
    // });
  }

  handleEditTodo(){
    let todo = this.state.newTodo;
    let id =  this.state.currentEditId;
    let todos = this.state.todos;
    console.log(id);
    console.log(todo);
    debugger;

    axiosService.put('todos/' + id, {
      name: todo.name,
      tags: todo.tags,
      done: todo.completed
    }).then((res) => {
      this.setState({
          todos: res
      });
    }).then(() => {
      this.getTodos();
    });
  }

  handleSearch(e){
    let searchKey = e.target.value;
    this.setState({
      searchKey: e.target.value
    });
    axiosService.get('todos/search', {
      params: {
        key: searchKey
      }
    }).then((value) => {
      console.log('value', value);
      this.setState({
        todos: value.data.data
      })
    });

  }

  componentDidMount(){
    this.getTodos(this.state);
  }

  editAddSelector(){
    let editStatus = this.state.editStatus;
    if(!editStatus){
      return <AddTodo 
          submitOption={this.handleAddTodo} 
          handleChange={this.handleChange} 
          completed={this.defaultValue.completed}
          tags={this.defaultValue.tags}
        />
    }else{
      console.log(this.defaultValue.edit);
      return <EditTodo 
        submitOption={this.handleEditTodo} 
        handleChange={this.handleChange} 
        completed={this.defaultValue.completed}
        tags={this.defaultValue.tags}
        defaultValue={this.state.newTodo}
      />
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Search handleChange={this.handleSearch}/>
        <Todos todos = {this.state.todos} deleteTodo={this.handleDeleteTodo} editTodo={this.handleEditStatus}/>
        {this.editAddSelector()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {return {...state};};
const MainApp = connect(mapStateToProps)(App)

export default MainApp;
