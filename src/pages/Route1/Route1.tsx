import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import './Route1.scss';

const Route1 = () => {
  return (
    <div>
      <h1>Welcome to Route1!</h1>
      <ul>
        <li>
          <Link to="subroute1">SubRoute1</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Route1;
