import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

interface NavItemsProps {
  setIsContactFormOpen: (isOpen: boolean) => void;
  isMobile?: boolean;
}

const NavItems: React.FC<NavItemsProps> = ({ setIsContactFormOpen, isMobile }) => {
  const baseClasses = `
    flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200
    ${isMobile ? 'w-full p-2' : 'px-4 py-2'}
  `;

  return (
    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-4'}`}>
      <Link
        to="/grooms"
        className={`${baseClasses} text-gray-700 hover:text-red-600 rounded-full hover:bg-red-50`}
      >
        <i className="fas fa-male text-base"></i>
        <span>Looking for Groom</span>
      </Link>
      
      <Link
        to="/brides"
        className={`${baseClasses} text-gray-700 hover:text-pink-600 rounded-full hover:bg-pink-50`}
      >
        <i className="fas fa-female text-base"></i>
        <span>Looking for Bride</span>
      </Link>
      
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} text-white bg-[#25D366] hover:bg-[#128C7E] rounded-full`}
      >
        <i className="fab fa-whatsapp text-base"></i>
        <span>WhatsApp Us</span>
      </a>
      
      <button
        onClick={() => setIsContactFormOpen(true)}
        className={`${baseClasses} text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-full`}
      >
        <UserPlus className="w-4 h-4" />
        <span>Add Your Profile</span>
      </button>
    </div>
  );
};

export default NavItems;