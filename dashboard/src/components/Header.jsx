import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'ANALYZER', path: '/' },
        { name: 'TECHNOLOGY', path: '/technology' },
        { name: 'TRAP DATABASE', path: '/trap-database' },
        { name: 'GLOSSARY', path: '/glossary' },
        { name: 'EXPERT ADVICE', path: '/expert-advice' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-[1000] bg-white border-b-4 border-[#003366] shadow-sm">
            {/* Top Bar: Official Website disclaimer */}
            <div className="w-full bg-[#f0f0f0] py-1 border-b border-gray-200">
                <div className="w-[95%] max-w-7xl mx-auto flex justify-between items-center text-[11px] font-medium text-gray-600 uppercase tracking-wider">
                    <span className="truncate">Precision Loan Document Auditing System</span>
                    <div className="hidden sm:flex gap-4">
                        <button className="hover:underline">Legal Standards</button>
                        <button className="hover:underline">Transparency Mode</button>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="w-[95%] max-w-7xl mx-auto h-20 flex justify-between items-center">

                {/* Brand Section */}
                <Link to="/" className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0">
                    <div className="bg-[#003366] p-1.5 sm:p-2 rounded-sm group-hover:bg-blue-900 transition-colors">
                        <span className="text-lg sm:text-xl text-white font-serif">⚖️</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg sm:text-xl font-extrabold text-[#003366] leading-none tracking-tight">
                            OPTICLOAN
                        </span>
                        <span className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">
                            Fact Audit & Clause Analysis
                        </span>
                    </div>
                </Link>

                {/* Middle Navigation (Desktop) */}
                <nav className="hidden xl:block">
                    <ul className="flex gap-4 xl:gap-6 list-none m-0 p-0">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} className="text-[13px] font-bold text-gray-700 hover:text-[#003366] border-b-2 border-transparent hover:border-[#003366] py-1 transition-all">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Actions Section */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden md:flex items-center border-r border-gray-300 pr-4 mr-1">
                        <span className="text-xs font-semibold text-amber-600 italic whitespace-nowrap">Audit Secure</span>
                    </div>

                    <div className="hidden sm:flex gap-2">
                        <Link to="/get-started" className="px-3 py-1.5 text-xs font-bold text-white bg-[#003366] rounded hover:bg-[#002244] shadow-md transition-all uppercase">
                            START
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="xl:hidden p-2 text-[#003366] focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`xl:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen pb-6' : 'max-h-0'}`}>
                <nav className="px-6 py-4">
                    <ul className="flex flex-col gap-4 list-none m-0 p-0">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-sm font-bold text-gray-700 hover:text-[#003366] py-2 border-b border-gray-50"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-4 flex flex-col gap-3">
                            <Link
                                to="/get-started"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full px-4 py-3 text-sm text-center font-bold text-white bg-[#003366] rounded uppercase"
                            >
                                START AUDIT
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
