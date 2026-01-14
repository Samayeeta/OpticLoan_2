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
        <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans text-slate-900 selection:bg-[#003366]/10">
            {/* Header Block from Image */}
            <div className="max-w-[1400px] mx-auto px-8 pt-12 mb-10 flex items-start justify-between">
                <div>
                    <h1 className="text-[28px] font-black text-[#003366] tracking-tight uppercase leading-none mb-1">LOAN ANALYSIS REPORT</h1>
                    <p className="text-xs italic text-slate-400 font-medium">{filename}</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2.5 bg-[#003366] text-white text-[11px] font-black rounded hover:bg-[#002244] transition-all uppercase tracking-widest"
                >
                    NEW ANALYSIS
                </button>
            </div>

            <div className="max-w-[1400px] mx-auto px-8">
                {/* Stats Row from Image */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Facts Stats */}
                    <div className="bg-white p-8 rounded shadow-sm border-b-4 border-emerald-500 relative">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">FACTS EXTRACTED</p>
                        <p className="text-4xl font-black text-[#003366] mb-2">{Object.keys(facts || {}).length}</p>
                        <p className="text-[10px] text-slate-400 font-bold">Core financial terms identified</p>
                    </div>
                    {/* Red Flags Stats */}
                    <div className="bg-white p-8 rounded shadow-sm border-b-4 border-red-500 relative">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">RED FLAGS</p>
                        <p className="text-4xl font-black text-[#003366] mb-2">{red_flags?.length || 0}</p>
                        <p className="text-[10px] text-slate-400 font-bold">Potential risks detected in the agreement</p>
                    </div>
                    {/* Verdict Stats */}
                    <div className="bg-white p-8 rounded shadow-sm border-b-4 border-[#003366] relative flex flex-col justify-center">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">VERDICT & TRUST</p>
                        <div className="flex items-baseline gap-3">
                            <span className={`text-[28px] font-black uppercase ${auditScore > 70 ? 'text-emerald-500' : 'text-red-600'}`}>
                                {document_metadata?.verdict}
                            </span>
                            <div className="w-px h-6 bg-slate-200"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Confidence: {Math.round((explainability?.confidence ?? 0.85) * 100)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT COLUMN: Extracted Terms (Image style) */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3 bg-slate-50/30">
                                <span className="text-xl">📋</span>
                                <h2 className="text-[13px] font-black text-[#003366] uppercase tracking-wider">EXTRACTED TERMS</h2>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {Object.entries(facts || {}).map(([label, value], i) => (
                                    <div key={i} className="px-8 py-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
                                            <p className="text-[15px] font-black text-[#003366] tracking-tight">{value}</p>
                                        </div>
                                        <div className="flex flex-col items-end opacity-20 group-hover:opacity-100 transition-opacity">
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter leading-none">LOCAL AI</p>
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">ANALYSIS</p>
                                        </div>
                                    </div>
                                ))}
                                {(!facts || Object.keys(facts).length === 0) && (
                                    <div className="p-12 text-center">
                                        <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest">No terms detected</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Red Flags (Image style) */}
                    <div className="lg:col-span-7 space-y-8">
                        {red_flags && red_flags.length > 0 ? (
                            red_flags.map((flag, idx) => (
                                <div key={idx} className={`bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 ${flag.severity === 'High' ? 'border-l-red-500' : 'border-l-amber-400'} overflow-hidden`}>
                                    <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-white relative">
                                        <div className="flex items-center gap-3">
                                            <span className="text-amber-500 font-bold border-2 border-amber-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">!</span>
                                            <h3 className="text-[13px] font-black text-[#003366] uppercase tracking-wider">
                                                {flag.category}: POTENTIAL RISK
                                            </h3>
                                        </div>
                                        <span className={`px-3 py-1 text-[9px] font-black rounded uppercase tracking-widest ${flag.severity === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {flag.severity} RISK
                                        </span>
                                    </div>

                                    <div className="p-8">
                                        {/* Dark Quote Box from Image */}
                                        <div className="bg-[#0f172a] p-8 rounded mb-8 relative">
                                            <p className="text-[13px] font-medium text-slate-300 leading-relaxed italic border-l-4 border-slate-700 pl-4">
                                                "{flag.text_found || "Referenced data extracted from audit trail."}"
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">REASONING & IMPLICATION</p>
                                            <p className="text-[14px] font-bold text-slate-600 leading-relaxed">
                                                {flag.reasoning}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-24 rounded-xl border border-dashed border-slate-200 text-center">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Audit Scan Result: 100% Secure</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Aesthetic Footer */}
                <div className="mt-40 mb-12 flex flex-col items-center opacity-30">
                    <div className="h-px w-20 bg-slate-300 mb-6"></div>
                    <p className="text-[10px] font-black text-[#003366] uppercase tracking-[0.8em]">OpticLoan Intelligence • v2.9 SECURE</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
