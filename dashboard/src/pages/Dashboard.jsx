import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [analysisData, setAnalysisData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = sessionStorage.getItem('lastAnalysis');
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                setAnalysisData(parsed);
            } catch (e) {
                console.error("Failed to parse analysis data", e);
            }
        }
    }, []);

    if (!analysisData) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 text-slate-900 font-sans">
                <div className="max-w-md w-full bg-white p-16 rounded-[40px] shadow-sm border border-slate-100 text-center">
                    <h2 className="text-2xl font-black mb-2 tracking-tighter uppercase">NO REPORT</h2>
                    <p className="text-slate-400 mb-10 text-[10px] font-bold uppercase tracking-[0.2em]">Upload a file to begin the forensic audit.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-[#003366] text-white font-black rounded-2xl shadow-lg hover:bg-[#002244] transition-all uppercase text-[10px] tracking-[0.3em]"
                    >
                        START AUDIT
                    </button>
                </div>
            </div>
        );
    }

    const { analysis, filename } = analysisData;
    const { facts, red_flags, document_metadata, explainability, error } = analysis;

    if (error) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
                <div className="max-w-2xl w-full bg-white p-12 rounded-[3rem] shadow-xl border-t-8 border-red-500 text-center">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter uppercase font-sans">ANALYSIS FAILED</h2>
                    <div className="bg-slate-50 p-6 rounded-2xl mb-10 text-left border border-slate-200">
                        <p className="text-slate-700 font-mono text-xs leading-relaxed overflow-auto max-h-40">{error}</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all text-[10px] tracking-widest uppercase"
                    >
                        TRY ANOTHER FILE
                    </button>
                </div>
            </div>
        );
    }

    const auditScore = document_metadata?.trust_score || 0;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans text-slate-900 select-none">
            {/* Header: Pure Minimalist */}
            <div className="max-w-7xl mx-auto px-10 pt-16 mb-20 flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-black text-[#003366] uppercase tracking-[0.4em]">OpticLoan Intelligence</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest truncate max-w-[200px]">{filename}</span>
                    </div>
                    <h1 className="text-6xl font-black text-[#003366] tracking-tighter uppercase leading-none">FORENSIC REPORT</h1>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="text-[10px] font-black text-slate-300 hover:text-[#003366] transition-colors uppercase tracking-[0.4em] pb-1 border-b-2 border-transparent hover:border-[#003366]"
                >
                    NEW SCAN
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

                    {/* LEFT SIDE: SUMMARY & KEY FACTS (No cards, just typography) */}
                    <div className="lg:col-span-5 space-y-20 lg:sticky lg:top-12">
                        {/* Summary section */}
                        <section>
                            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.6em] mb-10">Executive Summary</h3>
                            <div className="space-y-10">
                                <p className="text-[26px] font-black text-slate-900 leading-[1.15] tracking-tight">
                                    {document_metadata?.summary || "Deep forensic audit complete. Several critical risk factors identified for review."}
                                </p>

                                <div className="flex items-center gap-10 pt-4">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Audit Score</p>
                                        <p className={`text-5xl font-black tracking-tighter ${auditScore > 70 ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {auditScore}<span className="text-base text-slate-200 ml-1">/100</span>
                                        </p>
                                    </div>
                                    <div className="h-16 w-px bg-slate-100"></div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Audit Verdict</p>
                                        <p className={`text-base font-black uppercase tracking-widest ${auditScore > 70 ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {document_metadata?.verdict}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Facts section */}
                        <section>
                            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.6em] mb-12">Key Deal Terms</h3>
                            <div className="grid gap-12">
                                {Object.entries(facts || {}).map(([label, value], i) => (
                                    <div key={i} className="group">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 group-hover:text-[#003366] transition-colors">{label}</p>
                                        <p className="text-xl font-black text-slate-900 leading-none tracking-tight uppercase">{value}</p>
                                    </div>
                                ))}
                                {(!facts || Object.keys(facts).length === 0) && (
                                    <p className="text-slate-200 text-xs font-bold uppercase tracking-widest">No terms detected</p>
                                )}
                            </div>
                        </section>

                        <div className="opacity-40">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Forensic ID</p>
                            <p className="text-[9px] font-bold text-slate-400 break-all leading-relaxed uppercase tracking-widest">{filename}</p>
                        </div>
                    </div>

                    {/* RIGHT SIDE: TRAPS (Clean Cards) */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-[10px] font-black text-[#003366] uppercase tracking-[0.6em] flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                RISK ANALYSIS FEED
                            </h2>
                            <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest leading-none">Total {red_flags?.length || 0} findings</span>
                        </div>

                        {red_flags && red_flags.length > 0 ? (
                            red_flags.map((flag, idx) => (
                                <div key={idx} className="bg-white p-12 rounded-[40px] border border-slate-100 transition-all hover:border-[#003366]/20 group">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2.5 h-2.5 rounded-full ${flag.severity === 'High' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-amber-400'}`}></div>
                                            <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none group-hover:text-[#003366] transition-colors">{flag.category}</h4>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-[0.25em] ${flag.severity === 'High' ? 'text-red-500' : 'text-amber-500'}`}>
                                            {flag.severity} RISK
                                        </span>
                                    </div>

                                    <div className="mb-10 border-l-2 border-slate-100 pl-8">
                                        <p className="text-base font-bold italic text-slate-400 leading-relaxed">
                                            "{flag.text_found || "Reference quote extracted from analysis."}"
                                        </p>
                                    </div>

                                    <div className="flex gap-5 items-start">
                                        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                        </div>
                                        <p className="text-[15px] font-bold text-slate-500 leading-relaxed">
                                            {flag.reasoning}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-40 rounded-[4rem] border-2 border-dashed border-slate-100 text-center">
                                <p className="text-[10px] font-black text-slate-200 uppercase tracking-[0.6em]">No Predatory Clauses Identified</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Secure Footer */}
                <div className="mt-48 flex flex-col items-center gap-10 opacity-30">
                    <div className="h-px w-24 bg-slate-900"></div>
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.8em]">OpticLoan Intelligence • v2.6SECURE</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
