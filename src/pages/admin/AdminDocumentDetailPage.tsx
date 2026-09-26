import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getAdminDocumentDetail,
  updateDocumentStatus,
  deleteAdminDocument,
  type AdminDocumentDetail,
} from '../../api/admin';
import { servicesData } from '../../data/services';
import {
  Printer,
  CheckCircle2,
  Trash2,
  Phone,
  MessageCircle,
  ArrowLeft,
  Clock,
  FileText,
  ExternalLink,
  Shield,
  Loader2,
  Download,
} from 'lucide-react';

export const AdminDocumentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [document, setDocument] = useState<AdminDocumentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  const fetchDetail = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await getAdminDocumentDetail(id);
      setDocument(res);
    } catch (err) {
      console.error('Failed to load document details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleToggleStatus = async () => {
    if (!document) return;
    setUpdating(true);
    const newStatus = document.status === 'printed' ? 'received' : 'printed';
    try {
      await updateDocumentStatus(document.id, newStatus);
      setDocument({
        ...document,
        status: newStatus,
        printedAt: newStatus === 'printed' ? new Date().toISOString() : null,
      });
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!document) return;
    if (!window.confirm('Are you sure you want to permanently delete this document and its uploaded files?')) {
      return;
    }
    setUpdating(true);
    try {
      await deleteAdminDocument(document.id);
      navigate('/admin/documents');
    } catch (err) {
      console.error('Failed to delete document:', err);
      alert('Could not delete document.');
      setUpdating(false);
    }
  };

  const handlePrintCurrentFile = () => {
    if (!document || !document.files[activeFileIndex]) return;
    const file = document.files[activeFileIndex];

    const printWindow = window.open(file.url, '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-3" />
        <p className="text-xs">Loading document &amp; generating secure preview tokens...</p>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Document not found or has been purged.</p>
        <Link to="/admin/documents" className="mt-3 inline-block text-xs text-brand-400 hover:underline">
          Return to document list
        </Link>
      </div>
    );
  }

  const selectedService = servicesData.find((s) => s.slug === document.serviceSlug);
  const serviceName = selectedService ? selectedService.name : document.serviceSlug;
  const currentFile = document.files[activeFileIndex];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Back button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/documents')}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-mono">{document.trackingId}</h1>
              {document.status === 'printed' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Printed</span>
                </span>
              ) : document.status === 'expired' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400">
                  Expired
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Printer className="w-3 h-3" />
                  <span>Received</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{serviceName}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleToggleStatus}
            disabled={updating || document.status === 'expired'}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 ${
              document.status === 'printed'
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{document.status === 'printed' ? 'Mark as Unprinted' : 'Mark as Printed'}</span>
          </button>

          <button
            onClick={handlePrintCurrentFile}
            disabled={!currentFile || document.status === 'expired'}
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-md shadow-brand-600/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print Current File</span>
          </button>

          <button
            onClick={handleDelete}
            disabled={updating}
            className="p-2.5 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-xl transition-colors border border-red-900/50"
            title="Delete Immediately"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Citizen Info Card + File Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Citizen Details & Time */}
        <div className="space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Citizen Details</h2>

            <div>
              <p className="text-sm font-bold text-white">{document.citizenName}</p>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href={`tel:${document.citizenPhone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Call {document.citizenPhone}</span>
                </a>
                <a
                  href={`https://wa.me/91${document.citizenPhone}?text=Hello%20${encodeURIComponent(
                    document.citizenName
                  )},%20your%20document%20for%20${encodeURIComponent(
                    serviceName
                  )}%20is%20ready%20at%20Jeet%20Kendra.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-300"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Uploaded</span>
                <span className="text-slate-200">{new Date(document.uploadedAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Auto-Purge Expiry</span>
                <span className="text-slate-200">{new Date(document.expiresAt).toLocaleString()}</span>
              </div>
              {document.printedAt && (
                <div className="flex justify-between text-slate-400">
                  <span>Printed At</span>
                  <span className="text-emerald-400 font-semibold">{new Date(document.printedAt).toLocaleTimeString()}</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                {document.status === 'expired'
                  ? 'Expired and removed from storage.'
                  : `${Math.max(0, Math.floor(document.remainingMinutes / 60))}h ${document.remainingMinutes % 60}m remaining before purge.`}
              </span>
            </div>
          </div>

          {/* Files Selector */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Attached Documents ({document.files.length})
            </h2>

            <div className="space-y-2">
              {document.files.map((file, idx) => (
                <button
                  key={file.key}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-colors ${
                    activeFileIndex === idx
                      ? 'bg-brand-600/20 border-brand-500/40 text-brand-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{file.fileName}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    {file.isPdf ? 'PDF' : 'IMG'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-300">
                Secure Preview (Signed URL expires in 5 minutes)
              </span>
            </div>

            {currentFile && (
              <div className="flex items-center gap-2">
                <a
                  href={currentFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Fullscreen</span>
                </a>
                <a
                  href={currentFile.url}
                  download={currentFile.fileName}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save</span>
                </a>
              </div>
            )}
          </div>

          {/* Preview Container */}
          <div className="flex-1 min-h-[500px] bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-slate-800">
            {!currentFile ? (
              <p className="text-xs text-slate-500">No file selected for preview.</p>
            ) : currentFile.isPdf ? (
              <iframe
                src={`${currentFile.url}#toolbar=1`}
                title="Document PDF Preview"
                className="w-full h-full min-h-[520px] rounded-lg border-0"
              />
            ) : (
              <div className="flex flex-col items-center max-h-[600px] overflow-auto">
                <img
                  src={currentFile.url}
                  alt={currentFile.fileName}
                  className="max-h-[550px] object-contain rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
