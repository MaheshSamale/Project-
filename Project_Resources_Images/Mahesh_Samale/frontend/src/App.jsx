import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CandidateLogin from './pages/CandidateLogin';
import CandidateRegister from './pages/CandidateRegister';
import CandidateProfile from './pages/CandidateProfile';
import CandidateDashboard from './pages/CandidateDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/candidate/login" />} />
        <Route path="/candidate/login" element={<CandidateLogin />} />
        <Route path="/candidate/register" element={<CandidateRegister />} />
        <Route path="/candidate/profile" element={<CandidateProfile />} />
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
