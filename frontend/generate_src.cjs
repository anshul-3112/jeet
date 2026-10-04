const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Create directories
const dirs = [
  '',
  'api',
  'components',
  'components/layout',
  'components/admin',
  'context',
  'pages',
  'pages/admin',
  'data'
];

dirs.forEach(d => {
  fs.mkdirSync(path.join(srcDir, d), { recursive: true });
});

// Write main.tsx
fs.writeFileSync(path.join(srcDir, 'main.tsx'), `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);

// Write index.css
fs.writeFileSync(path.join(srcDir, 'index.css'), `
@import "tailwindcss";

@layer base {
  body {
    background-color: #f8fafc;
    color: #0f172a;
    font-family: system-ui, -apple-system, sans-serif;
  }
}
`);

// Write App.tsx
fs.writeFileSync(path.join(srcDir, 'App.tsx'), `
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './context/LanguageContext';

// Pages
import { SimpleHome } from './pages/SimpleHome';
import { SimpleUpload } from './pages/SimpleUpload';
import { SimpleTrack } from './pages/SimpleTrack';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SimpleHome />} />
            <Route path="/upload" element={<SimpleUpload />} />
            <Route path="/track" element={<SimpleTrack />} />
            
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
`);

// Write LanguageContext
fs.writeFileSync(path.join(srcDir, 'context', 'LanguageContext.tsx'), `
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('mr');
  
  // Minimal translations for the super simple UI
  const t = {
    homeTitle: language === 'mr' ? 'जीत डिजिटल सेवा केंद्र' : 'Jeet Digital Seva Kendra',
    uploadBtn: language === 'mr' ? 'कागदपत्रे अपलोड करा' : 'Upload Documents',
    trackBtn: language === 'mr' ? 'स्थिती तपासा' : 'Track Status',
    contactBtn: language === 'mr' ? 'संपर्क साधा' : 'Contact Us',
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
`);

// Write SimpleHome.tsx
fs.writeFileSync(path.join(srcDir, 'pages', 'SimpleHome.tsx'), `
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { UploadCloud, Search, Phone, Globe } from 'lucide-react';

export const SimpleHome: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <button 
        onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
        className="absolute top-4 right-4 px-4 py-2 bg-white rounded-full shadow font-bold text-slate-700 flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        {language === 'en' ? 'मराठी' : 'English'}
      </button>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-6 text-center border border-slate-100">
        <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl mx-auto flex items-center justify-center text-3xl font-black shadow-lg shadow-blue-600/30">
          JD
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 leading-tight">
          {t.homeTitle}
        </h1>
        
        <p className="text-slate-500 font-medium pb-4">
          {language === 'mr' 
            ? 'सर्व शासकीय कामांसाठी व दाखल्यांसाठी संपर्क साधा.' 
            : 'Your one-stop center for all government documents.'}
        </p>

        <div className="flex flex-col gap-4">
          <Link to="/upload" className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-md transition-transform active:scale-95">
            <UploadCloud className="w-6 h-6" />
            {t.uploadBtn}
          </Link>
          
          <Link to="/track" className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 py-4 rounded-2xl font-bold text-lg transition-transform active:scale-95">
            <Search className="w-6 h-6 text-slate-400" />
            {t.trackBtn}
          </Link>

          <a href="tel:8055203555" className="w-full flex items-center justify-center gap-3 bg-green-50 hover:bg-green-100 text-green-700 py-4 rounded-2xl font-bold text-lg transition-transform active:scale-95">
            <Phone className="w-6 h-6 text-green-600" />
            {t.contactBtn} (8055203555)
          </a>
        </div>
      </div>
    </div>
  );
};
`);

// Write SimpleUpload.tsx
fs.writeFileSync(path.join(srcDir, 'pages', 'SimpleUpload.tsx'), `
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
`);

// Write SimpleTrack.tsx
fs.writeFileSync(path.join(srcDir, 'pages', 'SimpleTrack.tsx'), `
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SimpleTrack: React.FC = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 mt-10 text-center border border-slate-100">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 font-semibold mb-6 self-start mr-auto">
          <ArrowLeft className="w-4 h-4" /> {language === 'mr' ? 'मागे' : 'Back'}
        </Link>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Tracking Status</h1>
        
        {id ? (
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <p className="text-blue-600 font-bold mb-2">Tracking ID</p>
            <p className="text-3xl font-black text-slate-900 tracking-widest">{id}</p>
            <p className="mt-4 text-slate-700 font-medium">Status: <b>Received</b></p>
            <p className="mt-2 text-sm text-slate-500">We will notify you when it's ready.</p>
          </div>
        ) : (
          <p className="text-slate-500">No tracking ID provided.</p>
        )}
      </div>
    </div>
  );
};
`);

// Write Mock API client
fs.writeFileSync(path.join(srcDir, 'api', 'documents.ts'), `
export interface UploadResponse { trackingId: string; }
export const uploadDocuments = async (formData: FormData): Promise<UploadResponse> => {
  return new Promise(resolve => setTimeout(() => resolve({ trackingId: 'JD-' + Math.floor(Math.random() * 90000 + 10000) }), 1000));
};
`);

// Admin Pages Stubs
fs.writeFileSync(path.join(srcDir, 'pages', 'admin', 'AdminLogin.tsx'), `
import React from 'react';
export const AdminLogin = () => <div className="p-10 font-bold text-2xl">Admin Login (Placeholder)</div>;
`);
fs.writeFileSync(path.join(srcDir, 'pages', 'admin', 'AdminDashboard.tsx'), `
import React from 'react';
export const AdminDashboard = () => <div className="p-10 font-bold text-2xl">Admin Dashboard (Placeholder)</div>;
`);

console.log('Successfully generated totally new simplified frontend structure in src/');
