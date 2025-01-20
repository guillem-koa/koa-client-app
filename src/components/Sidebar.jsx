 import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Sidebar.css';
import { FaDna, FaBacteria, FaTable, FaUpload } from 'react-icons/fa';
import { MdOutlineStackedBarChart } from 'react-icons/md';
import { MdAddCircleOutline } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { FaFileExport } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaHistory } from "react-icons/fa";




const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="title"> 
      <img src="/KOA Logo.png" alt="KOA Logo" style={{ height: "50px" }} /> 
      </div>

      <div className="subtitle"> General </div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/dashboard" activeClassName="active-link"> <MdOutlineStackedBarChart /> &nbsp; Dashboard</NavLink>
          </li>

          </ul>
          </nav>


      <div className="subtitle"> Gestión de Muestras </div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/registrar" activeClassName="active-link"> <MdAddCircleOutline /> &nbsp; Registrar</NavLink>
          </li>
          <li>
            <NavLink exact to="/historial" activeClassName="active-link"> <FaTable /> &nbsp; Historial</NavLink>
          </li>
          <li>
            <NavLink exact to="/AAReporting" activeClassName="active-link"> <FaFileExport />  &nbsp; Exportar</NavLink>
          </li>
          </ul>
          </nav>

          <div className="subtitle"> Resultados y Reportes </div>
     <nav>
        <ul>
        <li>
            <NavLink exact to="/resultados" activeClassName="active-link"><FaTableList />   &nbsp; Resultados</NavLink>
          </li>
          <li>
          <NavLink exact to="/AAReporting" activeClassName="active-link"><IoMdAnalytics />          &nbsp; Análisis</NavLink>
          </li>
          <li>
          <NavLink exact to="/AAReporting" activeClassName="active-link"> <FaFileExport />  &nbsp; Exportar</NavLink>
          </li>
        </ul>
      </nav>

      <div className="subtitle"> Gestión de Máquinas </div>
     <nav>
        <ul>
        <li>
            <NavLink exact to="/AAReporting" activeClassName="active-link"><MdOutlineMonitorHeart />  &nbsp; Estado</NavLink>
          </li>
          <li>
            <NavLink exact to="/AAReporting" activeClassName="active-link"> <FaHistory />
            &nbsp; Historial de Actividad</NavLink>
          </li>
          <li>
            <NavLink exact to="/AAReporting" activeClassName="active-link"><MdOutlineSupportAgent /> &nbsp; Soporte</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
