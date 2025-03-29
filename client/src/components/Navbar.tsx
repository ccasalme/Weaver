// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Define props for toggleLogin and toggleJoinUs
interface NavbarProps {
  toggleLogin: () => void;
  toggleJoinUs: () => void;
}

const isAuthenticated = false; // Placeholder auth logic (replace with real auth state)

const Navbar: React.FC<NavbarProps> = ({ toggleLogin, toggleJoinUs }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFloating, setIsFloating] = useState<boolean>(false);

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
      {/* New Auth Buttons for Login & JoinUs */}
      <div className="auth-buttons">
        <button onClick={toggleLogin}>Log In</button>
        <button onClick={toggleJoinUs}>Join Us</button>
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
        <div className="links">
          {/* Show different menus based on login state */}
          {isAuthenticated ? loggedInMenu : loggedOutMenu}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
