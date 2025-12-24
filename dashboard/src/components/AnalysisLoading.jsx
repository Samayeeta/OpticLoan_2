import React, { useState, useEffect } from 'react';

const AnalysisLoading = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const messages = [
        "Initializing Forensic Parser...",
        "Scanning for Escalation Clauses...",
        "Detecting Yield Maintenance Traps...",
        "Auditing Cross-Default Provisions...",
        "Verifying Principal & Interest Math...",
        "Cross-referencing legal terminology...",
        "Finalizing Risk Score..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-white/90 backdrop-blur-md">
            <div className="max-w-md w-full px-8 text-center">
                {/* Logo / Icon Animation */}
                <div className="relative mb-12">
                    <div className="w-24 h-24 mx-auto bg-[#003366] rounded-3xl flex items-center justify-center text-4xl shadow-2xl animate-bounce">
                        ⚖️
                    </div>
                    {/* Ring background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-[#003366]/10 border-t-[#003366] rounded-full animate-spin"></div>
                </div>

                <h2 className="text-2xl font-black text-[#003366] uppercase tracking-tight mb-4">
                    Audit in Progress
                </h2>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${((messageIndex + 1) / messages.length) * 100}%` }}
                    ></div>
                </div>

                {/* Rotating Message */}
                <div className="h-8 overflow-hidden">
                    <p className="text-slate-500 font-bold italic text-sm animate-pulse">
                        {messages[messageIndex]}
                    </p>
                </div>

                <div className="mt-12 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">Security Alert</p>
                    <p className="text-[11px] text-blue-900/60 font-medium">
                        Your document is being processed in an isolated sandbox. No data is permanently stored during analysis.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AnalysisLoading;
