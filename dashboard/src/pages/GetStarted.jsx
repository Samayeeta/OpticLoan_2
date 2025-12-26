import React from 'react';
import { Link } from 'react-router-dom';

const GetStarted = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 animate-fade-in">
            <div className="max-w-4xl mx-auto text-center">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-8 mx-auto shadow-sm">
                    ⚖️
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Secure Your Financial Future
                </h1>
                <p className="text-lg text-slate-600 font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
                    Choose the audit path that fits your current situation. Our AI models are trained on thousands of legal precedents.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold mb-6">
                            01
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Individual Audit</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8">
                            Upload personal mortgage, student loan, or credit agreements for instant predatory clause detection.
                        </p>
                        <Link to="/upload" className="block w-full text-center py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">
                            Analyze Document
                        </Link>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center font-bold mb-6">
                            02
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Professional Console</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8">
                            For legal teams and real estate professionals managing high-volume document batches.
                        </p>
                        <Link to="/upload" className="block w-full text-center py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
                            Request Pro Access
                        </Link>
                    </div>
                </div>

                <div className="mt-16 p-10 bg-slate-900 rounded-3xl text-white relative overflow-hidden shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-3/4 text-center md:text-left">
                            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Integrity Guarantee</p>
                            <h4 className="text-2xl font-bold mb-3">Your sensitive data is never shared.</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                We utilize end-to-end encryption and secure sandboxing. Your documents are analyzed and purged following the audit sequence.
                            </p>
                        </div>
                        <div className="md:w-1/4">
                            <span className="text-5xl">🔒</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetStarted;
