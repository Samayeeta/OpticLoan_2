import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-slate-50 min-h-screen pt-16">
            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="md:w-1/2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-bold uppercase tracking-wider mb-6">
                            AI-Powered Document Auditing
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                            Understand Your <br />
                            <span className="text-indigo-600">Loan Agreements.</span>
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-xl leading-relaxed mb-8">
                            Identify core facts and hidden predatory clauses with detailed legal reasoning. OpticLoan makes financial transparency accessible to everyone.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/upload" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all text-center">
                                Start Free Analysis
                            </Link>
                            <Link to="/technology" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-center">
                                How it Works
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative">
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative z-10">
                            <div className="space-y-4">
                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Clause Warning</p>
                                    <p className="text-sm font-bold text-slate-900">Subsection 4.2: Late Fee Escalation</p>
                                    <p className="text-xs text-slate-600 mt-1 italic">"Fees may increase by 200% after 3 days of non-payment..."</p>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Extracted Fact</p>
                                    <p className="text-sm font-bold text-slate-900">Principal Amount: $250,000</p>
                                    <p className="text-xs text-slate-600 mt-1 italic">Verified across Document ID: #A902</p>
                                </div>
                                <div className="pt-2 px-1">
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-600 w-4/5"></div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-[10px] font-bold text-slate-400">ANALYSIS PROGRESS</p>
                                        <p className="text-[10px] font-bold text-indigo-600">80% COMPLETE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
                    </div>
                </div>
            </section>

            {/* Core Features */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center text-center p-6 hover:bg-slate-50 rounded-2xl transition-all">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl mb-6">📄</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Fact Distillation</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">We extract critical dates, amounts, and obligations into a clean, searchable dashboard.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 hover:bg-slate-50 rounded-2xl transition-all">
                        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-3xl mb-6">⚠️</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Risk Detection</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">Identify hidden acceleration, escalation, and cross-default traps instantly.</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 hover:bg-slate-50 rounded-2xl transition-all">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl mb-6">⚖️</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Legal Insight</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">Understand the "why" behind every warning with clear, jargon-free reasoning.</p>
                    </div>
                </div>
            </section>

            {/* Simple Steps */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">The Audit Process</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[
                            { step: '01', title: 'Upload Agreement', desc: 'Securely upload your loan document (PDF). Our engine processes text with OCR precision.' },
                            { step: '02', title: 'Fact Extraction', desc: 'Critical financial terms are identified and mapped to specific page segments.' },
                            { step: '03', title: 'Risk Analysis', desc: 'Clauses are compared against established predatory patterns and legal benchmarks.' },
                            { step: '04', title: 'Report Generation', desc: 'Receive a comprehensive risk report with clear negotiation recommendations.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                                <span className="text-3xl font-extrabold text-indigo-600/20">{item.step}</span>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <Link to="/upload" className="inline-block px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
                            Start Your First Audit
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
