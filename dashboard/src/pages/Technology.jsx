import React from 'react';
import { Link } from 'react-router-dom';

const Technology = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20 animate-fade-in">
            {/* Hero Section */}
            <section className="px-6 mb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-bold uppercase tracking-wider mb-6">
                        The Core Engine
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        The Science of <br />
                        <span className="text-indigo-600">Precision Auditing.</span>
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-3xl leading-relaxed">
                        OpticLoan leverages state-of-the-art Neural Networks and Forensic Linguistics to deconstruct complex loan agreements into actionable risk vectors.
                    </p>
                </div>
            </section>

            {/* Core Tech Grid */}
            <section className="px-6 mb-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        {[
                            {
                                title: "Text Forensic Parsing",
                                desc: "Our layout-aware parser converts static PDFs into dynamic semantic structures, preserving the context of every footnote and annex.",
                                icon: "📄"
                            },
                            {
                                title: "Clause Vector Matching",
                                desc: "Every sentence is compared against our proprietary database of thousands of historical predatory loan patterns.",
                                icon: "🧬"
                            },
                            {
                                title: "Informed Reasoning",
                                desc: "An ensemble of Transformer models identifies not just what is said, but what is deliberately obscured by dense legal jargon.",
                                icon: "🧠"
                            }
                        ].map((tech, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                    {tech.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{tech.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{tech.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="relative">
                        <div className="w-full aspect-square bg-indigo-600 rounded-3xl overflow-hidden shadow-2xl relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3/4 h-3/4 border-4 border-white/20 rounded-full animate-spin-slow"></div>
                                <div className="absolute flex flex-col items-center text-white">
                                    <span className="text-5xl mb-4">🛡️</span>
                                    <span className="font-bold text-lg tracking-widest">SECURE AI</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-50">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                            <p className="text-2xl font-extrabold text-indigo-600">99.8%</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="px-6 py-24 bg-white border-y border-slate-100 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Our Integrity</h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">
                        Levelling the Financial Playing Field.
                    </h3>
                    <p className="text-lg text-slate-600 font-medium leading-relaxed mb-12">
                        OpticLoan was born from a simple observation: modern loan agreements are designed to be scanned, not understood. We deploy industrial-grade tools to everyday borrowers to expose the traps that keep people in debt.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div>
                            <p className="text-3xl font-extrabold text-slate-900">1M+</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Audited</p>
                        </div>
                        <div>
                            <p className="text-3xl font-extrabold text-slate-900">$40M</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Risks Found</p>
                        </div>
                        <div>
                            <p className="text-3xl font-extrabold text-slate-900">100%</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Privacy focus</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 mt-20">
                <div className="max-w-7xl mx-auto bg-slate-900 rounded-3xl p-16 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight">Ready to Audit?</h2>
                        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-medium">
                            Experience the future of financial transparency. No more hidden escalations. No more predatory surprises.
                        </p>
                        <Link to="/upload" className="inline-block px-12 py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl">
                            Audit My Document
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Technology;
