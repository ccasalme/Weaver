import React, { useState } from "react";
import "./Modal.css"; // Add relevant styling

// Props interface to define the props passed into JoinUs
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !username || !password || !confirmPassword || !fullName) {
      setError("Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Assign values to userData inside try block (correct placement)
      const userData = {
        fullName,
        username,
        email,
        password,
      };

      console.log("Saving user to the database:", userData);
      alert("Account created successfully! 🎉");

      // Close modal after successful sign-up
      onClose();
    } catch (error) {
      console.error("Error while creating account:", error);
      setError("Error while creating account. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
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
        <p style={{color: "black"}}>
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
