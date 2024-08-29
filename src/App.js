import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Reporting from './pages/Reporting';
import Remote from './pages/Remote';
import ColonyCounting from './pages/ColonyCounting';
import Sequencing from './pages/Sequencing';
import './App.css';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', height: '870px' }}>
        <Sidebar />
       <div class="full-height-div">
          <Routes>
            <Route path="/" element={<Reporting />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/remote" element={<Remote />} />
            <Route path="/colonycounting" element={<ColonyCounting />} />
            <Route path="/sequencing" element={<Sequencing />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
