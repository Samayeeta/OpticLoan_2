import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Analyzer', path: '/' },
        { name: 'Technology', path: '/technology' },
        { name: 'Trap Database', path: '/trap-database' },
        { name: 'Expert Advice', path: '/expert-advice' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-[1000] bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

                {/* Brand Section */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
                        <span className="text-xl text-white">⚖️</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-slate-900 leading-none tracking-tight">
                            Optic<span className="text-indigo-600">Loan</span>
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">
                            Auditing System
                        </span>
                    </div>
                </Link>

                {/* Navigation (Desktop) */}
                <nav className="hidden md:block">
                    <ul className="flex gap-8 items-center">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`text-sm font-semibold transition-colors ${location.pathname === link.path ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex gap-4 items-center">
                        <Link to="/get-started" className="px-5 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-all whitespace-nowrap">
                            Get Started
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-slate-600 focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-white border-t border-slate-100 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen pb-6' : 'max-h-0'}`}>
                <nav className="px-6 py-4">
                    <ul className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block text-sm font-bold py-2 ${location.pathname === link.path ? 'text-indigo-600' : 'text-slate-700'}`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-4">
                            <Link
                                to="/get-started"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full px-4 py-3 text-sm text-center font-bold text-white bg-indigo-600 rounded-lg"
                            >
                                Get Started
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
