// src/components/JoinUs.tsx
import React, { useState } from "react";
import "./Modal.css"; // Modal styles

interface JoinUsProps {
  onClose: () => void;
  switchToLogin: () => void;
}

const JoinUs: React.FC<JoinUsProps> = ({ onClose, switchToLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // Handle modal close with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword || !fullName) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userData = {
        fullName,
        username,
        email,
        password,
      };

      console.log("Saving user to the database:", userData);
      alert("Account created successfully! 🎉");
      handleClose();
    } catch (error) {
      console.error("Error while creating account:", error);
      setError("Error while creating account. Please try again.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div
        className={`modal ${isClosing ? "modal-closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={handleClose}>
          ❎
        </button>
        <h2>Join Weaver</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name (First and Last)"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p style={{ color: "black" }}>
          Already have an account?{" "}
          <button type="button" onClick={switchToLogin}>
            Log in here.
          </button>
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
