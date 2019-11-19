import React from 'react';
import ToDoList from "./components/TodoList";
import GoogleLogin from "./components/GoogleLogin";

function App() {
  return (
    <div className="App">
      <GoogleLogin />
      <ToDoList />
    </div>
  );
}

export default App;
