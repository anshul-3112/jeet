import React, { useEffect, useState } from 'react';
import { getAdminPayments, type PaymentItem } from '../../api/admin';
import { getPaymentConfig, type PaymentConfigResponse } from '../../api/payments';
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
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [gatewayConfig, setGatewayConfig] = useState<PaymentConfigResponse | null>(null);
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
      const [res, config] = await Promise.all([
        getAdminPayments(),
        getPaymentConfig().catch(() => null),
      ]);
      setPayments(res.payments || []);
      setSummary(res.summary);
      if (config) setGatewayConfig(config);
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
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-sans">
            Payments &amp; Collections
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Razorpay online transactions and daily counter reconciliation.
          </p>
        </div>

        <button
          onClick={fetchPayments}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-full border border-slate-200 shadow-2xs transition-colors w-fit cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-700 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Gateway Mode Indicator */}
      {gatewayConfig && (
        <div
          className={`p-4 rounded-2xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs ${
            gatewayConfig.isLive
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/80 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                gatewayConfig.isLive ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
              }`}
            >
              {gatewayConfig.isLive ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  {gatewayConfig.isLive ? 'Razorpay Live / Test Gateway Connected' : 'Razorpay Sandbox Simulator Active'}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    gatewayConfig.isLive
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-amber-200 text-amber-800'
                  }`}
                >
                  {gatewayConfig.isLive ? 'LIVE CREDENTIALS' : 'SANDBOX / TEST'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {gatewayConfig.isLive
                  ? `Authenticated with Razorpay Key ID: ${gatewayConfig.key.substring(0, 14)}...`
                  : 'Citizens and admins can test payments with the built-in simulator. To accept real online UPI/Card payments, add your live RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET in backend/.env.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Today */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Collected Today</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0B3830] flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">₹{summary.todayCollected.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">Direct digital collections today</p>
        </div>

        {/* This Week */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Past 7 Days</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">₹{summary.weekCollected.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">Weekly digital turnover</p>
        </div>

        {/* Total Collected */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Total Collected</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-mono">₹{summary.totalCollected.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">{summary.count} total transaction records</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Filter by tracking ID, citizen name or Razorpay payment ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B3830] focus:ring-1 focus:ring-[#0B3830]"
        />
      </div>

      {/* Payments Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        {filteredPayments.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
            <p className="text-sm font-semibold">No payment transactions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Date &amp; Time</th>
                  <th className="py-3.5 px-4">Tracking Code</th>
                  <th className="py-3.5 px-4">Citizen</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Razorpay Payment ID</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPayments.map((p) => {
                  const isPaid = p.status === 'paid';
                  const isFailed = p.status === 'failed';
                  const amountRupees = p.amountPaise / 100;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">
                          {new Date(p.createdAt).toLocaleTimeString()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-[#0B3830]">
                        {p.trackingId || <span className="text-slate-400 font-normal">Direct Pay</span>}
                      </td>

                      <td className="py-3.5 px-4 text-slate-900 font-bold">
                        {p.citizenName || <span className="text-slate-400 font-normal">Counter Walk-in</span>}
                      </td>

                      <td className="py-3.5 px-4 font-black text-slate-900 text-sm font-mono">
                        ₹{amountRupees.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-600 text-[11px]">
                        {p.razorpayPaymentId || <span className="text-slate-400">Pending</span>}
                      </td>

                      <td className="py-3.5 px-4">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-[#0B3830] border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            <span>Paid</span>
                          </span>
                        ) : isFailed ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <XCircle className="w-3 h-3" />
                            <span>Failed</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-700" />
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
