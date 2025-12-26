import React from 'react';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 animate-fade-in">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">Analysis Complete</span>
                            <span className="text-slate-400 text-[11px] font-medium tracking-widest">ID: LA-9022-X</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Loan Analysis Report</h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">Standard Commercial Mortgage Agreement - Verified v2.4</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all">
                            Export PDF
                        </button>
                        <button className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-all">
                            New Analysis
                        </button>
                    </div>
                </div>

                {/* Summary Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Facts</p>
                        <p className="text-3xl font-extrabold text-slate-900">24</p>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full mt-3 overflow-hidden">
                            <div className="h-full bg-indigo-500 w-full"></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">Risk Clauses</p>
                        <p className="text-3xl font-extrabold text-slate-900">03</p>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full mt-3 overflow-hidden">
                            <div className="h-full bg-amber-500 w-1/3"></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Rating</p>
                        <p className="text-3xl font-extrabold text-emerald-600">Fair</p>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full mt-3 overflow-hidden">
                            <div className="h-full bg-emerald-500 w-3/4"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Facts Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/50">
                            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                                📋 Critical Terms
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {[
                                { label: 'Principal Amount', value: '$450,000.00', page: 'P.1' },
                                { label: 'Interest Rate', value: '6.25% Fixed', page: 'P.3' },
                                { label: 'Loan Tenure', value: '180 Months', page: 'P.1' },
                                { label: 'Prepayment Penalty', value: 'Active (3 Yrs)', page: 'P.12' },
                                { label: 'Balloon Payment', value: 'Not applicable', page: 'P.14' },
                                { label: 'Security/Collateral', value: 'Primary Asset', page: 'P.19' },
                            ].map((fact, i) => (
                                <div key={i} className="px-6 py-4 flex justify-between items-center hover:bg-slate-50/50 transition-all">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{fact.label}</p>
                                        <p className="text-sm font-bold text-slate-900">{fact.value}</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
                                        Source: {fact.page}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Risk Analysis Section */}
                    <div className="space-y-6">
                        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden border-l-4 border-l-amber-500">
                            <div className="px-6 py-5 border-b border-slate-50 bg-amber-50/30 flex justify-between items-center">
                                <h3 className="font-bold text-amber-800 text-sm uppercase tracking-wider flex items-center gap-2">
                                    ⚠️ High Risk Identified
                                </h3>
                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                            </div>
                            <div className="p-6">
                                <div className="mb-4 bg-slate-900 text-indigo-300 p-4 rounded-xl font-mono text-[11px] leading-relaxed">
                                    "Borrower agrees that any payment late by more than three (3) business days shall trigger a re-capitalization of remaining interest..."
                                </div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Findings</h4>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                    This clause effectively converts a minor delay into a permanent interest hike. The term "re-capitalization" is used to mask an aggressive retroactive rate increase.
                                </p>
                            </div>
                        </section>

                        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden border-l-4 border-l-indigo-400">
                            <div className="px-6 py-5 border-b border-slate-50 bg-indigo-50/30 flex justify-between items-center">
                                <h3 className="font-bold text-indigo-800 text-sm uppercase tracking-wider flex items-center gap-2">
                                    🔍 Cross-Default Risk
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="mb-4 bg-slate-900 text-indigo-300 p-4 rounded-xl font-mono text-[11px] leading-relaxed">
                                    "...a default under any other agreement between Borrower and any other lending institution shall constitute an immediate default..."
                                </div>
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Findings</h4>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                    This means a missed payment elsewhere (e.g., a credit card) could cause this entire loan to be accelerated and called due immediately.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Recommendation Card */}
                <div className="mt-12 p-8 rounded-3xl bg-indigo-600 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
                    <div className="relative z-10 max-w-2xl text-center md:text-left">
                        <h2 className="text-2xl font-bold mb-4">Negotiation Points</h2>
                        <p className="text-indigo-100 font-medium leading-relaxed mb-6">
                            We recommend requesting a 10-day grace period for Article 4.2 instead of 3 days, and striking the "re-capitalization" language to avoid retroactive interest spikes.
                        </p>
                        <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-slate-50 transition-all">
                            Generate Counter-Offer Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
