import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { businessConfig } from '../data/business';
import { createPaymentOrder, verifyPayment, getPaymentConfig, type CreateOrderResponse } from '../api/payments';
import {
  CreditCard,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Printer,
  ArrowLeft,
  FileText,
  User,
  Phone,
  MessageCircle,
} from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PRESET_AMOUNTS = [
  { value: 20, label: 'Print / Xerox' },
  { value: 50, label: 'Application Form' },
  { value: 100, label: 'PAN / Aadhaar' },
  { value: 200, label: 'Caste / Domicile' },
  { value: 500, label: 'Licence / Business' },
];

function numberToWords(num: number): string {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const n = Math.floor(num);
  if (n === 0) return 'Zero Rupees Only';

  function convert(val: number): string {
    if (val < 20) return a[val];
    if (val < 100) return b[Math.floor(val / 10)] + (val % 10 !== 0 ? ' ' + a[val % 10] : '');
    if (val < 1000) return a[Math.floor(val / 100)] + ' Hundred' + (val % 100 !== 0 ? ' ' + convert(val % 100) : '');
    if (val < 100000) return convert(Math.floor(val / 1000)) + ' Thousand' + (val % 1000 !== 0 ? ' ' + convert(val % 1000) : '');
    if (val < 10000000) return convert(Math.floor(val / 100000)) + ' Lakh' + (val % 100000 !== 0 ? ' ' + convert(val % 100000) : '');
    return val.toString();
  }

  return convert(n) + ' Rupees Only';
}

export const QuickPayPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();

  // URL query params pre-fill (e.g. /pay?amount=150&trackingId=JD-ABCDE)
  const initialAmount = searchParams.get('amount') || '50';
  const initialTrackingId = searchParams.get('trackingId') || '';
  const initialService = searchParams.get('service') || '';

  const [amountStr, setAmountStr] = useState<string>(initialAmount);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [trackingId, setTrackingId] = useState<string>(initialTrackingId);
  const [purpose, setPurpose] = useState<string>(initialService || 'Documentation & CSC Service');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<{
    orderId: string;
    paymentId: string;
    amount: number;
    customerName: string;
    customerPhone: string;
    trackingId: string;
    purpose: string;
    date: string;
  } | null>(null);

  // Gateway status check
  const [gatewayLive, setGatewayLive] = useState<boolean | null>(null);

  useEffect(() => {
    getPaymentConfig()
      .then((cfg) => setGatewayLive(cfg.isLive))
      .catch(() => setGatewayLive(false));
  }, []);

  const handleAmountChange = (val: string) => {
    setAmountStr(val);
    setPaymentError(null);
  };

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    const numericAmount = parseFloat(amountStr);
    if (isNaN(numericAmount) || numericAmount < 1) {
      setPaymentError(
        language === 'mr'
          ? 'कृपया वैध रक्कम टाका (किमान ₹१).'
          : 'Please enter a valid amount (minimum ₹1).'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const order: CreateOrderResponse = await createPaymentOrder({
        trackingId: trackingId.trim().toUpperCase() || undefined,
        amount: numericAmount,
        customerName: customerName.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        purpose: purpose.trim() || undefined,
      });

      // If in mock mode or Razorpay SDK not available
      if (!window.Razorpay || order.isMock) {
        const mockPayId = `pay_sim_${Date.now()}`;
        await verifyPayment(order.orderId, mockPayId, 'sim_sig', trackingId.trim());
        setReceiptData({
          orderId: order.orderId,
          paymentId: mockPayId,
          amount: numericAmount,
          customerName: customerName.trim() || 'Citizen',
          customerPhone: customerPhone.trim(),
          trackingId: trackingId.trim().toUpperCase(),
          purpose: purpose.trim() || 'Documentation & CSC Service',
          date: new Date().toLocaleString(),
        });
        setPaymentSuccess(true);
        setIsSubmitting(false);
        return;
      }

      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: businessConfig.name,
        description: `Fee: ₹${numericAmount} • ${purpose || 'Seva Kendra Service'}`,
        order_id: order.orderId,
        handler: async function (response: any) {
          try {
            await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              trackingId.trim().toUpperCase() || undefined
            );

            setReceiptData({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              amount: numericAmount,
              customerName: customerName.trim() || 'Citizen',
              customerPhone: customerPhone.trim(),
              trackingId: trackingId.trim().toUpperCase(),
              purpose: purpose.trim() || 'Documentation & CSC Service',
              date: new Date().toLocaleString(),
            });
            setPaymentSuccess(true);
          } catch (verErr: any) {
            console.error('Verification error:', verErr);
            setPaymentError(
              language === 'mr'
                ? 'पेमेंट पडताळणीमध्ये त्रुटी आली. कृपया केंद्र चालकांशी संपर्क साधा.'
                : 'Payment verification failed. Please contact the centre with your transaction ID.'
            );
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
        prefill: {
          name: customerName,
          contact: customerPhone,
        },
        theme: {
          color: '#0B3830',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (failResp: any) {
        setIsSubmitting(false);
        setPaymentError(
          failResp?.error?.description ||
            (language === 'mr'
              ? 'पेमेंट अयशस्वी झाले किंवा रद्द झाले.'
              : 'Payment was cancelled or unsuccessful.')
        );
      });
      rzp.open();
    } catch (err: any) {
      console.error('Payment start error:', err);
      setIsSubmitting(false);
      setPaymentError(
        err.response?.data?.error ||
          (language === 'mr'
            ? 'पेमेंट सुरू होऊ शकले नाही. कृपया पुन्हा प्रयत्न करा.'
            : 'Could not initialize payment. Please check network and try again.')
      );
    }
  };

  const currentNumericAmount = parseFloat(amountStr) || 0;

  // WhatsApp receipt text
  const whatsappReceiptText = receiptData
    ? encodeURIComponent(
        `*Jeet Digital Seva Kendra - Payment Receipt*\n` +
          `--------------------------------\n` +
          `• Receipt No: ${receiptData.paymentId}\n` +
          `• Total Paid: ₹${receiptData.amount.toFixed(2)}\n` +
          `• Customer: ${receiptData.customerName}\n` +
          (receiptData.customerPhone ? `• Phone: ${receiptData.customerPhone}\n` : '') +
          (receiptData.trackingId ? `• Tracking ID: ${receiptData.trackingId}\n` : '') +
          `• Service: ${receiptData.purpose}\n` +
          `• Date: ${receiptData.date}\n` +
          `--------------------------------\n` +
          `Status: PAID (Razorpay Online)\n` +
          `Thank you for choosing Jeet Digital!`
      )
    : '';

  return (
    <div className="min-h-screen py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-slate-50/70 print:bg-white print:py-0 print:px-0 print-receipt-wrapper">
      <div className="max-w-2xl mx-auto">
        {/* Navigation & Status Header (Screen Only) */}
        {!paymentSuccess ? (
          <div className="no-print mb-6 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0B3830] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'mr' ? 'मुख्यपृष्ठावर परत जा' : 'Back to Home'}</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>{gatewayLive ? 'Razorpay Gateway Live' : 'Razorpay Gateway Active'}</span>
              </span>
            </div>
          </div>
        ) : null}

        {/* PAYMENT FORM (Shown before payment) */}
        {!paymentSuccess ? (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
            {/* Header Banner */}
            <div className="bg-[#0B3830] text-white p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                    {language === 'mr' ? 'ऑनलाईन पेमेंट करा' : 'Pay Online with Razorpay'}
                  </h1>
                  <p className="text-xs text-emerald-200/90 mt-0.5">
                    {language === 'mr'
                      ? 'जीत डिजिटल सेवा केंद्र, अयोध्या नगर नागपूर'
                      : 'Jeet Digital Seva Kendra, Ayodhya Nagar Nagpur'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-200 mt-2">
                {language === 'mr'
                  ? 'तुमच्या अर्जाचे, प्रिंटिंगचे किंवा शासकीय सेवेचे शुल्क थेट UPI, QR, कार्ड्स किंवा नेटबँकिंगने भरा.'
                  : 'Enter your custom service fee and complete payment securely via UPI, QR, Cards, or NetBanking.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handlePayNow} className="p-6 sm:p-8 space-y-6">
              {/* Amount Entry Section */}
              <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-200/70 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'पेमेंट रक्कम टाका (₹) *' : 'Enter Amount to Pay (₹) *'}</span>
                  </label>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    {language === 'mr' ? 'तुम्ही ठरवा' : 'User Chosen'}
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-2xl font-black text-emerald-900 pointer-events-none">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="100000"
                    step="1"
                    required
                    value={amountStr}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder="50"
                    className="w-full pl-11 pr-4 py-3.5 text-2xl sm:text-3xl font-black text-slate-900 bg-white border-2 border-emerald-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 font-mono transition-all shadow-inner"
                  />
                </div>

                {/* Preset Chips */}
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 mb-1.5">
                    {language === 'mr' ? 'किंवा लोकप्रिय रक्कम निवडा:' : 'Or tap a standard amount:'}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {PRESET_AMOUNTS.map((preset) => {
                      const isSelected = parseFloat(amountStr) === preset.value;
                      return (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => handleAmountChange(String(preset.value))}
                          className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0B3830] text-white border-[#0B3830] shadow-sm'
                              : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200'
                          }`}
                        >
                          <div className="text-sm font-black font-mono">₹{preset.value}</div>
                          <div
                            className={`text-[10px] leading-tight truncate ${
                              isSelected ? 'text-emerald-200' : 'text-slate-500'
                            }`}
                          >
                            {preset.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Citizen Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{language === 'mr' ? 'तुमचे नाव' : 'Your Full Name'}</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={language === 'mr' ? 'उदा. राहुल शर्मा' : 'e.g. Rahul Sharma'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#0B3830] focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{language === 'mr' ? 'मोबाईल नंबर' : 'Phone Number'}</span>
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#0B3830] focus:ring-2 focus:ring-emerald-100 font-mono"
                  />
                </div>
              </div>

              {/* Tracking Code (Optional) & Purpose */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{language === 'mr' ? 'ट्रॅकिंग कोड (असल्यास)' : 'Tracking Code (Optional)'}</span>
                  </label>
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                    placeholder="e.g. JD-7F3K2"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#0B3830] focus:ring-2 focus:ring-emerald-100 font-mono uppercase font-bold text-[#0B3830]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === 'mr' ? 'सेवेचे नाव / उद्देश' : 'Service / Payment Purpose'}
                  </label>
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder={language === 'mr' ? 'उदा. पॅन कार्ड, कलर प्रिंट' : 'e.g. PAN Card, Color Print'}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#0B3830] focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* Error Notice */}
              {paymentError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                  <span>{paymentError}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || currentNumericAmount < 1}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-[#0B3830] hover:bg-[#124b41] disabled:opacity-50 shadow-lg shadow-[#0B3830]/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2.5 text-sm"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                  ) : (
                    <CreditCard className="w-5 h-5 text-amber-300" />
                  )}
                  <span>
                    {language === 'mr'
                      ? `₹${currentNumericAmount > 0 ? currentNumericAmount : '०'} Razorpay ने भरा`
                      : `Pay ₹${currentNumericAmount > 0 ? currentNumericAmount : 0} with Razorpay`}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    100% Secure • Accepts Google Pay, PhonePe, Paytm, UPI, Cards, NetBanking
                  </span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* ========================================================================= */
          /* MINIMAL & CLEAN RECEIPT WITH NORMAL STRUCTURED TABLE                     */
          /* ========================================================================= */
          receiptData && (
            <div className="space-y-4">
              {/* Screen-Only Control Toolbar (Hidden during print) */}
              <div className="no-print bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0B3830] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{language === 'mr' ? 'होमपेज' : 'Home'}</span>
                </Link>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B3830] hover:bg-[#124b41] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'पावती प्रिंट करा (PDF)' : 'Print / Save PDF'}</span>
                  </button>

                  <a
                    href={`https://wa.me/${businessConfig.whatsappNumber}?text=${whatsappReceiptText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>{language === 'mr' ? 'व्हाट्सॲपवर पाठवा' : 'Share WhatsApp'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentSuccess(false);
                      setReceiptData(null);
                      setAmountStr('50');
                    }}
                    className="inline-flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <span>{language === 'mr' ? '+ नवीन पेमेंट' : '+ New Payment'}</span>
                  </button>
                </div>
              </div>

              {/* The Actual Clean Receipt Card */}
              <div className="print-clean-receipt bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-sm text-slate-800">
                {/* 1. Header: Business Brand & Receipt Heading */}
                <div className="flex flex-col sm:flex-row justify-between items-start pb-5 border-b border-slate-200 gap-4">
                  {/* Left: Center Info */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg tracking-wider flex-shrink-0">
                      JD
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight uppercase">
                          Jeet Digital Seva Kendra
                        </h2>
                      </div>
                      <p className="text-[11px] font-semibold text-emerald-800">
                        {language === 'mr'
                          ? 'आपले सरकार ई-सेवा केंद्र • अधिकृत नागरिक सेवा'
                          : 'Aaple Sarkar E-Governance Seva Kendra'}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        27A, Ayodhya Nagar Square, Nagpur - 440024
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Ph: +91 80552 03555 | Email: digitalsevangp@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Right: Receipt Meta & Status */}
                  <div className="text-left sm:text-right flex flex-col sm:items-end">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 mb-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>PAID / यशस्वी</span>
                    </div>
                    <div className="text-xs font-black tracking-wider text-slate-900 uppercase">
                      Payment Receipt / पावती
                    </div>
                    <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                      Receipt No: <span className="font-bold text-slate-900">{receiptData.paymentId}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Date: <span className="font-medium text-slate-800">{receiptData.date}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Customer & Payment Details Block */}
                <div className="my-5 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/90 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        {language === 'mr' ? 'ग्राहकाचे नाव' : 'Billed To (Customer)'}
                      </span>
                      <span className="font-bold text-slate-900 break-words">
                        {receiptData.customerName || 'Walk-in Citizen'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        {language === 'mr' ? 'मोबाईल नंबर' : 'Contact Phone'}
                      </span>
                      <span className="font-mono font-medium text-slate-800">
                        {receiptData.customerPhone ? `+91 ${receiptData.customerPhone}` : 'N/A'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        {language === 'mr' ? 'ट्रॅकिंग कोड' : 'Tracking ID'}
                      </span>
                      <span className="font-mono font-bold text-[#0B3830]">
                        {receiptData.trackingId || 'DIRECT-PAY'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        {language === 'mr' ? 'पेमेंट पद्धत' : 'Payment Mode'}
                      </span>
                      <span className="font-medium text-slate-800">
                        Razorpay Online (UPI/Card)
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. NORMAL CLEAN TABLE */}
                <div className="overflow-x-auto mb-4 border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <th className="py-2.5 px-3.5 text-center w-12 border-r border-slate-200">#</th>
                        <th className="py-2.5 px-3.5 border-r border-slate-200">
                          {language === 'mr' ? 'सेवेचा तपशील / Description' : 'Service / Particulars'}
                        </th>
                        <th className="py-2.5 px-3.5 text-center border-r border-slate-200 w-32">
                          {language === 'mr' ? 'संदर्भ कोड' : 'Reference Code'}
                        </th>
                        <th className="py-2.5 px-3.5 text-right w-32">
                          {language === 'mr' ? 'रक्कम (₹)' : 'Amount (INR)'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      <tr>
                        <td className="py-3.5 px-3.5 text-center font-mono text-slate-500 border-r border-slate-200">
                          1
                        </td>
                        <td className="py-3.5 px-3.5 border-r border-slate-200">
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">
                            {receiptData.purpose || 'Documentation & CSC Service'}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Government portal submission, documentation, form processing &amp; seva fees
                          </div>
                        </td>
                        <td className="py-3.5 px-3.5 text-center font-mono text-slate-700 border-r border-slate-200 text-xs">
                          {receiptData.trackingId || receiptData.orderId.substring(0, 14)}
                        </td>
                        <td className="py-3.5 px-3.5 text-right font-mono font-bold text-slate-900 text-xs sm:text-sm">
                          ₹{receiptData.amount.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot className="border-t-2 border-slate-200 bg-slate-50/70 text-xs">
                      <tr>
                        <td colSpan={3} className="py-2 px-3.5 text-right font-semibold text-slate-600 border-r border-slate-200">
                          Subtotal / उपएकूण:
                        </td>
                        <td className="py-2 px-3.5 text-right font-mono font-semibold text-slate-800">
                          ₹{receiptData.amount.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="py-1.5 px-3.5 text-right text-slate-500 border-r border-slate-200 text-[11px]">
                          Gateway Charges &amp; Applicable Taxes:
                        </td>
                        <td className="py-1.5 px-3.5 text-right font-mono text-slate-500 text-[11px]">
                          ₹0.00 (Included)
                        </td>
                      </tr>
                      <tr className="bg-slate-100/90 font-bold border-t border-slate-200 text-xs sm:text-sm">
                        <td colSpan={3} className="py-2.5 px-3.5 text-right text-slate-900 border-r border-slate-200 font-extrabold">
                          Total Amount Paid / एकूण भरलेली रक्कम:
                        </td>
                        <td className="py-2.5 px-3.5 text-right font-mono font-black text-emerald-800 text-sm sm:text-base">
                          ₹{receiptData.amount.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* 4. Amount in Words & Order ID */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-600 pt-1 pb-4 border-b border-slate-200 gap-1.5">
                  <div>
                    <span className="font-semibold text-slate-700">Amount in Words: </span>
                    <span className="italic text-slate-900 font-medium">
                      {numberToWords(receiptData.amount)}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    Order ID: {receiptData.orderId}
                  </div>
                </div>

                {/* 5. Footer Authenticity Seal & Signature */}
                <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 text-xs text-slate-500">
                  <div>
                    <p className="font-semibold text-slate-700">Jeet Digital E-Governance Seva Kendra</p>
                    <p className="text-[11px] text-slate-500">
                      This is a computer-generated receipt valid for all service confirmations.
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      For any inquiries or follow-ups, quote Payment ID: <span className="font-mono font-bold text-slate-600">{receiptData.paymentId}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                    <div className="text-[11px] leading-tight">
                      <div className="font-bold">✓ VERIFIED BY RAZORPAY</div>
                      <div className="text-[10px] text-emerald-700 font-mono">100% Secure Transaction</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen Only Bottom Navigation */}
              {receiptData.trackingId && (
                <div className="no-print text-center pt-2">
                  <Link
                    to={`/track/${receiptData.trackingId}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B3830] hover:underline"
                  >
                    <span>{language === 'mr' ? '→ अर्जाची थेट स्थिती तपासा' : '→ View Live Document Tracking Status'}</span>
                  </Link>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QuickPayPage;
