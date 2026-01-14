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

            {/* Core Values */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-3xl font-black text-[#003366] mb-8 uppercase tracking-tight">WHY OPTICLOAN?</h2>
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xl font-bold text-[#003366] mb-2">Forensic Accuracy</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    Our proprietary AI doesn't just "read" documents; it audits them. By cross-referencing thousands of predatory lending patterns, we expose risks that human eyes often miss.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-[#003366] mb-2">Privacy First</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    Security is in our DNA. We use bank-grade encryption and isolated sandboxes to ensure your financial documents are analyzed safely and never permanently stored.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-[#003366] mb-2">Empowering Borrowers</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    We provide you with the same deep-dive capabilities used by institutional analysts, putting the power of high-level auditing back into the hands of the consumer.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-12 rounded-[3rem] border-4 border-[#003366] shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-6xl opacity-10">⚖️</div>
                        <h3 className="text-[10px] font-black text-[#003366] uppercase tracking-[0.4em] mb-4">The Standard</h3>
                        <p className="text-3xl font-black text-[#003366] leading-tight mb-8">
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
