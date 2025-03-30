// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Login from "./Login";
import JoinUs from "./JoinUs";

const isAuthenticated = false; // Placeholder for auth logic

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFloating, setIsFloating] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showJoinUs, setShowJoinUs] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const shouldBeFloating = window.scrollY > 100;
      setIsFloating(shouldBeFloating);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define menu based on login state
  const loggedInMenu = (
    <>
      <Link to="/" onClick={() => setIsOpen(false)}>
        Home
      </Link>
      <Link to="/profile" onClick={() => setIsOpen(false)}>
        Profile
      </Link>
      <Link to="/weaverinfo" onClick={() => setIsOpen(false)}>
        What is Weaver
      </Link>
      <Link to="/rules" onClick={() => setIsOpen(false)}>
        Rules and Guidelines
      </Link>
      <Link to="/architects" onClick={() => setIsOpen(false)}>
        About the Architects
      </Link>
      <Link to="/logout" onClick={() => setIsOpen(false)}>
        Log out
      </Link>
    </>
  );

  const loggedOutMenu = (
    <>
      <Link to="/" onClick={() => setIsOpen(false)}>
        Home
      </Link>
      <Link to="/weaverinfo" onClick={() => setIsOpen(false)}>
        What is Weaver
      </Link>
      <Link to="/rules" onClick={() => setIsOpen(false)}>
        Rules and Guidelines
      </Link>
      <Link to="/architects" onClick={() => setIsOpen(false)}>
        About the Architects
      </Link>
      <div className="auth-buttons">
        <button onClick={() => setShowLogin(true)}>Log In</button>
        <button onClick={() => setShowJoinUs(true)}>Join Us</button>
      </div>
    </>
  );

  return (
    <nav className={`navbar ${isFloating ? "floating" : ""}`}>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {isOpen && (
        <>
          <button
            onClick={() => setIsOpen(false)}
            className="close-button"
            aria-label="Close Menu"
          />
          <div className="links">
            {isAuthenticated ? loggedInMenu : loggedOutMenu}
          </div>
        </>
      )}

      {/* Show modals if triggered */}
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
    </nav>
  );
};

export default Navbar;
