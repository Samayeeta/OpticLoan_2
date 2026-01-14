import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#003366] text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">⚖️</span>
                            <span className="text-2xl font-black tracking-tighter">OPTICLOAN</span>
                        </div>
                        <p className="text-blue-200/60 leading-relaxed text-sm font-medium">
                            OpticLoan is a cutting-edge forensic intelligence platform designed to protect borrowers from predatory lending. Our proprietary AI engine identifies hidden risks and extracts core financial data, ensuring binary-grade transparency before you sign.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-blue-200">Analysis & Tech</h4>
                        <ul className="space-y-4 text-sm font-bold text-white/70">
                            <li><Link to="/" className="hover:text-white transition-colors">Analyzer</Link></li>
                            <li><Link to="/technology" className="hover:text-white transition-colors">Proprietary Tech</Link></li>
                            <li><Link to="/trap-database" className="hover:text-white transition-colors">Trap Database</Link></li>
                            <li><Link to="/glossary" className="hover:text-white transition-colors">Legal Glossary</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-blue-200">Company</h4>
                        <ul className="space-y-4 text-sm font-bold text-white/70">
                            <li><Link to="/expert-advice" className="hover:text-white transition-colors">Expert Advice</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About OpticLoan</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-blue-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[11px] font-bold text-blue-200/40 uppercase tracking-widest">
                        © {new Date().getFullYear()} OPTICLOAN SYSTEMS. ALL RIGHTS RESERVED. AUDIT SECURE ACTIVATED.
                    </p>
                    <div className="flex gap-8 text-[11px] font-black text-blue-200/60 uppercase tracking-wider">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Data Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
