// src/components/Login.tsx
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import dummyUser from "../data/dummyUser.json";
import "./Modal.css";

interface LoginProps {
  onClose: () => void;
  switchToJoinUs: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, switchToJoinUs }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [loginUser] = useMutation(LOGIN_USER);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      // 🌟 Dummy fallback logic for local dev
      if (
        email === dummyUser.email &&
        password === dummyUser.password
      ) {
        localStorage.setItem("token", "dummy-auth-token");
        alert("Logged in with dummy! 🕸️");
        window.location.reload();
        onClose();
        return;
      }

      const { data } = await loginUser({
        variables: { email, password },
      });

      const token = data?.login?.token;
      if (token) {
        localStorage.setItem("token", token);
        alert("Logged in successfully! 🎉");
        window.location.reload();
        onClose();
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Login error:", err.message);
      } else {
        setError("Something went wrong.");
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
            background:
              "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Welcome Back
        </h2>

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

          <button
            type="submit"
            style={{
              background:
                "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Log In
          </button>
        </form>

        <p
          className="bottom-section"
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "10px",
          }}
        >
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={switchToJoinUs}
            style={{
              background:
                "linear-gradient(180deg, rgba(94,98,98,1) 0%, rgba(102,122,126,1) 94%)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Join us here.
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
