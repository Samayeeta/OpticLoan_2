import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import GetStarted from './pages/GetStarted';
import Upload from './pages/Upload';
import ExpertAdvice from './pages/ExpertAdvice';
import TrapDatabase from './pages/TrapDatabase';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="upload" element={<Upload />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="get-started" element={<GetStarted />} />
        <Route path="expert-advice" element={<ExpertAdvice />} />
        <Route path="trap-database" element={<TrapDatabase />} />
      </Route>
    </Routes>
  );
}

export default App;
