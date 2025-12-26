import React from 'react';
import { Link } from 'react-router-dom';

const TrapDatabase = () => {
    const caseStudies = [
        {
            title: "Invisible Escalation",
            documentType: "Commercial Real Estate",
            summary: "A late payment fee that escalated from 5% to 15% of the total principal if unpaid for 30 days.",
            impact: "$120,000 penalty hidden in standard boiler-plate text.",
            expertTip: "Cross-reference 'Events of Default' with 'Penalty Schedules'.",
            tag: "High Risk",
            color: "red"
        },
        {
            title: "Yield Maintenance Trap",
            documentType: "SBA Loan",
            summary: "Complex mathematical formula for yield maintenance that effectively doubled the cost of exit.",
            impact: "Early refinancing became mathematically impossible for 5 years.",
            expertTip: "Ask for a numerical example of 'Yield Maintenance' in writing.",
            tag: "Lock-in",
            color: "amber"
        },
        {
            title: "Cross-Collateralization",
            documentType: "Personal Line of Credit",
            summary: "Linked the business loan to the personal home mortgage via a single sentence on page 22.",
            impact: "A missed business payment put the family home at risk.",
            expertTip: "Audit 'Collateral' definitions for 'existing obligations'.",
            tag: "Legal Trap",
            color: "orange"
        },
        {
            title: "Insecurity Acceleration",
            documentType: "Equipment Lease",
            summary: "Lender could demand immediate repayment if they 'deemed themselves insecure' about the borrower.",
            impact: "Business forced into liquidation after an industry downturn.",
            expertTip: "Demand that 'Acceleration' only occurs upon objective defaults.",
            tag: "Liquidity",
            color: "red"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20 animate-fade-in">
            {/* Header */}
            <section className="px-6 mb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-wider mb-6">
                        Clause Library
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        The Trap Database
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-3xl leading-relaxed">
                        A registry of predatory clauses commonly found in standard loan agreements. Use this to identify risks in your own documents.
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="px-6 mb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caseStudies.map((study, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
                                <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-6 ${study.color === 'red' ? 'bg-red-50 text-red-600' :
                                        study.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-orange-50 text-orange-600'
                                    }`}>
                                    {study.tag}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{study.title}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    {study.documentType}
                                </p>
                                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                    {study.summary}
                                </p>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6 font-medium text-xs text-slate-700 italic">
                                    <span className="text-[10px] font-bold text-red-500 uppercase not-italic block mb-1">Impact</span>
                                    {study.impact}
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-indigo-500">💡</span>
                                    <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                                        <span className="text-indigo-600">Audit Hint:</span> {study.expertTip}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6">
                <div className="max-w-5xl mx-auto bg-indigo-600 rounded-3xl p-12 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                    <h2 className="text-3xl font-bold mb-6">Start Your Custom Audit</h2>
                    <p className="text-indigo-100 font-medium mb-10 max-w-xl mx-auto">
                        Does your document contain these traps? Find out in minutes with our automated analysis engine.
                    </p>
                    <Link to="/upload" className="inline-block px-10 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-slate-50 transition-all">
                        Upload Document
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default TrapDatabase;
