import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { userCandidateRegister } from '../services/authService';

function CandidateRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    if (name.trim() === '') {
      toast.warn('Enter Name');
      return;
    }
    if (email.trim() === '') {
      toast.warn('Enter Email');
      return;
    }
    if (password.trim() === '') {
      toast.warn('Enter Password');
      return;
    }

    try {
      const result = await userCandidateRegister(name, email, password);
      console.log(result);
      if (result.status === 'success') {
        toast.success('Registration Successful');
        navigate('/candidate/login');
      } else {
        toast.warn(result.error);
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <div className="container w-50 mt-3">
      <h1>Candidate Registration</h1>
      <div className="mb-3 mt-3">
        <label htmlFor="inputName" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="inputName"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputEmail" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
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
        <button className="btn btn-primary" onClick={register}>Register</button>
      </div>
      <div>
        <label>Already have an account?</label>{' '}
        <a href="/candidate/login">Click Here</a>
      </div>
    </div>
  );
}

export default CandidateRegister;
