import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Section 1 - Branding */}
          <div>
            <h2 className="text-2xl font-bold text-white">ZenoGo</h2>
            <p className="text-sm text-gray-400 mt-2 max-w-xs">
              Fast, reliable, and affordable rides at your fingertips. Book a ride anytime, anywhere.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-white transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Section 2 - Quick Links */}
          <div className="flex justify-between sm:justify-start sm:gap-12">
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2 mt-2">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><NavLink to='/select-ride' className="hover:text-white transition-colors">Book a Ride</NavLink></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Policies</h3>
              <ul className="space-y-2 mt-2">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Section 3 - Contact Details */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3 mt-2">
              <p className="text-sm flex items-center gap-2">
                <i className="fas fa-map-marker-alt"></i> 123 ZenoGo Street, Delhi, India
              </p>
              <p className="text-sm flex items-center gap-2">
                <i className="fas fa-envelope"></i> <a href="mailto:support@zenogo.com" className="hover:text-white">support@zenogo.com</a>
              </p>
              <p className="text-sm flex items-center gap-2">
                <i className="fas fa-phone"></i> <a href="tel:+911234567890" className="hover:text-white">+91-1234567890</a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ZenoGo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
