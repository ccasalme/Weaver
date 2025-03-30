// src/components/Login.tsx
import React, { useState } from "react";
import "./Modal.css"; // Modal styles

interface LoginProps {
  onClose: () => void;
  switchToJoinUs: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, switchToJoinUs }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Simulated login backend
  const mockLogin = async (email: string, password: string) => {
    console.log("Logging in with:", email, password);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@weaver.com" && password === "password123") {
          resolve("Login successful!");
        } else {
          reject("Invalid email or password.");
        }
      }, 1000);
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if fields are empty
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await mockLogin(email, password);
      alert("Logged in successfully! 🎉");
      onClose(); // Close modal on successful login
    } catch {
      console.error("Login failed: Invalid email or password.");
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ❎
        </button>
        <h2>Welcome Back</h2>
        {error && <p className="error">{error}</p>}
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
        <p style={{color: "black"}}>
          Don’t have an account?{" "}
          <button type="button" onClick={switchToJoinUs}>
            Join us here.
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
