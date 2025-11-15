import React, { useState } from 'react';
import { register } from '../services/authService';
const styles = {
    form: {
        maxWidth: 420,
        margin: 'auto',
        backgroundColor: '#030712', // very dark background for dark mode
        padding: 24,
        borderRadius: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: '"Lexend", "Space Grotesk", ui-sans-serif, system-ui, sans-serif',
        color: '#ffffff',
        userSelect: 'none',
    },
    heading: {
        fontSize: 32,
        fontWeight: 600,
        marginBottom: 24,
        textAlign: 'center',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
    },
    label: {
        display: 'block',
        marginBottom: 6,
        fontWeight: 600,
        fontSize: 14,
        color: '#737373', // muted text
        userSelect: 'text',
    },
    input: {
        width: '100%',
        height: 44,
        padding: '0 12px',
        fontSize: 16,
        borderRadius: 6,
        border: '1.5px solid #262626', // dark gray border
        backgroundColor: '#1a202c', // dark slate background
        color: '#ffffff',
        marginBottom: 20,
        outline: 'none',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    },
    inputFocus: {
        borderColor: 'rgba(59, 130, 246, 0.5)', // blue focus ring
        boxShadow: '0 0 8px rgba(59,130,246,0.5)',
    },
    errorText: {
        color: '#e53e3e', // error red
        marginBottom: 20,
        fontSize: 14,
        fontWeight: 500,
    },
    button: {
        width: '100%',
        height: 48,
        backgroundColor: '#6b46c1', // primary purple
        color: '#ffffff',
        border: 'none',
        borderRadius: 6,
        fontSize: 16,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        userSelect: 'none',
    },
    buttonHover: {
        backgroundColor: '#553c9a', // slightly darker purple on hover
    },
    buttonDisabled: {
        backgroundColor: '#a78bfa', // lighter purple for disabled state
        cursor: 'not-allowed',
    },
};

export default function RegisterForm({ onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole] = useState('')
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
          const result = await register(email, password, role);
          console.log(result);
          
        } catch (err) {
            setError(err.message || 'Failed to Register');
        } finally {
            setLoading(false);
        }

        console.log(role)
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit} noValidate>
            <h2 style={styles.heading}>Register</h2>

            <label htmlFor="email" style={styles.label}>
                Email
            </label>
            <input
                id="email"
                name="email"
                type="email"
                style={{
                    ...styles.input,
                    ...(isFocusedEmail ? styles.inputFocus : {}),
                }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
                required
                autoComplete="email"
            />

            <label htmlFor="password" style={styles.label}>
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                style={{
                    ...styles.input,
                    ...(isFocusedPassword ? styles.inputFocus : {}),
                }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => setIsFocusedPassword(false)}
                required
                autoComplete="current-password"
            />

            <label htmlFor="password" style={styles.label}>
                Role
            </label>
            <select style={{
                    ...styles.input,
                    ...(isFocusedEmail ? styles.inputFocus : {}),
                }} onChange={e => {
                setRole(e.target.value)
                console.log(e.target.value)
            }}>
                <option disabled>SELECT</option>
                <option>student</option>
                <option>Recruitor</option>
            </select>
            {error && <p style={styles.errorText}>{error}</p>}
            <button
                type="submit"
                disabled={loading}
                style={{
                    ...styles.button,
                    ...(isHovered && !loading ? styles.buttonHover : {}),
                    ...(loading ? styles.buttonDisabled : {}),
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-busy={loading}
                onClick={handleSubmit}
            >
                {loading ? 'Register in...' : 'Register'}
            </button>
        </form>
    );
}
