import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { login } from '../services/authService';

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000', // core dark background
    padding: '32px 16px',
    fontFamily: '"Lexend", "Space Grotesk", ui-sans-serif, system-ui, sans-serif',
    color: '#ffffff',
  },
  container: {
    width: '100%',
    maxWidth: 600,
    padding: 32,
    backgroundColor: '#1a202c', // dark slate card background 
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  header: {
    fontSize: 36,
    fontWeight: 600,
    marginBottom: 24,
    textAlign: 'center',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  welcomeMsg: {
    marginTop: 24,
    fontSize: 16,
    color: '#48bb78', // success green for logged in confirmation
    textAlign: 'center',
  },
};

export default function LoginPage() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // You can extend this to redirect or update route here
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {!user ? (
          <>
            <h1 style={styles.header}>Sign In to HireWrite</h1>
            <LoginForm onSubmit={handleLoginSuccess} />
          </>
        ) : (
          <p style={styles.welcomeMsg}>
            Welcome back, <strong>{user.email}</strong>!
          </p>
        )}
      </div>
    </div>
  );
}
