// src/components/Login.tsx
import React, { useState } from "react";
import "./Modal.css";
import dummyUser from "../data/dummyUser.json"; // ✅ Import dummy user data

// ✅ Define props for Login component
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
      localStorage.setItem("token", "dummy-auth-token"); // ✅ Save token
      window.location.reload(); // ✅ Refresh to update navbar
      onClose();
    } catch {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn"
          type="button"
          aria-label="Close" 
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            boxShadow: "none",
            outline: "none",
            padding: 0,
            zIndex: 99999,
          }}>
          ❎
        </button>
        <h2
          style={{color: "white", 
          textAlign: "center",
          background: "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
          filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#5e6262',endColorstr='#667a7e',GradientType=1)",
          padding: "10px",
          borderRadius: "5px"}}>Welcome Back</h2>
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
          <button 
            type="submit"
            style={{
              background: "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
              filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#5e6262',endColorstr='#667a7e',GradientType=1)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer"
            }}>Log In</button>
        </form>
        <p style={{ color: "white" }}>
          Don’t have an account?{" "}
          <button type="button" 
            onClick={switchToJoinUs}
            style={{
              background: "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
              filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#5e6262',endColorstr='#667a7e',GradientType=1)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer"
            }}>
            Join us here.
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
