// src/pages/Homepage.tsx
import React, { useState, useEffect } from "react";
import "./Wireframe.css"; // Import CSS for styling
import Login from "../components/Login";
import JoinUs from "../components/JoinUs";

const Homepage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showJoinUs, setShowJoinUs] = useState<boolean>(false);

  // ✅ Simulated login check
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token found:", !!token); // Debug log
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Render the Home Page
  return (
    <div className="page-container">
      {/* ✅ Show Log In & Join Us if NOT logged in */}
      {!isAuthenticated ? (
        <>
          <div className="main-content">
            <h1>Explore Stories</h1>
            <button
              onClick={() => {
                console.log("Login button clicked!");
                setShowLogin(true);
              }}
              className="btn-primary"
            >
              Log In
            </button>
            <button
              onClick={() => {
                console.log("Join Us button clicked!");
                setShowJoinUs(true);
              }}
              className="btn-secondary"
            >
              Join Us
            </button>
          </div>
        </>
      ) : (
        <>
          {/* ✅ Show user feed if logged in */}
          <div className="feed-container">
            <h1>Welcome Back!</h1>
            <p>Explore, write, and engage with your favorite stories.</p>
          </div>
        </>
      )}

      {/* ✅ Render modals for Login and JoinUs */}
      {showLogin && (
        <Login
          onClose={() => {
            console.log("Login modal closed");
            setShowLogin(false);
          }}
          switchToJoinUs={() => {
            setShowLogin(false);
            setShowJoinUs(true);
          }}
        />
      )}
      {showJoinUs && (
        <JoinUs
          onClose={() => {
            console.log("Join Us modal closed");
            setShowJoinUs(false);
          }}
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
