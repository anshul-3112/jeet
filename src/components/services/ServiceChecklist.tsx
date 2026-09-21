import React, { useState } from 'react';
import { CheckSquare, Square, Copy, Check, Info, FileCheck } from 'lucide-react';
import type { DocumentSection } from '../../data/services';
import { useLanguage } from '../../context/LanguageContext';

interface ServiceChecklistProps {
  documentSections: DocumentSection[];
  serviceName: string;
}

export const ServiceChecklist: React.FC<ServiceChecklistProps> = ({
  documentSections,
  serviceName
}) => {
  const { language } = useLanguage();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleItem = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCopyChecklist = () => {
    let text = `📄 Document Checklist for ${serviceName} - Jeet Digital E-Governance Seva Kendra, Nagpur:\n\n`;
    documentSections.forEach((sec) => {
      text += `• ${sec.title}\n`;
      sec.items.forEach((item) => {
        text += `  - ${item}\n`;
      });
      text += '\n';
    });
    text += '📍 Ayodhya Nagar Square, Nagpur | Contact: +91 8055203555 / 8550977877';

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-govnavy-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-brand-600" />
            <span>{language === 'mr' ? 'आवश्यक कागदपत्रांची यादी' : 'Required Documents Checklist'}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'mr'
              ? 'आपल्याकडे उपलब्ध असणारी कागदपत्रे टिक करा व उर्वरित कागदपत्रांसाठी आमच्याशी संपर्क साधा.'
              : 'Check off documents you have ready. Contact us for missing or alternative records.'}
          </p>
        </div>

        <button
          onClick={handleCopyChecklist}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors self-start sm:self-auto cursor-pointer"
          title="Copy checklist to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Checklist Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copy Checklist</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-6 space-y-8">
        {documentSections.map((section, sIndex) => (
          <div key={sIndex} className="space-y-3">
            <h4 className="text-sm font-bold text-govnavy-900 uppercase tracking-wide bg-slate-50 py-2 px-3.5 rounded-lg border border-slate-200/70">
              {language === 'mr' && section.titleMr ? section.titleMr : section.title}
            </h4>

            <div className="space-y-2.5 pl-1 sm:pl-2">
              {section.items.map((item, iIndex) => {
                const itemKey = `${sIndex}-${iIndex}`;
                const isChecked = !!checkedItems[itemKey];

                return (
                  <div
                    key={iIndex}
                    onClick={() => toggleItem(itemKey)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-emerald-50/70 border border-emerald-200/80 text-emerald-950'
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-slate-400 hover:text-slate-600 flex-shrink-0"
                      aria-label={isChecked ? 'Mark uncollected' : 'Mark collected'}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-300" />
                      )}
                    </button>

                    <div className="text-xs sm:text-sm leading-relaxed">
                      <span className={isChecked ? 'line-through opacity-75 font-medium' : 'font-medium'}>
                        {item}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Checklist Help Note */}
      <div className="mt-8 p-4 bg-amber-50/80 rounded-xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>{language === 'mr' ? 'महत्त्वाची टीप:' : 'Important Note:'}</strong>{' '}
          {language === 'mr'
            ? 'काही कागदपत्रे अपूर्ण असल्यास घाबरू नका. आमचे केंद्र शपथपत्र तयार करणे, जुने महसूल नोंदी मिळवणे व योग्य पर्याय शोधण्यात संपूर्ण मार्गदर्शन करते.'
            : 'If you are missing any specific document (such as older parental or school records), visit our Kendra in Ayodhya Nagar or contact us on WhatsApp. We provide complete guidance for affidavits, alternative records, and rectifications.'}
        </p>
      </div>
    </div>
  );
};
