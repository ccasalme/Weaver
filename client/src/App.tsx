// src/App.tsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Architects from "./pages/Architects";
import ErrorPage from "./pages/Error";
import Privacy from "./pages/Privacy";
import Rules from "./pages/Rules";
import WeaverInfo from "./pages/WeaverInfo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import JoinUs from "./components/JoinUs";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showJoinUs, setShowJoinUs] = useState(false);

  // Functions to toggle modals
  const toggleLogin = () => setShowLogin((prev) => !prev);
  const toggleJoinUs = () => setShowJoinUs((prev) => !prev);

  return (
    <>
      {/* Pass toggle functions to Navbar */}
      <Navbar toggleLogin={toggleLogin} toggleJoinUs={toggleJoinUs} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/architects" element={<Architects />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/weaverinfo" element={<WeaverInfo />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {/* Render Login and JoinUs modals if their state is true */}
      {showLogin && (
        <Login
          onClose={toggleLogin}
          switchToJoinUs={() => {
            setShowLogin(false);
            setShowJoinUs(true);
          }}
        />
      )}

      {showJoinUs && (
        <JoinUs
          onClose={toggleJoinUs}
          switchToLogin={() => {
            setShowJoinUs(false);
            setShowLogin(true);
          }}
        />
      )}

      <Footer />
    </>
  );
}

export default App;
