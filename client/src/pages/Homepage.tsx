// src/pages/Homepage.tsx
import React, { useState, useEffect } from "react";
import "./Wireframe.css"; // Import the CSS for styling
import Login from "../components/Login";
import JoinUs from "../components/JoinUs";

const Homepage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showJoinUs, setShowJoinUs] = useState<boolean>(false);

  // ✅ Simulated login check
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="page-container">
      {/* ✅ Show login and join us buttons if NOT logged in */}
      {!isAuthenticated ? (
        <>
          {/* Auth Container for Login/Join Us */}
          <div className="auth-container">
            <h2>Welcome to Weaver!</h2>
            <p>Join us to explore, create, and engage with stories.</p>
            <button onClick={() => setShowLogin(true)} className="login-btn">
              Login
            </button>
            <button onClick={() => setShowJoinUs(true)} className="join-btn">
              Join Us
            </button>
          </div>

          {/* Main Content for Non-Logged-In Users */}
          <div className="main-content">
            <h2>Explore Stories</h2>
            <p>Sign up or log in to explore, create, and engage with the Weaver community!</p>
          </div>
        </>
      ) : (
        <>
          {/* ✅ Show feed if logged in */}
          <div className="feed-container">
            <h1>Welcome Back!</h1>
            <p>Explore, write, and engage with your favorite stories.</p>
          </div>
        </>
      )}

      {/* ✅ Render modals for Login and JoinUs */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          switchToJoinUs={() => {
            setShowLogin(false);
            setShowJoinUs(true);
          }}
        />
      )}
      {showJoinUs && (
        <JoinUs
          onClose={() => setShowJoinUs(false)}
          switchToLogin={() => {
            setShowJoinUs(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

export default Homepage;
