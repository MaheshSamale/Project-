import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/candidateService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CandidateDashboard() {
  const [dashboard, setDashboard] = useState({});
  const token = window.sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/candidate/login');
      return;
    }
    getDashboard(token).then(data => {
      setDashboard(data);
      if (!data.name || !data.skills_json) {
        toast.warn("Please complete your profile first.");
        navigate('/candidate/profile');
      }
    }).catch(() => navigate('/candidate/login'));
  }, [token, navigate]);

  return (
    <div className="container mt-4">
      <h2>Candidate Dashboard</h2>
      <div>Name: {dashboard.name}</div>
      <div>Email: {dashboard.email}</div>
      <div>Skills: {dashboard.skills_json ? JSON.parse(dashboard.skills_json).join(', ') : ''}</div>
      {/* Add dashboard summary here */}
    </div>
  );
}
export default CandidateDashboard;
