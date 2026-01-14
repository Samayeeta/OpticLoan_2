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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border-4 border-[#003366] text-center">
                    <h2 className="text-2xl font-black text-[#003366] mb-4 uppercase tracking-tighter">NO DATA FOUND</h2>
                    <p className="text-slate-500 mb-8 font-medium">Upload a document to begin the forensic audit.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-[#003366] text-white font-black rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
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
                <div className="max-w-2xl w-full bg-white p-12 rounded-[40px] shadow-2xl border-4 border-red-600 text-center">
                    <span className="text-7xl mb-6 block">⚠️</span>
                    <h2 className="text-3xl font-black text-red-600 mb-4 uppercase tracking-tighter">ANALYSIS FAILED</h2>
                    <div className="bg-red-50 p-6 rounded-2xl mb-8 border border-red-100">
                        <p className="text-red-800 font-mono text-xs break-all leading-relaxed whitespace-pre-wrap">{error}</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="px-10 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl hover:bg-red-700 transition-all uppercase tracking-widest"
                    >
                        TRY DIFFERENT FILE
                    </button>
                </div>
            </div>
        );
    }

    const auditScore = document_metadata?.trust_score || 0;

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Top Nav/Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="bg-emerald-500 text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">Live Audit</span>
                            <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">ID: {filename?.substring(0, 8)}</span>
                        </div>
                        <h1 className="text-4xl font-black text-[#003366] tracking-tighter uppercase leading-none">FORENSIC REPORT</h1>
                        <p className="text-slate-400 font-bold mt-1 text-sm">{filename}</p>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-[#003366] text-white font-black rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all uppercase text-xs tracking-widest"
                    >
                        NEW ANALYSIS
                    </button>
                </div>

                {/* Main Content: The Card Set */}
                <div className="space-y-8">
                    {/* TRAPS SECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {red_flags && red_flags.length > 0 ? (
                            red_flags.map((flag, idx) => (
                                <div key={idx} className="bg-white p-10 rounded-[40px] shadow-xl border-4 border-[#003366] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-12 -mt-12 group-hover:bg-amber-100 transition-colors"></div>
                                    <div className="relative z-10">
                                        <p className="text-amber-500 font-black text-xs uppercase tracking-[0.2em] mb-4">TRAP DETECTED</p>
                                        <h3 className="text-2xl font-black text-[#003366] mb-3 leading-tight uppercase tracking-tight">
                                            {flag.category}
                                        </h3>
                                        <div className="mb-6">
                                            <p className="text-slate-400 text-sm font-medium italic leading-relaxed border-l-4 border-slate-100 pl-4 py-1">
                                                "{flag.text_found?.length > 150 ? flag.text_found.substring(0, 150) + '...' : flag.text_found}"
                                            </p>
                                        </div>
                                        <div className="pt-6 border-t border-slate-50">
                                            <p className="text-slate-600 text-sm font-bold leading-relaxed lowercase first-letter:uppercase">
                                                {flag.reasoning}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="md:col-span-2 bg-white p-12 rounded-[40px] shadow-xl border-4 border-[#003366] text-center">
                                <span className="text-5xl mb-4 block">✅</span>
                                <h3 className="text-2xl font-black text-[#003366] uppercase">No Critical Traps Found</h3>
                                <p className="text-slate-500 font-medium mt-2">The AI didn't find any common predatory markers in this document.</p>
                            </div>
                        )}
                    </div>

                    {/* FACTS & SCORE SECTION */}
                    <div className="bg-white p-10 rounded-[40px] shadow-2xl border-4 border-[#003366]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Facts List */}
                            <div className="space-y-8">
                                {Object.entries(facts || {}).map(([label, value], i) => (
                                    <div key={i} className="group">
                                        <p className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em] mb-1">EXTRACTED FACT</p>
                                        <h4 className="text-xl font-black text-[#003366] leading-none uppercase tracking-tight">{label}: {value}</h4>
                                        <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-widest">Verified by Selective AI Search</p>
                                        {i < Object.keys(facts).length - 1 && <div className="h-px bg-slate-100 mt-6 w-full"></div>}
                                    </div>
                                ))}
                                {Object.keys(facts || {}).length === 0 && (
                                    <p className="text-slate-400 font-bold uppercase text-xs italic">No specific facts mapped from discovery.</p>
                                )}
                            </div>

                            {/* Score Sidebar */}
                            <div className="lg:border-l-4 border-slate-100 lg:pl-12 pt-12 lg:pt-0">
                                <div className="mb-8">
                                    <h3 className="text-3xl font-black text-[#003366] mb-2 uppercase tracking-tighter leading-none">AUDIT ANALYSIS</h3>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                        {document_metadata?.summary || "Comprehensive forensic audit complete. Detailed risk markers extracted for borrower review."}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end mb-2">
                                        <p className="text-[#003366] font-black uppercase text-xs tracking-widest">AUDIT SCORE: {auditScore}/100</p>
                                    </div>
                                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                                        <div
                                            className={`h-full transition-all duration-1000 ease-out ${auditScore > 70 ? 'bg-emerald-500' : auditScore > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                                            style={{ width: `${auditScore}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">High Risk</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Safe</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional Footer */}
                <div className="mt-12 text-center">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">OPTICLOAN INTELLIGENCE • FORENSIC v2.0</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
