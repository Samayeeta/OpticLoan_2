import React from 'react';

const Dashboard = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase">Audit Complete</span>
                        <span className="text-slate-400 text-xs font-bold">Ref: LA-9022-X</span>
                    </div>
                    <h1 className="text-3xl font-black text-[#003366] tracking-tight uppercase">Loan Analysis Report</h1>
                    <p className="text-slate-500 font-medium italic">Standard Commercial Mortgage Agreement - v2.4</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white border-2 border-[#003366] text-[#003366] font-bold rounded shadow-sm hover:bg-slate-50 transition-all">
                        DOWNLOAD PDF
                    </button>
                    <button className="px-5 py-2.5 bg-[#003366] text-white font-bold rounded shadow-md hover:bg-[#002244] transition-all">
                        NEW ANALYSIS
                    </button>
                </div>
            </div>

            {/* Summary Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white border-b-4 border-emerald-500 p-6 rounded shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">FACTS EXTRACTED</p>
                    <p className="text-3xl font-black text-[#003366]">24</p>
                    <p className="text-xs text-slate-500 mt-2">Core financial terms identified</p>
                </div>
                <div className="bg-white border-b-4 border-amber-500 p-6 rounded shadow-sm text-amber-600">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TRAP CLAUSES</p>
                    <p className="text-3xl font-black">03</p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">Potential risks detected in Article 4 & 7</p>
                </div>
                <div className="bg-white border-b-4 border-[#003366] p-6 rounded shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">OVERALL RISK</p>
                    <div className="flex items-center gap-3">
                        <p className="text-3xl font-black text-amber-500">MODERATE</p>
                        <div className="h-6 w-1 bg-slate-200"></div>
                        <p className="text-xs font-bold text-slate-500">Score: 68/100</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Facts Section */}
                <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                        <h3 className="font-black text-[#003366] text-sm uppercase tracking-wider flex items-center gap-2">
                            <span className="text-xl">📋</span> CRITICAL FACTS
                        </h3>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <tbody className="divide-y divide-slate-100">
                                {[
                                    { label: 'Principal Amount', value: '$450,000.00', page: 'P.1' },
                                    { label: 'Interest Rate (Fixed)', value: '6.25%', page: 'P.3' },
                                    { label: 'Tenure', value: '180 Months (15 Yrs)', page: 'P.1' },
                                    { label: 'Prepayment Penalty', value: 'Yes (First 3 Yrs)', page: 'P.12' },
                                    { label: 'Balloon Payment', value: 'No', page: 'P.14' },
                                    { label: 'Collateral', value: 'Primary Residence', page: 'P.19' },
                                ].map((fact, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{fact.label}</p>
                                            <p className="text-md font-bold text-slate-800">{fact.value}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="px-2 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded group-hover:bg-[#003366]/10 group-hover:text-[#003366] transition-colors cursor-pointer">
                                                SOURCE: {fact.page}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Right Column: Trap Clauses Section */}
                <div className="space-y-6">
                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden border-l-8 border-l-amber-500">
                        <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex justify-between items-center">
                            <h3 className="font-black text-amber-700 text-sm uppercase tracking-wider flex items-center gap-2">
                                <span className="text-xl">⚠️</span> TRAP IDENTIFIED: ARTICLE 4.2
                            </h3>
                            <span className="px-2 py-1 bg-amber-200 text-amber-800 text-[10px] font-black rounded uppercase">High Risk</span>
                        </div>
                        <div className="p-6">
                            <div className="mb-4 bg-slate-900 text-slate-300 p-4 rounded font-mono text-xs leading-relaxed border-l-2 border-amber-500">
                                "Borrower agrees that any payment late by more than three (3) business days shall trigger a re-capitalization of the total remaining interest at a rate not to exceed the maximum legal limit..."
                            </div>
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">REASONING & IMPLICATION</h4>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
                                This clause effectively converts a minor late payment into a significant increase in the total cost of the loan. The "re-capitalization" term is used to mask what is essentially a predatory interest rate hike that applies retroactively to the balance.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex-1 p-3 bg-red-50 rounded border border-red-100 italic text-[11px] text-red-700">
                                    <strong>Risk:</strong> Could increase total repayment by up to $18,400 over a single missed week.
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden border-l-8 border-l-amber-400">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-black text-[#003366] text-sm uppercase tracking-wider flex items-center gap-2">
                                <span className="text-xl">🔍</span> TRAP IDENTIFIED: CROSS-DEFAULT
                            </h3>
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded uppercase">Med Risk</span>
                        </div>
                        <div className="p-6">
                            <div className="mb-4 bg-slate-900 text-slate-300 p-4 rounded font-mono text-xs leading-relaxed italic border-l-2 border-amber-400">
                                "...a default under any other agreement between Borrower and any other lending institution shall constitute an immediate default under this agreement."
                            </div>
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">REASONING & IMPLICATION</h4>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                This "Cross-Default" provision means if you miss a payment on an unrelated credit card or business line of credit elsewhere, this lender can immediately call your entire loan due (Acceleration) even if you are current with them.
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Audit Sidebar / Info */}
            <div className="mt-12 p-8 rounded-2xl bg-[#003366] text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <span className="text-[12rem] font-black leading-none">⚖️</span>
                </div>
                <div className="relative z-10 max-w-2xl px-4 md:px-0">
                    <h2 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight">Recommendation for Negotiation</h2>
                    <p className="text-blue-100 font-medium leading-relaxed mb-6 text-sm md:text-base">
                        Based on the identified traps, we recommend requesting the removal of the 3-day trigger in Article 4.2. Current market standards usually allow 10-15 days before any penalty, and "re-capitalization" should be replaced with a one-time fixed late fee.
                    </p>
                    <button className="w-full md:w-auto px-6 py-3 bg-amber-500 text-[#003366] font-black rounded shadow-lg hover:bg-amber-400 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest">
                        GENERATE COUNTER-OFFER DOC
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
