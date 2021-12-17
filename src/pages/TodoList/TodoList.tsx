import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../app/redux/store';

import Todo from './components/Todo/Todo';

import './TodoList.scss';
import { addTodo } from '../../app/redux/slices/todoListSlice';

const TodoList = () => {
  const [todoInput, setTodoInput] = useState('');

  const dispatch = useDispatch();
  const handleAddTodo = () => {
    if (!todoInput) {
      console.log('Enter a task to add.');
    } else {
      dispatch(addTodo(todoInput));
      setTodoInput('');
    }
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTodoInput(event.currentTarget.value);
  };

  const todoList = useSelector((state: RootState) => state.todoList.value);

  const renderTodoList = todoList.map((item, index) => {
    // Change key to unique value. List index shouldn't be used as unique key because multiple lists could result in duplicate indexes.
    return <Todo todoName={item} todoIndex={index} key={index} />;
  });

  return (
    <section className="todoList-section">
      <div className="todoList-container">
        <h1>Todo List Home</h1>
        <input
          type="text"
          name="todoInput"
          placeholder="Add a task"
          value={todoInput}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
        {renderTodoList}
      </div>
    </section>
  );
};

export default TodoList;
