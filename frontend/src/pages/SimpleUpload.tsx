
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Check, Upload } from 'lucide-react';
import { uploadDocuments } from '../api/documents';

export const SimpleUpload: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !file) return alert('Please fill all fields');
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('citizenName', name);
      formData.append('citizenPhone', phone);
      formData.append('serviceSlug', 'general'); // Simplified
      formData.append('files', file);

      const res = await uploadDocuments(formData);
      navigate('/track?id=' + res.trackingId);
    } catch (err) {
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 mt-10 border border-slate-100">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 font-semibold mb-6">
          <ArrowLeft className="w-4 h-4" /> {language === 'mr' ? 'मागे' : 'Back'}
        </Link>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          {language === 'mr' ? 'कागदपत्रे अपलोड करा' : 'Upload Documents'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-2">{language === 'mr' ? 'नाव' : 'Name'}</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-medium" placeholder="Ramesh Patil" required />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-2">{language === 'mr' ? 'मोबाईल नंबर' : 'Phone'}</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-medium" placeholder="9876543210" required />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-2">{language === 'mr' ? 'फाईल निवडा' : 'Select File'}</label>
            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 file:font-bold hover:file:bg-blue-100" required />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold text-lg rounded-2xl py-4 mt-4 flex items-center justify-center gap-2">
            {loading ? 'Uploading...' : <><Upload className="w-5 h-5" /> {language === 'mr' ? 'पाठवा' : 'Submit'}</>}
          </button>
        </form>
      </div>
    </div>
  );
};
