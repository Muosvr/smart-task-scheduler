import React, { Component } from 'react'
import axios from "axios";

// TODO: reinstall semantic ui react and css

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      todos: []
    }
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
    if (this.state.todos) {
      const todosUI = this.state.todos.map((todo, i) => {
        return (
          <li key={i} style={{ "Width": "1000px", "margin": "10px auto", "listStylePosition": "inside" }}>
            <input value={todo.description} onChange={(e) => { this.updateTodo(e, i) }}></input>
          </li>
        )
      })
      return todosUI
    } else {
      return <p>User not found</p>
    }

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
    axios.post("/todos", this.state)
      .then(res => console.log("success", res))
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

  render() {
    return (
      <div style={{ "width": "90%", "textAlign": "center", "margin": "auto" }}>
        <button onClick={this.saveTodos}>Save</button>
        <button onClick={this.createTodo}>New Todo</button>
        <input placeholder="Please enter name" onChange={this.setUser} />
        <button onClick={this.getTodos}> Log In</button>
        <ul style={{ "textAlign": "center", "padding": "0" }}>
          {this.displayTodo()}
        </ul>
      </div>
    )
  }
}
