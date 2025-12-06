import React, { useEffect, useState } from 'react';
import { getProfile, updateCandidateProfile } from '../services/candidateService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CandidateProfile() {
  const token = window.sessionStorage.getItem("token");
  const [profile, setProfile] = useState({ name: '', skills_json: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    getProfile(token).then(data => {
      setProfile({
        name: data?.name || '',
        skills_json: data?.skills_json ? JSON.parse(data.skills_json).join(', ') : ''
      });
    });
  }, [token]);

  const handleSave = async () => {
    try {
      const newProfile = {
        ...profile,
        skills_json: JSON.stringify(profile.skills_json.split(',').map(s => s.trim()))
      };
      await updateCandidateProfile(newProfile, token);
      toast.success("Profile completed!");
      navigate('/candidate/dashboard');
    } catch (err) {
      toast.error(err.message || "Profile update failed");
    }
  };

  return (
    <div className="container w-50 mt-4">
      <h1>Your Profile</h1>
      <div className="mb-3">
        <label>Name</label>
        <input type="text" className="form-control" value={profile.name}
               onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
      </div>
      <div className="mb-3">
        <label>Skills (comma separated)</label>
        <input type="text" className="form-control" value={profile.skills_json}
               onChange={e => setProfile(p => ({ ...p, skills_json: e.target.value }))} />
      </div>
      <button className="btn btn-success" onClick={handleSave}>Save Profile</button>
    </div>
  );
}
export default CandidateProfile;
