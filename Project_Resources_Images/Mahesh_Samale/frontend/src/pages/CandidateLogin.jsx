import React, { useState } from 'react';
import { loginCandidate } from '../services/candidateService';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

function CandidateLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in both fields!");
      return;
    }
    try {
      const user = await loginCandidate(email, password);
      window.sessionStorage.setItem("token", user.token);
      window.sessionStorage.setItem("user_id", user.user_id);
      window.sessionStorage.setItem("full_name", user.full_name);
      window.sessionStorage.setItem("email", user.email);
      window.sessionStorage.setItem("profile_photo_url", user.profile_photo_url);
      toast.success("Login successful!");
      navigate('/candidate/dashboard');
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="container w-50 mt-5">
      <h1>Candidate Login</h1>
      <div className="mb-3 mt-3">
        <label>Email address</label>
        <input type="email" className="form-control" value={email}
               onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" value={password}
               onChange={e => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      <div className="mt-3">
        <span>Don't have an account? </span>
        <Link to="/candidate/register">Sign up</Link>
      </div>
    </div>
  );
}
export default CandidateLogin;
