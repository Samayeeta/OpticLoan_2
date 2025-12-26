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
        <div className="bg-slate-50 min-h-screen pb-24 animate-fade-in">
            {/* Page Header */}
            <section className="pt-40 pb-24 bg-white border-b-2 border-slate-200 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        National Predatory Registry
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-[#002147] mb-10 tracking-tighter uppercase italic">
                        Trap <span className="text-red-600">Database.</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-4xl leading-relaxed border-l-4 border-red-600 pl-8">
                        The central repository for identified predatory behaviors in Indian financial instruments.
                        Historical data of clause forensic analysis and impact projections.
                    </p>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-6 mb-16">
                        <h2 className="text-2xl font-black text-[#002147] uppercase tracking-tighter italic">Registry Records</h2>
                        <div className="h-px flex-grow bg-slate-200"></div>
                        <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase italic">Updated: {new Date().toLocaleDateString()}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {caseStudies.map((study, i) => (
                            <div key={i} className="group bg-white border border-slate-200 p-10 hover:border-red-600 transition-all shadow-sm hover:shadow-2xl relative">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#002147]/5 group-hover:bg-red-600/5 transition-colors flex items-center justify-center font-black text-slate-300">
                                    0{i + 1}
                                </div>
                                <div className={`inline-block px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-wider mb-8 border ${study.color === 'red' ? 'border-red-600 text-red-600' :
                                        study.color === 'amber' ? 'border-amber-600 text-amber-600' : 'border-orange-600 text-orange-600'
                                    }`}>
                                    {study.tag}
                                </div>
                                <h3 className="text-2xl font-black text-[#002147] mb-6 tracking-tight uppercase group-hover:text-red-600 transition-colors italic leading-none">
                                    {study.title}
                                </h3>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 block border-b border-slate-50 pb-4">
                                    Instrument: {study.documentType}
                                </div>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-8">
                                    {study.summary}
                                </p>
                                <div className="p-6 bg-slate-50 border-l-4 border-red-600 mb-8 italic text-sm text-[#002147] font-medium leading-relaxed">
                                    <span className="font-black uppercase text-[10px] block mb-2 not-italic text-red-600 tracking-widest leading-none">Projected Impact:</span>
                                    {study.impact}
                                </div>
                                <div className="flex items-start gap-4 p-4 border border-slate-100 bg-slate-50/30">
                                    <span className="text-xl">⚖️</span>
                                    <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wide">
                                        <span className="text-[#002147] font-black">Advisory Directive:</span> {study.expertTip}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Negotiation Checklist */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto bg-[#002147] text-white p-16 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #C5A021 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-16 text-center tracking-tighter uppercase italic">Counter-Measure Guidelines</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-16">
                            <div className="space-y-8">
                                {[
                                    "Cap on Variable Rate Adjustments",
                                    "Grace Period for Late Payments (min 5 days)",
                                    "Deletion of 'Cross-Default' Clauses",
                                    "Right to Cure Default within 30 days"
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-center group">
                                        <div className="w-8 h-8 rounded-sm bg-[#C5A021] flex items-center justify-center text-[#002147] text-xs font-black shadow-lg group-hover:scale-110 transition-transform">✓</div>
                                        <span className="font-black text-xl tracking-tight uppercase group-hover:text-[#C5A021] transition-colors italic">{item}</span>
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
                                    <div key={i} className="flex gap-6 items-center group">
                                        <div className="w-8 h-8 rounded-sm bg-[#C5A021] flex items-center justify-center text-[#002147] text-xs font-black shadow-lg group-hover:scale-110 transition-transform">✓</div>
                                        <span className="font-black text-xl tracking-tight uppercase group-hover:text-[#C5A021] transition-colors italic">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center pt-8 border-t border-white/10">
                            <Link to="/upload" className="inline-block px-12 py-6 bg-[#C5A021] text-[#002147] font-black rounded-sm hover:bg-white transition-all uppercase tracking-[0.2em] text-xs shadow-2xl">
                                INITIATE AUDIT SEQUENCE
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrapDatabase;
