import React, { Component } from 'react'
import axios from "axios";

// TODO: reinstall semantic ui react and css

export default class TodoList extends Component {
  state = {
    todos: []
  }
  createTodo = (e, description) => {
    const newTodo = {}
    if (description) {
      newTodo.description = description;
    } else {
      newTodo.description = "";
    }
    console.log("createTodo", newTodo);

    this.setState({
      todos: [...this.state.todos, newTodo]
    })
    this.displayTodo();
  }
  displayTodo = () => {
    const todosUI = this.state.todos.map((todo, i) => {
      return (
        <li key={i} style={{ "Width": "1000px", "margin": "10px auto", "listStylePosition": "inside" }}>
          <input value={todo.description} onChange={(e) => { this.updateTodo(e, i) }}></input>
        </li>
      )
    })
    return todosUI
  }
  updateTodo = (e, i) => {
    const description = e.target.value;
    let temp = this.state.todos
    temp[i] = { ...temp[i], description }
    this.setState({
      todos: temp
    })
  }

  saveTodos = () => {
    axios.post("/todos", this.state.todos)
      .then(res => console.log("success", res))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div style={{ "width": "90%", "textAlign": "center", "margin": "auto" }}>
        <button onClick={this.saveTodos}>Save</button>
        <button onClick={this.createTodo}>New Todo</button>
        <button> Log In</button>
        <ul style={{ "textAlign": "center", "padding": "0" }}>
          {this.displayTodo()}
        </ul>

      </div>
    )
  }
}
