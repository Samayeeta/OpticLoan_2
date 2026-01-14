import React from 'react';

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="py-24 px-6 bg-[#003366] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6">
                        OUR MISSION:<br />
                        <span className="text-blue-300">TOTAL TRANSPARENCY.</span>
                    </h1>
                    <p className="text-xl text-blue-100 font-medium leading-relaxed">
                        OpticLoan was founded to bridge the information gap between institutional lenders and individual borrowers. We believe every signature should be informed by forensic-grade intelligence.
                    </p>
                </div>
            </section>

            {/* Comparative Advantage */}
            <section className="py-24 px-6 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-[#003366] uppercase tracking-tighter mb-4">OPTICLOAN vs. TRADITIONAL AI</h2>
                        <p className="text-slate-500 font-medium max-w-2xl mx-auto uppercase text-[10px] tracking-widest">Bridging the gap between raw text processing and forensic intelligence.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Traditional AI Box */}
                        <div className="bg-white p-10 rounded-3xl border-2 border-slate-100 opacity-60">
                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Traditional AI Apps</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <span className="text-red-400 text-xl">✕</span>
                                    <div>
                                        <p className="font-bold text-slate-700">Local Memory Limitations</p>
                                        <p className="text-xs text-slate-500 leading-relaxed">Standard apps struggle with 50+ page documents, often "forgetting" early context due to limited local RAM (OOM errors).</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-red-400 text-xl">✕</span>
                                    <div>
                                        <p className="font-bold text-slate-700">Surface-Level Scanning</p>
                                        <p className="text-xs text-slate-500 leading-relaxed">They use broad LLM prompts that miss subtle "cross-default" or "acceleration" clauses hidden in legal boilerplate.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* OpticLoan Box */}
                        <div className="bg-white p-10 rounded-3xl border-4 border-[#003366] shadow-2xl relative">
                            <div className="absolute -top-4 -right-4 bg-amber-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">The Forensic Choice</div>
                            <h4 className="text-sm font-black text-[#003366] uppercase tracking-widest mb-6">OpticLoan Forensic</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <span className="text-emerald-500 text-xl">✓</span>
                                    <div>
                                        <p className="font-bold text-[#003366]">Cloud-Native Memory Handling</p>
                                        <p className="text-xs text-slate-600 leading-relaxed">By leveraging our specialized cloud infrastructure, we scan the entire document simultaneously. We don't suffer from local memory leaks, ensuring every page is audited with equal precision.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-emerald-500 text-xl">✓</span>
                                    <div>
                                        <p className="font-bold text-[#003366]">Boolean-Weighted Auditing</p>
                                        <p className="text-xs text-slate-600 leading-relaxed">Our engine doesn't just summarize; it cross-references every sentence against binary markers for predatory behavior, providing legal-grade reasoning for every red flag found.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Mission */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-3xl font-black text-[#003366] mb-8 uppercase tracking-tight">WHY WE EXIST</h2>
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xl font-bold text-[#003366] mb-2">Forensic Accuracy</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    Our proprietary AI doesn't just "read" documents; it audits them. By cross-referencing thousands of predatory lending patterns, we expose risks that human eyes often miss.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-[#003366] mb-2">Isolated Security</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    Privacy is non-negotiable. Documents are processed in hardware-isolated environments and wiped immediately after the forensic audit is generated.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#003366] p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-900 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <h3 className="text-[10px] font-black text-blue-300 uppercase tracking-[0.4em] mb-4">THE OPTICLOAN PROMISE</h3>
                        <p className="text-3xl font-black text-white leading-tight mb-8">
                            "Transparency is not a feature; it is a fundamental financial right."
                        </p>
                        <div className="h-2 w-24 bg-amber-500 rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Technology Snapshot */}
            <section className="py-24 bg-slate-50 px-6 border-y border-slate-200">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-black text-[#003366] mb-12 uppercase tracking-tight">OUR TECHNOLOGY</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="p-8 bg-white rounded-2xl shadow-sm">
                            <div className="text-3xl mb-4">🧠</div>
                            <h5 className="font-bold text-[#003366] mb-2">Neural Parsing</h5>
                            <p className="text-xs text-slate-500">Deep semantic understanding of complex legal text.</p>
                        </div>
                        <div className="p-8 bg-white rounded-2xl shadow-sm">
                            <div className="text-3xl mb-4">🔍</div>
                            <h5 className="font-bold text-[#003366] mb-2">Trap Logic</h5>
                            <p className="text-xs text-slate-500">Boolean identification of predatory clause structures.</p>
                        </div>
                        <div className="p-8 bg-white rounded-2xl shadow-sm">
                            <div className="text-3xl mb-4">🛡️</div>
                            <h5 className="font-bold text-[#003366] mb-2">Isolated Compute</h5>
                            <p className="text-xs text-slate-500">Hardware-level isolation for document processing.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
