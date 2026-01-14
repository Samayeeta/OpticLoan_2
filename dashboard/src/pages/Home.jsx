import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative py-28 px-[5%] overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#003366]/5 -skew-x-12 transform translate-x-20"></div>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
                    <div className="md:w-3/5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003366]/10 text-[#003366] text-xs font-black uppercase tracking-widest mb-6">
                            AI-Powered Document Auditing
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-[#003366] leading-[0.95] tracking-tight mb-8">
                            UNCOVER THE <br />
                            <span className="text-amber-500">TRAP CLAUSES.</span>
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-xl leading-relaxed mb-10">
                            Don't sign until you know. OpticLoan audits your loan agreements to extract core facts and expose predatory "trap clauses" with detailed legal reasoning.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/upload" className="px-8 py-4 bg-[#003366] text-white font-bold rounded shadow-lg hover:bg-[#002244] hover:-translate-y-1 transition-all text-center uppercase tracking-widest">
                                ANALYZE DOCUMENT
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-2/5 hidden md:block">
                        <div className="bg-slate-50 border-4 border-[#003366] p-8 rounded-2xl shadow-2xl relative z-10">
                            <div className="space-y-6">
                                <div className="pb-4 border-b border-slate-200">
                                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Trap Detected</p>
                                    <p className="text-sm font-bold text-[#003366]">Subsection 4.2: Late Fee Escalation</p>
                                    <p className="text-xs text-slate-500 mt-1">"Fees may increase by 200% after 3 days of non-payment..."</p>
                                </div>
                                <div className="pb-4 border-b border-slate-200">
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Extracted Fact</p>
                                    <p className="text-sm font-bold text-[#003366]">Principal Amount: $250,000</p>
                                    <p className="text-xs text-slate-500 mt-1">Verified against Page 1 and Page 14.</p>
                                </div>
                                <div className="pt-2">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Audit Secure & Complete</p>
                                    </div>
                                    <div className="h-1.5 w-full bg-emerald-50 rounded-full overflow-hidden border border-emerald-100">
                                        <div className="h-full bg-emerald-500 w-full"></div>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 mt-2 lowercase">Forensic Score: 98/100</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Proposition Section */}
            <section className="py-24 bg-slate-50 px-6 border-y border-slate-200">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="text-center">
                        <div className="text-4xl mb-6">📄</div>
                        <h3 className="text-xl font-bold text-[#003366] mb-4">Fact Extraction</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">We distill hundreds of pages into a single dashboard of critical dates, amounts, and obligations.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-6">⚠️</div>
                        <h3 className="text-xl font-bold text-amber-600 mb-4">Trap Identification</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Our AI scans for "hidden" clauses—escalation, acceleration, and cross-default traps designed to cost you more.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-6">⚖️</div>
                        <h3 className="text-xl font-bold text-[#003366] mb-4">Legal Reasoning</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">We don't just find issues; we explain *why* they are risky and how they could impact your financial health.</p>
                    </div>
                </div>
            </section>

            {/* Detailed Analysis Section */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-black text-[#003366] mb-12 text-center">HOW THE AUDIT WORKS</h2>
                    <div className="space-y-12">
                        {[
                            {
                                step: '01',
                                title: 'Data Ingestion',
                                desc: 'Upload your PDF loan agreement. Our OCR engine digitizes every comma and signature for deep semantic analysis.'
                            },
                            {
                                step: '02',
                                title: 'Fact Distillation',
                                desc: 'We identify key financial markers: APR, Prepayment Penalties, Balloon Payments, and Default Triggers.'
                            },
                            {
                                step: '03',
                                title: 'Trap Auditing',
                                desc: 'Comparison against thousands of standard and predatory loan templates to highlight deviations that favor the lender.'
                            },
                            {
                                step: '04',
                                title: 'Comprehensive Report',
                                desc: 'You receive a detailed breakdown of what to negotiate, what to watch out for, and a "Risk Index" score.'
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-8 items-start">
                                <span className="text-4xl font-black text-[#003366]/10">{item.step}</span>
                                <div>
                                    <h4 className="text-xl font-bold text-[#003366] mb-2">{item.title}</h4>
                                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
