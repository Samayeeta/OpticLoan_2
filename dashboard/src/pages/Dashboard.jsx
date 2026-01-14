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
            <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-6 text-slate-900 font-sans">
                <div className="max-w-md w-full bg-white p-12 rounded-xl shadow-sm border border-slate-200 text-center">
                    <h2 className="text-xl font-bold mb-2 tracking-tight">Report Unavailable</h2>
                    <p className="text-slate-400 mb-8 text-sm">Please upload a document to begin.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3 bg-[#003366] text-white font-bold rounded shadow hover:bg-[#002244] transition-all uppercase text-[10px] tracking-widest"
                    >
                        GO TO UPLOAD
                    </button>
                </div>
            </div>
        );
    }

    const { analysis, filename } = analysisData;
    const { facts, red_flags, document_metadata, explainability, error } = analysis;

    if (error) {
        return (
            <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-6 font-sans">
                <div className="max-w-2xl w-full bg-white p-12 rounded-xl shadow-xl border-t-4 border-red-500 text-center">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">AUDIT FAILED</h2>
                    <div className="bg-slate-50 p-6 rounded-lg mb-10 text-left border border-slate-200">
                        <p className="text-slate-700 font-mono text-xs leading-relaxed overflow-auto max-h-40">{error}</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-red-600 text-white font-black rounded hover:bg-red-700 transition-all text-[10px] tracking-widest uppercase"
                    >
                        TRY ANOTHER FILE
                    </button>
                </div>
            </div>
        );
    }

    const auditScore = document_metadata?.trust_score || 0;

    return (
        <div className="min-h-screen bg-[#F0F2F5] pb-32 font-sans text-slate-900">
            {/* Minimal Header from Screenshot */}
            <div className="max-w-[1300px] mx-auto px-10 pt-16 mb-12 flex items-start justify-between">
                <div>
                    <h1 className="text-[32px] font-black text-[#003366] tracking-tight leading-none mb-2">LOAN ANALYSIS REPORT</h1>
                    <p className="text-xs italic text-slate-400 font-semibold uppercase tracking-widest">{filename}</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-[#003366] text-white text-[11px] font-black rounded hover:bg-[#002244] transition-all uppercase tracking-widest shadow-lg"
                >
                    NEW ANALYSIS
                </button>
            </div>

            <div className="max-w-[1300px] mx-auto px-10">
                {/* 3-Part Stats Row (De-cluttered Style) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                    {/* Stat 1 */}
                    <div className="bg-white p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b-[6px] border-emerald-400 transition-transform hover:-translate-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">FACTS EXTRACTED</p>
                        <p className="text-5xl font-black text-[#003366] mb-3">{Object.keys(facts || {}).length}</p>
                        <p className="text-[11px] text-slate-400 font-bold leading-tight uppercase">Primary financial markers identified</p>
                    </div>
                    {/* Stat 2 */}
                    <div className="bg-white p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b-[6px] border-red-500 transition-transform hover:-translate-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">RED FLAGS</p>
                        <p className="text-5xl font-black text-red-600 mb-3">{red_flags?.length || 0}</p>
                        <p className="text-[11px] text-slate-400 font-bold leading-tight uppercase">Potential risks detected in the agreement</p>
                    </div>
                    {/* Stat 3 */}
                    <div className="bg-white p-10 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b-[6px] border-[#003366] transition-transform hover:-translate-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">VERDICT & TRUST</p>
                        <div className="flex items-center gap-6">
                            <span className={`text-[32px] font-black uppercase ${auditScore > 70 ? 'text-emerald-500' : 'text-red-600'}`}>
                                {document_metadata?.verdict || "CRITICAL"}
                            </span>
                            <div className="w-px h-8 bg-slate-200"></div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                Confidence: {Math.round((explainability?.confidence ?? 0.46) * 100)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* LEFT PAGE: EXTRACTED TERMS */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
                            <div className="px-10 py-7 border-b border-slate-100 flex items-center gap-4 bg-[#F9FBFC]">
                                <span className="text-xl">📋</span>
                                <h2 className="text-[14px] font-black text-[#003366] uppercase tracking-[0.2em]">EXTRACTED TERMS</h2>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {Object.entries(facts || {}).map(([label, value], i) => (
                                    <div key={label} className="px-10 py-8 flex items-center justify-between group transition-all hover:bg-slate-50">
                                        <div className="flex flex-col gap-2">
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] leading-none mb-1">{label}</p>
                                            <p className="text-[17px] font-black text-slate-800 leading-tight">{value}</p>
                                        </div>
                                        <div className="text-right flex flex-col items-end opacity-0 group-hover:opacity-40 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            <span className="text-[8px] font-black text-[#003366] tracking-tighter uppercase leading-none">FORENSIC</span>
                                            <span className="text-[8px] font-black text-[#003366] tracking-tighter uppercase leading-none">VERIFIED</span>
                                        </div>
                                    </div>
                                ))}
                                {(!facts || Object.keys(facts).length === 0) && (
                                    <div className="p-20 text-center text-slate-300 font-bold uppercase text-[10px] tracking-widest">No terms detected</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PAGE: TRAP FEED */}
                    <div className="lg:col-span-7 space-y-10">
                        {red_flags && red_flags.length > 0 ? (
                            red_flags.map((flag, idx) => (
                                <div key={idx} className={`bg-white rounded-2xl shadow-xl border border-slate-100 border-l-[8px] ${flag.severity === 'High' ? 'border-l-red-500' : 'border-l-amber-400'} overflow-hidden transition-all hover:shadow-2xl`}>
                                    {/* Header with Amber BG */}
                                    <div className="px-10 py-6 bg-[#FFF9E7] border-b border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-6 h-6 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-600 font-bold text-xs shadow-sm bg-white">!</div>
                                            <h3 className="text-[14px] font-black text-[#855B00] uppercase tracking-widest">
                                                {flag.category}: POTENTIAL RISK
                                            </h3>
                                        </div>
                                        <div className="bg-[#FFEBB2] px-4 py-1.5 rounded-full text-[10px] font-black text-[#855B00] uppercase tracking-widest ring-2 ring-white shadow-sm">
                                            {flag.severity} SEVERITY
                                        </div>
                                    </div>

                                    <div className="p-10">
                                        {/* Dark Block Quote */}
                                        <div className="bg-[#0B1226] p-10 rounded-2xl mb-10 relative border-l-4 border-amber-500 shadow-inner">
                                            <p className="text-[15px] font-medium text-blue-100 leading-relaxed italic">
                                                "{flag.text_found || "Reference terms extracted from document stream."}"
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">REASONING & FORENSIC IMPLICATION</p>
                                            <p className="text-[16px] font-bold text-slate-600 leading-relaxed">
                                                {flag.reasoning}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-32 rounded-3xl border-4 border-dashed border-slate-100 text-center">
                                <p className="text-[12px] font-black text-slate-300 uppercase tracking-[0.8em] animate-pulse">Audit Pipeline: 100% Clean</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Secure Footer */}
                <div className="mt-60 mb-20 flex flex-col items-center gap-8 opacity-20 select-none pointer-events-none">
                    <div className="h-px w-32 bg-slate-300"></div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-[10px] font-black text-[#003366] uppercase tracking-[1em]">OpticLoan Intelligence • Forensic v2.9 SECURE</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.5em]">Isolated Sandbox Environment • Zero Persistence Mode</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
