import { Routes, Route } from 'react-router-dom';


import HomePage from './pages/Homepage';
import Profile from './pages/Profile';
import Architects from './pages/Architects';
import ErrorPage from './pages/Error';
import Privacy from './pages/Privacy';
import Rules from './pages/Rules';
import WeaverInfo from './pages/WeaverInfo';
import Navbar from './components/navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/architects" element={<Architects />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/weaver-info" element={<WeaverInfo />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
