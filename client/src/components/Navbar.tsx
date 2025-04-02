import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Login from "./Login";
import JoinUs from "./JoinUs";
import { isLoggedIn, logout } from "../utils/auth"; // ✅ import auth utils

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFloating, setIsFloating] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showJoinUs, setShowJoinUs] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();

  // ✅ Check with GraphQL if token is valid
  useEffect(() => {
    const checkAuth = async () => {
      const valid = await isLoggedIn(); // checks server-side
      setIsAuthenticated(valid);
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    logout(); // ✅ uses the shared logout function
    setIsAuthenticated(false);
    alert("Logged out successfully! ❎");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsFloating(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loggedInMenu = (
    <>
      <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
      <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
      <Link to="/weaverinfo" onClick={() => setIsOpen(false)}>What is Weaver</Link>
      <Link to="/rules" onClick={() => setIsOpen(false)}>Rules and Guidelines</Link>
      <Link to="/architects" onClick={() => setIsOpen(false)}>About the Architects</Link>
      <Link to="/privacy" onClick={() => setIsOpen(false)}>Privacy Policy</Link>
      <button onClick={handleLogout}>Log out</button>
    </>
  );

  const loggedOutMenu = (
    <>
      <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
      <Link to="/weaverinfo" onClick={() => setIsOpen(false)}>What is Weaver</Link>
      <Link to="/rules" onClick={() => setIsOpen(false)}>Rules and Guidelines</Link>
      <Link to="/architects" onClick={() => setIsOpen(false)}>About the Architects</Link>
      <Link to="/privacy" onClick={() => setIsOpen(false)}>Privacy Policy</Link>
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
