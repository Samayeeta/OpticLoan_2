import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

        try {
            const response = await fetch('https://opticloan.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.status === 200) {
                navigate('/dashboard');
            } else {
                const data = await response.json();
                setError(data.error || 'Upload failed. Please try again.');
            }
        } catch (err) {
            setError('Connection error. Is the backend running?');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="py-24 px-6 max-w-4xl mx-auto text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[#003366]/5 text-[#003366] text-4xl mb-8 border-2 border-[#003366]/10 shadow-inner">
                📄
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#003366] mb-6 tracking-tight uppercase">Upload Loan Agreement</h1>
            <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed max-w-2xl mx-auto">
                Upload your PDF document for deep forensic analysis. Our AI will identify core facts and potential trap clauses.
            </p>

            <div className="max-w-xl mx-auto p-10 bg-white border-2 border-dashed border-slate-200 rounded-[32px] hover:border-[#003366] transition-all group">
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
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-[#003366] text-2xl group-hover:bg-[#003366]/10 transition-colors">
                        ⬆️
                    </div>
                    <div>
                        <p className="text-lg font-bold text-[#003366]">{file ? file.name : 'Select PDF File'}</p>
                        <p className="text-sm text-slate-400 font-medium">Drag and drop or click to browse</p>
                    </div>
                </label>
            </div>

            {error && <p className="mt-6 text-red-500 font-bold uppercase text-xs tracking-widest">{error}</p>}

            <button
                onClick={handleUpload}
                disabled={uploading || !file}
                className={`mt-10 px-10 py-4 bg-[#003366] text-white font-bold rounded-xl shadow-lg transition-all uppercase tracking-widest ${uploading || !file ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#002244] hover:-translate-y-1'
                    }`}
            >
                {uploading ? 'Analyzing...' : 'Start Audit Analysis'}
            </button>

            <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-50">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🔒</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl">🛡️</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Privacy Verified</span>
                </div>
            </div>
        </div>
    );
};

export default Upload;
