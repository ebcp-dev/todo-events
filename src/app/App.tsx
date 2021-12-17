import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import TodoList from '../pages/TodoList/TodoList';
import Route1 from '../pages/Route1/Route1';
import SubRoute1 from '../pages/Route1/SubRoute1/SubRoute1';
import NotFound from '../pages/NotFound/NotFound';

import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Todo List Home</Link>
        </li>
        <li>
          <Link to="/route1">Route1</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="route1" element={<Route1 />}>
          <Route path="subroute1" element={<SubRoute1 />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
