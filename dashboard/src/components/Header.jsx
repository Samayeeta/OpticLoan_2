import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'ANALYZER', path: '/' },
        { name: 'TECHNOLOGY', path: '/technology' },
        { name: 'TRAP DATABASE', path: '/trap-database' },
        { name: 'GLOSSARY', path: '/glossary' },
        { name: 'EXPERT ADVICE', path: '/expert-advice' },
    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-white shadow-xl' : 'bg-white/95'}`}>
            {/* National/Institutional Top Bar */}
            <div className="w-full bg-[#002147] border-b border-white/10 py-1.5">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] font-bold text-white/80 uppercase tracking-widest">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            OFFICIAL AUDIT PORTAL
                        </span>
                        <div className="hidden lg:flex items-center gap-4 border-l border-white/20 ml-4 pl-4">
                            <span className="opacity-60">SLA: 99.9%</span>
                            <span className="opacity-60">REGULATORY COMPLIANT</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="hover:text-white transition-colors cursor-pointer">Accessibility</button>
                        <button className="hover:text-white transition-colors cursor-pointer">Helpdesk</button>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center border-b-[3px] border-[#C5A021]">
                {/* Brand Identity */}
                <Link to="/" className="flex items-center gap-4 group">
                    <div className="relative">
                        <div className="w-12 h-12 bg-[#002147] rounded-sm flex items-center justify-center text-2xl group-hover:bg-[#003366] transition-colors shadow-lg">
                            ⚖️
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-[#002147] leading-none tracking-tighter">
                            OPTIC<span className="text-[#C5A021]">LOAN</span>
                        </span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1.5">
                            National Auditing Framework
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden xl:block">
                    <ul className="flex gap-8 list-none m-0 p-0">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`text-[12px] font-extrabold tracking-widest py-2 transition-all relative group
                                        ${location.pathname === link.path ? 'text-[#002147]' : 'text-slate-500 hover:text-[#002147]'}`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-0 h-0.5 bg-[#C5A021] transition-all duration-300 
                                        ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Action Controls */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end mr-4 border-r border-slate-200 pr-5">
                        <span className="text-[10px] font-black text-[#C5A021]">SECURE SESSION</span>
                        <span className="text-[9px] font-bold text-slate-400">AES-256 ENCRYPTED</span>
                    </div>

                    <div className="hidden sm:flex gap-3">
                        <button className="px-5 py-2 text-[11px] font-black text-[#002147] border-2 border-[#002147] rounded-sm hover:bg-slate-50 transition-all uppercase tracking-widest">
                            PORTAL LOGIN
                        </button>
                        <Link to="/upload" className="px-5 py-2 text-[11px] font-black text-white bg-[#002147] rounded-sm hover:bg-[#003366] shadow-[0_4px_12px_rgba(0,33,71,0.2)] transition-all uppercase tracking-widest">
                            NEW AUDIT
                        </Link>
                    </div>

                    {/* Mobile Menu Icon */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="xl:hidden p-2 text-[#002147] transition-transform active:scale-95"
                    >
                        {isMenuOpen ? (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Panel */}
            <div className={`xl:hidden bg-white border-b border-slate-100 transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <nav className="px-8 py-8">
                    <ul className="flex flex-col gap-6 list-none m-0 p-0">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block text-sm font-black text-slate-700 hover:text-[#002147] pb-2 border-b border-slate-50 uppercase tracking-widest"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-4 flex flex-col gap-4">
                            <button className="w-full py-4 text-xs font-black text-[#002147] border-2 border-[#002147] rounded-sm uppercase tracking-widest">
                                PORTAL LOGIN
                            </button>
                            <Link
                                to="/upload"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full py-4 text-xs text-center font-black text-white bg-[#002147] rounded-sm uppercase tracking-widest"
                            >
                                COMMENCE AUDIT
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
