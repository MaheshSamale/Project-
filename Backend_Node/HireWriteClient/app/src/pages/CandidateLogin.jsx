import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { userCandidateLogin } from '../services/authService';

function CandidateLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const result = await userCandidateLogin(email, password);
      console.log(result);
      if (result.status === "success") {
        toast.success('Login Successful');
        window.sessionStorage.setItem('token', result.data.token);
        // Save user info in session/local storage if needed
        window.sessionStorage.setItem('user', JSON.stringify(result.data));
        navigate('/candidate/dashboard'); // Adjust route as necessary
      } else {
        toast.warn(result.error);
      }
    } catch (err) {
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="container w-50 mt-3">
      <h1>Candidate Login</h1>
      <div className="mb-3 mt-3">
        <label htmlFor="inputEmail" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          aria-describedby="emailHelp"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="inputPassword" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={login}>Login</button>
      </div>
      <div>
        <label>Don't have an account?</label>{' '}
        <a href="/candidate/register">Click Here</a>
      </div>
    </div>
  );
}

export default CandidateLogin;
