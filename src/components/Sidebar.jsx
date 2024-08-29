 import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Sidebar.css';
import { FaFish, FaDna, FaBacteria } from 'react-icons/fa';
import { MdOutlineStackedBarChart } from 'react-icons/md';
import { VscRemoteExplorer } from "react-icons/vsc";





const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="title"> <FaFish /> &nbsp;&nbsp;  KOA Biotech</div>

      <div className="subtitle"> AQUAGAR </div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/reporting" activeClassName="active-link"> <MdOutlineStackedBarChart /> &nbsp; Reporting</NavLink>
          </li>
          <li>
            <NavLink exact to="/remote" activeClassName="active-link"><VscRemoteExplorer /> &nbsp; Remote</NavLink>
          </li>
          </ul>
          </nav>

          <div className="subtitle"> LAB </div>
     <nav>
        <ul>
          <li>
            <NavLink exact to="/colonycounting" activeClassName="active-link"> <FaBacteria />  &nbsp; Colonycounting</NavLink>
          </li>
          <li>
            <NavLink exact to="/sequencing" activeClassName="active-link"><FaDna />  &nbsp; Sequencing</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
