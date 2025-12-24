import React, { useState } from 'react';

const Glossary = () => {
    const categories = ["All", "Legal", "Financial", "Risk", "Real Estate"];
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const terms = [
        {
            term: "Cross-Default",
            category: "Legal",
            definition: "A provision in a loan agreement that puts the borrower in default if they default on any other loan.",
            human: "If you miss a payment on your business credit card, the bank can claim you've defaulted on your house mortgage too, even if you paid the mortgage on time.",
            risk: "High",
            tags: ["Trap", "Default"]
        },
        {
            term: "Yield Maintenance",
            category: "Financial",
            definition: "A prepayment penalty that allows investors to attain the same yield as if the borrower made all scheduled payments.",
            human: "A massive fee you pay if you try to pay off your loan early. It makes it almost impossible to refinance when interest rates drop.",
            risk: "High",
            tags: ["Refinance", "Penalty"]
        },
        {
            term: "Balloon Payment",
            category: "Financial",
            definition: "A large, lump-sum payment scheduled at the end of a series of smaller periodic payments.",
            human: "You pay small amounts for years, but on the very last day, you suddenly owe the entire remaining balance (often hundreds of thousands of dollars) at once.",
            risk: "Medium",
            tags: ["Payment", "Structure"]
        },
        {
            term: "Acceleration Clause",
            category: "Legal",
            definition: "A contract provision that allows a lender to require a borrower to repay all of an outstanding loan if certain requirements are not met.",
            human: "The 'Pay Me Now' button. If you break a rule, the bank can demand 100% of the money back immediately instead of monthly payments.",
            risk: "High",
            tags: ["Default", "Legal"]
        },
        {
            term: "Escalation Clause",
            category: "Legal",
            definition: "A clause allowing for the automated increase of payments or interest rates under specific conditions.",
            human: "A 'stealth hike.' Your interest rate or fees can go up automatically based on things like inflation or late payments without them asking you first.",
            risk: "High",
            tags: ["Interest Rate", "Trap"]
        },
        {
            term: "Amortization",
            category: "Financial",
            definition: "The process of spreading out a loan into a series of fixed payments.",
            human: "The math behind how your monthly payment is split between paying off the actual debt and paying the bank's interest.",
            risk: "Low",
            tags: ["Basics", "Payment"]
        },
        {
            term: "Non-Recourse Loan",
            category: "Legal",
            definition: "A loan where the lender can only seize the collateral and cannot pursue the borrower's other assets.",
            human: "If you can't pay, the bank takes the house but they can't come after your car, your savings, or your future wages.",
            risk: "Low",
            tags: ["Protection"]
        },
        {
            term: "Grace Period",
            category: "Financial",
            definition: "A period of time after a payment becomes due, during which a fee for being late will not be charged.",
            human: "The 'Oops' window. A few extra days (usually 5-15) to get your payment in before they hit you with a late fee.",
            risk: "Low",
            tags: ["Basics"]
        },
        {
            term: "Collateral",
            category: "Real Estate",
            definition: "An asset that a lender accepts as security for a loan.",
            human: "The thing you lose if you don't pay. For a mortgage, the house is the collateral.",
            risk: "Medium",
            tags: ["Assets", "Security"]
        },
        {
            term: "Covenant",
            category: "Legal",
            definition: "A promise in an indenture or any other formal debt agreement that certain activities will or will not be carried out.",
            human: "A set of strict house rules. For example, 'You must keep your business profitable' or 'You can't sell your equipment without asking us.'",
            risk: "Medium",
            tags: ["Rules", "Legal"]
        },
        {
            term: "Debt-to-Income Ratio (DTI)",
            category: "Financial",
            definition: "The percentage of a consumer's monthly gross income that goes toward paying debts.",
            human: "The math the bank uses to decide if you're too broke to take on more debt. They prefer this to be below 43%.",
            risk: "Low",
            tags: ["Basics", "Approval"]
        },
        {
            term: "Prepayment Penalty",
            category: "Financial",
            definition: "A fee charged to a borrower who pays off a loan before its scheduled maturity date.",
            human: "Punishment for being responsible. If you try to pay the bank back faster than they planned, they charge you a fee for 'losing' interest money.",
            risk: "Medium",
            tags: ["Penalty", "Trap"]
        }
    ];

    const filteredTerms = terms.filter(item => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.human.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Header section */}
            <section className="py-20 bg-slate-50 border-b border-slate-200 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003366]/5 text-[#003366] text-[10px] font-black uppercase tracking-widest mb-6 border border-[#003366]/10">
                        Lawyer-to-Human Translation
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-[#003366] mb-8 tracking-tight uppercase leading-none">
                        The Optic<span className="text-blue-600">Glossary.</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed mb-12">
                        Common legal traps and financial jargon explained in plain English. Use this to decode your loan agreement before you sign.
                    </p>

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Search term (e.g. 'Trap', 'Payment')..."
                                className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-[#003366] outline-none transition-all font-medium text-slate-700 shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">🔍</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2 ${activeCategory === cat
                                            ? "bg-[#003366] border-[#003366] text-white shadow-lg"
                                            : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {filteredTerms.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredTerms.map((item, i) => (
                                <div key={i} className="group p-8 border-2 border-slate-50 rounded-[40px] hover:border-[#003366]/20 hover:bg-slate-50/30 transition-all flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider ${item.risk === 'High' ? 'bg-red-50 text-red-600' :
                                                item.risk === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                                            }`}>
                                            Risk: {item.risk}
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{item.category}</span>
                                    </div>

                                    <h3 className="text-2xl font-black text-[#003366] mb-4 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                                        {item.term}
                                    </h3>

                                    <p className="text-sm font-bold text-slate-400 italic mb-6 leading-relaxed">
                                        "{item.definition}"
                                    </p>

                                    <div className="mt-auto p-6 bg-white border border-slate-100 rounded-3xl shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">In Plain English:</span>
                                        <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                            {item.human}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="text-2xl font-black text-[#003366] uppercase mb-2">No matches found</h3>
                            <p className="text-slate-500 font-medium">Try a different search term or category.</p>
                            <button
                                onClick={() => { setSearchTerm(""); setActiveCategory("All") }}
                                className="mt-8 px-6 py-3 bg-[#003366] text-white font-bold rounded-xl uppercase text-xs tracking-widest"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer Prompt */}
            <section className="py-24 px-6 bg-slate-900 text-white rounded-t-[64px]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Seen these in your contract?</h2>
                    <p className="text-slate-400 font-medium mb-10 leading-relaxed">
                        Don't let complex language hide predatory risks. Scan your document now and let our AI cross-reference these terms against your specific agreement.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all uppercase tracking-widest shadow-xl">
                            RUN FORENSIC AUDIT
                        </button>
                        <button className="px-8 py-4 bg-transparent border-2 border-white/20 text-white font-black rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest">
                            CONTACT ADVISOR
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Glossary;
