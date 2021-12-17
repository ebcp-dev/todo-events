import React from 'react';

import './Todo.scss';

const Todo = (props: { todoName: string; todoIndex: number }) => {
  return (
    <div>
      Todo {props.todoIndex}: {props.todoName}
    </div>
  );
};

export default Todo;
