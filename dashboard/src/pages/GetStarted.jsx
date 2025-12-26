import React from 'react';
import { Link } from 'react-router-dom';

const GetStarted = () => {
    return (
        <div className="pt-40 pb-24 px-6 max-w-5xl mx-auto animate-fade-in">
            <div className="text-center mb-20">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-sm bg-[#002147]/10 text-[#002147] text-4xl mb-8 border border-[#002147]/20">
                    🛡️
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-[#002147] mb-6 tracking-tighter uppercase">Audit <span className="text-[#C5A021]">Jurisdiction</span></h1>
                <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed max-w-2xl mx-auto">
                    Select your operational framework. OpticLoan maintains separate high-security environments for individual and corporate audits.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                <div className="group bg-white border-2 border-[#002147]/10 p-12 hover:border-[#C5A021] transition-all relative shadow-sm hover:shadow-2xl">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                        <span className="text-8xl font-black text-[#002147]">01</span>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-2xl font-black text-[#002147] mb-3 uppercase tracking-tight italic">Personal Audit</h3>
                        <div className="h-1 w-12 bg-[#C5A021]"></div>
                    </div>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10">
                        Designed for individuals verifying mortgage, educational, or vehicle financing agreements. High-accuracy trap detection tailored for consumer protection.
                    </p>
                    <Link to="/upload" className="inline-block px-8 py-4 bg-[#002147] text-white font-black rounded-sm text-[11px] hover:bg-[#003366] transition-all uppercase tracking-widest shadow-lg">
                        INITIATE PERSONAL AUDIT
                    </Link>
                </div>

                <div className="group bg-white border-2 border-[#002147]/10 p-12 hover:border-[#C5A021] transition-all relative shadow-sm hover:shadow-2xl">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                        <span className="text-8xl font-black text-[#002147]">02</span>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-2xl font-black text-[#002147] mb-3 uppercase tracking-tight italic">Institutional</h3>
                        <div className="h-1 w-12 bg-[#C5A021]"></div>
                    </div>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10">
                        Comprehensive batch auditing for legal teams and financial institutions. Supports multi-document cross-referencing and complex security instruments.
                    </p>
                    <Link to="/upload" className="inline-block px-8 py-4 bg-white border-2 border-[#002147] text-[#002147] font-black rounded-sm text-[11px] hover:bg-slate-50 transition-all uppercase tracking-widest">
                        ACCESS CORPORATE VAULT
                    </Link>
                </div>
            </div>

            <div className="mt-24 p-12 bg-[#002147] text-white overflow-hidden shadow-2xl relative">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#C5A021 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-3/4">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-xs font-black text-[#C5A021] uppercase tracking-[0.5em]">Privacy Protocol</span>
                            <div className="flex-1 h-px bg-white/10"></div>
                        </div>
                        <h4 className="text-3xl font-black mb-6 tracking-tighter uppercase italic">Institutional Data Sovereignty</h4>
                        <p className="text-slate-300 font-medium text-sm leading-relaxed max-w-3xl">
                            We operate under a zero-disclosure mandate. All documents are processed in ephemeral sandboxes using hardware-level encryption. Your financial data never persists beyond the active audit cycle.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetStarted;
