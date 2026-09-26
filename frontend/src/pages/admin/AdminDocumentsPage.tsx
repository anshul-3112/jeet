import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminDocuments, updateDocumentStatus, type AdminDocumentItem } from '../../api/admin';
import { servicesData } from '../../data/services';
import {
  Clock,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Phone,
  MessageCircle,
  Search,
  Filter,
  RefreshCw,
  Eye,
  FileText,
} from 'lucide-react';

export const AdminDocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<AdminDocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expiringCount, setExpiringCount] = useState(0);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await getAdminDocuments(
        statusFilter === 'all' ? undefined : statusFilter,
        serviceFilter === 'all' ? undefined : serviceFilter
      );
      setDocuments(res.documents || []);
      setExpiringCount(res.expiringCount || 0);
    } catch (err) {
      console.error('Failed to fetch admin docs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
    const interval = setInterval(fetchDocs, 30000); // 30s auto-refresh
    return () => clearInterval(interval);
  }, [statusFilter, serviceFilter]);

  const handleQuickMarkPrinted = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await updateDocumentStatus(id, 'printed');
      setDocuments((prev) =>
        prev.map((doc) => (doc.id === id ? { ...doc, status: 'printed', printedAt: new Date().toISOString() } : doc))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const getServiceName = (slug: string) => {
    const s = servicesData.find((item) => item.slug === slug);
    return s ? s.name : slug;
  };

  const formatCountdown = (minutes: number) => {
    if (minutes <= 0) return 'Expired';
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0) return `${hrs}h ${mins}m left`;
    return `${mins}m left`;
  };

  const filteredDocs = documents.filter((doc) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      doc.trackingId.toLowerCase().includes(q) ||
      doc.citizenName.toLowerCase().includes(q) ||
      doc.citizenPhone.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Citizen Uploads</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Auto-purged strictly 24 hours after upload. Print before expiry.
          </p>
        </div>

        <button
          onClick={fetchDocs}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Critical Alert Banner for Expiring Documents (< 1 hour) */}
      {expiringCount > 0 && (
        <div className="p-4 bg-amber-500/15 border border-amber-500/40 rounded-2xl flex items-center justify-between gap-3 text-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0 animate-bounce">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-100">
                Action Required: {expiringCount} {expiringCount === 1 ? 'document has' : 'documents have'} under 1 hour remaining!
              </p>
              <p className="text-xs text-amber-300/80">
                Please print now. The server will permanently delete these files once 24 hours elapse.
              </p>
            </div>
          </div>
          <button
            onClick={() => setStatusFilter('received')}
            className="hidden sm:block px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex-shrink-0"
          >
            View Pending
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by name, phone or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-200 focus:outline-none"
          >
            <option value="all" className="bg-slate-900">All Statuses</option>
            <option value="received" className="bg-slate-900">Pending / Received</option>
            <option value="printed" className="bg-slate-900">Printed &amp; Done</option>
            <option value="expired" className="bg-slate-900">Expired / Purged</option>
          </select>
        </div>

        {/* Service Filter */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-200 focus:outline-none"
          >
            <option value="all" className="bg-slate-900">All Services</option>
            {servicesData.map((s) => (
              <option key={s.slug} value={s.slug} className="bg-slate-900">
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Table / Card List */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">No uploaded documents found matching this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Tracking Code</th>
                  <th className="py-3.5 px-4">Citizen</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Time Left</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredDocs.map((doc) => {
                  const isPrinted = doc.status === 'printed';
                  const isExpired = doc.status === 'expired';

                  return (
                    <tr
                      key={doc.id}
                      onClick={() => navigate(`/admin/documents/${doc.id}`)}
                      className={`hover:bg-slate-900/60 cursor-pointer transition-colors ${
                        doc.isExpiringSoon ? 'bg-amber-950/20' : ''
                      }`}
                    >
                      {/* Tracking ID */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-brand-400 text-sm">{doc.trackingId}</span>
                        <div className="text-[11px] text-slate-500">
                          {doc.fileCount} {doc.fileCount === 1 ? 'file' : 'files'}
                        </div>
                      </td>

                      {/* Citizen */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{doc.citizenName}</div>
                        <div className="flex items-center gap-2 mt-0.5" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`tel:${doc.citizenPhone}`}
                            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                          >
                            <Phone className="w-3 h-3 text-slate-500" />
                            <span>{doc.citizenPhone}</span>
                          </a>
                          <a
                            href={`https://wa.me/91${doc.citizenPhone}?text=Hello%20${encodeURIComponent(
                              doc.citizenName
                            )},%20your%20document%20is%20being%20processed%20at%20Jeet%20Kendra.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300"
                            title="WhatsApp citizen"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4 max-w-[200px] truncate text-slate-300 font-medium">
                        {getServiceName(doc.serviceSlug)}
                      </td>

                      {/* Countdown */}
                      <td className="py-3.5 px-4">
                        {isExpired ? (
                          <span className="text-slate-500 font-medium">Purged</span>
                        ) : (
                          <span
                            className={`font-semibold flex items-center gap-1.5 ${
                              doc.isExpiringSoon ? 'text-amber-400 animate-pulse' : 'text-slate-300'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>{formatCountdown(doc.remainingMinutes)}</span>
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {isPrinted ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Printed</span>
                          </span>
                        ) : isExpired ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400">
                            <span>Expired</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            <Printer className="w-3 h-3" />
                            <span>Received</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-2">
                          {!isPrinted && !isExpired && (
                            <button
                              onClick={(e) => handleQuickMarkPrinted(e, doc.id)}
                              className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-colors"
                              title="Mark as printed"
                            >
                              Done
                            </button>
                          )}
                          <button
                            onClick={() => navigate(`/admin/documents/${doc.id}`)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                            title="Open Details & Print"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
