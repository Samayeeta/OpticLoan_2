import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#002147] text-white pt-24 pb-12 border-t-[8px] border-[#C5A021]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl filter grayscale brightness-200">⚖️</span>
                            <span className="text-2xl font-black tracking-tighter uppercase">
                                OPTIC<span className="text-[#C5A021]">LOAN</span>
                            </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-[13px] font-medium max-w-xs">
                            National authority in loan document forensics. Providing institutional-grade transparency for the Indian financial sector.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C5A021] transition-colors cursor-pointer">
                                <span className="text-[10px] font-black italic">In</span>
                            </div>
                            <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C5A021] transition-colors cursor-pointer">
                                <span className="text-[10px] font-black italic">X</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-[#C5A021]">Operational</h4>
                        <ul className="space-y-5 text-xs font-bold text-slate-300">
                            <li><Link to="/upload" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">Audit Portal</Link></li>
                            <li><Link to="/trap-database" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">Trap Repository</Link></li>
                            <li><Link to="/technology" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">Analysis Engine</Link></li>
                            <li><Link to="/glossary" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">Legal Lexicon</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-[#C5A021]">Regulatory</h4>
                        <ul className="space-y-5 text-xs font-bold text-slate-300">
                            <li><a href="#" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">Compliance Desk</a></li>
                            <li><Link to="/expert-advice" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">Advisor Panel</Link></li>
                            <li><a href="#" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">Consumer Charter</a></li>
                            <li><a href="#" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">Fair Disclosure</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-[#C5A021]">Framework</h4>
                        <ul className="space-y-5 text-xs font-bold text-slate-300">
                            <li><a href="#" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">System Status</a></li>
                            <li><a href="#" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">Security Audit</a></li>
                            <li><a href="#" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">Central Support</a></li>
                            <li><Link to="/get-started" className="hover:text-[#C5A021] transition-colors tracking-widest uppercase">Direct Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
                            © {new Date().getFullYear()} OPTICLOAN NATIONAL AUDIT BUREAU.
                        </p>
                    </div>
                    <div className="flex gap-10 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <a href="#" className="hover:text-[#C5A021] transition-colors">Legal Terms</a>
                        <a href="#" className="hover:text-[#C5A021] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#C5A021] transition-colors">Infrastructure</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
