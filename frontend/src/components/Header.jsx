import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { Menu, X } from 'lucide-react';
import { logo } from '../utils/icons';
import { toast, ToastContainer } from 'react-toastify';
import useProfile from '../hooks/useProfile';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const token = localStorage.getItem("token");
  const { checkRole } = useProfile();
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileDropdownRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const profileButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('scroll', () => setIsScrolled(window.scrollY > 20));
    return () => window.removeEventListener('scroll', () => setIsScrolled(false));
  }, []);

  useEffect(() => {
    const fetchRole = async () => {
      if (token) {
        const userRole = await checkRole();
        setRole(userRole);
      }
    };
    fetchRole();
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileButtonRef.current && // Check if ref exists
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }

      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current && // Check if ref exists
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Close menu when screen size changes to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    toast.success('Logged out successfully!', { position: "top-center", autoClose: 2000 });
    setTimeout(() => {
      localStorage.removeItem("token");
      setIsProfileDropdownOpen(false);
      navigate('/login');
    }, 2000);
  };

  // Close mobile menu when clicking a navigation link
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all ${isScrolled ? 'bg-white shadow-lg' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3 flex justify-between items-center">
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button 
            ref={menuButtonRef} 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 focus:outline-none hover:bg-gray-100 rounded-md transition-colors duration-200"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center ml-0 sm:ml-0">
            <img src={logo} alt="Logo" className="h-6 sm:h-7 md:h-8 mr-1 sm:mr-2" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-950 truncate">ZenoGo</h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-3 lg:space-x-5 font-medium text-sm lg:text-base">
          <NavLink to="/book-ride" className={({isActive}) => 
            `px-2 py-1 ${isActive ? 'text-emerald-700 font-semibold' : 'text-gray-700'} hover:text-black hover:underline rounded-md transition-colors duration-200`
          }>
            Book a Ride
          </NavLink>
          <NavLink to="/profile" className={({isActive}) => 
            `px-2 py-1 ${isActive ? 'text-emerald-700 font-semibold' : 'text-gray-700'} hover:text-black hover:underline rounded-md transition-colors duration-200`
          }>
            Reserve a Ride
          </NavLink>
        </div>
        
        {/* Right Icons */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {!token ? (
            <>
              <NavLink to="/login" className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-orange-500 text-orange-500 rounded-lg whitespace-nowrap hover:bg-orange-50 hover:border-orange-600 hover:text-orange-600 transition-all duration-200 active:bg-orange-100">Login</NavLink>
              <NavLink to="/register" className="text-xs sm:text-sm px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-orange-500 text-white rounded-lg whitespace-nowrap hover:bg-orange-600 transition-all duration-200 active:bg-orange-700 transform hover:-translate-y-0.5">Sign Up</NavLink>
            </>
          ) : (
            <div className="relative" ref={profileDropdownRef}>
              <button 
                ref={profileButtonRef} 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} 
                className="p-1.5 sm:p-2 focus:outline-none hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="User profile"
              >
                <CgProfile size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-36 sm:w-44 md:w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50"
                  >
                    <NavLink to="/profile" className="block px-3 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200">Manage Account</NavLink>
                    <button onClick={handleLogout} className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200">Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 bg-white w-64 h-full shadow-lg md:hidden flex flex-col p-5 z-50"
            ref={menuRef}
          >
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="flex items-center" onClick={handleNavLinkClick}>
                <img src={logo} alt="Logo" className="h-6 mr-2" />
                <h1 className="text-lg font-bold text-emerald-950">ZenoGo</h1>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 focus:outline-none hover:bg-gray-100 rounded-full transition-colors duration-200">
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col space-y-3">
              <NavLink 
                to="/book-ride" 
                className={({isActive}) => 
                  `py-2 px-2 rounded-md ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-700'} hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200`
                }
                onClick={handleNavLinkClick}
              >
                Book a Ride
              </NavLink>
              <NavLink 
                to="/profile" 
                className={({isActive}) => 
                  `py-2 px-2 rounded-md ${isActive ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-700'} hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200`
                }
                onClick={handleNavLinkClick}
              >
                Reserve a Ride
              </NavLink>
              {token && (
                <button 
                  onClick={handleLogout} 
                  className="py-2 px-2 rounded-md text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 mt-4"
                >
                  Logout
                </button>
              )}
            </div>
            
            {/* Mobile menu login/signup buttons */}
            {!token && (
              <div className="flex flex-col gap-3 mt-6">
                <NavLink 
                  to="/login" 
                  onClick={handleNavLinkClick}
                  className="py-2 px-4 border border-orange-500 text-orange-500 rounded-lg text-center hover:bg-orange-50 hover:border-orange-600 hover:text-orange-600 transition-all duration-200"
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  onClick={handleNavLinkClick}
                  className="py-2 px-4 bg-orange-500 text-white rounded-lg text-center hover:bg-orange-600 transition-all duration-200"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      <ToastContainer />
    </nav>
  );
};

export default Header;