// src/components/JoinUs.tsx
import React, { useState } from 'react';
import './AuthModal.css'; // Add relevant styling

interface JoinUsProps {
  onClose: () => void;
  switchToLogin: () => void;
}

const JoinUs: React.FC<JoinUsProps> = ({ onClose, switchToLogin }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signing up with:', email, username, password);
    // TODO: Add mutation to handle sign up
    // const { data } = await ADD_USER({ variables: { email, username, password } });
    onClose(); // Close modal on successful sign-up
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>❎</button>
        <h2>Join Weaver</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <button type="button" onClick={switchToLogin}>
            Log in here.
          </button>
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
