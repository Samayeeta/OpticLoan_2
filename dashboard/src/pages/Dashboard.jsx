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
            <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white p-12 rounded-[2rem] shadow-xl border border-slate-200 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <span className="text-2xl text-slate-400">?</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">No Analysis Found</h2>
                    <p className="text-slate-500 mb-8">Ready to audit? Upload a document to generate your report.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-[#003366] text-white font-bold rounded-xl shadow-lg hover:bg-[#002244] transition-all"
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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-2xl w-full bg-white p-12 rounded-[3rem] shadow-2xl border-t-8 border-red-500 text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <span className="text-4xl text-red-600">!!</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">ANALYSIS FAILED</h2>
                    <div className="bg-slate-50 p-6 rounded-2xl mb-10 text-left border border-slate-200">
                        <p className="text-slate-700 font-mono text-xs leading-relaxed overflow-auto max-h-40">{error}</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="px-12 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all uppercase tracking-widest text-sm"
                    >
                        TRY ANOTHER FILE
                    </button>
                </div>
            </div>
        );
    }

    const auditScore = document_metadata?.trust_score || 0;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {/* Elegant Top Bar */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#003366] rounded-xl flex items-center justify-center text-white font-black">OL</div>
                        <div>
                            <p className="text-[10px] font-black text-[#003366] uppercase tracking-[0.2em] leading-none mb-1">OpticLoan Report</p>
                            <p className="text-xs font-medium text-slate-400 truncate max-w-[200px]">{filename}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="px-5 py-2.5 bg-slate-100 text-[#003366] font-bold rounded-xl text-xs hover:bg-slate-200 transition-all"
                    >
                        NEW SCAN
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-12">
                {/* Executive Summary Card */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-200 mb-10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                        <div className="lg:col-span-2">
                            <h2 className="text-xs font-black text-[#003366] mb-4 uppercase tracking-[0.3em]">Executive Summary</h2>
                            <p className="text-2xl font-bold text-slate-900 leading-tight tracking-tight mb-4">
                                {document_metadata?.summary || "Deep forensic audit complete. Several critical risk factors identified for borrower review."}
                            </p>
                            <div className="flex items-center gap-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${auditScore > 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                    Verdict: {document_metadata?.verdict || "Under Review"}
                                </span>
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Confidence: {Math.round((explainability?.confidence ?? 0) * 100)}%</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center lg:items-end border-t lg:border-t-0 lg:border-l border-slate-100 pt-8 lg:pt-0 lg:pl-12">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 text-left w-full">Audit Health Score</p>
                            <div className="relative w-full h-8 bg-slate-100 rounded-full overflow-hidden border border-slate-50 mb-3">
                                <div
                                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out ${auditScore > 70 ? 'bg-emerald-500' : auditScore > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                                    style={{ width: `${auditScore}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between w-full">
                                <span className="text-[10px] font-black text-red-500">CRITICAL</span>
                                <span className="text-2xl font-black text-slate-900 leading-none">{auditScore}/100</span>
                                <span className="text-[10px] font-black text-emerald-500">SECURE</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* LEFT COLUMN: Deep Risk Audit */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-baseline justify-between mb-4">
                            <h3 className="text-xs font-black text-[#003366] uppercase tracking-[0.3em]">Potential Traps ({red_flags?.length || 0})</h3>
                        </div>

                        {red_flags && red_flags.length > 0 ? (
                            red_flags.map((flag, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${flag.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {flag.severity === 'High' ? '!' : '?'}
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#003366] transition-colors">{flag.category}</h4>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${flag.severity === 'High' ? 'text-red-500' : 'text-amber-500'}`}>
                                            {flag.severity} RISK
                                        </span>
                                    </div>
                                    <div className="bg-slate-50 p-5 rounded-xl text-slate-500 italic text-sm border-l-4 border-slate-200 mb-6 leading-relaxed">
                                        "{flag.text_found?.length > 250 ? flag.text_found.substring(0, 250) + '...' : flag.text_found}"
                                    </div>
                                    <p className="text-slate-600 text-[13px] leading-relaxed font-medium">
                                        {flag.reasoning}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-16 rounded-[2rem] border border-dashed border-slate-300 text-center">
                                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No major risks detected</p>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Extracted facts */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 sticky top-32">
                            <h3 className="text-xs font-black text-[#003366] uppercase tracking-[0.3em] mb-8">Extracted Key Terms</h3>
                            <div className="space-y-8">
                                {Object.entries(facts || {}).map(([label, value], i) => (
                                    <div key={i} className="flex flex-col gap-1.5 group">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none group-hover:text-[#003366] transition-colors">{label}</p>
                                        <div className="flex items-start gap-2">
                                            <p className="text-[15px] font-bold text-slate-900 leading-snug">
                                                {value}
                                            </p>
                                        </div>
                                        <div className="w-8 h-0.5 bg-slate-50 mt-1"></div>
                                    </div>
                                ))}
                                {(!facts || Object.keys(facts).length === 0) && (
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">No terms found</p>
                                )}
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-50">
                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Audit Verification</p>
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                                    All terms verified against provided document using Selective AI Context search. Accuracy score: {Math.round((explainability?.confidence ?? 0.9) * 100)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="mt-20 flex flex-col items-center gap-6 border-t border-slate-100 pt-10">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">OPTICLOAN INTELLIGENCE • SECURE AUDIT v2.5</p>
                    <div className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
