import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#003366] text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">⚖️</span>
                            <span className="text-2xl font-black tracking-tighter">OPTICLOAN</span>
                        </div>
                        <p className="text-blue-200/60 leading-relaxed text-sm font-medium">
                            The premier global standard in loan document auditing and trap clause identification. Protecting borrowers through transparency and AI-driven analysis.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-blue-200">Analysis</h4>
                        <ul className="space-y-4 text-sm font-bold text-white/70">
                            <li><a href="#" className="hover:text-white transition-colors">Audit Protocols</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Trap Database</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Reasoning Engine</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Sample Reports</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-blue-200">Legal</h4>
                        <ul className="space-y-4 text-sm font-bold text-white/70">
                            <li><a href="#" className="hover:text-white transition-colors">Compliance Standards</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Expert Network</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Consumer Rights</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Fair Lending Acts</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-blue-200">Company</h4>
                        <ul className="space-y-4 text-sm font-bold text-white/70">
                            <li><a href="#" className="hover:text-white transition-colors">About OpticLoan</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Security Audit</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Support Portal</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Advisor</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-blue-900 flex flex-col md:row justify-between items-center gap-6">
                    <p className="text-[11px] font-bold text-blue-200/40 uppercase tracking-widest">
                        © {new Date().getFullYear()} OPTICLOAN SYSTEMS. ALL RIGHTS RESERVED. AUDIT SECURE ACTIVATED.
                    </p>
                    <div className="flex gap-8 text-[11px] font-black text-blue-200/60 uppercase tracking-wider">
                        <a href="#" className="hover:text-white transition-colors">Legal Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Data Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
