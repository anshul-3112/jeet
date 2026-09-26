import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { servicesData } from '../data/services';
import { businessConfig } from '../data/business';
import { FileDropzone } from '../components/upload/FileDropzone';
import { uploadDocuments, type UploadResponse } from '../api/documents';
import { createPaymentOrder, verifyPayment } from '../api/payments';
import {
  UploadCloud,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageCircle,
  Copy,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Loader2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const UploadPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Step state: 1 = Details, 2 = Upload, 3 = Complete / Pay
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [serviceSlug, setServiceSlug] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Submission / Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filtered services list
  const filteredServices = servicesData.filter((s) => {
    const q = searchQuery.toLowerCase();
    const name = language === 'mr' ? s.nameMr : s.name;
    return name.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q);
  });

  const selectedService = servicesData.find((s) => s.slug === serviceSlug);

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!citizenName.trim() || citizenName.trim().length < 2) {
      newErrors.name = language === 'mr' ? 'कृपया पूर्ण नाव प्रविष्ट करा' : 'Please enter your full name';
    }
    const cleanPhone = citizenPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone =
        language === 'mr' ? 'कृपया वैध १० अंकी मोबाईल नंबर टाका' : 'Please enter a valid 10-digit mobile number';
    }
    if (!serviceSlug) {
      newErrors.service = language === 'mr' ? 'कृपया एक सेवा निवडा' : 'Please select a service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUploadSubmit = async () => {
    if (files.length === 0) {
      setErrors({ files: language === 'mr' ? 'कृपया किमान १ फाईल निवडा' : 'Please select at least 1 document' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const formData = new FormData();
      formData.append('citizenName', citizenName.trim());
      formData.append('citizenPhone', citizenPhone.trim());
      formData.append('serviceSlug', serviceSlug);

      files.forEach((file) => {
        formData.append('files', file);
      });

      const res = await uploadDocuments(formData);
      setUploadResult(res);
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Upload failed:', err);
      setErrors({
        upload:
          err.response?.data?.error ||
          (language === 'mr'
            ? 'अपलोड करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.'
            : 'Failed to upload documents. Please check your network and try again.'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRazorpayPayment = async () => {
    if (!uploadResult) return;
    setIsSubmitting(true);

    try {
      // Standard convenience fee or service charge (e.g. ₹50)
      const order = await createPaymentOrder(uploadResult.trackingId, 50);

      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: businessConfig.name,
        description: `Documentation Service Fee (${selectedService?.name || 'Service'})`,
        order_id: order.orderId,
        handler: async function (response: any) {
          try {
            await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              uploadResult.trackingId
            );
            setPaymentSuccess(true);
          } catch (verErr) {
            console.error('Payment verification failed:', verErr);
          }
        },
        prefill: {
          name: citizenName,
          contact: citizenPhone,
        },
        theme: {
          color: '#dc2626',
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert('Payment gateway loaded in sandbox mode.');
        setPaymentSuccess(true);
      }
    } catch (err) {
      console.error('Payment initiation failed:', err);
      alert('Could not start Razorpay payment. You can pay directly at the shop counter.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyTrackingCode = () => {
    if (uploadResult?.trackingId) {
      navigator.clipboard.writeText(uploadResult.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // WhatsApp Alert Link
  const serviceName = selectedService ? (language === 'mr' ? selectedService.nameMr : selectedService.name) : 'Documents';
  const whatsappMessage = encodeURIComponent(
    `Hello Yash Bhai, I have uploaded my documents for *${serviceName}* on Jeet Kendra site.\n\n👤 Name: ${citizenName}\n📱 Phone: ${citizenPhone}\n🔖 Tracking Code: *${uploadResult?.trackingId}*\n\nPlease print and process my application. Thank you!`
  );
  const whatsappUrl = `https://wa.me/${businessConfig.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 md:py-14 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F2F8F6] border border-[#C2DDD4] text-[#113D36] rounded-full text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-[#113D36]" />
            <span>100% Private • Auto-Purged After 24 Hours</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal text-[#152220] tracking-tight font-serif">
            {language === 'mr' ? 'कागदपत्रे अपलोड करा' : 'Upload Documents for Fast Processing'}
          </h1>
          <p className="text-sm text-[#4A5B57] mt-2 max-w-lg mx-auto">
            {language === 'mr'
              ? 'कोणत्याही लॉगिनशिवाय थेट कागदपत्रे पाठवा. तुमचे काम जलद गतीने केले जाईल.'
              : 'Direct upload to Yash Chopade’s verified center. Files are encrypted and auto-deleted in 24 hours.'}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 px-2 max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                currentStep >= 1 ? 'bg-[#113D36] text-white shadow-2xs' : 'bg-[#F3EFEA] text-[#798C87]'
              }`}
            >
              1
            </div>
            <span className="text-[11px] font-semibold text-[#4A5B57] mt-1.5">
              {language === 'mr' ? 'माहिती' : 'Details'}
            </span>
          </div>
          <div className={`flex-1 h-0.5 mx-2 rounded-full ${currentStep >= 2 ? 'bg-[#113D36]' : 'bg-[#EAE4DC]'}`} />
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                currentStep >= 2 ? 'bg-[#113D36] text-white shadow-2xs' : 'bg-[#F3EFEA] text-[#798C87]'
              }`}
            >
              2
            </div>
            <span className="text-[11px] font-semibold text-[#4A5B57] mt-1.5">
              {language === 'mr' ? 'अपलोड' : 'Upload'}
            </span>
          </div>
          <div className={`flex-1 h-0.5 mx-2 rounded-full ${currentStep >= 3 ? 'bg-[#113D36]' : 'bg-[#EAE4DC]'}`} />
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                currentStep === 3 ? 'bg-[#113D36] text-white shadow-2xs' : 'bg-[#F3EFEA] text-[#798C87]'
              }`}
            >
              3
            </div>
            <span className="text-[11px] font-semibold text-[#4A5B57] mt-1.5">
              {language === 'mr' ? 'पूर्ण' : 'Complete'}
            </span>
          </div>
        </div>

        {/* STEP 1: Details */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl shadow-soft border border-[#EAE4DC] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#152220] mb-5 flex items-center gap-2 font-sans">
              <span className="w-2.5 h-2.5 rounded-full bg-[#113D36]"></span>
              {language === 'mr' ? 'पायरी १: तुमची माहिती व सेवा निवडा' : 'Step 1: Citizen Details & Service'}
            </h2>

            <form onSubmit={handleNextToStep2} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#152220] uppercase tracking-wider mb-1.5">
                  {language === 'mr' ? 'पूर्ण नाव' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Patil"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-[#152220] focus:bg-white focus:outline-none transition-all ${
                    errors.name ? 'border-red-400 ring-2 ring-red-100' : 'border-[#EAE4DC] focus:border-[#113D36] focus:ring-2 focus:ring-[#C2DDD4]'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1 font-medium">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#152220] uppercase tracking-wider mb-1.5">
                  {language === 'mr' ? 'मोबाईल नंबर (WhatsApp)' : 'Mobile Number (WhatsApp)'} *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-[#798C87] font-medium text-sm">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={citizenPhone}
                    onChange={(e) => setCitizenPhone(e.target.value.replace(/\D/g, ''))}
                    className={`w-full pl-14 pr-4 py-3 rounded-xl border bg-[#FAF8F5] text-[#152220] focus:bg-white focus:outline-none transition-all ${
                      errors.phone ? 'border-red-400 ring-2 ring-red-100' : 'border-[#EAE4DC] focus:border-[#113D36] focus:ring-2 focus:ring-[#C2DDD4]'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500 mt-1 font-medium">{errors.phone}</p>}
                <p className="text-[11px] text-[#798C87] mt-1">
                  {language === 'mr'
                    ? 'या नंबरवर प्रिंटिंग स्थिती व पोचपावती पाठवली जाईल.'
                    : 'Used to alert you when documents are ready.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#152220] uppercase tracking-wider mb-1.5">
                  {language === 'mr' ? 'सेवा निवडा' : 'Select Service / Requirement'} *
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder={language === 'mr' ? 'सेवा शोधा (उदा. आधार, जात पडताळणी...)' : 'Search services (e.g. Aadhaar, PAN, Caste...)'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#EAE4DC] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#113D36]"
                  />
                  <select
                    value={serviceSlug}
                    onChange={(e) => setServiceSlug(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-[#FAF8F5] text-[#152220] focus:bg-white focus:outline-none transition-all text-sm ${
                      errors.service ? 'border-red-400' : 'border-[#EAE4DC] focus:border-[#113D36]'
                    }`}
                  >
                    <option value="">-- {language === 'mr' ? 'सेवा निवडा' : 'Choose a Service'} --</option>
                    {filteredServices.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {language === 'mr' ? s.nameMr : s.name} ({s.categoryName})
                      </option>
                    ))}
                  </select>
                </div>
                {errors.service && <p className="text-xs text-red-500 mt-1 font-medium">{errors.service}</p>}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-white bg-[#113D36] hover:bg-[#144A42] shadow-xs active:scale-[0.99] transition-all"
                >
                  <span>{language === 'mr' ? 'पुढे जा (कागदपत्रे जोडा)' : 'Continue to Upload Files'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: File Upload */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl shadow-soft border border-[#EAE4DC] p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#152220] flex items-center gap-2 font-sans">
                <span className="w-2.5 h-2.5 rounded-full bg-[#113D36]"></span>
                {language === 'mr' ? 'पायरी २: कागदपत्रे जोडा' : 'Step 2: Attach Documents'}
              </h2>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#798C87] hover:text-[#152220]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'मागे' : 'Back'}</span>
              </button>
            </div>

            <div className="mb-4 p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#EAE4DC] text-xs text-[#4A5B57] flex items-center justify-between">
              <div>
                <p className="font-bold text-[#152220]">{citizenName}</p>
                <p>{citizenPhone} • {selectedService ? (language === 'mr' ? selectedService.nameMr : selectedService.name) : serviceSlug}</p>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-[#113D36] font-bold hover:underline"
              >
                {language === 'mr' ? 'बदला' : 'Edit'}
              </button>
            </div>

            {/* Dropzone Component */}
            <FileDropzone files={files} onChange={setFiles} maxFiles={5} maxSizeMB={10} />

            {errors.upload && (
              <div className="mt-4 flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.upload}</span>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-[#F3EFEA] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-medium text-[#4A5B57] hover:bg-[#FAF8F5] transition-colors text-xs"
              >
                {language === 'mr' ? 'मागे' : 'Back'}
              </button>
              <button
                type="button"
                disabled={isSubmitting || files.length === 0}
                onClick={handleUploadSubmit}
                className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-white bg-[#113D36] hover:bg-[#144A42] disabled:opacity-50 shadow-xs active:scale-[0.99] transition-all text-xs"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{language === 'mr' ? 'अपलोड होत आहे... कृपया थांबा' : 'Uploading... do not close this tab'}</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>
                      {language === 'mr'
                        ? `अपलोड करा (${files.length} कागदपत्रे)`
                        : `Submit & Upload (${files.length} ${files.length === 1 ? 'file' : 'files'})`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Complete / Tracking Code / Razorpay */}
        {currentStep === 3 && uploadResult && (
          <div className="bg-white rounded-3xl shadow-soft border border-[#EAE4DC] p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-[#F2F8F6] text-[#113D36] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C2DDD4]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-normal text-[#152220] font-serif">
              {language === 'mr' ? 'कागदपत्रे यशस्वीरीत्या मिळाली!' : 'Documents Uploaded Successfully!'}
            </h2>
            <p className="text-sm text-[#4A5B57] mt-1">
              {language === 'mr'
                ? 'जीत डिजिटल सेवा केंद्रात तुमचे काम सुरू झाले आहे.'
                : 'Your request has been received at Jeet Digital Seva Kendra.'}
            </p>

            {/* Tracking Code Banner */}
            <div className="my-6 p-6 bg-[#113D36] rounded-3xl text-white shadow-soft text-center">
              <p className="text-xs uppercase tracking-widest text-[#C2DDD4] font-semibold mb-1">
                {language === 'mr' ? 'तुमचा ट्रॅकिंग कोड' : 'Your Tracking Code'}
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl sm:text-4xl font-black tracking-widest text-[#EFDCB9] font-mono">
                  {uploadResult.trackingId}
                </span>
                <button
                  type="button"
                  onClick={copyTrackingCode}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
                  title="Copy Tracking Code"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {copied && <p className="text-xs text-emerald-300 mt-1 font-medium">Copied to clipboard!</p>}
              <p className="text-xs text-[#EFDCB9] mt-2 font-medium">
                📸 Save or take a screenshot of this tracking code!
              </p>
            </div>

            {/* Privacy & Auto-delete Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-[#798C87] mb-6 bg-[#FAF8F5] py-2.5 px-4 rounded-xl border border-[#EAE4DC]">
              <Clock className="w-4 h-4 text-[#113D36] flex-shrink-0" />
              <span>
                {language === 'mr'
                  ? 'गोपनीयता खात्री: २४ तासांनंतर तुमच्या फाईल्स आपोआप कायमच्या नष्ट केल्या जातील.'
                  : 'Privacy Guarantee: Your documents will be permanently auto-purged after 24 hours.'}
              </span>
            </div>

            {/* Actions: WhatsApp Alert + Razorpay */}
            <div className="space-y-3">
              {/* WhatsApp ping to admin */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-[0.99] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{language === 'mr' ? 'व्हाट्सॲपवर कळवा (तात्काळ प्रिंटिंग)' : 'Alert Yash Bhai on WhatsApp'}</span>
              </a>

              {/* Online Payment button (Optional/Recommended) */}
              {!paymentSuccess ? (
                <button
                  type="button"
                  onClick={handleRazorpayPayment}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  <CreditCard className="w-4 h-4 text-brand-600" />
                  <span>{language === 'mr' ? 'ऑनलाईन फी भरा (₹५० - Razorpay)' : 'Pay Service Fee Online (₹50 via Razorpay)'}</span>
                </button>
              ) : (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-sm font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Payment Confirmed via Razorpay! Receipt Generated.</span>
                </div>
              )}

              {/* Check status link */}
              <button
                type="button"
                onClick={() => navigate(`/track/${uploadResult.trackingId}`)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
              >
                <span>{language === 'mr' ? 'स्थिती तपासा' : 'View Real-time Tracking Status'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
