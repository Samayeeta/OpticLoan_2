import React from 'react';
import { Link } from 'react-router-dom';

const ExpertAdvice = () => {
    const experts = [
        {
            name: "Warren Buffett",
            title: "Chairman & CEO, Berkshire Hathaway",
            role: "Investment Legend",
            advice: "Risk comes from not knowing what you're doing. Never sign a contract you haven't read twice and understood in its entirety.",
            insight: "Buffett emphasizes that complexity is often a mask for risk. In loan agreements, high-complexity clauses (like Yield Maintenance) are designed to profit from borrower ignorance.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg/440px-Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg",
            tag: "Wisdom"
        },
        {
            name: "Ray Dalio",
            title: "Founder, Bridgewater Associates",
            role: "Hedge Fund Expert",
            advice: "He who lives by the crystal ball will eat shattered glass. Don't predict the future of interest rates; protect yourself against the worst-case scenario.",
            insight: "Dalio advocates for 'Radical Transparency' and scenario testing. He advises borrowers to stress-test their loan documents against high-inflation or recession scenarios.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ray_Dalio_World_Economic_Forum_2013.jpg/440px-Ray_Dalio_World_Economic_Forum_2013.jpg",
            tag: "Risk Management"
        },
        {
            name: "Charlie Munger",
            title: "Former Vice Chairman, Berkshire Hathaway",
            role: "Capital Specialist",
            advice: "Show me the incentive and I will show you the outcome. If a lender is incentivized to see you default, they will hide triggers in the fine print.",
            insight: "Munger's 'Lollapalooza' effect suggests that multiple small predatory clauses can combine to create a catastrophic outcome for the borrower.",
            tag: "Logic"
        },
        {
            name: "Suze Orman",
            title: "Financial Advisor & Author",
            role: "Personal Finance Icon",
            advice: "Own your power. A loan is a business transaction, not a favor. If you don't like the terms, walk away or negotiate.",
            insight: "Orman focuses on the 'FICO' traps—how small default triggers can destroy a lifetime of credit building in a single billing cycle.",
            tag: "Empowerment"
        }
    ];

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Hero Section */}
            <section className="py-24 bg-[#003366] text-white px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/20 text-blue-300 text-xs font-black uppercase tracking-widest mb-6">
                        The Council of Experts
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight uppercase leading-none">
                        Advice from the <br />
                        <span className="text-amber-400 uppercase">World's Greatest.</span>
                    </h1>
                    <p className="text-xl text-blue-100/60 font-medium max-w-3xl mx-auto leading-relaxed italic">
                        "The best way to protect your capital is to understand the legal instruments that govern it."
                    </p>
                </div>
            </section>

            {/* Expert Advice Grid */}
            <section className="py-24 px-6 relative -mt-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {experts.map((expert, i) => (
                            <div key={i} className="bg-white border-2 border-slate-100 rounded-[40px] p-10 shadow-xl hover:translate-y-[-8px] transition-all flex flex-col md:flex-row gap-8 items-center lg:items-start">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {expert.tag}
                                        </div>
                                        <div className="h-[1px] flex-grow bg-slate-100"></div>
                                    </div>
                                    <h3 className="text-3xl font-black text-[#003366] mb-1">{expert.name}</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">{expert.title}</p>

                                    <div className="relative mb-8">
                                        <span className="absolute -top-4 -left-4 text-6xl text-[#003366]/5 font-serif">"</span>
                                        <p className="text-xl font-bold text-[#003366] leading-relaxed relative z-10">
                                            {expert.advice}
                                        </p>
                                    </div>

                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block mb-2">Practical Application:</span>
                                        <p className="text-sm text-slate-600 leading-relaxed italic">
                                            {expert.insight}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto bg-slate-900 rounded-[48px] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Audit Like the 1%</h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto">
                        Don't leave your financial destiny to chance. Use the same document forensic standards used by elite capital managers.
                    </p>
                    <Link to="/upload" className="px-10 py-5 bg-amber-500 text-slate-900 font-black rounded-2xl hover:bg-amber-400 transition-all uppercase tracking-widest shadow-2xl inline-block">
                        START PROFESSIONAL AUDIT
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ExpertAdvice;
