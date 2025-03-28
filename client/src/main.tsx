import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import HomePage from './pages/Homepage';
import Profile from './pages/Profile';
import Architects from './pages/Architects';
import Error from './pages/Error';
import Privacy from './pages/Privacy';
import Rules from './pages/Rules';
import WeaverInfo from './pages/WeaverInfo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/architects" element={<Architects />} />
        <Route path="/error" element={<Error />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/weaver-info" element={<WeaverInfo />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
