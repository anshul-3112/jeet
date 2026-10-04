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
  FileCheck,
  Check,
  Copy
} from 'lucide-react';

export const AdminDocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<AdminDocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expiringCount, setExpiringCount] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  const copyTracking = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
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

  const totalCount = documents.length;
  const pendingCount = documents.filter((d) => d.status === 'received').length;
  const printedCount = documents.filter((d) => d.status === 'printed').length;

  return (
    <div className="space-y-6">
      
      {/* Top Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
            Citizen Document Submissions
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Strict 24-hour privacy retention policy. Print or verify before scheduled automated purge.
          </p>
        </div>

        <button
          onClick={fetchDocs}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-full border border-slate-200 shadow-2xs transition-colors w-fit cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-700 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Critical Alert Banner for Expiring Documents (< 1 hour) */}
      {expiringCount > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-3 text-slate-900 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center flex-shrink-0 animate-bounce">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-950">
                Urgent Attention: {expiringCount} {expiringCount === 1 ? 'document has' : 'documents have'} under 1 hour remaining!
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                Please print or archive now. The system will permanently delete the files at 24 hours.
              </p>
            </div>
          </div>
          <button
            onClick={() => setStatusFilter('received')}
            className="hidden sm:block px-4 py-2 bg-[#0B3830] hover:bg-[#072722] text-white font-bold text-xs rounded-full transition-colors flex-shrink-0 cursor-pointer shadow-xs"
          >
            Filter Pending
          </button>
        </div>
      )}

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600">Total Uploads</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#0B3830]">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {totalCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Active within 24h window</div>
        </div>

        {/* Card 2: Pending Print */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-800">Pending Print</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
              <Printer className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-700 tabular-nums">
            {pendingCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Require physical print</div>
        </div>

        {/* Card 3: Printed & Ready */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-800">Printed &amp; Done</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#0B3830] tabular-nums">
            {printedCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Ready for citizen pickup</div>
        </div>

        {/* Card 4: Expiring Soon */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-700">Expiring Soon</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-600 tabular-nums">
            {expiringCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">&lt; 1 hour remaining</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search citizen name, phone, code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B3830] focus:ring-1 focus:ring-[#0B3830]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="received">Pending / Received</option>
            <option value="printed">Printed &amp; Done</option>
            <option value="expired">Expired / Purged</option>
          </select>
        </div>

        {/* Service Filter */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
          <FileCheck className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-800 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">All Services</option>
            {servicesData.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Table / Card List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
            <p className="text-sm font-semibold">No uploaded documents found matching this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Tracking Code</th>
                  <th className="py-3.5 px-4">Citizen</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Time Left</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDocs.map((doc) => {
                  const isPrinted = doc.status === 'printed';
                  const isExpired = doc.status === 'expired';

                  return (
                    <tr
                      key={doc.id}
                      onClick={() => navigate(`/admin/documents/${doc.id}`)}
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        doc.isExpiringSoon ? 'bg-amber-50/40' : ''
                      }`}
                    >
                      {/* Tracking ID with quick copy */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-[#0B3830] text-xs">
                            {doc.trackingId}
                          </span>
                          <button
                            onClick={(e) => copyTracking(e, doc.trackingId)}
                            className="text-slate-400 hover:text-[#0B3830] p-0.5 cursor-pointer"
                            title="Copy Code"
                          >
                            {copiedId === doc.trackingId ? (
                              <Check className="w-3 h-3 text-emerald-700" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                          {doc.fileCount} {doc.fileCount === 1 ? 'file' : 'files'}
                        </div>
                      </td>

                      {/* Citizen */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{doc.citizenName}</div>
                        <div className="flex items-center gap-2 mt-1" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`tel:${doc.citizenPhone}`}
                            className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-[#0B3830] font-medium"
                          >
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{doc.citizenPhone}</span>
                          </a>
                          <a
                            href={`https://wa.me/91${doc.citizenPhone}?text=Hello%20${encodeURIComponent(
                              doc.citizenName
                            )},%20your%20document%20is%20being%20processed%20at%20Jeet%20Kendra.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-[#0B3830] transition-colors"
                            title="WhatsApp citizen"
                          >
                            <MessageCircle className="w-3 h-3 fill-[#0B3830]" />
                          </a>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4 max-w-[200px] truncate text-slate-700 font-semibold">
                        {getServiceName(doc.serviceSlug)}
                      </td>

                      {/* Countdown */}
                      <td className="py-3.5 px-4">
                        {isExpired ? (
                          <span className="text-slate-500 font-medium">Purged</span>
                        ) : (
                          <span
                            className={`font-bold flex items-center gap-1.5 ${
                              doc.isExpiringSoon ? 'text-amber-700' : 'text-slate-700'
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
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-[#0B3830] border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            <span>Printed</span>
                          </span>
                        ) : isExpired ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <span>Expired</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            <Printer className="w-3 h-3 text-amber-700" />
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
                              className="px-2.5 py-1 bg-[#0B3830] hover:bg-[#072722] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                              title="Mark as printed"
                            >
                              Done
                            </button>
                          )}
                          <button
                            onClick={() => navigate(`/admin/documents/${doc.id}`)}
                            className="p-1.5 bg-slate-50 hover:bg-slate-100 text-[#0B3830] border border-slate-200 rounded-lg transition-colors cursor-pointer"
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
