// components/AuthModal.tsx
import React, { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean; // 💡 New prop to control login/signup state
  setIsLogin: (value: boolean) => void; // 💡 New prop to change that state
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, username: string, password: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  isLogin,
  setIsLogin,
  onLogin,
  onSignup,
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onSignup(email, username, password);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <div>
        {/* Close button */}
        <button onClick={onClose}>&times;</button>

        {/* Title */}
        <h2>{isLogin ? "Welcome Back" : "Join Weaver"}</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
        </form>

        {/* Toggle between login/signup */}
        <p>
          {isLogin ? (
            <>
              New here?{" "}
              <button type="button" onClick={() => setIsLogin(false)}>
                Join us
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => setIsLogin(true)}>
                Log in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
