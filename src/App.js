import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AAReporting from './pages/AAReporting';
import AGResults from './pages/AGResults';
import Remote from './pages/Remote';
import ColonyCounting from './pages/ColonyCounting';
import Sequencing from './pages/Sequencing';
import AiTracker from './pages/AiTracker';

import './App.css';

const App = () => {
  return (
    <Router>
      <div class="full-page">
        <Sidebar />
       <div class="full-height-div">
          <Routes>
            <Route path="/" element={<AAReporting />} />
            <Route path="/AAReporting" element={<AAReporting />} />
            <Route path="/AGResults" element={<AGResults />} />
            <Route path="/remote" element={<Remote />} />
            <Route path="/colonycounting" element={<ColonyCounting />} />
            <Route path="/sequencing" element={<Sequencing />} />
            <Route path="/aitracker" element={<AiTracker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
