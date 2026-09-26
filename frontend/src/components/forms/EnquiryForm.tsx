import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Phone, User, FileText } from 'lucide-react';
import { servicesData } from '../../data/services';
import { getEnquiryWhatsAppUrl } from '../../utils/whatsapp';

interface EnquiryFormProps {
  preselectedService?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  preselectedService = '',
  className = '',
  title = 'Quick Service Enquiry',
  subtitle = 'Get immediate consultation & document checklist on WhatsApp or phone.'
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselectedService || (servicesData[0]?.name || ''));
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; service?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update selected service if preselectedService changes
  React.useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const validate = () => {
    const errs: { name?: string; phone?: string; service?: string } = {};
    if (!name.trim()) errs.name = 'Please enter your full name.';
    if (!phone.trim()) {
      errs.phone = 'Please enter your mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!service.trim()) errs.service = 'Please select the required service.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const formData = {
      name: name.trim(),
      phone: phone.trim(),
      service: service.trim(),
      note: note.trim()
    };

    // Save temporary submission in session for Thank You page
    sessionStorage.setItem('last_enquiry', JSON.stringify(formData));

    // Construct WhatsApp message URL
    const whatsappUrl = getEnquiryWhatsAppUrl(formData);

    // Open WhatsApp in a new tab for seamless user connection
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Redirect to Thank You page
    setTimeout(() => {
      navigate('/thank-you', { state: formData });
    }, 400);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-card border border-slate-100 p-6 sm:p-8 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-govnavy-900 tracking-tight flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-600" />
          <span>{title}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Field 1: Name */}
        <div>
          <label htmlFor="enquiry-name" className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name <span className="text-brand-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="enquiry-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-brand-500 focus:ring-brand-200'
                  : 'border-slate-200 focus:border-brand-600 focus:ring-brand-100'
              }`}
              required
            />
          </div>
          {errors.name && <p className="text-xs text-brand-600 mt-1 font-medium">{errors.name}</p>}
        </div>

        {/* Field 2: Phone Number */}
        <div>
          <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-slate-700 mb-1">
            WhatsApp / Mobile Number <span className="text-brand-600">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              id="enquiry-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              maxLength={10}
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.phone
                  ? 'border-brand-500 focus:ring-brand-200'
                  : 'border-slate-200 focus:border-brand-600 focus:ring-brand-100'
              }`}
              required
            />
          </div>
          {errors.phone && <p className="text-xs text-brand-600 mt-1 font-medium">{errors.phone}</p>}
        </div>

        {/* Field 3: Service Selection */}
        <div>
          <label htmlFor="enquiry-service" className="block text-xs font-semibold text-slate-700 mb-1">
            Service Needed <span className="text-brand-600">*</span>
          </label>
          <select
            id="enquiry-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={`w-full px-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              errors.service
                ? 'border-brand-500 focus:ring-brand-200'
                : 'border-slate-200 focus:border-brand-600 focus:ring-brand-100'
            }`}
            required
          >
            <option value="" disabled>Select a government / documentation service</option>
            {servicesData.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name} ({s.categoryName})
              </option>
            ))}
          </select>
          {errors.service && <p className="text-xs text-brand-600 mt-1 font-medium">{errors.service}</p>}
        </div>

        {/* Field 4: Optional Note / Query */}
        <div>
          <label htmlFor="enquiry-note" className="block text-xs font-semibold text-slate-700 mb-1">
            Note / Special Requirement (Optional)
          </label>
          <div className="relative">
            <textarea
              id="enquiry-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Urgent Caste Validity for 12th science admission, or need address correction in Aadhaar"
              rows={2}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:border-brand-600 focus:ring-brand-100 transition-all resize-none"
            />
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-[11px] text-slate-400 leading-tight">
          🔒 Your details are kept confidential and used only to respond to your specific service query.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          id="submit-enquiry-btn"
        >
          {isSubmitting ? (
            <span>Connecting to WhatsApp...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit &amp; Connect on WhatsApp</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
