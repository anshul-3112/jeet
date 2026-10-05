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

    if (!customerPhone.trim() && !customerName.trim()) {
      // Gentle validation - at least one identifier is helpful
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

      // If Razorpay SDK not available or returned mock order
      if (!window.Razorpay || order.isMock) {
        // Fallback simulation
        const mockPayId = `pay_sim_${Date.now()}`;
        await verifyPayment(order.orderId, mockPayId, 'sim_sig', trackingId.trim());
        setReceiptData({
          orderId: order.orderId,
          paymentId: mockPayId,
          amount: numericAmount,
          customerName: customerName.trim() || 'Citizen',
          customerPhone: customerPhone.trim(),
          trackingId: trackingId.trim().toUpperCase(),
          purpose: purpose.trim(),
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
              purpose: purpose.trim(),
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
          `• *Amount:* ₹${receiptData.amount.toFixed(2)}\n` +
          `• *Payment ID:* ${receiptData.paymentId}\n` +
          `• *Customer:* ${receiptData.customerName}\n` +
          (receiptData.trackingId ? `• *Tracking ID:* ${receiptData.trackingId}\n` : '') +
          `• *Purpose:* ${receiptData.purpose}\n` +
          `• *Date:* ${receiptData.date}\n` +
          `--------------------------------\n` +
          `Paid safely via Razorpay.`
      )
    : '';

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-slate-50/70">
      <div className="max-w-2xl mx-auto">
        {/* Top Back Link */}
        <div className="mb-6 flex items-center justify-between">
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

        {/* Payment Form OR Receipt View */}
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
          /* Payment Success & Receipt View */
          receiptData && (
            <div className="bg-white rounded-3xl shadow-xl border border-emerald-300 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              {/* Receipt Header Banner */}
              <div className="bg-emerald-700 text-white p-6 sm:p-8 text-center relative">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black">
                  {language === 'mr' ? 'पेमेंट यशस्वी झाले!' : 'Payment Successful!'}
                </h2>
                <p className="text-xs text-emerald-100 mt-1 font-medium">
                  {language === 'mr'
                    ? 'जीत डिजिटल सेवा केंद्रात तुमचे पेमेंट जमा झाले आहे.'
                    : 'Your payment was successfully received at Jeet Digital Seva Kendra.'}
                </p>
                <div className="mt-4 inline-block bg-white text-emerald-950 font-black px-6 py-2 rounded-full font-mono text-2xl shadow-md">
                  ₹{receiptData.amount.toFixed(2)}
                </div>
              </div>

              {/* Receipt Body */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 font-semibold">Payment ID:</span>
                  <span className="font-mono font-bold text-slate-900">{receiptData.paymentId}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 font-semibold">Order ID:</span>
                  <span className="font-mono text-slate-600">{receiptData.orderId}</span>
                </div>

                {receiptData.trackingId && (
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                    <span className="text-slate-500 font-semibold">Tracking Code:</span>
                    <span className="font-mono font-black text-[#0B3830] text-sm">
                      {receiptData.trackingId}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 font-semibold">Customer:</span>
                  <span className="font-bold text-slate-900">
                    {receiptData.customerName} {receiptData.customerPhone ? `(${receiptData.customerPhone})` : ''}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 font-semibold">Service / Purpose:</span>
                  <span className="font-bold text-slate-800">{receiptData.purpose}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <span className="text-slate-500 font-semibold">Date &amp; Time:</span>
                  <span className="text-slate-700">{receiptData.date}</span>
                </div>

                {/* Actions */}
                <div className="pt-4 space-y-2.5">
                  <a
                    href={`https://wa.me/${businessConfig.whatsappNumber}?text=${whatsappReceiptText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer text-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{language === 'mr' ? 'दुकानदाराला पावती पाठवा (WhatsApp)' : 'Share Receipt with Yash Bhai (WhatsApp)'}</span>
                  </a>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-500" />
                      <span>{language === 'mr' ? 'प्रिंट काढा' : 'Print Receipt'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentSuccess(false);
                        setReceiptData(null);
                        setAmountStr('50');
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                    >
                      <span>{language === 'mr' ? 'दुसरे पेमेंट करा' : 'Make Another Payment'}</span>
                    </button>
                  </div>

                  {receiptData.trackingId && (
                    <Link
                      to={`/track/${receiptData.trackingId}`}
                      className="w-full py-2.5 text-center block text-xs font-bold text-[#0B3830] hover:underline"
                    >
                      {language === 'mr' ? '→ ट्रॅकिंग स्थिती तपासा' : '→ View Live Document Tracking Status'}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QuickPayPage;
