import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Grooms from './pages/Grooms';
import Brides from './pages/Brides';
import Admin from './pages/Admin';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grooms" element={<Grooms />} />
            <Route path="/brides" element={<Brides />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <ContactForm />
        <Footer />
        <WhatsAppFloat />
        <Toaster position="top-center" />
      </div>
    </Router>
  );
};

export default App;