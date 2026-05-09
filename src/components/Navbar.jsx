import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/webwatch-logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Webwatch" className="h-14 w-auto rounded-lg hover:scale-110 transition-transform duration-300" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 font-medium transition-all duration-300 relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{backgroundImage: 'linear-gradient(to right, #F48024, #007791)'}}></span>
            </a>
            <a href="#pricing" className="text-gray-700 font-medium transition-all duration-300 relative group">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{backgroundImage: 'linear-gradient(to right, #F48024, #007791)'}}></span>
            </a>
            <a href="#about" className="text-gray-700 font-medium transition-all duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{backgroundImage: 'linear-gradient(to right, #F48024, #007791)'}}></span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="glow-btn-secondary">
              Login
            </Link>
            <Link to="/signup" className="glow-btn glow-btn-primary">
              Sign Up
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a href="#features" className="block text-gray-700 font-medium py-2">Features</a>
            <a href="#pricing" className="block text-gray-700 font-medium py-2">Pricing</a>
            <a href="#about" className="block text-gray-700 font-medium py-2">About</a>
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="flex-1 glow-btn-secondary block text-center">Login</Link>
              <Link to="/signup" className="flex-1 glow-btn glow-btn-primary block text-center">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
