import React, { useState } from "react";
import AuthModal from "./components/AuthModal";

const App: React.FC = () => {
  // Track whether the modal is open
  const [isAuthOpen, setAuthOpen] = useState(false);

  // Track whether we're in login (true) or signup (false) mode
  const [isLogin, setIsLogin] = useState(true);

  // When the user clicks the "Login / Signup" button
  const openModal = () => {
    setIsLogin(true); // Always default to login mode
    setAuthOpen(true); // Show the modal
  };

  // Function that gets called when user logs in
  const handleLogin = (email: string, password: string) => {
    console.log("Logging in with", email, password);
    // TODO: call your GraphQL login mutation here
    setAuthOpen(false); // Close the modal after login
  };

  // Function that gets called when user signs up
  const handleSignup = (email: string, username: string, password: string) => {
    console.log("Signing up with", email, username, password);
    // TODO: call your GraphQL signup mutation here
    setAuthOpen(false); // Close the modal after signup
  };

  return (
    <div>
      {/* Only show the Login / Signup button if modal is NOT open */}
      {!isAuthOpen && <button onClick={openModal}>Login / Signup</button>}

      {/* Auth Modal (handles both login and signup) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setAuthOpen(false)}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
};

export default App;
