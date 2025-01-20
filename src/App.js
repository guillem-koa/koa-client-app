import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AAReporting from './pages/AAReporting';
import AGResults from './pages/AGResults';
import Remote from './pages/Remote';
import ColonyCounting from './pages/ColonyCounting';
import Sequencing from './pages/Sequencing';
import RoboflowUpload from './pages/RoboflowUpload'
import Registrar from './pages/Registrar'
import Historial from './pages/Historial'


import AiTracker from './pages/AiTracker';

import './App.css';

import { AiOutlineMenu } from 'react-icons/ai';
import { Dashboard, ResultadosTable } from "./pages";

const App = () => {

  const [activeMenu, setActiveMenu] = useState(true);
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <Router>
      <div class="full-page">

        {activeMenu && <Sidebar />}

        <div className="bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2">
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <button class="circle-button" onClick={handleActiveMenu}>
              <span style={{ fontSize: '20px' }}><AiOutlineMenu /></span>
            </button>
          </div>
          <div class="full-height-div">
            <Routes>
              <Route path="/" element={<AAReporting />} />
              <Route path="/AAReporting" element={<AAReporting />} />
              <Route path="/AGResults" element={<AGResults />} />
              <Route path="/remote" element={<Remote />} />
              <Route path="/colonycounting" element={<ColonyCounting />} />
              <Route path="/sequencing" element={<Sequencing />} />
              <Route path="/roboflowupload" element={<RoboflowUpload />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resultados" element={<ResultadosTable />} />
              <Route path="/registrar" element={<Registrar />} />
              <Route path="/historial" element={<Historial />} />
            </Routes> </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
