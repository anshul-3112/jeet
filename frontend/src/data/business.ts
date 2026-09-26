export interface BusinessConfig {
  name: string;
  nameMr: string;
  owner: string;
  primaryPhone: string;
  alternatePhone: string;
  formattedPrimaryPhone: string;
  formattedAlternatePhone: string;
  whatsappNumber: string;
  email: string;
  address: {
    street: string;
    landmark: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
    fullEnglish: string;
    fullMarathi: string;
  };
  hours: string;
  hoursMr: string;
  googleMapsUrl: string;
  tagline: string;
  taglineMr: string;
  formsBannerMr: string;
  bio: string;
  metaDescription: string;
}

export const businessConfig: BusinessConfig = {
  name: "Jeet Digital E-Governance Seva Kendra",
  nameMr: "जीत डिजिटल ई-गव्हर्नन्स सेवा केंद्र",
  owner: "Yash Chopade",
  primaryPhone: "8055203555",
  alternatePhone: "8550977877",
  formattedPrimaryPhone: "+91 80552 03555",
  formattedAlternatePhone: "+91 85509 77877",
  whatsappNumber: "918055203555",
  email: "digitalsevangp@gmail.com",
  address: {
    street: "27A, Ayodhya Nagar Square",
    landmark: "Beside Balaji Jewelers & Lanjewar Cycle Stores",
    city: "Nagpur",
    pincode: "440024",
    state: "Maharashtra",
    country: "India",
    fullEnglish: "27A, Ayodhya Nagar Square, Beside Balaji Jewelers & Lanjewar Cycle Stores, Nagpur - 440024, Maharashtra",
    fullMarathi: "लांजेवार सायकल स्टोअर्सच्या बाजूला, अयोध्या नगर चौक, नागपूर-२४"
  },
  hours: "Open 24 Hours (24x7 Assistance)",
  hoursMr: "२४ तास सेवा उपलब्ध (Open 24 Hours)",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ayodhya+Nagar+Square+Nagpur+Maharashtra+440024",
  tagline: "Government & Private Documentation Services Under One Roof",
  taglineMr: "सर्व शासकीय आणि खाजगी सेवा एका छताखाली - आपले सरकार सेवा केंद्रात उपलब्ध",
  formsBannerMr: "सर्व प्रकारचे शैक्षणिक , रोजगार संबंधित फॉर्म ऑनलाईन पद्धतीने भरून मिळतात.",
  bio: "Our e-Governance services provide citizens with convenient, efficient, and transparent access to government services. From applying for certificates to submitting forms, our services ensure seamless interaction with government departments. We aim to provide hassle-free and efficient services, ensuring citizens can easily access the benefits and services they need.",
  metaDescription: "Jeet Digital E-Governance Seva Kendra in Ayodhya Nagar, Nagpur. Authorized assistance for Aadhaar, PAN Card, Caste Validity, Income/Domicile Certificates, Gumasta, Food Licence & Online Forms. Open 24 Hours. Call 8055203555."
};
