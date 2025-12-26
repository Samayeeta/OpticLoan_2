import React from 'react';

const Dashboard = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 animate-fade-in">
            {/* Report Header: Bureau Style */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-2 border-slate-200 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-sm uppercase tracking-widest shadow-sm">Audit Certified</span>
                        <span className="text-[#002147] text-[10px] font-black uppercase tracking-widest border border-[#002147]/20 px-2 py-1">Serial: NAB-40922-X</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-[#002147] tracking-tighter uppercase italic">
                        Forensic <span className="text-[#C5A021]">Audit</span> Report
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] mt-2">Instrument: Standard Commercial Mortgage Agreement - v2.4</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white border-2 border-[#002147] text-[#002147] text-[10px] font-black rounded-sm hover:bg-slate-50 transition-all uppercase tracking-widest">
                        EXPORT OFFICIAL PDF
                    </button>
                    <button className="px-6 py-3 bg-[#002147] text-white text-[10px] font-black rounded-sm hover:bg-[#003366] transition-all uppercase tracking-widest shadow-lg">
                        NEW REQUISITION
                    </button>
                </div>
            </div>

            {/* Metrics Grid: Serious Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white border-t-8 border-[#002147] p-8 shadow-sm hover:shadow-xl transition-all">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Vectors Extracted</p>
                    <p className="text-5xl font-black text-[#002147] tracking-tighter">24</p>
                    <p className="text-[11px] font-bold text-slate-500 mt-4 uppercase tracking-widest">Financial Markers Identified</p>
                </div>
                <div className="bg-white border-t-8 border-[#C5A021] p-8 shadow-sm hover:shadow-xl transition-all">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Clause Anomaly</p>
                    <p className="text-5xl font-black text-[#C5A021] tracking-tighter">03</p>
                    <p className="text-[11px] font-bold text-slate-500 mt-4 uppercase tracking-widest">Identifying Divergent Risks</p>
                </div>
                <div className="bg-white border-t-8 border-[#002147] p-8 shadow-sm hover:shadow-xl transition-all">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Integrity Index</p>
                    <div className="flex items-center gap-4">
                        <p className="text-4xl font-black text-[#002147] tracking-tighter">MODERATE</p>
                        <div className="h-10 w-px bg-slate-200"></div>
                        <p className="text-sm font-black text-[#C5A021]">68%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Fact Manifest */}
                <section className="bg-white border-4 border-[#002147]/5 overflow-hidden shadow-sm">
                    <div className="bg-[#002147] px-8 py-5 flex justify-between items-center">
                        <h3 className="font-black text-white text-[11px] uppercase tracking-[0.4em]">
                            Primary Fact Manifest
                        </h3>
                        <span className="text-white/40 text-[10px] font-mono">ID: F-402</span>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { label: 'Principal Amount', value: '₹ 4,50,00,000.00', page: 'P.1' },
                                    { label: 'Interest Rate (Fixed)', value: '8.75%', page: 'P.3' },
                                    { label: 'Tenure', value: '180 Months (15 Yrs)', page: 'P.1' },
                                    { label: 'Exit Penalty', value: 'Yes (Tiered)', page: 'P.12' },
                                    { label: 'Balloon Maturity', value: 'None Detected', page: 'P.14' },
                                    { label: 'Asset Collateral', value: 'Commercial Property', page: 'P.19' },
                                ].map((fact, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{fact.label}</p>
                                            <p className="text-lg font-black text-[#002147] tracking-tight">{fact.value}</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-widest border border-transparent group-hover:border-[#C5A021] group-hover:text-[#C5A021] transition-all">
                                                SRC: {fact.page}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Risk Analysis Sections */}
                <div className="space-y-8">
                    <section className="bg-white border-2 border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 px-4 py-2 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest">
                            Critical Alert
                        </div>
                        <div className="p-10">
                            <p className="text-[10px] font-black text-[#C5A021] uppercase tracking-[0.4em] mb-6">Risk Vector: Article 4.2</p>
                            <div className="mb-8 bg-[#002147] text-slate-100 p-6 font-mono text-xs leading-relaxed italic border-l-4 border-[#C5A021]">
                                "Borrower agrees that any payment late by more than three (3) business days shall trigger a re-capitalization of the total remaining interest..."
                            </div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Forensic Assessment</h4>
                            <p className="text-sm text-slate-700 font-medium leading-relaxed mb-6">
                                Predictive modeling indicates this clause converts standard delinquency into permanent capital loss. The recapitalization structure diverts from national fair-lending benchmarks and constitutes a predatory liquidity trap.
                            </p>
                            <div className="inline-flex items-center gap-4 p-4 bg-red-50 border border-red-100 uppercase tracking-widest text-[10px] font-black text-red-700">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                Risk Magnitude: Tier 1 Financial Hazard
                            </div>
                        </div>
                    </section>

                    <section className="bg-white border-2 border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 px-4 py-2 bg-[#002147] text-white text-[9px] font-black uppercase tracking-widest">
                            Structural Risk
                        </div>
                        <div className="p-10">
                            <p className="text-[10px] font-black text-[#C5A021] uppercase tracking-[0.4em] mb-6">Risk Vector: Cross-Default</p>
                            <div className="mb-8 bg-slate-50 text-slate-600 p-6 font-mono text-xs leading-relaxed border-l-4 border-[#002147]">
                                "...a default under any other agreement between Borrower and any other lending institution shall constitute an immediate default..."
                            </div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Forensic Assessment</h4>
                            <p className="text-sm text-slate-700 font-medium leading-relaxed">
                                Contagion risk detected. This provision allows unilateral acceleration of the instrument based on external debt performance, bypassing the primary contract's health.
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Recommendations: Institutional Memo Style */}
            <div className="mt-20 bg-[#002147] text-white overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    <div className="p-12 lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/10">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-[10px] font-black text-[#C5A021] uppercase tracking-[0.5em]">Executive Summary & Strategy</span>
                            <div className="flex-1 h-px bg-white/10"></div>
                        </div>
                        <h2 className="text-3xl font-black mb-8 tracking-tighter uppercase italic">Directive for Negotiation</h2>
                        <p className="text-slate-300 font-medium leading-relaxed mb-0 text-sm md:text-md max-w-4xl">
                            Immediate remediation of Article 4.2 is required. Requisite market standard mandates a 15-day grace period. Recalculation of interest must be struck from the instrument and replaced with a fixed-base penalty not exceeding 1.25% of the monthly installment.
                        </p>
                    </div>
                    <div className="p-12 flex flex-col justify-center gap-6 bg-[#001733]">
                        <button className="w-full py-5 bg-[#C5A021] text-[#002147] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#E2C275] transition-all">
                            GENERATE DIRECTIVE
                        </button>
                        <button className="w-full py-5 bg-white/5 text-white border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                            ARCHIVE RECORD
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
