export interface FAQItem {
  id: string;
  category: string;
  question: string;
  questionMr: string;
  answer: string;
  answerMr: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'Where is Jeet Digital E-Governance Seva Kendra located in Nagpur?',
    questionMr: 'जीत डिजिटल ई-गव्हर्नन्स सेवा केंद्र नागपुरात कुठे आहे?',
    answer: 'Our centre is conveniently located at 27A, Ayodhya Nagar Square, beside Balaji Jewelers and Lanjewar Cycle Stores, Nagpur-440024. You can easily find us or tap the "Get Directions" button on our website for direct navigation.',
    answerMr: 'आमचे केंद्र २७ए, अयोध्या नगर चौक, लांजेवार सायकल स्टोअर्स व बालाजी ज्वेलर्सच्या बाजूला, नागपूर-२४ येथे आहे.'
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'What are your working hours? Are you open 24 hours?',
    questionMr: 'केंद्राची वेळ काय आहे? २४ तास सेवा सुरू असते का?',
    answer: 'Yes, as per our business availability, we offer 24-hour accessibility and assistance. You can call our primary number (+91 80552 03555) or initiate a WhatsApp inquiry at any time for urgent document processing and advice.',
    answerMr: 'होय, आमच्याकडे २४ तास सेवा व मार्गदर्शन उपलब्ध आहे. आपण कधीही +91 80552 03555 या क्रमांकावर कॉल किंवा व्हॉट्सॲप करू शकता.'
  },
  {
    id: 'faq-3',
    category: 'Caste Validity',
    question: 'What documents are required for 12th Science Caste Validity?',
    questionMr: '१२ वी सायन्स विद्यार्थ्यांसाठी जात व्हॅलिडिटीला कोणती कागदपत्रे लागतात?',
    answer: 'As outlined in our official brochure, you will need: (1) Student’s Bonafide, Covering Letter, Form 15, Aadhaar, Photo, Email, Mobile, Online Caste Certificate, School TC/Nirgam; (2) Father’s and Grandfather’s School TC/Nirgam or Kotwal Book extract (P1/P2) / old revenue caste records; (3) Blood relative’s validity copy (if available); and (4) Affidavits Form No. 3 and Form No. 17. The process takes approximately 15 to 45 days.',
    answerMr: 'विद्यार्थ्याचा बोनाफाईड, कव्हरिंग लेटर, फॉर्म १५, आधार कार्ड, फोटो, ऑनलाईन जातीचा दाखला, शाळा सोडल्याचा दाखला व निर्गम उतारा, वडिलांचे व आजोबांचे टीसी/निर्गम किंवा कोतवाल बुक नक्कल, कुटुंबातील कोणाचे व्हॅलिडिटी असल्यास त्याची प्रत, आणि नमुना फॉर्म ३ व १७ चे शपथपत्र आवश्यक आहे.'
  },
  {
    id: 'faq-4',
    category: 'Documents',
    question: 'Can I apply for government services if I do not have all ancestral documents?',
    questionMr: 'माझ्याकडे जुने पुरावे कमी असल्यास काय करावे?',
    answer: 'Do not worry. Visit our Kendra at Ayodhya Nagar Square or connect with us on WhatsApp. We will inspect your existing papers, guide you on alternative secondary records (such as Kotwal Book extracts, school general registers, or revenue deeds), and prepare the required legal affidavits.',
    answerMr: 'काळजी करू नका. आपल्याकडील उपलब्ध कागदपत्रे घेऊन केंद्रावर या किंवा व्हॉट्सॲपवर संपर्क साधा. आम्ही पर्यायी पुरावे (कोतवाल नोंद, महसूल पुरावे, शपथपत्र) मिळवण्यासाठी मार्गदर्शन करू.'
  },
  {
    id: 'faq-5',
    category: 'Assistance',
    question: 'Can I submit my documents via WhatsApp without visiting in person?',
    questionMr: 'मी केंद्रावर न येता कागदपत्रे व्हॉट्सॲपवर पाठवून अर्ज करू शकतो का?',
    answer: 'Yes! For many digital services (such as PAN card, insurance renewals, online recruitment/admission forms, and basic certificate applications), you can share clear photos/PDFs via WhatsApp to +91 80552 03555. For biometric verification (like rent agreements or Aadhaar), a quick in-person visit is required.',
    answerMr: 'होय! पॅन कार्ड, विमा, नोकरी/प्रवेश फॉर्म व विविध सेवांसाठी आपण +91 80552 03555 या नंबरवर व्हॉट्सॲपद्वारे कागदपत्रे पाठवून अर्ज करू शकता. बायोमेट्रिक आवश्यक असणाऱ्या सेवांसाठी केंद्रावर यावे लागेल.'
  },
  {
    id: 'faq-6',
    category: 'General',
    question: 'Can I apply for a certificate or service on behalf of a family member?',
    questionMr: 'मी माझ्या कुटुंबातील सदस्यांसाठी अर्ज करू शकतो का?',
    answer: 'Yes, parents or legal guardians can apply for their children’s Caste, Domicile, Income, and Caste Validity certificates. Please carry authentic ID proofs for both the applicant and the family member.',
    answerMr: 'होय, पालक आपल्या पाल्यांसाठी जात, अधिवास, उत्पन्न दाखला व जात पडताळणीसाठी आवश्यक कागदपत्रांसह अर्ज करू शकतात.'
  },
  {
    id: 'faq-7',
    category: 'Process',
    question: 'How do I know my application status after applying?',
    questionMr: 'अर्जाची सद्यस्थिती (Status) मला कशी समजेल?',
    answer: 'Every government portal submission generates an official Application Acknowledgement Number / Token Receipt. We share this receipt with you immediately, and we also provide tracking updates on WhatsApp or phone.',
    answerMr: 'अर्ज भरल्यानंतर अधिकृत पावती (Acknowledgement Receipt) दिली जाते. आपण त्या पावतीवरील क्रमांकावरून किंवा आमच्याशी संपर्क साधून स्टेटस तपासू शकता.'
  },
  {
    id: 'faq-8',
    category: 'Services',
    question: 'Do you fill all types of online recruitment and college admission forms?',
    questionMr: 'सर्व प्रकारचे कॉलेज ॲडमिशन व सरकारी नोकरीचे फॉर्म भरून मिळतात का?',
    answer: 'Yes! As prominently featured at our Seva Kendra, we specialize in error-free online form submission for MHT-CET, CAP rounds, Engineering/Medical admissions, MahaDBT scholarships, Police Bharti, Talathi, SSC, Railway, and Banking exams.',
    answerMr: 'होय! सर्व प्रकारचे शैक्षणिक, सीईटी, कॉलेज ॲडमिशन, महाडीबीटी शिष्यवृत्ती, तसेच पोलीस, तलाठी, रेल्वे, एमपीएससी व बँकिंग भरतीचे फॉर्म अचूकपणे भरून दिले जातात.'
  }
];
