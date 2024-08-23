 import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="title">KOA Biotech</div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/reporting" activeClassName="active-link">Reporting</NavLink>
          </li>
          <li>
            <NavLink exact to="/remote" activeClassName="active-link">Remote</NavLink>
          </li>
          <li>
            <NavLink exact to="/colonycounting" activeClassName="active-link">Colonycounting</NavLink>
          </li>
          <li>
            <NavLink exact to="/sequencing" activeClassName="active-link">Sequencing</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
