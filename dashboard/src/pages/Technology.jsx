import React from 'react';
import { Link } from 'react-router-dom';

const Technology = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 bg-[#003366] text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-widest mb-6 border border-blue-500/30">
                        Technological Core
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight uppercase leading-[0.9]">
                        The Science of <br />
                        <span className="text-blue-400">Precision Auditing.</span>
                    </h1>
                    <p className="text-xl text-blue-100/80 font-medium max-w-3xl leading-relaxed mb-10">
                        OpticLoan leverages state-of-the-art Neural Networks and Forensic Linguistics to deconstruct complex loan agreements into actionable risk vectors.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/upload" className="px-8 py-4 bg-white text-[#003366] font-black rounded-xl hover:bg-blue-50 transition-all uppercase tracking-widest shadow-xl">
                            Deploy Analysis
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core Tech Stack */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-black text-[#003366] uppercase tracking-tight mb-8 flex items-center gap-4">
                            Machine Learning Architecture
                            <div className="h-[2px] flex-grow bg-slate-100"></div>
                        </h2>
                        <div className="space-y-8">
                            {[
                                {
                                    title: "Forensic Text Extraction",
                                    desc: "Our custom OCR and layout-aware parser converts static PDFs into dynamic semantic structures, preserving the context of every footnote and annex.",
                                    icon: "📄"
                                },
                                {
                                    title: "Clause Vectorization",
                                    desc: "Every sentence is mapped into a multi-dimensional latent space to compare against our database of 100,000+ historical predatory loan patterns.",
                                    icon: "🧬"
                                },
                                {
                                    title: "Risk-Informed Reasoning",
                                    desc: "An ensemble of Transformer models identifies not just what is said, but what is deliberately left out or obscured by legal jargon.",
                                    icon: "🧠"
                                }
                            ].map((tech, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl group-hover:bg-[#003366] group-hover:text-white transition-all shadow-sm">
                                        {tech.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-[#003366] uppercase mb-2 tracking-wide">{tech.title}</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed italic">{tech.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-full aspect-square bg-[#003366] rounded-[64px] overflow-hidden shadow-2xl relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-transparent"></div>
                            {/* Abstract Tech Graphic */}
                            <div className="absolute inset-0 flex items-center justify-center p-12">
                                <div className="w-full h-full border-4 border-white/20 rounded-full animate-spin-slow"></div>
                                <div className="absolute w-3/4 h-3/4 border-2 border-white/10 rounded-full animate-reverse-spin"></div>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-6xl mb-4">🛡️</span>
                                    <span className="font-black text-2xl tracking-[0.2em]">SECURE-AI</span>
                                </div>
                            </div>
                        </div>
                        {/* Status Tags */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-[200px]">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">ACCURACY</p>
                            <p className="text-3xl font-black text-[#003366]">99.8%</p>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                <div className="w-[99.8%] h-full bg-emerald-500"></div>
                            </div>
                        </div>
                        <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-black text-[#003366] uppercase tracking-widest">System Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About OpticLoan Section */}
            <section className="py-24 bg-slate-50 border-y border-slate-200 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-6">The Mission</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-[#003366] mb-8 tracking-tight uppercase">
                        Levelling the <span className="text-blue-600">Financial</span> Playing Field.
                    </h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
                        OpticLoan was born from a simple observation: modern loan agreements are designed to be scanned, not understood. By deploying industrial-grade forensic tools to everyday borrowers, we expose the "traps" that keep businesses and families in cycles of debt.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div>
                            <p className="text-3xl font-black text-[#003366] mb-1">1M+</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clauses Audited</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-[#003366] mb-1">$40M</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Potential Fees Identified</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-[#003366] mb-1">100%</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">User Privacy Focus</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto bg-[#003366] rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight uppercase">Ready to audit?</h2>
                        <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto opacity-80">
                            Experience the future of financial transparency. No more hidden escalations. No more predatory surprises.
                        </p>
                        <Link to="/upload" className="inline-block px-12 py-5 bg-white text-[#003366] font-black rounded-2xl hover:bg-blue-50 transition-all uppercase tracking-widest shadow-xl scale-110">
                            Audit My Document
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Technology;
