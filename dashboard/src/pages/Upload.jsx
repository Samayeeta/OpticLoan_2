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
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 animate-fade-in">
            {uploading && <AnalysisLoading />}

            <div className="max-w-3xl mx-auto text-center">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-8 mx-auto shadow-sm">
                    📄
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Analyze Your Document
                </h1>
                <p className="text-lg text-slate-600 font-medium mb-12 max-w-2xl mx-auto">
                    Securely upload your loan agreement for deep forensic analysis. We'll identify core facts and any potentially predatory clauses.
                </p>

                <div className="max-w-xl mx-auto bg-white p-12 rounded-3xl border border-slate-200 border-dashed hover:border-indigo-400 group transition-all">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-4"
                    >
                        <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-slate-900">{file ? file.name : 'Choose PDF Document'}</p>
                            <p className="text-sm text-slate-500 mt-1">Maximum file size 50MB</p>
                        </div>
                    </label>
                </div>

                {error && <p className="mt-8 text-red-600 font-semibold">{error}</p>}

                <button
                    onClick={handleUpload}
                    disabled={uploading || !file}
                    className={`mt-10 px-10 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg transition-all ${uploading || !file ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700 hover:-translate-y-1'}`}
                >
                    {uploading ? 'Processing Agreement...' : 'Start Audit Analysis'}
                </button>

                <div className="mt-16 pt-12 border-t border-slate-200 flex flex-wrap justify-center gap-10 grayscale opacity-60">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🔒</span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">End-to-End Encrypted</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🛡️</span>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Privacy Verified</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
