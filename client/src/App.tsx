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
import AuthModal from "./components/AuthModal";  // Ensure this import is correct

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleAuthModal = () => {
    setShowAuthModal(prev => !prev);
  };

  return (
    <>
      <Navbar />
      <button onClick={toggleAuthModal}>Toggle Auth Modal</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/architects" element={<Architects />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/weaverinfo" element={<WeaverInfo />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {showAuthModal && <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        isLogin={true} // Assuming default mode
        setIsLogin={() => {}} // Provide actual function if needed
        onLogin={() => {}} // Placeholder
        onSignup={() => {}} // Placeholder
      />}
      <Footer />
    </>
  );
}

export default App;
