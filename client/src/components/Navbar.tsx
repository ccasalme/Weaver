import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "./Navbar.css";
import Login from "./Login";
import JoinUs from "./JoinUs";
import { logout } from "../utils/auth";
import { GET_ME } from "../graphql/queries"; // 👈 Make sure this exists

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showJoinUs, setShowJoinUs] = useState(false);

  const { data: meData, refetch } = useQuery(GET_ME);
  const isAuthenticated = !!meData?.me;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears token/localStorage
    refetch(); // Refresh Apollo cache to clear user
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
