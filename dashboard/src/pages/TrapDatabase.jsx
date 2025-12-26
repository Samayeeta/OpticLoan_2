import React from 'react';
import { Link } from 'react-router-dom';

const TrapDatabase = () => {
    const caseStudies = [
        {
            title: "The 'Invisible' Escalation Clause",
            documentType: "Commercial Real Estate Loan",
            summary: "A 45-page agreement where a late payment fee of 5% escalated to 15% of the total principal balance if unpaid for 30 days.",
            impact: "Potential $120,000 penalty hidden in standard boiler-plate text.",
            expertTip: "Always cross-reference the 'Events of Default' section with 'Penalty Schedules'.",
            tag: "High Risk",
            color: "red"
        },
        {
            title: "The Prepayment 'Yield Maintenance' Trap",
            documentType: "Small Business Administration (SBA) Loan",
            summary: "Borrower thought they could refinance early. The contract contained a complex mathematical formula for yield maintenance that effectively doubled the cost of exit.",
            impact: "Refinancing became mathematically impossible for the first 5 years.",
            expertTip: "If you see the term 'Yield Maintenance', ask for a numerical example in writing before signing.",
            tag: "Financial Lock-in",
            color: "amber"
        },
        {
            title: "The Cross-Collateralization Blindspot",
            documentType: "Personal Line of Credit",
            summary: "The bank linked the borrower's business loan to their personal home mortgage via a single sentence on page 22.",
            impact: "A missed business payment put the family home at risk of foreclosure.",
            expertTip: "Audit the 'Collateral' definitions carefully for any mention of 'future advances' or 'existing obligations'.",
            tag: "Legal Trap",
            color: "orange"
        },
        {
            title: "The 'Insecurity' Acceleration Clause",
            documentType: "Equipment Lease Agreement",
            summary: "Lender had the right to demand full immediate repayment if they 'deemed themselves insecure' about the borrower's financial position, even without a missed payment.",
            impact: "Business was forced into liquidation after an industry-wide downturn made the lender nervous.",
            expertTip: "Demand that 'Acceleration' only occurs upon specific, objective defaults, not subjective 'feelings'.",
            tag: "Liquidity Risk",
            color: "red"
        }
    ];

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Page Header */}
            <section className="py-24 bg-slate-50 border-b border-slate-200 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-black uppercase tracking-widest mb-6">
                        Predatory Clause Repository
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-[#003366] mb-8 tracking-tight uppercase">
                        The Trap <br />
                        <span className="text-red-600">Database.</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-3xl leading-relaxed">
                        A comprehensive registry of identified predatory clauses found in standard loan agreements. Use this database to audit your documents for known financial risks.
                    </p>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-black text-[#003366] mb-12 uppercase tracking-tight flex items-center gap-4">
                        Document Forensics
                        <div className="h-[2px] flex-grow bg-slate-100"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caseStudies.map((study, i) => (
                            <div key={i} className="group border-2 border-slate-100 rounded-[32px] p-8 hover:border-red-600 transition-all bg-white hover:shadow-2xl">
                                <div className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider mb-6 ${study.color === 'red' ? 'bg-red-50 text-red-600' :
                                    study.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-orange-50 text-orange-600'
                                    }`}>
                                    {study.tag}
                                </div>
                                <h3 className="text-xl font-black text-[#003366] mb-4 group-hover:text-red-600 transition-colors">
                                    {study.title}
                                </h3>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    DOC TYPE: {study.documentType}
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                    {study.summary}
                                </p>
                                <div className="p-4 bg-slate-50 rounded-2xl mb-6 border border-slate-100 italic text-sm text-[#003366]">
                                    <span className="font-black uppercase text-[10px] block mb-2 not-italic text-red-500">The Impact:</span>
                                    "{study.impact}"
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 text-emerald-500 font-bold italic">💡</div>
                                    <p className="text-xs font-bold text-slate-500 leading-relaxed">
                                        <span className="text-emerald-600">AUDIT ADVICE:</span> {study.expertTip}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Negotiation Checklist */}
            <section className="py-16 md:py-24 bg-red-600 text-white px-6 md:mx-[5%] rounded-[32px] md:rounded-[48px]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-black mb-12 text-center uppercase tracking-tight leading-tight">Standard Counter-Measures</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-8">
                            {[
                                "Cap on Variable Rate Adjustments",
                                "Grace Period for Late Payments (min 5 days)",
                                "Deletion of 'Cross-Default' Clauses",
                                "Right to Cure Default within 30 days"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-red-600 text-xs font-bold">✓</div>
                                    <span className="font-bold text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-8">
                            {[
                                "Fixed Prepayment Penalty schedule",
                                "Financial Covenant Transparency",
                                "Detailed Fee Disclosure (Page 1 summary)",
                                "Governing Law locally defined"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-red-600 text-xs font-bold">✓</div>
                                    <span className="font-bold text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-16 text-center">
                        <Link to="/upload" className="inline-block px-10 py-5 bg-white text-red-600 font-black rounded-xl hover:bg-slate-100 transition-all uppercase tracking-widest shadow-xl">
                            RUN TRAP AUDIT NOW
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrapDatabase;
