import React, { useState } from 'react';
import { registerCandidate } from '../services/candidateService';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

function CandidateRegister() {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile_photo_url, setProfilePhotoUrl] = useState('');
  const [phone_no, setPhoneNo] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!full_name || !email || !password) {
      toast.error("Please fill in all required fields!");
      return;
    }
    try {
      await registerCandidate({
        full_name,
        email,
        password,
        profile_photo_url,
        phone_no
      });
      toast.success("Registration successful!");
      navigate('/candidate/login');
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="container w-50 mt-5">
      <h1>Candidate Registration</h1>
      <div className="mb-3">
        <label>Full Name</label>
        <input type="text" className="form-control" value={full_name}
               onChange={e => setFullName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={email}
               onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" value={password}
               onChange={e => setPassword(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Profile Photo URL</label>
        <input type="text" className="form-control" value={profile_photo_url}
               onChange={e => setProfilePhotoUrl(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Phone Number</label>
        <input type="text" className="form-control" value={phone_no}
               onChange={e => setPhoneNo(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleRegister}>Register</button>
      <div className="mt-3">
        <span>Already have an account? </span>
        <Link to="/candidate/login">Login</Link>
      </div>
    </div>
  );
}
export default CandidateRegister;
