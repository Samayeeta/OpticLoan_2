import React from 'react';
import { Link } from 'react-router-dom';

const ExpertAdvice = () => {
    const experts = [
        {
            name: "Warren Buffett",
            title: "Chairman & CEO, Berkshire Hathaway",
            role: "Investment Legend",
            advice: "Risk comes from not knowing what you're doing. Never sign a contract you haven't read twice and understood in its entirety.",
            insight: "Buffett emphasizes that complexity is often a mask for risk. In loan agreements, high-complexity clauses are designed to profit from borrower ignorance.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg/440px-Warren_Buffett_at_the_2015_SelectUSA_Investment_Summit.jpg",
            tag: "Wisdom"
        },
        {
            name: "Ray Dalio",
            title: "Founder, Bridgewater Associates",
            role: "Hedge Fund Expert",
            advice: "He who lives by the crystal ball will eat shattered glass. Don't predict the future of interest rates; protect yourself against the worst-case scenario.",
            insight: "Dalio advocates for scenario testing. He advises borrowers to stress-test their loan documents against high-inflation or recession scenarios.",
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
        <div className="bg-slate-50 min-h-screen pb-24 animate-fade-in">
            {/* Hero Section */}
            <section className="pt-40 pb-32 bg-[#002147] text-white px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C5A021 0, #C5A021 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-[#C5A021] text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                        The Strategic Council
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic leading-none">
                        Institutional <br />
                        <span className="text-[#C5A021]">Advisory Panel.</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed italic border-l-4 border-[#C5A021] pl-8">
                        "The best way to protect your capital is to understand the legal instruments that govern its flow."
                    </p>
                </div>
            </section>

            {/* Expert Advice Grid */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {experts.map((expert, i) => (
                            <div key={i} className="bg-white border-2 border-slate-100 p-12 shadow-sm hover:shadow-2xl transition-all relative group">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                    <span className="text-9xl font-black text-[#002147]">"</span>
                                </div>

                                <div className="flex items-center gap-4 mb-10">
                                    <div className="px-3 py-1 bg-[#002147] text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                                        {expert.tag}
                                    </div>
                                    <div className="h-px flex-1 bg-slate-100"></div>
                                </div>

                                <div className="mb-10">
                                    <h3 className="text-3xl font-black text-[#002147] mb-2 tracking-tighter uppercase italic leading-none">{expert.name}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{expert.title}</p>
                                </div>

                                <div className="mb-12">
                                    <p className="text-2xl font-black text-[#002147] leading-[1.1] tracking-tight italic border-l-8 border-[#C5A021] pl-8 py-2">
                                        {expert.advice}
                                    </p>
                                </div>

                                <div className="p-8 bg-slate-50 border border-slate-100">
                                    <span className="text-[10px] font-black text-[#C5A021] uppercase tracking-[0.4em] block mb-4">Strategic Execution:</span>
                                    <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
                                        {expert.insight}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 md:px-20">
                <div className="max-w-6xl mx-auto bg-[#002147] p-16 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C5A021]/20 to-transparent"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black mb-10 uppercase tracking-tighter italic">Audit Like the Institutional 1%</h2>
                        <p className="text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
                            Don't leave your financial destiny to chance. Deploy the same document forensics standards used by global capital custodians.
                        </p>
                        <Link to="/upload" className="px-12 py-6 bg-[#C5A021] text-[#002147] font-black rounded-sm hover:bg-white transition-all uppercase tracking-[0.3em] text-xs shadow-2xl inline-block">
                            INITIALIZE PROFESSIONAL SEQUENCE
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExpertAdvice;
