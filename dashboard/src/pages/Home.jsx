import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col w-full animate-fade-in">
            {/* Hero Section: Institutional Authority */}
            <section className="relative pt-32 pb-40 px-6 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, #002147 0, #002147 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
                    <div className="lg:w-3/5 text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-[#002147]/5 border border-[#002147]/10 text-[#002147] text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#C5A021]"></span>
                            Enterprise Audit Solutions
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-[#002147] leading-[0.85] tracking-tighter mb-10">
                            NATIONAL <br />
                            <span className="text-[#C5A021]">LOAN AUDIT</span> <br />
                            FRAMEWORK.
                        </h1>

                        <p className="text-xl text-slate-600 font-medium max-w-2xl leading-relaxed mb-12 border-l-4 border-[#C5A021] pl-6">
                            Ensuring capital transparency through rigorous forensic analysis of loan agreements.
                            Identify predatory clauses with institutional-grade AI modeling.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                            <Link to="/upload" className="px-10 py-5 bg-[#002147] text-white font-black rounded-sm shadow-2xl hover:bg-[#003366] hover:-translate-y-1 transition-all text-xs uppercase tracking-[0.2em]">
                                INITIALIZE AUDIT
                            </Link>
                            <Link to="/technology" className="px-10 py-5 bg-white text-[#002147] border-2 border-[#002147] font-black rounded-sm hover:bg-slate-50 transition-all text-xs uppercase tracking-[0.2em]">
                                SYSTEM SPECS
                            </Link>
                        </div>
                    </div>

                    {/* Industrial/Serious Graphic */}
                    <div className="lg:w-2/5 w-full">
                        <div className="bg-white border-[10px] border-[#002147] p-10 shadow-[40px_40px_0px_-10px_rgba(197,160,33,0.3)] relative group">
                            <div className="absolute -top-5 -right-5 bg-[#C5A021] text-white text-[10px] font-black px-4 py-2 uppercase tracking-widest">
                                Status: Active
                            </div>
                            <div className="space-y-8 font-mono">
                                <div className="pb-6 border-b border-slate-100 flex justify-between items-start">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Audit Stream</p>
                                        <p className="text-sm font-bold text-[#002147]">Clause-ID: SEC-402.B</p>
                                    </div>
                                    <div className="h-2 w-2 rounded-full bg-red-500 animate-ping"></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-[#C5A021]"></div>
                                        <div className="h-1 bg-slate-100 w-full rounded-full">
                                            <div className="h-full bg-[#002147] w-[85%]"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-[#C5A021]"></div>
                                        <div className="h-1 bg-slate-100 w-full rounded-full">
                                            <div className="h-full bg-[#002147] w-[92%]"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <div className="bg-slate-50 p-4 border-l-2 border-[#002147]">
                                        <p className="text-[10px] text-slate-500 leading-tight">
                                            "ANOMALY DETECTED: UNUSUAL REPAYMENT ESCALATION IN SECTION 4.2. RISK MAGNITUDE: HIGH."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Competencies: Serious Grid */}
            <section className="py-32 bg-[#002147] text-white px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                        <div className="relative">
                            <span className="text-8xl font-black opacity-10 absolute -top-10 -left-6">01</span>
                            <h3 className="text-2xl font-black mb-6 tracking-tight relative z-10">Forensic Extraction</h3>
                            <p className="text-slate-400 leading-relaxed font-medium">Digital digitization of complex legal instruments into structured, actionable financial datasets.</p>
                        </div>
                        <div className="relative">
                            <span className="text-8xl font-black opacity-10 absolute -top-10 -left-6">02</span>
                            <h3 className="text-2xl font-black mb-6 tracking-tight relative z-10">Trap Detection</h3>
                            <p className="text-slate-400 leading-relaxed font-medium">Automated identification of predatory lending behaviors and non-standard clause deviations.</p>
                        </div>
                        <div className="relative">
                            <span className="text-8xl font-black opacity-10 absolute -top-10 -left-6">03</span>
                            <h3 className="text-2xl font-black mb-6 tracking-tight relative z-10">Legal Integrity</h3>
                            <p className="text-slate-400 leading-relaxed font-medium">Verified auditing against national regulatory standards and transparency guidelines.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Workflow */}
            <section className="py-40 bg-white px-6">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <h2 className="text-5xl font-black text-[#002147] mb-6 tracking-tighter">OPERATIONAL PROTOCOL</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm">Systematic Audit Lifecycle</p>
                </div>
                <div className="max-w-5xl mx-auto">
                    <div className="space-y-24">
                        {[
                            {
                                step: 'PHASE 01',
                                title: 'Document Ingestion & OCR',
                                desc: 'High-fidelity optical character recognition for semantic parsing of multi-page PDF agreements.'
                            },
                            {
                                step: 'PHASE 02',
                                title: 'Entity Distillation',
                                desc: 'Extraction of primary financial vectors: APR, Prepayment Terms, and default triggers.'
                            },
                            {
                                step: 'PHASE 03',
                                title: 'Risk Modeling',
                                desc: 'AI-driven comparison against benchmarked legal data to identify hazardous deviations.'
                            },
                            {
                                step: 'PHASE 04',
                                title: 'Final certification',
                                desc: 'Issuance of a comprehensive audit report with categorized risk scoring and negotiation insights.'
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-12 items-center group">
                                <div className="text-center md:text-right md:w-1/3">
                                    <span className="text-xs font-black text-[#C5A021] tracking-[0.4em]">{item.step}</span>
                                    <h4 className="text-2xl font-black text-[#002147] mt-2 italic">{item.title}</h4>
                                </div>
                                <div className="hidden md:block w-px h-20 bg-slate-200 group-hover:bg-[#C5A021] transition-colors"></div>
                                <div className="md:w-1/2">
                                    <p className="text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto bg-[#f8fafc] border border-slate-200 p-16 text-center">
                    <h2 className="text-4xl font-black text-[#002147] mb-8">SECURE YOUR FINANCIAL INTERESTS</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto mb-12 font-medium">Join thousands of borrowers using the most advanced legal audit system in India.</p>
                    <Link to="/upload" className="inline-block px-12 py-5 bg-[#002147] text-white font-black rounded-sm shadow-xl hover:bg-[#003366] transition-all text-xs uppercase tracking-widest">
                        BEGIN AUDIT PROCESS
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
