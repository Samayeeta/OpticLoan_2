import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl">⚖️</span>
                            <span className="text-2xl font-bold tracking-tighter">Optic<span className="text-indigo-500">Loan</span></span>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-sm font-medium">
                            The modern standard for loan document auditing and trap clause identification. Empowering borrowers through AI.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-8 text-indigo-400">Analysis</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-400">
                            <li><Link to="/upload" className="hover:text-white transition-colors">Audit Protocols</Link></li>
                            <li><Link to="/trap-database" className="hover:text-white transition-colors">Trap Database</Link></li>
                            <li><Link to="/technology" className="hover:text-white transition-colors">Technology</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-8 text-indigo-400">Legal</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-400">
                            <li><Link to="/expert-advice" className="hover:text-white transition-colors">Expert Advice</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Fair Lending</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-8 text-indigo-400">Connect</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-medium text-slate-500">
                        © {new Date().getFullYear()} OpticLoan. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-xs font-medium text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
