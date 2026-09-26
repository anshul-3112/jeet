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
          <h1 className="text-2xl font-bold text-[#152220] tracking-tight font-sans">
            Citizen Document Submissions
          </h1>
          <p className="text-xs text-[#798C87] mt-0.5">
            Strict 24-hour privacy retention policy. Print or verify before scheduled automated purge.
          </p>
        </div>

        <button
          onClick={fetchDocs}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#FAF8F5] text-[#152220] text-xs font-semibold rounded-full border border-[#EAE4DC] shadow-2xs transition-colors w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#113D36] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Critical Alert Banner for Expiring Documents (< 1 hour) */}
      {expiringCount > 0 && (
        <div className="p-4 bg-[#F7EFE7] border border-[#EFDCB9] rounded-2xl flex items-center justify-between gap-3 text-[#152220]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C27E4B] text-white flex items-center justify-center flex-shrink-0 animate-bounce">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#152220]">
                Urgent Attention: {expiringCount} {expiringCount === 1 ? 'document has' : 'documents have'} under 1 hour remaining!
              </p>
              <p className="text-xs text-[#A86938]">
                Please print or archive now. The system will permanently delete the files at 24 hours.
              </p>
            </div>
          </div>
          <button
            onClick={() => setStatusFilter('received')}
            className="hidden sm:block px-4 py-2 bg-[#113D36] hover:bg-[#144A42] text-white font-bold text-xs rounded-full transition-colors flex-shrink-0"
          >
            Filter Pending
          </button>
        </div>
      )}

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE4DC] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#798C87]">Total Uploads</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-[#113D36]">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#152220] tabular-nums font-serif">
            {totalCount}
          </div>
          <div className="text-[11px] text-[#798C87] mt-1">Active within 24h window</div>
        </div>

        {/* Card 2: Pending Print */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE4DC] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#798C87]">Pending Print</span>
            <div className="w-8 h-8 rounded-lg bg-[#F7EFE7] flex items-center justify-center text-[#A86938]">
              <Printer className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#A86938] tabular-nums font-serif">
            {pendingCount}
          </div>
          <div className="text-[11px] text-[#798C87] mt-1">Require physical print</div>
        </div>

        {/* Card 3: Printed & Ready */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE4DC] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#798C87]">Printed &amp; Done</span>
            <div className="w-8 h-8 rounded-lg bg-[#F2F8F6] flex items-center justify-center text-[#113D36]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#113D36] tabular-nums font-serif">
            {printedCount}
          </div>
          <div className="text-[11px] text-[#798C87] mt-1">Ready for citizen pickup</div>
        </div>

        {/* Card 4: Expiring Soon */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE4DC] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#798C87]">Expiring Soon</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-red-600 tabular-nums font-serif">
            {expiringCount}
          </div>
          <div className="text-[11px] text-[#798C87] mt-1">&lt; 1 hour remaining</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#798C87] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search citizen name, phone, code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EAE4DC] rounded-xl text-xs text-[#152220] placeholder-[#798C87] focus:outline-none focus:border-[#113D36] focus:ring-1 focus:ring-[#C2DDD4]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 bg-white border border-[#EAE4DC] rounded-xl px-3 py-1.5">
          <Filter className="w-3.5 h-3.5 text-[#798C87]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-transparent text-xs text-[#152220] focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="received">Pending / Received</option>
            <option value="printed">Printed &amp; Done</option>
            <option value="expired">Expired / Purged</option>
          </select>
        </div>

        {/* Service Filter */}
        <div className="flex items-center gap-2 bg-white border border-[#EAE4DC] rounded-xl px-3 py-1.5">
          <FileCheck className="w-3.5 h-3.5 text-[#798C87]" />
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="w-full bg-transparent text-xs text-[#152220] focus:outline-none cursor-pointer"
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
      <div className="bg-white border border-[#EAE4DC] rounded-2xl overflow-hidden shadow-2xs">
        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center text-[#798C87]">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#113D36]" />
            <p className="text-sm font-semibold">No uploaded documents found matching this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#798C87] font-semibold border-b border-[#EAE4DC] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Tracking Code</th>
                  <th className="py-3.5 px-4">Citizen</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Time Left</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EFEA]">
                {filteredDocs.map((doc) => {
                  const isPrinted = doc.status === 'printed';
                  const isExpired = doc.status === 'expired';

                  return (
                    <tr
                      key={doc.id}
                      onClick={() => navigate(`/admin/documents/${doc.id}`)}
                      className={`hover:bg-[#FAF8F5] cursor-pointer transition-colors ${
                        doc.isExpiringSoon ? 'bg-[#FCF8F4]' : ''
                      }`}
                    >
                      {/* Tracking ID with quick copy */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-[#113D36] text-xs">
                            {doc.trackingId}
                          </span>
                          <button
                            onClick={(e) => copyTracking(e, doc.trackingId)}
                            className="text-[#798C87] hover:text-[#113D36] p-0.5"
                            title="Copy Code"
                          >
                            {copiedId === doc.trackingId ? (
                              <Check className="w-3 h-3 text-[#113D36]" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <div className="text-[11px] text-[#798C87] mt-0.5">
                          {doc.fileCount} {doc.fileCount === 1 ? 'file' : 'files'}
                        </div>
                      </td>

                      {/* Citizen */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#152220]">{doc.citizenName}</div>
                        <div className="flex items-center gap-2 mt-0.5" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`tel:${doc.citizenPhone}`}
                            className="inline-flex items-center gap-1 text-[11px] text-[#4A5B57] hover:text-[#113D36]"
                          >
                            <Phone className="w-3 h-3 text-[#798C87]" />
                            <span>{doc.citizenPhone}</span>
                          </a>
                          <a
                            href={`https://wa.me/91${doc.citizenPhone}?text=Hello%20${encodeURIComponent(
                              doc.citizenName
                            )},%20your%20document%20is%20being%20processed%20at%20Jeet%20Kendra.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#113D36] hover:text-emerald-700"
                            title="WhatsApp citizen"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-[#113D36] text-white" />
                          </a>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4 max-w-[200px] truncate text-[#4A5B57] font-medium">
                        {getServiceName(doc.serviceSlug)}
                      </td>

                      {/* Countdown */}
                      <td className="py-3.5 px-4">
                        {isExpired ? (
                          <span className="text-[#798C87] font-medium">Purged</span>
                        ) : (
                          <span
                            className={`font-semibold flex items-center gap-1.5 ${
                              doc.isExpiringSoon ? 'text-[#A86938] font-bold' : 'text-[#4A5B57]'
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
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F2F8F6] text-[#113D36] border border-[#C2DDD4]">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Printed</span>
                          </span>
                        ) : isExpired ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#F3EFEA] text-[#798C87]">
                            <span>Expired</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F7EFE7] text-[#A86938] border border-[#EFDCB9]">
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
                              className="px-2.5 py-1 bg-[#113D36] hover:bg-[#144A42] text-white rounded-lg text-xs font-semibold transition-colors"
                              title="Mark as printed"
                            >
                              Done
                            </button>
                          )}
                          <button
                            onClick={() => navigate(`/admin/documents/${doc.id}`)}
                            className="p-1.5 bg-[#FAF8F5] hover:bg-[#F3EFEA] text-[#113D36] border border-[#EAE4DC] rounded-lg transition-colors"
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
