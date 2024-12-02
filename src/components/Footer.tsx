import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
            <p className="flex items-center">
  <a href="tel:+919700924478" className="flex items-center">
    <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
    +91 9700924478
  </a>
</p>

<p className="flex items-center">
  <a href="mailto:marriagesmohanreddy@gmail.com" className="flex items-center">
    <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
    <span className="break-all">marriagesmohanreddy@gmail.com</span>
  </a>
</p>

              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                Shanthi Nagar,Kavali
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/brides" className="hover:text-orange-400">Looking for Bride</Link>
              </li>
              <li>
                <Link to="/grooms" className="hover:text-orange-400">Looking for Groom</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-orange-400">Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=100070376137728" className="hover:text-orange-400" target="_blank" rel="noopener noreferrer">
  <Facebook className="w-6 h-6" />
</a>
<a href="https://www.instagram.com/mohanreddymarriages/" className="hover:text-orange-400" target="_blank" rel="noopener noreferrer">
  <Instagram className="w-6 h-6" />
</a>
<a href="https://www.linkedin.com/in/mohanreddymarriages" className="hover:text-orange-400" target="_blank" rel="noopener noreferrer">
  <Linkedin className="w-6 h-6" />
</a>

            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
              Mohan Reddy Marriage Bureau has been providing trusted matrimonial services for over 5 years. 
              We help families find the perfect match for their loved ones, bringing joy and happiness to 
              thousands of lives through our personalized matchmaking services.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mohan Reddy Marriage Bureau. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;