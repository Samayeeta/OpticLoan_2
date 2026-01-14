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
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Report Unavailable</h2>
                    <p className="text-slate-500 mb-8 text-sm font-medium">Upload a document to begin your forensic audit.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-[#003366] text-white font-semibold rounded-xl hover:bg-[#002244] transition-all"
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
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
                <div className="max-w-2xl w-full bg-white p-12 rounded-[2.5rem] shadow-xl border-t-8 border-red-500 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">ANALYSIS INTERRUPTED</h2>
                    <div className="bg-slate-50 p-6 rounded-2xl mb-10 text-left border border-slate-200">
                        <p className="text-slate-700 font-mono text-xs leading-relaxed overflow-auto max-h-40">{error}</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all text-sm"
                    >
                        TRY ANOTHER FILE
                    </button>
                </div>
            </div>
        );
    }

    const auditScore = document_metadata?.trust_score || 0;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans text-slate-900">
            {/* Elegant Minimal Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#003366] rounded-lg flex items-center justify-center text-white font-bold text-[10px]">OL</div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Document Analysis Result</span>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="text-[10px] font-bold text-slate-500 hover:text-[#003366] transition-colors uppercase tracking-widest"
                    >
                        New Audit
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT SIDEBAR (Col 5): Summary and Metadata */}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
                        {/* Executive Summary Card */}
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 border-b border-slate-50 pb-2 relative z-10">Forensic Executive Summary</h3>

                            <p className="text-xl font-semibold text-slate-900 leading-snug mb-8 relative z-10">
                                {document_metadata?.summary || "Audit complete. Several risk factors identified for borrower consideration."}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-slate-50 p-4 rounded-2xl">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Verdict</p>
                                    <p className={`text-xs font-bold uppercase tracking-widest ${auditScore > 70 ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {document_metadata?.verdict}
                                    </p>
                                </div>
                                <div className="bg-[#003366] p-4 rounded-2xl text-center">
                                    <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1">Health Score</p>
                                    <p className="text-xl font-bold text-white leading-none">{auditScore}<span className="text-[10px] text-white/30">/100</span></p>
                                </div>
                            </div>

                            <div className="mb-0">
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${auditScore > 70 ? 'bg-emerald-500' : auditScore > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                                        style={{ width: `${auditScore}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">At Risk</span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Optimized</span>
                                </div>
                            </div>
                        </div>

                        {/* Extracted Key Terms Card */}
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 border-b border-slate-50 pb-2">Extracted Key Terms</h3>
                            <div className="space-y-8">
                                {Object.entries(facts || {}).map(([label, value], i) => (
                                    <div key={i} className="group flex flex-col gap-1">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-[#003366] transition-colors">{label}</p>
                                        <p className="text-[14px] font-semibold text-slate-800 leading-relaxed">{value}</p>
                                        {i < Object.keys(facts).length - 1 && <div className="w-8 h-px bg-slate-50 mt-4"></div>}
                                    </div>
                                ))}
                                {(!facts || Object.keys(facts).length === 0) && (
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">No primary terms detected</p>
                                )}
                            </div>
                        </div>

                        <div className="px-4">
                            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1">Document Hash</p>
                            <p className="text-[9px] font-medium text-slate-400 break-all leading-relaxed uppercase tracking-widest">{filename}</p>
                        </div>
                    </div>

                    {/* RIGHT MAIN (Col 7): Potential Traps Feed */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center justify-between px-2 mb-2">
                            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                Potential Trap Analysis ({red_flags?.length || 0})
                            </h2>
                        </div>

                        {red_flags && red_flags.length > 0 ? (
                            red_flags.map((flag, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${flag.severity === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                                                {flag.severity === 'High' ? '!' : '?'}
                                            </div>
                                            <h4 className="text-[17px] font-bold text-slate-900 tracking-tight group-hover:text-[#003366] transition-colors">{flag.category}</h4>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${flag.severity === 'High' ? 'text-red-500' : 'text-amber-500'}`}>
                                            {flag.severity} RISK
                                        </span>
                                    </div>

                                    <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 mb-6 font-medium italic text-slate-500 text-[13px] leading-relaxed border-l-4 border-slate-200">
                                        "{flag.text_found || "Referenced term extracted from analysis data."}"
                                    </div>

                                    <div className="flex gap-4 items-start pt-2">
                                        <div className="w-5 h-5 rounded-full bg-[#003366]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-1 h-1 rounded-full bg-[#003366]"></div>
                                        </div>
                                        <p className="text-[14px] text-slate-600 font-medium leading-relaxed">
                                            {flag.reasoning}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-24 rounded-[3.5rem] border border-dashed border-slate-200 text-center">
                                <span className="text-3xl mb-4 block">✅</span>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No high-risk clauses identified in current scan.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Professional Footer */}
                <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col items-center gap-4">
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.6em]">OpticLoan Intelligence • Forensic v2.5</p>
                    <div className="flex gap-3">
                        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                        <div className="w-1 h-1 rounded-full bg-[#003366]"></div>
                        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
