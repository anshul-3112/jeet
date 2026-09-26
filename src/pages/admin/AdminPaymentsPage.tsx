import React, { useEffect, useState } from 'react';
import { getAdminPayments, type PaymentItem } from '../../api/admin';
import {
  CreditCard,
  IndianRupee,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  Search,
  TrendingUp,
} from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [summary, setSummary] = useState({
    totalCollected: 0,
    todayCollected: 0,
    weekCollected: 0,
    count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await getAdminPayments();
      setPayments(res.payments || []);
      setSummary(res.summary);
    } catch (err) {
      console.error('Failed to fetch payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (p.trackingId && p.trackingId.toLowerCase().includes(q)) ||
      (p.citizenName && p.citizenName.toLowerCase().includes(q)) ||
      p.razorpayOrderId.toLowerCase().includes(q) ||
      (p.razorpayPaymentId && p.razorpayPaymentId.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Payments &amp; Collections</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Razorpay online transactions and daily counter reconciliation.
          </p>
        </div>

        <button
          onClick={fetchPayments}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Revenue Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Today */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Collected Today</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">₹{summary.todayCollected.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-500 mt-1">Direct digital collections today</p>
        </div>

        {/* This Week */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Past 7 Days</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">₹{summary.weekCollected.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-500 mt-1">Weekly digital turnover</p>
        </div>

        {/* Total Collected */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Collected</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">₹{summary.totalCollected.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-500 mt-1">{summary.count} total transaction records</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Filter by tracking ID, citizen name or Razorpay payment ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
        />
      </div>

      {/* Payments Table */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {filteredPayments.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">No payment transactions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Date &amp; Time</th>
                  <th className="py-3.5 px-4">Tracking Code</th>
                  <th className="py-3.5 px-4">Citizen</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Razorpay Payment ID</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredPayments.map((p) => {
                  const isPaid = p.status === 'paid';
                  const isFailed = p.status === 'failed';
                  const amountRupees = p.amountPaise / 100;

                  return (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {new Date(p.createdAt).toLocaleTimeString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-brand-400">
                        {p.trackingId || <span className="text-slate-600 font-normal">Direct Pay</span>}
                      </td>

                      <td className="py-3.5 px-4 text-white font-medium">
                        {p.citizenName || <span className="text-slate-500">Counter</span>}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-white text-sm">
                        ₹{amountRupees.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                        {p.razorpayPaymentId || <span className="text-slate-600">Pending</span>}
                      </td>

                      <td className="py-3.5 px-4">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Paid</span>
                          </span>
                        ) : isFailed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                            <XCircle className="w-3 h-3" />
                            <span>Failed</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400">
                            <Clock className="w-3 h-3" />
                            <span>Pending</span>
                          </span>
                        )}
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
