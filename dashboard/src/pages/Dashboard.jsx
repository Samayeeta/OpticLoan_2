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
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h2 className="text-2xl font-bold text-[#003366] mb-4 uppercase">No Analysis Data Available</h2>
                <p className="text-slate-500 mb-8">Please upload a document first to see the analysis results.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-[#003366] text-white font-bold rounded-xl shadow-lg hover:bg-[#002244] transition-all"
                >
                    GO TO UPLOAD
                </button>
            </div>
        );
    }

    const { analysis, filename } = analysisData;
    const { facts, red_flags, document_metadata, explainability } = analysis;

    const getVerdictColor = (verdict) => {
        switch (verdict?.toLowerCase()) {
            case 'safe': return 'bg-emerald-500 border-emerald-500 text-emerald-700';
            case 'caution': return 'bg-amber-500 border-amber-500 text-amber-600';
            case 'critical': return 'bg-red-500 border-red-500 text-red-600';
            default: return 'bg-slate-500 border-slate-500 text-slate-500';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase">Audit Complete</span>
                        <span className="text-slate-400 text-xs font-bold">Ref: {filename?.substring(0, 8) || 'DOC-LOCAL-AI'}</span>
                    </div>
                    <h1 className="text-3xl font-black text-[#003366] tracking-tight uppercase">Loan Analysis Report</h1>
                    <p className="text-slate-500 font-medium italic">{filename || 'Document'}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="px-5 py-2.5 bg-[#003366] text-white font-bold rounded shadow-md hover:bg-[#002244] transition-all"
                    >
                        NEW ANALYSIS
                    </button>
                </div>
            </div>

            {/* Summary Score Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white border-b-4 border-emerald-500 p-6 rounded shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">FACTS EXTRACTED</p>
                    <p className="text-3xl font-black text-[#003366]">{Object.keys(facts || {}).length}</p>
                    <p className="text-xs text-slate-500 mt-2">Core financial terms identified by Gemini AI</p>
                </div>
                <div className={`bg-white border-b-4 p-6 rounded shadow-sm ${getVerdictColor(document_metadata?.verdict).split(' ')[2]}`}>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">RED FLAGS</p>
                    <p className="text-3xl font-black">{red_flags?.length || 0}</p>
                    <p className="text-xs text-slate-500 mt-2 font-medium">Potential risks detected in the agreement</p>
                </div>
                <div className="bg-white border-b-4 border-[#003366] p-6 rounded shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">VERDICT & TRUST</p>
                    <div className="flex items-center gap-3">
                        <p className={`text-3xl font-black ${getVerdictColor(document_metadata?.verdict).split(' ')[2]}`}>{document_metadata?.verdict?.toUpperCase() || 'UNKNOWN'}</p>
                        <div className="h-6 w-1 bg-slate-200"></div>
                        <p className="text-xs font-bold text-slate-500">Confidence: {Math.round((explainability?.confidence || 0) * 100)}%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Facts Section */}
                <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                        <h3 className="font-black text-[#003366] text-sm uppercase tracking-wider flex items-center gap-2">
                            <span className="text-xl">📋</span> EXTRACTED TERMS
                        </h3>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <tbody className="divide-y divide-slate-100">
                                {Object.entries(facts || {}).map(([label, value], i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
                                            <p className="text-md font-bold text-slate-800">{value}</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="px-2 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded group-hover:bg-[#003366]/10 group-hover:text-[#003366] transition-colors">
                                                SELECTIVE AI ANALYSIS
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {Object.keys(facts || {}).length === 0 && (
                            <div className="p-10 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
                                No specific facts detected
                            </div>
                        )}
                    </div>
                </section>

                {/* Right Column: Red Flags Section */}
                <div className="space-y-6">
                    {red_flags && red_flags.length > 0 ? (
                        red_flags.map((flag, idx) => (
                            <section key={idx} className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden border-l-8 ${flag.severity === 'High' ? 'border-l-red-500' : 'border-l-amber-500'}`}>
                                <div className={`${flag.severity === 'High' ? 'bg-red-50' : 'bg-amber-50'} px-6 py-4 border-b border-slate-100 flex justify-between items-center`}>
                                    <h3 className={`font-black ${flag.severity === 'High' ? 'text-red-700' : 'text-amber-700'} text-sm uppercase tracking-wider flex items-center gap-2`}>
                                        <span className="text-xl">{flag.severity === 'High' ? '🚫' : '⚠️'}</span> {flag.category}: POTENTIAL RISK
                                    </h3>
                                    <span className={`px-2 py-1 ${flag.severity === 'High' ? 'bg-red-200 text-red-800' : 'bg-amber-200 text-amber-800'} text-[10px] font-black rounded uppercase`}>{flag.severity} Risk</span>
                                </div>
                                <div className="p-6">
                                    <div className="mb-4 bg-slate-900 text-slate-300 p-4 rounded font-mono text-xs leading-relaxed border-l-2 border-[#003366]">
                                        "{flag.text_found}"
                                    </div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">REASONING & IMPLICATION</h4>
                                    <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
                                        {flag.reasoning}
                                    </p>
                                </div>
                            </section>
                        ))
                    ) : (
                        <div className="p-12 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
                            <span className="text-4xl mb-4 block">✅</span>
                            <h3 className="text-lg font-black text-emerald-800 uppercase tracking-tight">No Critical Risks Detected</h3>
                            <p className="text-emerald-600 text-sm font-medium mt-2">Our local AI scan didn't find any common predatory clauses in this document sample.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Recommendation Banner */}
            {red_flags && red_flags.length > 0 && (
                <div className="mt-12 p-8 rounded-2xl bg-[#003366] text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <span className="text-[12rem] font-black leading-none">⚖️</span>
                    </div>
                    <div className="relative z-10 max-w-2xl px-4 md:px-0">
                        <h2 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight">Recommendation for Negotiation</h2>
                        <p className="text-blue-100 font-medium leading-relaxed mb-6 text-sm md:text-base">
                            Based on the {red_flags.length} risks identified by our selective Gemini analysis, we recommend reviewing {red_flags.map(f => f.category).join(', ')} clauses. Ensure that these terms align with standard market practices before signing.
                        </p>
                        <button className="w-full md:w-auto px-6 py-3 bg-amber-500 text-[#003366] font-black rounded shadow-lg hover:bg-amber-400 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest">
                            GENERATE COUNTER-OFFER DOC
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
