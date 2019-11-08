import React from 'react';

const Todo = (props) => {
  return (
    <div>
      <li>props.description</li>
      <button onClick={props.handleMoveUp}>Move Up</button>
    </div>
  )
}

export default Todo;