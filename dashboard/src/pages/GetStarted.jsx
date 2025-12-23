import React from 'react';

const GetStarted = () => {
    return (
        <div className="py-24 px-6 max-w-4xl mx-auto text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[#003366]/5 text-[#003366] text-4xl mb-8 border-2 border-[#003366]/10 shadow-inner">
                ⚖️
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#003366] mb-6 tracking-tight">SECURE YOUR FINANCIAL FUTURE</h1>
            <p className="text-xl text-slate-500 font-medium mb-16 leading-relaxed max-w-2xl mx-auto">
                OpticLoan uses advanced legal-trained AI to audit your loan documents for predatory clauses. Choose your path below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="group p-8 bg-white border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-[#003366] hover:shadow-xl transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-6xl font-black text-[#003366]">01</span>
                    </div>
                    <h3 className="text-xl font-black text-[#003366] mb-2 uppercase tracking-tight">Individual Audit</h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                        Upload personal mortgage, student loan, or personal credit agreements for instant trap analysis.
                    </p>
                    <button className="w-full py-3 bg-[#003366] text-white font-bold rounded text-sm group-hover:bg-[#002244] transition-colors">
                        UPLOAD DOCUMENT
                    </button>
                </div>

                <div className="group p-8 bg-white border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-[#003366] hover:shadow-xl transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-6xl font-black text-[#003366]">02</span>
                    </div>
                    <h3 className="text-xl font-black text-[#003366] mb-2 uppercase tracking-tight">Corporate/Legal</h3>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                        For law firms and real estate teams managing high-volume loan batches with complex security instruments.
                    </p>
                    <button className="w-full py-3 bg-white border-2 border-[#003366] text-[#003366] font-bold rounded text-sm hover:bg-slate-50 transition-colors">
                        ACCESS PRO CONSOLE
                    </button>
                </div>
            </div>

            <div className="mt-20 p-10 rounded-[32px] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#003366] to-transparent opacity-50"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-2/3">
                        <p className="text-xs font-black text-amber-500 uppercase tracking-[0.2em] mb-4">Integrity Guarantee</p>
                        <h4 className="text-2xl font-bold mb-4 tracking-tight">Your data is never shared with lenders.</h4>
                        <p className="text-slate-300 font-medium text-sm leading-relaxed">
                            We use SOC2-compliant encryption. Your uploaded documents are analyzed in a secure sandbox and purged after report generation.
                        </p>
                    </div>
                    <div className="md:w-1/3 text-center">
                        <span className="text-6xl">🔒</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetStarted;
