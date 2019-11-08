import React, { Component } from 'react'
import axios from "axios";

import Todo from './Todo';
import Availability from "./Availability";

// TODO: reinstall semantic ui react and css

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      todos: [],
      availability: []
    }
  }



  createTodo = (e, description) => {
    const newTodo = {
      description: "",
      duration: 0,
      assignedDate: "11-07-2019"
    }

    if (this.state.todos.length > 0) {
      this.setState({
        todos: [...this.state.todos, newTodo]
      });
    } else {
      this.setState({ todos: newTodo });
    };

    this.displayTodo();
  }
  displayTodo = () => {
    if (this.state.todos) {
      const todosUI = this.state.todos.map((todo, i) => {
        return (
          <li key={i} style={{ "Width": "1000px", "margin": "10px auto", "listStylePosition": "inside" }}>
            <input
              name='description'
              value={todo.description}
              onChange={(e) => { this.updateTodo(e, i) }}
              type='text'
            />
            <input
              style={{ width: "50px", margin: "0 10px" }}
              placeholder='duration'
              id='duration'
              name='duration'
              value={todo.duration}
              onChange={(e) => this.updateTodo(e, i)}
              type='number'
            />
            <label htmlFor='duration'>h</label>
            <button
              onClick={() => this.handleMoveUp(i)}
              style={{ margin: "0 10px" }}
            >Move Up</button>
            <span>{todo.assignedDates ?
              todo.assignedDates.map(date => {
                return date;
              }).join(", ") : ""
            }</span>
          </li>
        )
      })
      return todosUI
    } else {
      return <p>User not found</p>
    }

  }

  handleMoveUp = index => {
    if (index !== 0) {
      this.moveToDo(index, index - 1);
    }
  }

  calculate = () => {
    if (this.state.todos.length > 0) {
      const payload = {
        todos: this.state.todos,
        availability: this.state.availability
      }
      axios.post("/updateTodos", payload)
        .then(res => {
          console.log("caculated response", res.data)
          this.setState({
            todos: res.data.todos
          })
        })
        .catch(err => console.log(err))
    }

  }

  moveToDo = (curr_i, new_i) => {

    var todos = this.state.todos.slice()
    todos.splice(new_i, 0, todos.splice(curr_i, 1)[0]);

    this.setState({
      todos
    }, () => this.saveTodos());
  }

  updateTodo = (e, i) => {
    // const payload = { [e.target.name]: e.target.value }
    let temp = this.state.todos
    temp[i] = { ...temp[i], [e.target.name]: e.target.value }
    this.setState({
      todos: temp
    });
  }

  saveTodos = () => {
    axios.post("/todos", this.state)
      .then(res => console.log("success", res.data))
      .catch(err => console.log(err))
  }

  setUser = e => {
    this.setState({
      name: e.target.value
    })
  }

  getTodos = () => {
    const userName = this.state.name
    console.log("userName from state", userName);
    axios.get("/todos/" + userName)
      .then(res => {
        const data = res.data
        console.log("Todos received", data)
        const newState = {
          name: data.name,
          todos: data.todos
        }
        this.setState(newState);
      }).catch(err => console.log(err));

  }

  updateAvailability = (availability) => {
    this.setState({ availability })
  }

  render() {
    return (
      <div style={{ "width": "90%", "textAlign": "center", "margin": "auto" }}>
        <button onClick={this.saveTodos}>Save</button>
        <button onClick={this.createTodo}>New Todo</button>
        <input placeholder="Please enter name" onChange={this.setUser} />
        <button onClick={this.getTodos}> Log In</button>
        <button onClick={this.calculate}>Calculate</button>
        <Availability updateAvailability={this.updateAvailability} />
        <ul style={{ "textAlign": "center", "padding": "0" }}>
          {this.displayTodo()}
        </ul>
      </div>
    )
  }
}
