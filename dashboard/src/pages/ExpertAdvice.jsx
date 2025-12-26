import React from 'react';
import { Link } from 'react-router-dom';

const ExpertAdvice = () => {
    const experts = [
        {
            name: "Warren Buffett",
            title: "Chairman, Berkshire Hathaway",
            advice: "Risk comes from not knowing what you're doing. Never sign a contract you haven't understood in its entirety.",
            insight: "Complexity is often a mask for risk. In loan agreements, dense jargon is designed to hide profit-stripping clauses.",
            tag: "Wisdom"
        },
        {
            name: "Ray Dalio",
            title: "Founder, Bridgewater Associates",
            advice: "Don't predict the future; protect yourself against the worst-case scenario within the document.",
            insight: "Advocates for scenario testing. Stress-test your loan documents against high-inflation or recession clauses.",
            tag: "Risk Mgmt"
        },
        {
            name: "Charlie Munger",
            title: "Vice Chairman, Berkshire Hathaway",
            advice: "Show me the incentive and I will show you the outcome. If a lender is incentivized to see you default, it's there.",
            insight: "Multiple small predatory clauses can combine to create a catastrophic outcome for the unaware borrower.",
            tag: "Logic"
        },
        {
            name: "Suze Orman",
            title: "Financial Advisor & Author",
            advice: "A loan is a business transaction, not a favor. If you don't like the terms, walk away or negotiate.",
            insight: "Focuses on 'credit traps'—how small default triggers can destroy a lifetime of diligent credit building.",
            tag: "Empowerment"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20 animate-fade-in">
            {/* Header */}
            <section className="px-6 mb-16">
                <div className="max-w-7xl mx-auto text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-bold uppercase tracking-wider mb-6">
                        The Council of Experts
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Insights from the Leaders
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
                        "The best way to protect your capital is to understand the legal instruments that govern it."
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="px-6 mb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {experts.map((expert, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase tracking-wider">
                                        {expert.tag}
                                    </span>
                                    <div className="h-px flex-grow bg-slate-50"></div>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">{expert.name}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{expert.title}</p>

                                <blockquote className="text-xl font-bold text-slate-800 leading-relaxed mb-8 border-l-4 border-indigo-100 pl-6">
                                    "{expert.advice}"
                                </blockquote>

                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-2">Practical Insight</span>
                                    <p className="text-sm text-slate-600 leading-relaxed italic">
                                        {expert.insight}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6">
                <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-xl">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-6">Audit Like the One Percent</h2>
                        <p className="text-slate-400 font-medium mb-10 max-w-xl mx-auto">
                            Don't leave your financial destiny to chance. Use the same document forensic standards used by elite capital managers.
                        </p>
                        <Link to="/upload" className="inline-block px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
                            Start Professional Audit
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExpertAdvice;
