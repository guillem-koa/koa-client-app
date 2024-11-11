 import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Sidebar.css';
import { FaFish, FaDna, FaBacteria, FaTable, FaUpload } from 'react-icons/fa';
import { MdOutlineStackedBarChart } from 'react-icons/md';
import { VscRemoteExplorer } from "react-icons/vsc";
import { GoRocket } from "react-icons/go";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="title"> <FaFish /> &nbsp;&nbsp;  KOA Biotech</div>

      <div className="subtitle"> AQUAGAR </div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/AAReporting" activeClassName="active-link"> <MdOutlineStackedBarChart /> &nbsp; Reporting</NavLink>
          </li>
          <li>
            <NavLink exact to="/aitracker" activeClassName="active-link"> <GoRocket /> &nbsp; AI Tracker</NavLink>
          </li>
          <li>
            <NavLink exact to="/remote" activeClassName="active-link"><VscRemoteExplorer /> &nbsp; Remote</NavLink>
          </li>
          </ul>
          </nav>


      <div className="subtitle"> AQUAGEN </div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/AGResults" activeClassName="active-link"> <FaTable /> &nbsp; Results</NavLink>
          </li>
          </ul>
          </nav>

          <div className="subtitle"> LAB </div>
     <nav>
        <ul>
        <li>
            <NavLink exact to="/roboflowupload" activeClassName="active-link"><FaUpload />  &nbsp; Roboflow Upload</NavLink>
          </li>
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
