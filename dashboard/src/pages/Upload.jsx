import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalysisLoading from '../components/AnalysisLoading';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
        } else {
            setFile(null);
            setError('Please select a valid PDF file.');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        const apiKey = import.meta.env.VITE_API_KEY;

        try {
            const response = await fetch(`${backendUrl}/upload`, {
                method: 'POST',
                headers: {
                    'X-API-Key': apiKey,
                },
                body: formData,
            });

            if (response.status === 200) {
                // Keep the loading screen visible for a moment for psychological "work" feel
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } else {
                const data = await response.json();
                setError(data.error || 'Upload failed. Please try again.');
                setUploading(false);
            }
        } catch (err) {
            setError('Connection error. Is the backend running?');
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            {uploading && <AnalysisLoading />}

            <div className="pt-40 pb-24 px-6 max-w-4xl mx-auto text-center animate-fade-in">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-sm bg-[#002147] text-white text-4xl mb-10 shadow-2xl">
                    ⚖️
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-[#002147] mb-8 tracking-tighter uppercase">
                    Document <span className="text-[#C5A021]">Ingestion</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium mb-16 leading-relaxed max-w-2xl mx-auto border-l-4 border-[#C5A021]/30 pl-8 text-left">
                    Finalize your audit preparation. Upload the target loan agreement in PDF format for high-fidelity scanning and clause extraction.
                </p>

                <div className="max-w-2xl mx-auto border-4 border-[#002147] bg-white shadow-[20px_20px_0px_0px_rgba(0,33,71,0.05)] transition-all group overflow-hidden">
                    <div className="p-12 border-b-2 border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div className="text-left">
                            <p className="text-[10px] font-black text-[#002147] uppercase tracking-widest mb-1">Security Protocol</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">TLS 1.3 | AES-256</p>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>

                    <div className="p-16">
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center gap-6"
                        >
                            <div className="w-20 h-20 bg-slate-100 flex items-center justify-center text-[#002147] text-3xl group-hover:bg-[#002147] group-hover:text-white transition-all transform group-hover:scale-110">
                                {file ? '✅' : '📄'}
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-black text-[#002147] tracking-tight uppercase">
                                    {file ? file.name : 'Select Official PDF'}
                                </p>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">
                                    Format: Portable Document Format (max 25MB)
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                {error && (
                    <div className="mt-10 p-4 bg-red-50 border-l-4 border-red-500 inline-block">
                        <p className="text-red-700 font-black uppercase text-[10px] tracking-[0.2em] leading-none">{error}</p>
                    </div>
                )}

                <div className="mt-16 flex flex-col items-center gap-8">
                    <button
                        onClick={handleUpload}
                        disabled={uploading || !file}
                        className={`px-16 py-6 bg-[#002147] text-white font-black rounded-sm shadow-[0_10px_40px_rgba(0,33,71,0.3)] transition-all uppercase tracking-[0.3em] text-xs ${uploading || !file ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#003366] hover:-translate-y-1 active:translate-y-0'
                            }`}
                    >
                        {uploading ? 'Processing Stream...' : 'Execute Forensic Audit'}
                    </button>

                    <div className="flex items-center gap-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                        <div className="flex items-center gap-3">
                            <span className="text-lg">🛡️</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">State-Level Privacy</span>
                        </div>
                        <div className="w-px h-4 bg-slate-300"></div>
                        <div className="flex items-center gap-3">
                            <span className="text-lg">📜</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Compliance Verified</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
