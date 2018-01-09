import React, { Component } from 'react';
import Todos from '../Components/Todos';
import Search from '../Components/Search';
import AddTodo from '../Components/AddTodo';
import EditTodo from '../Components/EditTodo';
import axiosService from'../Services/axiosService';
import { connect } from 'react-redux';
import * as action from '../Actions/todoAction';

class MainWrapper extends Component {

  constructor(props){
    super(props);
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
      (value) => {
        this.setState({
          todos: value.data.data
        });
        this.props.dispatch(action.getTodos(value.data.data));

      }
    );
  }

  handleDeleteTodo(todo){
    console.log('--------------------------');
    console.log(this.props);
    this.props.dispatch(action.deleteTodo(todo));    
    axiosService.delete('todos/' + todo.id).then(() =>{
        console.log(todo);
        console.log(todo.index);        
      let tempList = this.props.todos.filter( ntodo => todo.id !== ntodo.id);
      this.setState({
        todos: tempList
      });
    });
  }

  handleChange(event){
    let eventName = event.target.name;
    let value = event.target.value;

    const obj = {...this.props.newTodo};
    this.props.dispatch(action.handleChange(eventName, value));

    this.setState({
      newTodo: {
        ...obj,
        [eventName]: value
      }
    }
    );
    console.log(this.state.newTodo);
  }

  handleAddTodo(){
    let todo = this.props.newTodo;
    let todos =  this.props.todos;
    console.log(todo);
    console.log(todos);    
    // todos.push(todo);

    this.props.dispatch(action.addTodo());
    
    axiosService.post('todos', {
      name: todo.name,
      tags: todo.tags,
      done: todo.completed
    });
  }

  handleEditStatus(todo){
    this.props.dispatch(action.handleEditStatus(todo));
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
    let todo = this.props.newTodo;
    let id =  this.props.currentEditId;
    let todos = this.props.todos;
    console.log(id);
    console.log(todo);
    // this.props.dispatch(action.editTodo());
    console.log(this.props.todos);
    
    axiosService.put('todos/' + id, {
      name: todo.name,
      tags: todo.tags,
      done: todo.completed
    });

  }

  handleSearch(e){
    let searchKey = e.target.value;
    
    this.props.dispatch(action.handleSearch(searchKey));
    axiosService.get('todos/search', {
      params: {
        key: searchKey
      }
    }).then((value) => {
      console.log('value', value);
      this.setState({
        todos: value.data.data
      })
      this.props.dispatch(action.getTodos(value.data.data));
    });

  }

  componentDidMount(){
    this.getTodos(this.state);
  }

  editAddSelector(){
    let editStatus = this.props.editStatus;
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
        defaultValue={this.props.newTodo}
      />
    }
  }

  render() {
    console.log(this.props.todos);
    return (
      <div className="MainWrapper">
        <Search handleChange={this.handleSearch}/>
        <Todos todos = {this.props.todos} deleteTodo={this.handleDeleteTodo} editTodo={this.handleEditStatus}/>
        {this.editAddSelector()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {return {...state};};
const Main = connect(mapStateToProps)(MainWrapper);

export default Main;
