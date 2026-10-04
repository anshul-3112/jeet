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
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#0B3830] mb-3" />
        <p className="text-xs font-semibold text-slate-700">Generating secure presigned preview tokens...</p>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="p-8 text-center text-slate-600 bg-white rounded-2xl border border-slate-200">
        <p className="font-bold text-sm text-slate-900">Document not found or has been permanently purged.</p>
        <Link to="/admin/documents" className="mt-3 inline-block text-xs font-bold text-[#0B3830] hover:underline">
          ← Return to citizen document queue
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
            className="p-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            title="Back to queue"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight">
                {document.trackingId}
              </h1>
              {document.status === 'printed' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-[#0B3830] border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  <span>Printed</span>
                </span>
              ) : document.status === 'expired' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  Expired
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  <Printer className="w-3 h-3 text-amber-700" />
                  <span>Received</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-1 font-semibold">{serviceName}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleToggleStatus}
            disabled={updating || document.status === 'expired'}
            className={`px-4 py-2.5 rounded-full text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
              document.status === 'printed'
                ? 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs'
                : 'bg-[#0B3830] hover:bg-[#072722] text-white shadow-xs'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{document.status === 'printed' ? 'Mark as Unprinted' : 'Mark as Printed'}</span>
          </button>

          <button
            onClick={handlePrintCurrentFile}
            disabled={!currentFile || document.status === 'expired'}
            className="px-4 py-2.5 bg-[#0B3830] hover:bg-[#072722] text-white rounded-full text-xs font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Print Current File</span>
          </button>

          <button
            onClick={handleDelete}
            disabled={updating}
            className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-full transition-colors border border-rose-200 cursor-pointer"
            title="Delete Permanently"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Citizen Info Card + File Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Citizen Details & Time */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Citizen Details</h2>

            <div>
              <p className="text-base font-black text-slate-900">{document.citizenName}</p>
              <div className="flex items-center gap-2 mt-3">
                <a
                  href={`tel:${document.citizenPhone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full text-xs font-bold text-[#0B3830] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-[#0B3830]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Uploaded</span>
                <span className="text-slate-900 font-semibold">{new Date(document.uploadedAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Auto-Purge Expiry</span>
                <span className="text-slate-900 font-semibold">{new Date(document.expiresAt).toLocaleString()}</span>
              </div>
              {document.printedAt && (
                <div className="flex justify-between text-slate-600">
                  <span>Printed At</span>
                  <span className="text-emerald-700 font-bold">{new Date(document.printedAt).toLocaleTimeString()}</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-xs text-slate-700">
              <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                {document.status === 'expired'
                  ? 'Expired and safely removed from storage.'
                  : `${Math.max(0, Math.floor(document.remainingMinutes / 60))}h ${document.remainingMinutes % 60}m remaining before purge.`}
              </span>
            </div>
          </div>

          {/* Files Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-2xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Attached Documents ({document.files.length})
            </h2>

            <div className="space-y-2">
              {document.files.map((file, idx) => (
                <button
                  key={file.key}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    activeFileIndex === idx
                      ? 'bg-emerald-50 border-emerald-300 text-[#0B3830] font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-4 h-4 flex-shrink-0 text-[#0B3830]" />
                    <span className="truncate">{file.fileName}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                    {file.isPdf ? 'PDF' : 'IMG'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold text-slate-700">
                Secure Preview (Signed token expires in 5 minutes)
              </span>
            </div>

            {currentFile && (
              <div className="flex items-center gap-2">
                <a
                  href={currentFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-full border border-slate-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Fullscreen</span>
                </a>
                <a
                  href={currentFile.url}
                  download={currentFile.fileName}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-full border border-slate-200 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            )}
          </div>

          {/* Preview Container */}
          <div className="flex-1 min-h-[500px] bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-3 border border-slate-200">
            {!currentFile ? (
              <p className="text-xs text-slate-500 font-medium">No file selected for preview.</p>
            ) : currentFile.isPdf ? (
              <iframe
                src={`${currentFile.url}#toolbar=1`}
                title="Document PDF Preview"
                className="w-full h-full min-h-[520px] rounded-lg border-0 bg-white"
              />
            ) : (
              <div className="flex flex-col items-center max-h-[600px] overflow-auto">
                <img
                  src={currentFile.url}
                  alt={currentFile.fileName}
                  className="max-h-[550px] object-contain rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
