import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getTrackingStatus, type TrackStatusResponse } from '../api/documents';
import { servicesData } from '../data/services';
import { businessConfig } from '../data/business';
import {
  Search,
  Clock,
  Printer,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  Shield,
  Loader2,
  ArrowLeft,
  Calendar,
  UploadCloud,
  CreditCard
} from 'lucide-react';

export const TrackStatusPage: React.FC = () => {
  const { trackingId: urlTrackingId } = useParams<{ trackingId?: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [inputTrackingId, setInputTrackingId] = useState(urlTrackingId || '');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TrackStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getTrackingStatus(id.trim());
      setData(res);
    } catch (err: any) {
      setData(null);
      setError(
        err.response?.status === 404
          ? (language === 'mr' ? 'हा ट्रॅकिंग कोड आढळला नाही. कृपया पुन्हा तपासा.' : 'No document found with this tracking ID.')
          : (language === 'mr' ? 'माहिती मिळवण्यात अडचण आली.' : 'Could not fetch status. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlTrackingId) {
      setInputTrackingId(urlTrackingId);
      fetchStatus(urlTrackingId);
    }
  }, [urlTrackingId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTrackingId.trim()) {
      navigate(`/track/${inputTrackingId.trim().toUpperCase()}`);
    }
  };

  const selectedService = data ? servicesData.find((s) => s.slug === data.serviceSlug) : null;
  const serviceName = selectedService
    ? (language === 'mr' ? selectedService.nameMr : selectedService.name)
    : data?.serviceSlug || 'Service';

  // Format remaining time
  const getRemainingTimeText = (minutes: number) => {
    if (minutes <= 0) return language === 'mr' ? 'कालबाह्य झाले (Expired)' : 'Expired';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // WhatsApp Alert Link
  const whatsappMessage = encodeURIComponent(
    `Hello Yash Bhai, I am checking status of my document at Jeet Kendra.\n\n🔖 Tracking Code: *${data?.trackingId}*\n📋 Service: ${serviceName}\n\nPlease check when I can collect it. Thank you!`
  );
  const whatsappUrl = `https://wa.me/${businessConfig.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-8 md:py-14 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'मुख्य पृष्ठावर जा' : 'Back to Home'}</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
            {language === 'mr' ? 'कागदपत्र स्थिती तपासा' : 'Track Document Status'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
            {language === 'mr'
              ? 'तुमचा ५-अंकी ट्रॅकिंग कोड टाकून स्थिती तपासा'
              : 'Enter your tracking code (e.g. JD-7F3K2) to view live progress'}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={inputTrackingId}
                onChange={(e) => setInputTrackingId(e.target.value.toUpperCase())}
                placeholder="e.g. JD-7F3K2"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-mono font-bold tracking-wider uppercase focus:outline-none focus:border-[#0B3830] focus:ring-2 focus:ring-emerald-100 shadow-2xs"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !inputTrackingId.trim()}
              className="px-6 py-3 rounded-xl font-bold text-white bg-[#0B3830] hover:bg-[#134E43] disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{language === 'mr' ? 'शोधा' : 'Track'}</span>}
            </button>
          </div>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm text-center mb-6">
            <AlertTriangle className="w-5 h-5 mx-auto mb-1 text-red-500" />
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Result Card */}
        {data && (
          <div className="bg-white rounded-3xl shadow-elevated border border-slate-200/90 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  {language === 'mr' ? 'ट्रॅकिंग आयडी' : 'Tracking Code'}
                </span>
                <p className="text-2xl font-black text-[#0B3830] font-mono tracking-wider">{data.trackingId}</p>
              </div>

              {/* Status Badge */}
              <div>
                {data.status === 'printed' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'प्रिंट तयार आहे' : 'Printed & Ready'}</span>
                  </span>
                ) : data.status === 'expired' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{language === 'mr' ? 'कालबाह्य (Auto-Deleted)' : 'Expired (Purged)'}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    <Printer className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                    <span>{language === 'mr' ? 'मिळाले (प्रक्रियेत)' : 'Received (In Queue)'}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between py-2 border-b border-slate-50">
                <span className="text-xs font-medium text-slate-500">{language === 'mr' ? 'सेवा' : 'Service'}</span>
                <span className="text-xs font-bold text-slate-900 text-right">{serviceName}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-xs font-medium text-slate-500">{language === 'mr' ? 'अपलोड वेळ' : 'Uploaded At'}</span>
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {new Date(data.uploadedAt).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-xs font-medium text-slate-500">{language === 'mr' ? 'शुल्क / पेमेंट' : 'Service Fee'}</span>
                {data.paymentStatus === 'paid' ? (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {language === 'mr'
                        ? `ऑनलाईन भरले (₹${data.paymentAmount || 50})`
                        : `Paid Online (₹${data.paymentAmount || 50})`}
                    </span>
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-700 flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      <span>{language === 'mr' ? 'अद्याप भरलेले नाही' : 'Unpaid'}</span>
                    </span>
                    <Link
                      to={`/pay?trackingId=${data.trackingId}&amount=${data.paymentAmount || 50}`}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-700 hover:bg-emerald-600 text-white transition-colors cursor-pointer"
                    >
                      {language === 'mr' ? 'आता भरा →' : 'Pay Now →'}
                    </Link>
                  </div>
                )}
              </div>

              {data.status !== 'expired' && (
                <div className="flex items-center justify-between py-2 border-b border-slate-50">
                  <span className="text-xs font-medium text-slate-500">{language === 'mr' ? 'उर्वरित वेळ' : 'Auto-Delete In'}</span>
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {getRemainingTimeText(data.remainingMinutes)}
                  </span>
                </div>
              )}
            </div>

            {/* Pay Online Callout */}
            {data.paymentStatus !== 'paid' && data.status !== 'expired' && (
              <div className="p-4 mb-4 bg-emerald-50/80 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-emerald-950">
                  <CreditCard className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <div>
                    <p className="font-bold">
                      {language === 'mr' ? 'ऑनलाईन सेवा शुल्क भरा' : 'Pay Service Fee Online'}
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      {language === 'mr'
                        ? 'रक्कम ठरवून Razorpay (UPI, QR, Card) द्वारे थेट भरा'
                        : 'Enter your custom amount & pay via Razorpay (UPI / QR / Cards)'}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/pay?trackingId=${data.trackingId}&amount=50`}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0B3830] hover:bg-[#124b41] text-white font-bold text-center transition-colors cursor-pointer shadow-sm text-xs"
                >
                  {language === 'mr' ? 'फी भरा (Razorpay)' : 'Pay with Razorpay'}
                </Link>
              </div>
            )}

            {/* Reassurance banner */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-2.5 mb-6 text-xs text-slate-600">
              <Shield className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>
                {language === 'mr'
                  ? 'तुमची कागदपत्रे केवळ प्रिंटिंगसाठी सुरक्षित ठेवली जातात आणि २४ तासांनंतर नष्ट केली जातात.'
                  : 'Files are private and automatically deleted after 24 hours to protect your privacy.'}
              </span>
            </div>

            {/* WhatsApp Contact Action */}
            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{language === 'mr' ? 'दुकानदाराशी संपर्क साधा (WhatsApp)' : 'Contact Yash Bhai on WhatsApp'}</span>
              </a>

              <Link
                to="/upload"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-[#0B3830] hover:underline"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? '+ नवीन कागदपत्र अपलोड करा' : '+ Upload Another Document'}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
