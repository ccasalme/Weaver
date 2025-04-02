import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import "./Modal.css";

interface JoinUsProps {
  onClose: () => void;
  switchToLogin: () => void;
}

const JoinUs: React.FC<JoinUsProps> = ({ onClose, switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [addUser] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { fullName, username, email, password },
      });

      const token = data?.addUser?.token;
      if (token) {
        localStorage.setItem("id_token", token);
        alert("Account created successfully! 🎉");
        window.location.reload();
      } else {
        setError("Signup failed. No token returned.");
      }
    } catch (err: unknown) {
      console.error("Signup error:", err);
      if (err instanceof Error) {
        setError(err.message || "Error while creating account. Please try again.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button 
          className="close-btn"
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
          }}
        >
          ❎
        </button>
        <h2
          style={{
            color: "white", 
            textAlign: "center",
            background: "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
            filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#5e6262',endColorstr='#667a7e',GradientType=1)",
            padding: "10px",
            borderRadius: "5px"
          }}
        >Join Weaver</h2>
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
            }}
          >Sign Up</button>
        </form>
        <p 
          className="bottom-section"
          style={{ 
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "10px"
          }}
        >
          Already have an account?{" "}
          <button 
            type="button" 
            onClick={switchToLogin}
            style={{
              background: "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
              filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#5e6262',endColorstr='#667a7e',GradientType=1)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Log in here.
          </button>
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
