import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { Menu, X, ChevronDown } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }

      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

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

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-amber-50 to-amber-100 shadow-md' : 'bg-amber-50'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <button 
              ref={menuButtonRef} 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden p-2 text-gray-800 hover:bg-amber-200 hover:text-black rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <Link to="/" className="flex items-center group">
              <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-br from-amber-200 to-orange-300 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <img src={logo} alt="ZenoGo Logo" className="h-7 sm:h-8 md:h-9 w-auto object-contain transform transition-transform duration-300 group-hover:rotate-3" />
              </div>
              <div className="ml-2 flex flex-col">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">ZenoGo</h1>
                <span className="text-xs text-gray-500 hidden sm:block">Travel Smarter</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink to="/select-ride" className={({isActive}) => 
              `px-3 py-2 rounded-full text-sm lg:text-base font-medium transition-all duration-200
              ${isActive 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm' 
                : 'text-gray-700 hover:bg-amber-200 hover:text-gray-900'}`
            }>
              Book a Ride
            </NavLink>
            <NavLink to="/book-ride" className={({isActive}) => 
              `px-3 py-2 rounded-full text-sm lg:text-base font-medium transition-all duration-200
              ${isActive 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm' 
                : 'text-gray-700 hover:bg-amber-200 hover:text-gray-900'}`
            }>
              Reserve a Ride
            </NavLink>
          </div>
          
          {/* Auth Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!token ? (
              <>
                <NavLink to="/login" className="text-xs sm:text-sm px-3 sm:px-4 py-2 border border-orange-400 bg-white text-orange-500 font-medium rounded-full whitespace-nowrap hover:bg-orange-50 hover:border-orange-500 transition-all duration-200 shadow-sm">Login</NavLink>
                <NavLink to="/signup" className="text-xs sm:text-sm px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full whitespace-nowrap hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-sm transform hover:-translate-y-0.5">Sign Up</NavLink>
              </>
            ) : (
              <div className="relative" ref={profileDropdownRef}>
                <button 
                  ref={profileButtonRef} 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} 
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full hover:from-amber-200 hover:to-amber-300 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  aria-label="User profile"
                >
                  <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-1 rounded-full">
                    <CgProfile size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Mahesh</span>
                  <ChevronDown size={16} className={`text-gray-600 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-amber-100 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Mahesh</p>
                        <p className="text-xs text-gray-500 truncate">user@example.com</p>
                      </div>
                      <NavLink 
                        to="/profile" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 transition-colors duration-200"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Manage Account
                      </NavLink>
                      <NavLink 
                        to="/profile" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 transition-colors duration-200"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Upcoming Rides
                      </NavLink>
                      <NavLink 
                        to="/profile" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 transition-colors duration-200"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Completed Rides
                      </NavLink>
                      <button 
                        onClick={handleLogout} 
                        className="flex items-center w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
  {isMenuOpen && (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 md:hidden z-40"
        onClick={() => setIsMenuOpen(false)}
      />
      <motion.div 
        initial={{ opacity: 0, x: '-100%' }} 
        animate={{ opacity: 1, x: 0 }} 
        exit={{ opacity: 0, x: '-100%' }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 w-72 max-w-[80vw] h-full bg-white shadow-xl md:hidden flex flex-col z-50"
        ref={menuRef}
      >
        <div className="p-5 bg-gradient-to-r from-amber-50 to-amber-100 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2" onClick={handleNavLinkClick}>
              <div className="bg-gradient-to-r from-amber-200 to-orange-300 p-1 rounded-full">
                <img src={logo} alt="Logo" className="h-7 w-auto" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">ZenoGo</span>
            </Link>
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          {token && (
            <div className="mt-4 py-2 px-3 bg-amber-100 rounded-lg">
              <p className="text-sm font-medium text-gray-800">Hi, Mahesh</p>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-5">
          <div className="space-y-4">
            {token && (
              <>
                {/* User Profile Section with Visual Distinction */}
                <div className="rounded-xl overflow-hidden shadow-sm border border-amber-200">
                  {/* Profile Section Header */}
                  <div className="bg-gradient-to-r from-amber-200 to-amber-100 px-4 py-2 border-b border-amber-200">
                    <h3 className="font-medium text-amber-800 flex items-center">
                      <CgProfile className="mr-2" size={18} />
                      Your Profile
                    </h3>
                  </div>
                  
                  {/* Profile Navigation Links */}
                  <div className="bg-amber-50">
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `block py-3 px-4 border-b border-amber-100 text-sm ${
                          isActive
                            ? "text-orange-600 font-semibold bg-amber-100"
                            : "text-gray-700 hover:bg-amber-100"
                        } transition-colors duration-200`
                      }
                      onClick={handleNavLinkClick}
                    >
                      Manage Account
                    </NavLink>
                    <NavLink
                      to="/upcoming-rides"
                      className={({ isActive }) =>
                        `block py-3 px-4 border-b border-amber-100 text-sm ${
                          isActive
                            ? "text-orange-600 font-semibold bg-amber-100"
                            : "text-gray-700 hover:bg-amber-100"
                        } transition-colors duration-200`
                      }
                      onClick={handleNavLinkClick}
                    >
                      Upcoming Rides
                    </NavLink>
                    <NavLink
                      to="/completed-rides"
                      className={({ isActive }) =>
                        `block py-3 px-4 text-sm ${
                          isActive
                            ? "text-orange-600 font-semibold bg-amber-100"
                            : "text-gray-700 hover:bg-amber-100"
                        } transition-colors duration-200`
                      }
                      onClick={handleNavLinkClick}
                    >
                      Completed Rides
                    </NavLink>
                  </div>
                </div>
              </>
            )}

            {/* Main Navigation Section */}
            <div className="mt-2">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2 px-1">Ride Options</h3>
              <div className="space-y-2 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <NavLink
                  to="/select-ride"
                  className={({ isActive }) =>
                    `flex items-center py-3 px-4 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    } transition-colors duration-200 border-b border-gray-200`
                  }
                  onClick={handleNavLinkClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a Ride
                </NavLink>
                <NavLink
                  to="/book-ride"
                  className={({ isActive }) =>
                    `flex items-center py-3 px-4 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    } transition-colors duration-200`
                  }
                  onClick={handleNavLinkClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Reserve a Ride
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-gray-200 mt-auto">
          {!token ? (
            <div className="grid grid-cols-2 gap-3">
              <NavLink 
                to="/login" 
                onClick={handleNavLinkClick}
                className="py-2 px-4 border border-orange-400 text-orange-500 rounded-lg text-center font-medium hover:bg-orange-50 hover:border-orange-500 transition-all duration-200"
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup" 
                onClick={handleNavLinkClick}
                className="py-2 px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-center font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-200"
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <button 
              onClick={handleLogout} 
              className="w-full py-2 px-4 text-center text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
      
      <ToastContainer />
    </nav>
  );
};

export default Header;