// src/components/Login.tsx
import React, { useState } from "react";
import "./Modal.css"; // Modal styles
import dummyUser from "../data/dummyUser.json"; // ✅ Import dummy user data

interface LoginProps {
  onClose: () => void;
  switchToJoinUs: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, switchToJoinUs }) => {
  const [username, setUsername] = useState<string>(""); // ✅ Changed to username
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // ✅ Simulated login backend using dummyUser.json
  const mockLogin = async (username: string, password: string) => {
    console.log("Logging in with:", username, password);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          username === dummyUser.username &&
          password === dummyUser.password
        ) {
          resolve("Login successful!");
        } else {
          reject("Invalid username or password.");
        }
      }, 1000);
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Check for empty fields
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      await mockLogin(username, password);
      alert("Logged in successfully! 🎉");
      onClose(); // ✅ Close modal after successful login
    } catch {
      setError("Invalid username or password.");
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
            type="text" // ✅ Changed to text for username
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
          <button type="submit">Log In</button>
        </form>
        <p style={{ color: "black" }}>
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
