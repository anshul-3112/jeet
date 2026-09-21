export type ServiceCategory = 'identity-travel' | 'certificates' | 'business-legal-financial';

export interface DocumentSection {
  title: string;
  titleMr?: string;
  items: string[];
  itemsMr?: string[];
}

export interface ServiceItem {
  slug: string;
  name: string;
  nameMr: string;
  category: ServiceCategory;
  categoryName: string;
  categoryNameMr: string;
  shortDescription: string;
  shortDescriptionMr: string;
  detailedDescription: string;
  detailedDescriptionMr: string;
  whoIsThisFor?: string[];
  whoIsThisForMr?: string[];
  documentSections: DocumentSection[];
  processSteps: string[];
  turnaroundTime?: string;
  turnaroundTimeMr?: string;
  iconName: string;
  isPopular?: boolean;
  featuredNotice?: string;
  featuredNoticeMr?: string;
  relatedSlugs: string[];
}

export const serviceCategories: { id: ServiceCategory; name: string; nameMr: string; description: string }[] = [
  {
    id: 'identity-travel',
    name: 'Identity & Travel Documents',
    nameMr: 'ओळख व प्रवास कागदपत्रे',
    description: 'Aadhaar, PAN, Passport, Voter ID & Driving Licences'
  },
  {
    id: 'certificates',
    name: 'Government Certificates',
    nameMr: 'शासकीय व महसूल प्रमाणपत्रे',
    description: 'Caste Validity, Caste, Income, Domicile, EWS & Non-Creamy Layer'
  },
  {
    id: 'business-legal-financial',
    name: 'Business, Legal & Utility Services',
    nameMr: 'व्यावसायिक, कायदेशीर व इतर सेवा',
    description: 'Gumasta, Food Licence, Gazette, Affidavits, Rent Agreement & MSEB'
  }
];

export const servicesData: ServiceItem[] = [
  // 1. Aadhaar Card
  {
    slug: 'aadhaar-card',
    name: 'Aadhaar Card Services',
    nameMr: 'आधार कार्ड सेवा',
    category: 'identity-travel',
    categoryName: 'Identity & Travel',
    categoryNameMr: 'ओळख व प्रवास',
    shortDescription: 'Assistance for Aadhaar demographic updates, address change, mobile linkage verification, and reprint.',
    shortDescriptionMr: 'आधार पत्ता बदल, नाव सुधारणा, मोबाईल लिंकिंग व नवीन कार्ड प्रिंट सहाय्य.',
    detailedDescription: 'Get hassle-free assistance for Aadhaar card related services including address updates, demographic corrections, PVC smart card printing, and checking application or enrollment status.',
    detailedDescriptionMr: 'आधार कार्डशी संबंधित पत्ता बदल, माहिती सुधारणा, स्मार्ट कार्ड प्रिंटिंग व नावनोंदणी संदर्भात संपूर्ण मार्गदर्शन व सेवा.',
    whoIsThisFor: [
      'Individuals needing to update their home address or mobile number',
      'Citizens requiring a durable PVC Smart Card print of their Aadhaar',
      'Minors updating mandatory biometric or demographic details'
    ],
    documentSections: [
      {
        title: 'Required Documents (Subject to update type)',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Existing Aadhaar Card or 28-digit Enrollment Slip (EID)',
          'Proof of Identity (POI) such as Voter ID, PAN Card, Passport, or Driving Licence',
          'Proof of Address (POA) such as Electricity Bill, Ration Card, Bank Passbook, or Rent Agreement',
          'Active Mobile Number for OTP authentication'
        ]
      }
    ],
    processSteps: [
      'Bring or share your existing Aadhaar number and the details to be updated',
      'Verification of supporting valid address or identity proofs',
      'Submission via official UIDAI portal / guidance for biometric authorization',
      'Acknowledgement slip generation for online tracking'
    ],
    turnaroundTime: 'Typically updated within 5 to 15 working days as per UIDAI processing',
    turnaroundTimeMr: 'UIDAI नियमांनुसार साधारण ५ ते १५ कामकाजाचे दिवस',
    iconName: 'Fingerprint',
    isPopular: true,
    relatedSlugs: ['pan-card', 'smart-card-aadhaar-epic', 'passport']
  },

  // 2. PAN Card
  {
    slug: 'pan-card',
    name: 'PAN Card (New & Correction)',
    nameMr: 'पॅन कार्ड (नवीन व सुधारणा)',
    category: 'identity-travel',
    categoryName: 'Identity & Travel',
    categoryNameMr: 'ओळख व प्रवास',
    shortDescription: 'Apply for fresh PAN card, minor PAN, instant e-PAN, or name/DOB/father’s name corrections.',
    shortDescriptionMr: 'नवीन पॅन कार्ड, नाव/जन्मतारीख बदल किंवा हरवलेल्या पॅन कार्डसाठी अर्ज करा.',
    detailedDescription: 'Complete assistance for NSDL / UTIITSL PAN card applications. Whether you need a fresh Permanent Account Number for tax, banking, or employment, or need to correct existing details, we manage the entire documentation flow.',
    detailedDescriptionMr: 'नवीन पॅन कार्ड मिळवण्यासाठी किंवा जुन्या पॅन कार्डमधील चुका दुरुस्त करण्यासाठी जलद व अचूक ऑनलाईन अर्ज सहाय्य.',
    whoIsThisFor: [
      'Students and first-time applicants opening bank accounts or joining jobs',
      'Individuals needing name, date of birth, or signature corrections',
      'Minors applying through legal guardian authorization',
      'Businesses and firms requiring commercial PAN'
    ],
    documentSections: [
      {
        title: 'Documents Required for PAN Application',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Aadhaar Card (linked with active mobile for instant e-KYC)',
          'Two passport-size color photographs (for physical form mode)',
          'Proof of Identity and Date of Birth (Aadhaar / School Leaving Certificate / Voter ID)',
          'Existing PAN details (if applying for correction/reprint)'
        ]
      }
    ],
    processSteps: [
      'Submit your Aadhaar card and photographs at our centre or via WhatsApp',
      'Selection of appropriate form (Form 49A for Indian citizens / Form 49AA / Correction form)',
      'Digital e-Sign and submission on official NSDL/UTI portal',
      'Receive instant e-PAN on email and original PVC PAN card at your doorstep'
    ],
    turnaroundTime: 'e-PAN generated within 24-72 hours; physical card delivered in 10-15 days',
    turnaroundTimeMr: 'e-PAN २४ ते ७२ तासांत; मूळ कार्ड १० ते १५ दिवसांत पोस्टाने प्राप्त होते',
    iconName: 'CreditCard',
    isPopular: true,
    relatedSlugs: ['aadhaar-card', 'smart-card-aadhaar-epic', 'income-certificate']
  },

  // 3. Passport
  {
    slug: 'passport',
    name: 'Passport Seva Online Assistance',
    nameMr: 'पासपोर्ट सेवा ऑनलाईन अर्ज',
    category: 'identity-travel',
    categoryName: 'Identity & Travel',
    categoryNameMr: 'ओळख व प्रवास',
    shortDescription: 'Fresh passport, reissue/renewal, Tatkaal passport, and Police Clearance Certificate (PCC) booking.',
    shortDescriptionMr: 'नवीन पासपोर्ट, नूतनीकरण, तात्काळ पासपोर्ट व पोलीस क्लिअरन्स (PCC) अर्ज.',
    detailedDescription: 'Expert guidance for Passport Seva Kendra (PSK / POPSK) appointments in Nagpur. We handle profile registration, document annexures, application fee payment, and appointment scheduling without errors.',
    detailedDescriptionMr: 'पासपोर्ट सेवा केंद्र नागपूर येथे अपॉइंटमेंट, अर्ज भरणे, कागदपत्रे पडताळणी व संपूर्ण मार्गदर्शन.',
    whoIsThisFor: [
      'Citizens planning international travel for tourism, pilgrimage, or business',
      'Students going abroad for higher education',
      'Working professionals requiring PCC or passport renewal'
    ],
    documentSections: [
      {
        title: 'Essential Passport Documentation',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Aadhaar Card with full DOB matching other records',
          'PAN Card / Voter ID',
          'Proof of Date of Birth (Birth Certificate or 10th/12th Board Passing Certificate/TC)',
          'Proof of Present Address (Passbook with photo, Electricity bill, or Aadhaar)',
          'Non-ECR Proof (10th Standard Passing Marksheet / Higher Education Certificate)',
          'Old Passport booklet (if applying for renewal/reissue)'
        ]
      }
    ],
    processSteps: [
      'Document review and eligibility verification',
      'Online Passport Seva portal application submission',
      'Fee payment and convenient appointment slot booking at Nagpur PSK',
      'Guidance for physical verification and police clearance process'
    ],
    turnaroundTime: 'Normal: 15-30 days after PSK visit; Tatkaal: 3-7 days',
    turnaroundTimeMr: 'सामान्य: १५ ते ३० दिवस; तात्काळ: ३ ते ७ दिवस',
    iconName: 'Plane',
    isPopular: true,
    relatedSlugs: ['driving-licence', 'pan-card', 'aadhaar-card']
  },

  // 4. Smart Card Aadhaar / EPIC
  {
    slug: 'smart-card-aadhaar-epic',
    name: 'Smart Card Aadhaar & Voter ID (EPIC)',
    nameMr: 'स्मार्ट कार्ड आधार व मतदान कार्ड (EPIC)',
    category: 'identity-travel',
    categoryName: 'Identity & Travel',
    categoryNameMr: 'ओळख व प्रवास',
    shortDescription: 'High-definition PVC smart card printing for Aadhaar Card and Voter ID (EPIC) with QR security.',
    shortDescriptionMr: 'आधार कार्ड व मतदान ओळखपत्राचे वॉटरप्रूफ पीव्हीसी (PVC) स्मार्ट कार्ड प्रिंटिंग.',
    detailedDescription: 'Protect your paper documents with durable, waterproof, pocket-friendly PVC smart cards. We print official Aadhaar and Election Photo Identity Cards (EPIC) with high-clarity barcodes and microtext.',
    detailedDescriptionMr: 'खराब न होणारे आणि सुरक्षित पीव्हीसी प्लास्टिक स्मार्ट कार्ड त्वरित प्रिंट करून मिळवा.',
    whoIsThisFor: [
      'Citizens carrying torn or faded paper Aadhaar / Voter IDs',
      'People who need a compact, durable wallet card for daily verification'
    ],
    documentSections: [
      {
        title: 'Requirements for Smart Card Printing',
        titleMr: 'आवश्यक तपशील',
        items: [
          'Aadhaar PDF file with password OR Aadhaar Number with OTP verification',
          'Voter EPIC Number or downloadable e-EPIC file',
          'Self-verification of photo and text clarity'
        ]
      }
    ],
    processSteps: [
      'Provide your e-Aadhaar PDF or Voter EPIC number',
      'Digital layout inspection and color calibration',
      'Instant high-density thermal PVC card printing at our centre'
    ],
    turnaroundTime: 'Immediate / Ready in 10-20 minutes at centre or express collection',
    turnaroundTimeMr: 'केंद्रावर त्वरित १० ते २० मिनिटांत उपलब्ध',
    iconName: 'QrCode',
    isPopular: false,
    relatedSlugs: ['aadhaar-card', 'pan-card', 'driving-licence']
  },

  // 5. Driving Licence
  {
    slug: 'driving-licence',
    name: 'Driving Licence Services',
    nameMr: 'ड्रायव्हिंग लायसन्स सेवा',
    category: 'identity-travel',
    categoryName: 'Identity & Travel',
    categoryNameMr: 'ओळख व प्रवास',
    shortDescription: 'Sarathi Parivahan online application for Learner’s Licence, Permanent DL, Renewal, and Address Change.',
    shortDescriptionMr: 'लर्निंग लायसन्स, पक्के ड्रायव्हिंग लायसन्स, नूतनीकरण व पत्ता बदल ऑनलाईन अर्ज.',
    detailedDescription: 'Complete assistance for Maharashtra RTO Sarathi portal procedures. We assist with Learner’s Licence test booking, DL test appointment scheduling, DL renewal, and duplicate licence requests.',
    detailedDescriptionMr: 'महाराष्ट्र आरटीओ (RTO) च्या नियमांनुसार लर्निंग व पक्के ड्रायव्हिंग लायसन्ससाठी अचूक अर्ज.',
    whoIsThisFor: [
      'Applicants aged 18+ applying for motorcycle with gear (MCWG) or light motor vehicle (LMV)',
      'Applicants aged 16-18 applying for non-gear two-wheelers',
      'Existing drivers needing DL renewal or badge endorsement'
    ],
    documentSections: [
      {
        title: 'Required Documents for Driving Licence',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Aadhaar Card (Aadhaar authentication enabled)',
          'Proof of Age & Date of Birth (10th TC, Birth Certificate, or Passport)',
          'Proof of Address (Electricity bill, Ration card, or Aadhaar)',
          'Passport size photograph and signature specimen',
          'Medical Certificate Form 1A (for applicants above 40 years or commercial licences)'
        ]
      }
    ],
    processSteps: [
      'Submission of application on Parivahan Sarathi portal',
      'Upload of supporting documents and photo/signature',
      'Slot booking for LL test / RTO track test',
      'Application status tracking until licence dispatch'
    ],
    turnaroundTime: 'Learner licence within 1-3 days; permanent licence following RTO driving test',
    turnaroundTimeMr: 'लर्निंग लायसन्स १-३ दिवसांत; पक्के लायसन्स आरटीओ चाचणीनंतर',
    iconName: 'Car',
    isPopular: true,
    relatedSlugs: ['passport', 'aadhaar-card', 'pan-card']
  },

  // 6. Caste Validity (FEATURED SOURCE-AUTHENTIC SERVICE)
  {
    slug: 'caste-validity',
    name: 'Caste Validity Certificate (जात पडताळणी)',
    nameMr: 'जात पडताळणी / व्हॅलिडिटी प्रमाणपत्र',
    category: 'certificates',
    categoryName: 'Certificates',
    categoryNameMr: 'शासकीय प्रमाणपत्रे',
    shortDescription: 'Comprehensive CCVIS / Barti online form filling and document dossier preparation for 12th Science & Degree students.',
    shortDescriptionMr: '१२ वी सायन्स, इंजिनिअरिंग, मेडिकल, डीएड/बीएड, पदवी व पदविका विद्यार्थ्यांसाठी जात वैधता अर्ज.',
    detailedDescription: 'Crucial verification certificate for students in 12th Science, Engineering, Medical, Polytechnic, Diploma, and Degree courses seeking admission under reserved categories. We assemble the exact family tree documentation, old revenue records, and required affidavits (Form 3 & Form 17) to ensure smooth approval from the District Caste Scrutiny Committee.',
    detailedDescriptionMr: 'विद्यार्थ्यांनी लक्ष द्या! आजच तुमची जात व्हॅलिडिटी प्रक्रिया पूर्ण करा! १२ वी सायन्स, डिप्लोमा व व्यावसायिक शिक्षणासाठी जात वैधता प्रमाणपत्र अत्यंत आवश्यक आहे. आम्ही सर्व आवश्यक कागदपत्रांची अचूक मांडणी करून देतो.',
    whoIsThisFor: [
      'Students currently studying in 12th Standard Science stream (१२ वी सायन्स)',
      'Students pursuing Diploma, Degree, Engineering, Pharmacy, Medical, or Agricultural courses',
      'Candidates appearing for government employment or reserved category appointments'
    ],
    documentSections: [
      {
        title: "1. Student's Personal Documents (विद्यार्थ्याची कागदपत्रे)",
        titleMr: '१. विद्यार्थ्याची कागदपत्रे',
        items: [
          'Original College Bonafide Certificate (विद्यार्थ्याचा बोनाफाईड)',
          'College Covering Letter / Recommendation Letter (कव्हरिंग लेटर)',
          'Form No. 15 (फॉर्म नंबर १५ - कॉलेज स्वाक्षरीसह)',
          'Student Aadhaar Card (विद्यार्थ्याचे आधार कार्ड)',
          'Passport Size Color Photograph (पासपोर्ट आकाराचा फोटो)',
          'Active Mobile Number & Email ID (ई-मेल आयडी आणि मोबाईल नंबर)',
          'Online Extracted Caste Certificate (ऑनलाईन काढलेला जातीचा दाखला)',
          'School Leaving Certificate (TC - Primary or Secondary School Leaving / शाळा सोडल्याचा दाखला)',
          'Nirgam Utara / General Register Extract (शाळेचा निर्गम उतारा)'
        ]
      },
      {
        title: "2. Family & Ancestral Records (कागदपत्रे - कुटुंबाची)",
        titleMr: '२. कागदपत्रे (कुटुंबाची)',
        items: [
          "Father's School Leaving Certificate (TC) and Nirgam Utara (वडिलांचा टीसी आणि निर्गम उतारा)",
          "Grandfather's Primary School Leaving Certificate (TC) and Nirgam Utara (आजोबांचा टीसी - प्राथमिक आणि निर्गम उतारा)",
          "Kotwal Book Extract (P1 / P2) / Hakka Abhilekh (Right of Records) / Sale Deed / Old Revenue Records mentioning caste (कोतवाल बुक नक्कल पी १ / पी २ / अधिकार अभिलेख, विक्री पत्र व महसुली पुरावे ज्यात जातीची नोंद असेल)"
        ]
      },
      {
        title: "3. Relative's Validity Proof (कुटुंबातील जात वैधता प्रमाणपत्र)",
        titleMr: '३. कुटुंबातील जात वैधता',
        items: [
          'Validity Certificate of any blood relative (Father, Uncle, Sibling, Paternal Grandfather) if available (कुटुंबात कोणाचे वैध प्रमाणपत्र (Validity) असल्यास त्याची प्रत जोडावी)'
        ]
      },
      {
        title: '4. Affidavits & Declarations (शपथपत्रे)',
        titleMr: '४. आवश्यक शपथपत्रे (Affidavits)',
        items: [
          'Affidavit in prescribed format Namuna Form No. 3 (नमुना फॉर्म नंबर ३)',
          'Affidavit in prescribed format Namuna Form No. 17 (नमुना फॉर्म नंबर १७)'
        ]
      }
    ],
    processSteps: [
      'Initial scrutiny of student, parental, and ancestral caste records',
      'Drafting of required affidavits (Namuna Form 3 and Namuna Form 17)',
      'Online application filing on CCVIS / Barti portal with document scanning',
      'Compilation of physical dossier and guidance for submission to the District Caste Scrutiny Committee / Social Welfare Office (संबंधित जिल्ह्याच्या समाज कल्याण कार्यालयात प्रत जमा करणे)',
      'Tracking scrutiny committee notifications and hearing updates'
    ],
    turnaroundTime: 'साधारणपणे १५ ते ४५ दिवसांत पूर्ण होते (Typically completed in approx. 15 to 45 days)',
    turnaroundTimeMr: 'वैधता प्रक्रिया साधारणपणे १५ ते ४५ दिवसांत पूर्ण होते',
    iconName: 'ShieldCheck',
    isPopular: true,
    featuredNotice: 'सूचना: वेळ न घालवता आजच प्रक्रिया सुरू करा; ही प्रक्रिया पुढील शिक्षण आणि प्रवेशासाठी अत्यंत महत्त्वाची आहे!',
    featuredNoticeMr: 'सूचना: वेळ न घालवता आजच प्रक्रिया सुरू करा; ही प्रक्रिया पुढील शिक्षण आणि प्रवेशासाठी अत्यंत महत्त्वाची आहे!',
    relatedSlugs: ['caste-certificate', 'income-certificate', 'domicile-certificate', 'ews-certificate']
  },

  // 7. Caste Certificate
  {
    slug: 'caste-certificate',
    name: 'Caste Certificate (जातीचा दाखला)',
    nameMr: 'जातीचा दाखला (Caste Certificate)',
    category: 'certificates',
    categoryName: 'Certificates',
    categoryNameMr: 'शासकीय प्रमाणपत्रे',
    shortDescription: 'Official Aaple Sarkar Tehsildar caste certificate for SC, ST, VJNT, OBC, and SBC categories.',
    shortDescriptionMr: 'अनुसूचित जाती, जमाती, विमुक्त जाती, भटक्या जमाती, इतर मागासवर्गीय जातीचा दाखला.',
    detailedDescription: 'Get your official Maharashtra Caste Certificate issued by the competent Sub-Divisional Officer (SDO) / Tehsildar via the Aaple Sarkar portal. Essential for school admissions, scholarships, competitive exams, and government schemes.',
    detailedDescriptionMr: 'आपले सरकार पोर्टलद्वारे सक्षम अधिकाऱ्यांकडून जातीचा अधिकृत दाखला मिळवण्यासाठी ऑनलाईन अर्ज.',
    whoIsThisFor: [
      'Students and individuals belonging to SC / ST / VJNT / OBC / SBC categories',
      'Applicants seeking educational fee concessions and reserved category admissions'
    ],
    documentSections: [
      {
        title: 'Documents Required for Caste Certificate',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Applicant Aadhaar Card and 2 Passport Size Photos',
          "Applicant's School Leaving Certificate (TC) mentioning caste and religion",
          "Father's School Leaving Certificate (TC) / Nirgam Utara showing caste",
          'Proof of caste prior to cutoff year (1950 for SC/ST, 1961 for VJNT, 1967 for OBC/SBC)',
          'Ration Card / Electricity Bill for address proof',
          'Self-Declaration / Affidavit Form'
        ]
      }
    ],
    processSteps: [
      'Verification of ancestral residency and caste records prior to prescribed cutoff dates',
      'Preparation of self-declaration affidavit',
      'Application submission on Aaple Sarkar portal',
      'Collection of digitally signed Tehsildar certificate'
    ],
    turnaroundTime: 'Typically 15 to 21 working days as per Maharashtra Right to Public Services Act',
    turnaroundTimeMr: 'लोकसेवा हक्क कायद्यानुसार साधारण १५ ते २१ कामकाजाचे दिवस',
    iconName: 'Award',
    isPopular: true,
    relatedSlugs: ['caste-validity', 'non-creamy-layer-central-caste', 'income-certificate']
  },

  // 8. Income Certificate
  {
    slug: 'income-certificate',
    name: 'Income Certificate (उत्पन्न दाखला)',
    nameMr: 'उत्पन्नाचा दाखला (Income Certificate)',
    category: 'certificates',
    categoryName: 'Certificates',
    categoryNameMr: 'शासकीय प्रमाणपत्रे',
    shortDescription: '1-Year and 3-Year Tehsildar Income Certificates for scholarships, fee concessions, and government welfare schemes.',
    shortDescriptionMr: '१ वर्ष व ३ वर्षांचा अधिकृत तहसीलदारांचा उत्पन्नाचा दाखला.',
    detailedDescription: 'Authentic income certificate issued by the Revenue Department / Tehsildar for scholarship applications (MahaDBT), college admission fee waivers, government ration benefits, and medical assistance.',
    detailedDescriptionMr: 'महाडीबीटी शिष्यवृत्ती, शैक्षणिक सवलती व विविध शासकीय योजनांसाठी उत्पन्नाचा दाखला.',
    whoIsThisFor: [
      'Students applying for MahaDBT scholarships and college fee reductions',
      'Families applying for Ayushman Bharat, EWS certificates, or welfare subsidies'
    ],
    documentSections: [
      {
        title: 'Documents for Income Certificate',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Aadhaar Card of Applicant and Head of Family',
          'Ration Card (all pages)',
          'Proof of Income (Salary Slip / Form 16 / ITR / Talathi Report / Self-Declaration)',
          'Electricity Bill or Property Tax Receipt',
          'Passport-size photograph'
        ]
      }
    ],
    processSteps: [
      'Review of family income proof or salary/agricultural income details',
      'Affidavit / Self-declaration preparation',
      'Filing on Aaple Sarkar portal',
      'Delivery of digitally signed barcode certificate'
    ],
    turnaroundTime: 'Usually 7 to 15 working days',
    turnaroundTimeMr: 'साधारण ७ ते १५ कामकाजाचे दिवस',
    iconName: 'Receipt',
    isPopular: true,
    relatedSlugs: ['domicile-certificate', 'ews-certificate', 'caste-certificate']
  },

  // 9. Domicile & Nationality Certificate
  {
    slug: 'domicile-certificate',
    name: 'Domicile & Nationality Certificate (अधिवास दाखला)',
    nameMr: 'वय, राष्ट्रीयत्व व अधिवास दाखला (Domicile)',
    category: 'certificates',
    categoryName: 'Certificates',
    categoryNameMr: 'शासकीय प्रमाणपत्रे',
    shortDescription: 'Age, Nationality, and Domicile Certificate of Maharashtra State issued by Revenue Authorities.',
    shortDescriptionMr: 'महाराष्ट्र राज्याचा अधिवास (Domicile) व भारतीय राष्ट्रीयत्वाचा अधिकृत दाखला.',
    detailedDescription: 'A compulsory document verifying continuous 15-year residence in the State of Maharashtra and Indian nationality. Mandatory for state quota engineering, medical, MBA, and government recruitment seats.',
    detailedDescriptionMr: 'महाराष्ट्रातील उच्च शिक्षण, नोकरी व सरकारी कोट्यासाठी अधिवास दाखला अत्यंत आवश्यक आहे.',
    whoIsThisFor: [
      'All students appearing for MHT-CET, NEET state quota, CAP rounds, and ITI/Polytechnic admissions',
      'Applicants applying for Maharashtra Police, MPSC, and state government jobs'
    ],
    documentSections: [
      {
        title: 'Documents Required for Domicile Certificate',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Applicant Aadhaar Card & 2 Photos',
          'Applicant School Leaving Certificate (TC) or Birth Certificate',
          'Proof of continuous 15 years residence in Maharashtra (School TC, Residence certificate, Light bills, Ration card)',
          "Father's Domicile Certificate / School TC / Property documents (if applicant is minor)",
          'Ration Card and Electricity Bill'
        ]
      }
    ],
    processSteps: [
      'Verification of 15-year residential evidence in Maharashtra',
      'Aaple Sarkar portal application upload',
      'Tehsildar scrutiny and digital signature approval'
    ],
    turnaroundTime: '7 to 15 working days',
    turnaroundTimeMr: 'साधारण ७ ते १५ कामकाजाचे दिवस',
    iconName: 'Home',
    isPopular: true,
    relatedSlugs: ['income-certificate', 'caste-certificate', 'ews-certificate']
  },

  // 10. EWS Certificate
  {
    slug: 'ews-certificate',
    name: 'EWS Certificate (ई.डब्ल्यू.एस. प्रमाणपत्र)',
    nameMr: 'ई.डब्ल्यू.एस. प्रमाणपत्र (EWS Certificate)',
    category: 'certificates',
    categoryName: 'Certificates',
    categoryNameMr: 'शासकीय प्रमाणपत्रे',
    shortDescription: 'Economically Weaker Section (10% Reservation) eligibility certificate for Central & Maharashtra Government quotas.',
    shortDescriptionMr: 'आर्थिकदृष्ट्या दुर्बल घटकांसाठी १०% आरक्षण पात्रता प्रमाणपत्र.',
    detailedDescription: 'Certification for candidates from open / general category fulfilling the EWS income and asset eligibility criteria to avail 10% reservation in government jobs and educational institutions.',
    detailedDescriptionMr: 'खुल्या प्रवर्गातील पात्र उमेदवारांसाठी १० टक्के आरक्षण मिळवण्यासाठी ई.डब्ल्यू.एस. प्रमाणपत्र.',
    whoIsThisFor: [
      'General / Open category students and job seekers having family income within EWS guidelines'
    ],
    documentSections: [
      {
        title: 'Documents Required for EWS Certificate',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Aadhaar Card and PAN Card',
          'School Leaving Certificate / Birth Certificate (proof of residing in Maharashtra before 1967)',
          'Income Certificate of family for previous financial year',
          '7/12 Extract or Property Tax Receipt (Asset verification)',
          'Ration Card and Self-Declaration Affidavit'
        ]
      }
    ],
    processSteps: [
      'Asset and income eligibility check',
      'Drafting of EWS specific undertaking / affidavit',
      'Submission through competent Revenue authority portal'
    ],
    turnaroundTime: '15 to 21 working days',
    turnaroundTimeMr: 'साधारण १५ ते २१ कामकाजाचे दिवस',
    iconName: 'FileCheck2',
    isPopular: true,
    relatedSlugs: ['income-certificate', 'domicile-certificate', 'non-creamy-layer-central-caste']
  },

  // 11. Central Caste & Non-Creamy Layer (OBC-NCL)
  {
    slug: 'non-creamy-layer-central-caste',
    name: 'Non-Creamy Layer (NCL) & Central Caste',
    nameMr: 'नॉन-क्रिमीलेअर व केंद्रीय जात प्रमाणपत्र (Central Caste)',
    category: 'certificates',
    categoryName: 'Certificates',
    categoryNameMr: 'शासकीय प्रमाणपत्रे',
    shortDescription: 'Maharashtra Non-Creamy Layer certificate (valid for 3 years) and Central Government format OBC/SC/ST certificates.',
    shortDescriptionMr: 'ओबीसी/एसबीसी/व्हीजेएनटी प्रवर्गासाठी नॉन-क्रिमीलेअर व केंद्रीय सरकारी नोकऱ्यांसाठी सेंट्रल कास्ट.',
    detailedDescription: 'Essential certificate proving that the applicant does not belong to the Creamy Layer. Required for OBC, VJNT, and SBC candidates for competitive admissions and Central Govt examinations (UPSC, SSC, Railway, Banking).',
    detailedDescriptionMr: 'केंद्रीय व राज्यस्तरीय परीक्षा, शिष्यवृत्ती व नोकरीसाठी नॉन-क्रिमीलेअर प्रमाणपत्र.',
    whoIsThisFor: [
      'OBC / VJNT / SBC students seeking reservation benefits in admissions and scholarships',
      'Aspirants applying for Central Government jobs under the Central OBC list'
    ],
    documentSections: [
      {
        title: 'Required Documents for NCL / Central Caste',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Existing State Caste Certificate',
          'Last 3 consecutive years Income Certificates from Tehsildar / Form 16',
          'Aadhaar Card and School Leaving Certificate',
          "Father's School Leaving Certificate / Service records",
          'Ration Card and Self-Declaration'
        ]
      }
    ],
    processSteps: [
      'Assessment of 3-year income documents',
      'Online filing on Aaple Sarkar / Central portal format',
      'Verification by Competent Sub-Divisional Officer'
    ],
    turnaroundTime: '15 to 21 working days',
    turnaroundTimeMr: 'साधारण १५ ते २१ कामकाजाचे दिवस',
    iconName: 'FileBadge',
    isPopular: true,
    relatedSlugs: ['caste-certificate', 'caste-validity', 'income-certificate']
  },

  // 12. Gumasta (Shop & Establishment Licence)
  {
    slug: 'gumasta-shop-licence',
    name: 'Gumasta Licence (Shop & Establishment)',
    nameMr: 'गुमास्ता परवाना (Shop Act / MSME Udyam)',
    category: 'business-legal-financial',
    categoryName: 'Business & Legal',
    categoryNameMr: 'व्यावसायिक व कायदेशीर',
    shortDescription: 'Shop Act registration for new shops, offices, and commercial establishments in Nagpur, plus Udyam MSME.',
    shortDescriptionMr: 'नागपुरातील दुकाने, कार्यालये व व्यवसायांसाठी शॉप ॲक्ट गुमास्ता व उद्यम नोंदणी.',
    detailedDescription: 'Mandatory commercial registration under the Maharashtra Shops and Establishments Act. Essential for opening current bank accounts, acquiring business loans, GST registration, and legal business operation.',
    detailedDescriptionMr: 'दुकान, व्यवसाय सुरू करण्यासाठी व चालू बँक खाते (Current Account) उघडण्यासाठी गुमास्ता परवाना.',
    whoIsThisFor: [
      'Retail shop owners, traders, commercial service providers, and office owners in Nagpur',
      'New startups and MSME entrepreneurs'
    ],
    documentSections: [
      {
        title: 'Documents Required for Gumasta Registration',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Aadhaar Card and PAN Card of the Proprietor / Partners',
          'Passport-size photograph of the Owner',
          'Shop / Office Electricity Bill or Property Tax Receipt',
          'Rent Agreement & NOC from Landlord (if rented premises)',
          'Photo of the Shop with Signboard displaying name in Marathi / English',
          'Partnership Deed / Incorporation Certificate (if applicable)'
        ]
      }
    ],
    processSteps: [
      'Collection of business name, category, and premises details',
      'Document and shop photo verification',
      'Filing on Maharashtra Labour Department portal / Municipal portal',
      'Instant / Fast issue of digitally approved Gumasta Certificate'
    ],
    turnaroundTime: 'Typically 1 to 3 working days',
    turnaroundTimeMr: 'साधारण १ ते ३ कामकाजाचे दिवस',
    iconName: 'Store',
    isPopular: true,
    relatedSlugs: ['food-licence', 'registered-rent-agreement', 'loan-services']
  },

  // 13. Food Licence (FSSAI)
  {
    slug: 'food-licence',
    name: 'Food Licence (FSSAI Registration)',
    nameMr: 'अन्न परवाना (FSSAI Food Licence)',
    category: 'business-legal-financial',
    categoryName: 'Business & Legal',
    categoryNameMr: 'व्यावसायिक व कायदेशीर',
    shortDescription: 'FSSAI Basic Registration and State Licence for hotels, restaurants, food stalls, and manufacturers.',
    shortDescriptionMr: 'हॉटेल्स, खाद्यपदार्थ विक्रेते, मेस व डेअरीसाठी अधिकृत एफएसएसएआय अन्न परवाना.',
    detailedDescription: 'Compulsory compliance from the Food Safety and Standards Authority of India (FSSAI). Protect your business from regulatory penalties and gain customer trust for all food manufacturing, handling, catering, or selling activities.',
    detailedDescriptionMr: 'अन्न सुरक्षा कायद्यानुसार सर्व खाद्य व्यवसायिकांसाठी अनिवार्य असणारा परवाना.',
    whoIsThisFor: [
      'Restaurants, cafes, bakeries, cloud kitchens, and street food stalls',
      'Grocery stores, dairy shops, mess services, and tiffin centers in Nagpur'
    ],
    documentSections: [
      {
        title: 'Required Documents for FSSAI Licence',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Photo and Aadhaar Card of the Food Business Operator (FBO)',
          'Proof of Business Address (Electricity Bill / Rent Agreement)',
          'List of Food items / categories handled',
          'NOC / Declaration form'
        ]
      }
    ],
    processSteps: [
      'Determination of appropriate category (Basic Registration vs State Licence)',
      'Online application on FoSCoS FSSAI portal',
      'Fee payment and application tracking'
    ],
    turnaroundTime: 'Basic Registration in 5-10 days; State licence subject to inspection',
    turnaroundTimeMr: 'नोंदणी साधारण ५ ते १० कामकाजाचे दिवस',
    iconName: 'Utensils',
    isPopular: true,
    relatedSlugs: ['gumasta-shop-licence', 'registered-rent-agreement', 'affidavits']
  },

  // 14. Gazette (Name Change / Correction)
  {
    slug: 'gazette',
    name: 'Government Gazette (नाव बदल / राजपत्र)',
    nameMr: 'शासकीय राजपत्र (Gazette - नाव बदल व दुरुस्ती)',
    category: 'business-legal-financial',
    categoryName: 'Business & Legal',
    categoryNameMr: 'व्यावसायिक व कायदेशीर',
    shortDescription: 'Maharashtra Official Gazette notification for legal Name Change, Spelling Correction, or Religion Change.',
    shortDescriptionMr: 'लग्नानंतर नाव बदल, स्पेलिंग दुरुस्ती व धर्म बदलासाठी शासकीय राजपत्रात ऑनलाईन नोंदणी.',
    detailedDescription: 'Legal publication in the Government of Maharashtra Gazette. The conclusive legal document to change your name on all records including Passport, PAN Card, Bank Accounts, Property documents, and educational certificates.',
    detailedDescriptionMr: 'नावात कायदेशीर बदल करण्यासाठी व सर्व अधिकृत कागदपत्रांवर नाव सुधारण्यासाठी राजपत्र प्रसिद्धी.',
    whoIsThisFor: [
      'Women seeking surname change after marriage',
      'Individuals correcting spelling errors across school records and IDs',
      'Citizens adopting a new name or changing religion'
    ],
    documentSections: [
      {
        title: 'Documents Required for Gazette Notification',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Aadhaar Card and PAN Card with current name',
          'Passport Size Photograph',
          'Marriage Certificate / Wedding Card (for post-marriage name change)',
          'Affidavit for Name Change / DOB correction on stamp paper',
          'Address proof and newspaper advertisement copy (if applicable)'
        ]
      }
    ],
    processSteps: [
      'Drafting required legal affidavit and reasons for name change',
      'Online filing on the Directorate of Government Printing & Stationery portal',
      'Payment of official gazette fee',
      'Download of published official Maharashtra Gazette PDF'
    ],
    turnaroundTime: '7 to 15 working days following portal processing',
    turnaroundTimeMr: 'साधारण ७ ते १५ कामकाजाचे दिवस',
    iconName: 'BookOpen',
    isPopular: true,
    relatedSlugs: ['affidavits', 'pan-card', 'aadhaar-card']
  },

  // 15. Affidavits & Stamp Paper
  {
    slug: 'affidavits',
    name: 'Affidavits & Stamp Paper Services',
    nameMr: 'शपथपत्र व स्टॅम्प पेपर (Affidavits)',
    category: 'business-legal-financial',
    categoryName: 'Business & Legal',
    categoryNameMr: 'व्यावसायिक व कायदेशीर',
    shortDescription: 'Legal drafting for Gap Certificate, Name Change, Self-Declaration, Loss of Document, and Notary Affidavits.',
    shortDescriptionMr: 'गॅप सर्टिफिकेट, स्वयंघोषणापत्र, कागदपत्र हरवल्याचे शपथपत्र व नोटरी सहाय्य.',
    detailedDescription: 'Fast, legally sound drafting for all personal, educational, and legal affidavits. We ensure proper wording, appropriate stamp duty adherence, and attestation guidance.',
    detailedDescriptionMr: 'कॉलेज प्रवेश, शिष्यवृत्ती, नोकरी व न्यायालयीन कामांसाठी आवश्यक असणारी सर्व शपथपत्रे.',
    whoIsThisFor: [
      'Students with educational gap years requiring Gap Affidavits',
      'Applicants requiring Namuna Form 3 & Form 17 for Caste Validity',
      'Citizens making sworn declarations for lost documents or name corrections'
    ],
    documentSections: [
      {
        title: 'Requirements for Affidavit Drafting',
        titleMr: 'आवश्यक तपशील',
        items: [
          'Aadhaar Card of the deponent / person making the declaration',
          'Purpose / Reason (e.g. Educational gap reason, loss of document details, family relationship details)',
          'Supporting evidence related to the sworn statement'
        ]
      }
    ],
    processSteps: [
      'Drafting content as per prescribed government/legal format',
      'Printing on authorized e-Stamp paper / stamp format',
      'Notary attestation and signature'
    ],
    turnaroundTime: 'Same day / Ready in 30 minutes to a few hours',
    turnaroundTimeMr: 'त्याच दिवशी किंवा काही तासांत उपलब्ध',
    iconName: 'FileText',
    isPopular: true,
    relatedSlugs: ['caste-validity', 'gazette', 'registered-rent-agreement']
  },

  // 16. Registered Rent Agreement
  {
    slug: 'registered-rent-agreement',
    name: 'Registered Rent Agreement (नोंदणीकृत भाडेकरार)',
    nameMr: 'नोंदणीकृत भाडेकरार (Online Rent Agreement)',
    category: 'business-legal-financial',
    categoryName: 'Business & Legal',
    categoryNameMr: 'व्यावसायिक व कायदेशीर',
    shortDescription: 'Legally binding online registered rent agreements with biometric verification for tenants & owners in Nagpur.',
    shortDescriptionMr: 'घरमालक व भाडेकरूंसाठी बायोमेट्रिक पडताळणीसह कायदेशीर ऑनलाईन नोंदणीकृत भाडेकरार.',
    detailedDescription: 'Official e-Registration of leave and licence agreements with Maharashtra Department of Registration and Stamps. Valid as authentic address proof for Passport, Bank Loans, GST, and Police verification.',
    detailedDescriptionMr: 'शासकीय मान्यताप्राप्त ऑनलाईन भाडेकरार. पासपोर्ट, बँक व पोलीस व्हेरिफिकेशनसाठी वैध.',
    whoIsThisFor: [
      'Property owners and landlords leasing residential or commercial property in Nagpur',
      'Tenants requiring authentic registered address proof'
    ],
    documentSections: [
      {
        title: 'Documents Required for Rent Agreement',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Aadhaar and PAN Cards of Landlord (Owner) and Tenant',
          'Aadhaar Cards of 2 Witnesses',
          'Property Index II / Electricity Bill / Property Tax Receipt of the premises',
          'Agreed terms (Monthly rent, deposit amount, duration, notice period)'
        ]
      }
    ],
    processSteps: [
      'Drafting agreement terms and stamp duty / registration fee calculation',
      'Online biometric capture of Owner, Tenant, and 2 Witnesses',
      'Government approval and generation of registered document with Government Index II'
    ],
    turnaroundTime: '24 to 48 hours after biometric submission',
    turnaroundTimeMr: 'बायोमेट्रिक पूर्ण झाल्यानंतर २४ ते ४८ तासांत',
    iconName: 'Building2',
    isPopular: false,
    relatedSlugs: ['affidavits', 'gumasta-shop-licence', 'mseb-service']
  },

  // 17. MSEB Electricity Services
  {
    slug: 'mseb-service',
    name: 'MSEB / MSEDCL Electricity Services',
    nameMr: 'महावितरण वीज सेवा (MSEB Services)',
    category: 'business-legal-financial',
    categoryName: 'Business & Legal',
    categoryNameMr: 'व्यावसायिक व कायदेशीर',
    shortDescription: 'New electricity meter connection, Name Transfer on light bill, Load Enhancement, and Category Change.',
    shortDescriptionMr: 'नवीन वीज कनेक्शन, लाईट बिलावरील नाव बदल, लोड वाढवणे व बिल दुरुस्ती.',
    detailedDescription: 'Complete assistance for Mahavitaran (MSEDCL) consumer requests. Avoid multiple visits to sub-division offices; we assist with online applications, NOC uploads, ownership change documents, and billing queries.',
    detailedDescriptionMr: 'महावितरणच्या सर्व सेवांसाठी अचूक कागदपत्रे व ऑनलाईन अर्ज सहाय्य.',
    whoIsThisFor: [
      'New property buyers needing name transfer on electricity bills',
      'Builders or homeowners requiring new single/three-phase electrical connections'
    ],
    documentSections: [
      {
        title: 'Documents Required for MSEB Services',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'Latest MSEB Electricity Bill',
          'Proof of Ownership (Registered Sale Deed / Property Tax Receipt / Index II)',
          'Aadhaar Card of the New Applicant / Owner',
          'NOC from previous owner (for name transfer, or legal heir certificate)',
          'Test report from licensed electrical contractor (for new connections)'
        ]
      }
    ],
    processSteps: [
      'Online application on Mahavitaran portal',
      'Upload of ownership proof and compliance forms',
      'Application tracking and demand note generation assistance'
    ],
    turnaroundTime: '7 to 15 working days as per MSEDCL norms',
    turnaroundTimeMr: 'साधारण ७ ते १५ कामकाजाचे दिवस',
    iconName: 'Zap',
    isPopular: false,
    relatedSlugs: ['registered-rent-agreement', 'affidavits', 'gumasta-shop-licence']
  },

  // 18. Loan Services Documentation
  {
    slug: 'loan-services',
    name: 'Loan Documentation & Application Support',
    nameMr: 'कर्ज सहाय्य कागदपत्रे (Loan Services)',
    category: 'business-legal-financial',
    categoryName: 'Business & Legal',
    categoryNameMr: 'व्यावसायिक व कायदेशीर',
    shortDescription: 'Documentation assembly, ITR, banking statements, and application assistance for Personal, Business & Home Loans.',
    shortDescriptionMr: 'वैयक्तिक, व्यावसायिक व गृहकर्जासाठी लागणाऱ्या सर्व कागदपत्रांची अचूक जुळवाजुळव.',
    detailedDescription: 'We help you prepare a solid documentation file for bank and NBFC loan applications. Proper arrangement of KYC, revenue records, income proofs, and business licences increases approval speed.',
    detailedDescriptionMr: 'बँक व वित्त संस्थांकडून कर्ज मिळवण्यासाठी कागदपत्रे तयार करण्यात संपूर्ण सहाय्य.',
    whoIsThisFor: [
      'Individuals applying for Personal or Home Loans',
      'Small business owners applying for Mudra, MSME, or Business Expansion Loans'
    ],
    documentSections: [
      {
        title: 'General Loan Documentation File',
        titleMr: 'आवश्यक कागदपत्रे',
        items: [
          'KYC: PAN Card, Aadhaar Card, Passport Size Photos',
          'Financial: Last 6 months Bank Statements, 2-3 years ITR / Form 16',
          'Business Proof (for business loans): Gumasta, GST Certificate, Udyam MSME',
          'Property Documents (for property loans): Sale Deed, Index II, Sanction Plan'
        ]
      }
    ],
    processSteps: [
      'Profile analysis and requirement checklist review',
      'Preparation and organization of income/business files',
      'Guidance on submission to banking partners'
    ],
    turnaroundTime: 'File preparation within 24-48 hours',
    turnaroundTimeMr: 'फाइल तयार करणे २४ ते ४८ तासांत',
    iconName: 'Landmark',
    isPopular: false,
    relatedSlugs: ['gumasta-shop-licence', 'income-certificate', 'all-type-insurance']
  },

  // 19. All Types of Insurance
  {
    slug: 'all-type-insurance',
    name: 'All Types of Insurance (सर्व प्रकारचा विमा)',
    nameMr: 'सर्व प्रकारचा विमा (Insurance Services)',
    category: 'business-legal-financial',
    categoryName: 'Business & Legal',
    categoryNameMr: 'व्यावसायिक व कायदेशीर',
    shortDescription: 'Instant policy issue & renewal for Two-Wheeler, Car, Commercial Vehicles, Health & Term Life Insurance.',
    shortDescriptionMr: 'टू-व्हीलर, कार, कमर्शियल वाहन, आरोग्य विमा व जीवन विमा त्वरित काढून मिळवा.',
    detailedDescription: 'Instant motor insurance policy generation with zero inspection (for active policies). Compare top insurance providers for comprehensive and third-party coverage at competitive premiums.',
    detailedDescriptionMr: 'गाडीचा विमा, आरोग्य विमा व टर्म इन्शुरन्ससाठी उत्तम पर्यायांसह त्वरित पॉलिसी.',
    whoIsThisFor: [
      'Vehicle owners renewing bike, scooter, car, or commercial vehicle insurance',
      'Families seeking health and critical illness insurance coverage'
    ],
    documentSections: [
      {
        title: 'Documents Required for Insurance Issue',
        titleMr: 'आवश्यक तपशील',
        items: [
          'Vehicle Registration Certificate (RC Book)',
          'Previous Year Insurance Policy copy (if renewing)',
          'Aadhaar Card and PAN Card of the Vehicle / Policy Owner',
          'Pollution Under Control (PUC) certificate'
        ]
      }
    ],
    processSteps: [
      'Comparison of quotes across leading IRDAI-approved insurers',
      'Selection of policy and add-on covers (Zero Dep, Engine Protect, Roadside Assistance)',
      'Instant payment and generation of authentic digital policy certificate'
    ],
    turnaroundTime: 'Instant / Within 10 to 15 minutes',
    turnaroundTimeMr: '१० ते १५ मिनिटांत त्वरित पॉलिसी प्राप्त',
    iconName: 'ShieldPlus',
    isPopular: true,
    relatedSlugs: ['driving-licence', 'loan-services', 'pan-card']
  },

  // 20. Online Admission & Recruitment Forms
  {
    slug: 'online-admission-recruitment-forms',
    name: 'Online Admission & Job Application Forms',
    nameMr: 'शैक्षणिक व नोकरी भरती ऑनलाईन फॉर्म',
    category: 'business-legal-financial',
    categoryName: 'Business & Legal',
    categoryNameMr: 'व्यावसायिक व कायदेशीर',
    shortDescription: 'Error-free online form filling for College Admissions, CAP rounds, MPSC, UPSC, SSC, Police, Banking & Railway recruitment.',
    shortDescriptionMr: 'सर्व प्रकारचे शैक्षणिक, प्रवेश व सरकारी नोकरी भरतीचे फॉर्म अचूकपणे भरून मिळतात.',
    detailedDescription: 'Specialized assistance from the brochure tagline: "सर्व प्रकारचे शैक्षणिक, रोजगार संबंधित फॉर्म ऑनलाईन पद्धतीने भरून मिळतात." We provide careful scanning, photo/signature resizing, eligibility verification, and payment handling to avoid application rejection.',
    detailedDescriptionMr: 'कॉलेज ॲडमिशन, सीईटी, महाडीबीटी शिष्यवृत्ती, पोलीस भरती, तलाठी, रेल्वे व बँकिंग भरतीचे फॉर्म खात्रीशीरपणे भरून दिले जातात.',
    whoIsThisFor: [
      'Students applying for 11th, 12th, Degree, Engineering, Pharmacy, or Polytechnic admissions',
      'Candidates applying for competitive government job recruitment and entrance exams'
    ],
    documentSections: [
      {
        title: 'Required Details for Form Filling',
        titleMr: 'आवश्यक तपशील',
        items: [
          'All Academic Marksheets and Passing Certificates',
          'Caste, Domicile, Income, and Validity certificates (for quota claims)',
          'Clear Passport Photo and Signature specimen',
          'Active Mobile and Email ID for OTPs and notifications'
        ]
      }
    ],
    processSteps: [
      'Review of advertisement criteria and eligibility',
      'Precision scanning and document resizing according to portal specifications',
      'Form submission, fee payment, and final printout with fee receipt handover'
    ],
    turnaroundTime: 'Immediate / Scheduled as per exam deadlines',
    turnaroundTimeMr: 'केंद्रावर प्रत्यक्ष किंवा ऑनलाईन तत्काळ',
    iconName: 'GraduationCap',
    isPopular: true,
    relatedSlugs: ['caste-validity', 'caste-certificate', 'income-certificate', 'domicile-certificate']
  }
];
