import React from 'react';
import { Link } from 'react-router-dom';

const Technology = () => {
    return (
        <div className="bg-slate-50 min-h-screen animate-fade-in">
            {/* Hero Section */}
            <section className="relative pt-40 pb-32 bg-[#002147] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C5A021 0, #C5A021 1px, transparent 0, transparent 50%)', backgroundSize: '15px 15px' }}></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 text-[#C5A021] text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                        Technological Core
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic leading-[0.85]">
                        The Science of <br />
                        <span className="text-[#C5A021]">Precision Auditing.</span>
                    </h1>
                    <p className="text-2xl text-slate-300 font-medium max-w-4xl leading-relaxed mb-12 border-l-4 border-[#C5A021] pl-8">
                        OpticLoan leverages industrial-grade Neural Networks and Forensic Linguistics to deconstruct complex financial instruments into actionable risk vectors.
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <Link to="/upload" className="px-10 py-5 bg-[#C5A021] text-[#002147] font-black rounded-sm hover:bg-white transition-all uppercase tracking-widest text-xs shadow-2xl">
                            DEPLOY ANALYSIS SEQUENCE
                        </Link>
                        <button className="px-10 py-5 bg-transparent border-2 border-white/20 text-white font-black rounded-sm hover:bg-white/10 transition-all uppercase tracking-widest text-xs">
                            DOWNLOAD PROTOCOL WHITE PAPER
                        </button>
                    </div>
                </div>
            </section>

            {/* Core Tech Stack */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <div className="flex items-center gap-6 mb-12">
                            <h2 className="text-4xl font-black text-[#002147] uppercase tracking-tighter italic">Architecture</h2>
                            <div className="h-px flex-grow bg-slate-200"></div>
                        </div>
                        <div className="space-y-12">
                            {[
                                {
                                    title: "Forensic Text Extraction",
                                    desc: "Our layout-aware parser converts static documents into dynamic semantic structures, preserving the integrity of every footnote and annex.",
                                    icon: "⚖️"
                                },
                                {
                                    title: "Clause Vectorization",
                                    desc: "Every provision is mapped into a multi-dimensional latent space to compare against our national database of divergent loan patterns.",
                                    icon: "🛡️"
                                },
                                {
                                    title: "Ensemble Risk Inference",
                                    desc: "Predictive modeling identifies not just explicit terms, but deliberately obscured legal traps and structural imbalances.",
                                    icon: "🔬"
                                }
                            ].map((tech, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="w-20 h-20 shrink-0 bg-white border-2 border-slate-100 flex items-center justify-center text-3xl group-hover:border-[#C5A021] group-hover:bg-[#002147] group-hover:text-white transition-all shadow-sm">
                                        {tech.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-[#002147] uppercase mb-3 tracking-tight italic">{tech.title}</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed uppercase text-[11px] tracking-wide">{tech.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-full aspect-square bg-[#002147] p-20 shadow-[-40px_40px_0px_0px_rgba(197,160,33,0.1)] relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #C5A021 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                            <div className="relative z-10 w-full h-full border-2 border-[#C5A021]/30 flex flex-col items-center justify-center text-center">
                                <div className="absolute inset-0 animate-pulse border-8 border-[#C5A021]/5"></div>
                                <span className="text-5xl mb-6">⚙️</span>
                                <h4 className="text-2xl font-black text-white tracking-[0.3em] uppercase italic">National Audit <br /> Engine</h4>
                            </div>
                        </div>
                        {/* Status Tags */}
                        <div className="absolute -bottom-10 -left-10 bg-white p-10 shadow-2xl border-4 border-[#002147] max-w-[240px]">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Model Accuracy</p>
                            <p className="text-5xl font-black text-[#002147] tracking-tighter">99.8%</p>
                            <div className="w-full h-2 bg-slate-100 mt-4">
                                <div className="w-[99.8%] h-full bg-[#C5A021]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About OpticLoan Section */}
            <section className="py-32 bg-white border-y-2 border-slate-200 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-[10px] font-black text-[#C5A021] uppercase tracking-[0.6em] mb-10">Institutional Mandate</h2>
                    <h3 className="text-5xl md:text-7xl font-black text-[#002147] mb-12 tracking-tighter uppercase italic leading-none">
                        Equity through <br /><span className="text-[#C5A021]">Sovereign intelligence.</span>
                    </h3>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed mb-20 max-w-4xl mx-auto italic border-x-2 border-slate-100 px-12">
                        OpticLoan was engineered to address a critical asymmetry: financial instruments designed to be scanned, not understood. By deploying industrial-grade forensic tools, we empower borrowers to navigate the landscape with complete structural clarity.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                        <div className="p-8 border-t-2 border-slate-100">
                            <p className="text-4xl font-black text-[#002147] mb-2 tracking-tighter">1M+</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instruments Audited</p>
                        </div>
                        <div className="p-8 border-t-2 border-[#C5A021]">
                            <p className="text-4xl font-black text-[#002147] mb-2 tracking-tighter">₹ 3.2B</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vulnerability Detection</p>
                        </div>
                        <div className="p-8 border-t-2 border-slate-100">
                            <p className="text-4xl font-black text-[#002147] mb-2 tracking-tighter">100%</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Encryption Sovereignty</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto bg-[#002147] p-24 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #C5A021 0, #C5A021 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}></div>
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter uppercase italic">Commence Audit.</h2>
                        <p className="text-slate-400 text-xl font-medium mb-16 max-w-2xl mx-auto uppercase tracking-wide">
                            Eliminate structural uncertainty. Identify hidden escalations. Restore financial equilibrium.
                        </p>
                        <Link to="/upload" className="inline-block px-14 py-7 bg-white text-[#002147] font-black hover:bg-[#C5A021] transition-all uppercase tracking-[0.4em] text-xs shadow-2xl hover:-translate-y-1">
                            INITIALIZE ANALYSIS
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Technology;
