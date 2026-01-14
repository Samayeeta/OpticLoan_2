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
                <div className="max-w-md w-full bg-white p-16 rounded-[40px] shadow-sm border-4 border-[#003366] text-center">
                    <h2 className="text-2xl font-black text-[#003366] mb-2 tracking-tighter uppercase">NO DATA</h2>
                    <p className="text-slate-400 mb-10 text-[10px] font-bold uppercase tracking-[0.2em]">Upload a file to begin audit.</p>
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
                <div className="max-w-2xl w-full bg-white p-12 rounded-[3rem] shadow-xl border-4 border-red-600 text-center">
                    <h2 className="text-2xl font-black text-red-600 mb-4 tracking-tighter uppercase">ANALYSIS FAILED</h2>
                    <div className="bg-red-50 p-6 rounded-2xl mb-10 text-left border border-red-100">
                        <p className="text-red-800 font-mono text-xs leading-relaxed overflow-auto max-h-40">{error}</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all text-sm tracking-widest uppercase font-sans"
                    >
                        TRY ANOTHER FILE
                    </button>
                </div>
            </div>
        );
    }

    const auditScore = document_metadata?.trust_score || 0;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans text-slate-900 overflow-x-hidden">
            {/* Minimal Header */}
            <div className="max-w-7xl mx-auto px-10 pt-12 mb-8 flex items-end justify-between">
                <div>
                    <h1 className="text-5xl font-black text-[#003366] tracking-tighter uppercase leading-none mb-1">AUDIT REPORT</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none">Status: Live Audit Complete</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate max-w-[200px]">{filename}</span>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2.5 bg-[#003366] text-white text-[10px] font-black rounded-xl hover:bg-[#002244] transition-all uppercase tracking-[0.2em]"
                >
                    NEW SCAN
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* LEFT SIDEBAR: Executive Summary & Confidence Score */}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-8">
                        {/* Executive Summary Card */}
                        <div className="bg-white rounded-[40px] p-10 border-4 border-[#003366] shadow-sm relative overflow-hidden">
                            <p className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">EXECUTIVE SUMMARY</p>
                            <h2 className="text-2xl font-black text-[#003366] leading-[1.15] tracking-tight mb-8">
                                {document_metadata?.summary || "Direct forensic audit complete. Several critical risk factors identified for review."}
                            </h2>

                            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest mb-1">Audit Score</p>
                                    <p className={`text-4xl font-black ${auditScore > 70 ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {auditScore}<span className="text-sm text-slate-200 ml-1">/100</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 font-black text-[9px] uppercase tracking-widest mb-1">Verdict</p>
                                    <p className={`text-sm font-black uppercase tracking-widest ${auditScore > 70 ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {document_metadata?.verdict}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                <div
                                    className={`h-full transition-all duration-1000 ${auditScore > 70 ? 'bg-emerald-500' : auditScore > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                                    style={{ width: `${auditScore}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Extracted Facts Card */}
                        <div className="bg-white rounded-[40px] p-10 border-4 border-[#003366] shadow-sm">
                            <p className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em] mb-8">KEY DEAL TERMS</p>
                            <div className="space-y-10">
                                {Object.entries(facts || {}).map(([label, value], i) => (
                                    <div key={i} className="group">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#003366] transition-colors">{label}</p>
                                        </div>
                                        <p className="text-xl font-black text-[#003366] leading-none tracking-tight uppercase pl-3.5">{value}</p>
                                        {i < Object.keys(facts).length - 1 && <div className="h-px bg-slate-100 mt-8"></div>}
                                    </div>
                                ))}
                                {(!facts || Object.keys(facts).length === 0) && (
                                    <p className="text-slate-300 text-xs font-bold uppercase tracking-widest">No primary terms detected</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT FEED: Risk Traps (The "Image Style" Cards) */}
                    <div className="lg:col-span-7 space-y-8 pb-12">
                        <div className="flex items-baseline justify-between px-2 mb-4">
                            <h2 className="text-[11px] font-black text-[#003366] uppercase tracking-[0.4em]">Audit Findings ({red_flags?.length || 0})</h2>
                        </div>

                        {red_flags && red_flags.length > 0 ? (
                            red_flags.map((flag, idx) => (
                                <div key={idx} className="bg-white p-12 rounded-[40px] border-4 border-[#003366] shadow-xl relative overflow-hidden group">
                                    {/* Brand styles from image */}
                                    <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4">TRAP DETECTED</p>
                                    <h3 className="text-2xl font-black text-[#003366] mb-4 leading-tight uppercase tracking-tight">
                                        {flag.category}
                                    </h3>

                                    <div className="mb-10 pb-8 border-b border-slate-50">
                                        <p className="text-sm font-bold italic text-slate-400 leading-relaxed pl-4 border-l-4 border-slate-100">
                                            "{flag.text_found || "Reference quote extracted from analysis data."}"
                                        </p>
                                    </div>

                                    <div className="flex gap-4 items-start">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-black text-xs ${flag.severity === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {flag.severity === 'High' ? '!' : '?'}
                                        </div>
                                        <p className="text-sm font-bold text-slate-600 leading-relaxed uppercase tracking-tight pt-1">
                                            {flag.reasoning}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-24 rounded-[40px] border-4 border-[#003366] text-center border-dashed">
                                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl text-emerald-500">✅</span>
                                </div>
                                <h3 className="text-xl font-black text-[#003366] uppercase tracking-tighter">CLEAN SCAN</h3>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">No Predatory Markers Identified</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Professional Footer */}
                <div className="mt-32 pt-16 border-t border-slate-200 flex flex-col items-center gap-10 opacity-50">
                    <p className="text-[10px] font-black text-[#003366] uppercase tracking-[0.6em]">OPTICLOAN INTELLIGENCE • FORENSIC v2.8</p>
                    <div className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#003366]"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#003366]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
