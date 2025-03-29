// // This is a React functional component for a responsive navigation bar.
// // It includes a hamburger menu for mobile view and handles scroll events to change the navbar's style.
// // The component uses TypeScript for type safety and React hooks for state management and lifecycle methods.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure you have this CSS file in your project

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isFloating, setIsFloating] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = (): void => {
            const shouldBeFloating = window.scrollY > 100;
            setIsFloating(shouldBeFloating);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${isFloating ? 'floating' : ''}`}>
            <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {isOpen && (
                <div className="links">
                    <button onClick={() => setIsOpen(false)} className="close-button">❎</button>
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                    <Link to="/architects" onClick={() => setIsOpen(false)}>Architects</Link>
                    <Link to="/privacy" onClick={() => setIsOpen(false)}>Privacy</Link>
                    <Link to="/rules" onClick={() => setIsOpen(false)}>Rules</Link>
                    <Link to="/weaverinfo" onClick={() => setIsOpen(false)}>About Weaver</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
