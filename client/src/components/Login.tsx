// src/components/Login.tsx
import React, { useState } from 'react';
import './AuthModal.css'; // Add relevant styling

interface LoginProps {
  onClose: () => void;
  switchToJoinUs: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, switchToJoinUs }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    // TODO: Add mutation to handle login
    // const { data } = await LOGIN_USER({ variables: { email, password } });
    onClose(); // Close modal on successful login
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>❎</button>
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <p>
          Don’t have an account?{' '}
          <button type="button" onClick={switchToJoinUs}>
            Join us here.
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
