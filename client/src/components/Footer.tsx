import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you will create a separate CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/architects">Architects</Link></li>
                <li><Link to="/rules">Rules</Link></li>
                <li><Link to="/privacy">Privacy</Link></li>
                <li><Link to="/weaver-info">About Weaver</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
