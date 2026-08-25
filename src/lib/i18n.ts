import { useKiosk, type SocratesKey } from "./kiosk-store";

export const LANGUAGES = [
  "English",
  "हिंदी",
  "বাংলা",
  "தமிழ்",
  "తెలుగు",
  "मराठी",
  "ગુજરાતી",
  "ಕನ್ನಡ",
] as const;
export type Language = (typeof LANGUAGES)[number];

export const LANGUAGE_ENGLISH_NAMES: Record<string, string> = {
  English: "English",
  हिंदी: "Hindi",
  বাংলা: "Bengali",
  தமிழ்: "Tamil",
  తెలుగు: "Telugu",
  मराठी: "Marathi",
  ગુજરાતી: "Gujarati",
  ಕನ್ನಡ: "Kannada",
};

export type Dict = {
  stationActive: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  preferredLanguage: string;
  consent: string;
  scanTitle: string;
  scanning: string;
  verified: string;
  scanHelpConsented: string;
  scanHelpNoConsent: string;
  or: string;
  manualEntry: string;
  ayushMode: string;
  ayushDescription: string;

  assistantName: string;
  assistantSubtitle: string;
  greeting: string;
  typing: string;
  extracted: string;
  uploadDocument: string;
  extractingDocument: string;
  extractionComplete: string;
  inputPlaceholder: string;
  uploadLabel: string;
  sendLabel: string;
  markers: (n: number) => string;
  viewSummary: string;
  genericError: string;
  priorityAlert: string;

  summaryTitle: string;
  patientId: string;
  notVerified: string;
  filed: string;
  draft: string;
  chiefComplaint: string;
  hpi: string;
  pmh: string;
  extractedData: string;
  notRecorded: string;
  noDocuments: string;
  edit: string;
  doneEditing: string;
  defer: string;
  confirm: string;
  confirmed: string;
  confirmPush: string;
  hisSuccess: string;
  ayushSection: string;
  prakriti: string;
  agni: string;
  aharaVihara: string;
  ayushPending: string;
  awaitingComplaint: string;
  awaitingHpi: string;
  socrates: Record<SocratesKey, string>;
};

const en: Dict = {
  stationActive: "Station 04 • Active",
  welcomeTitle: "Welcome to MediKiosk",
  welcomeSubtitle:
    "Please prepare your ABHA ID or scan the QR code to begin your digital intake process.",
  preferredLanguage: "Preferred Language",
  consent:
    "I consent to MediKiosk collecting my symptoms and health records for this consultation and sharing them with my treating physician.",
  scanTitle: "Scan ABHA QR Code",
  scanning: "Scanning…",
  verified: "Verified",
  scanHelpConsented: "Position your ID card within the frame",
  scanHelpNoConsent: "Please accept the consent above to continue",
  or: "or",
  manualEntry: "Enter ABHA Number Manually",
  ayushMode: "Ayurvedic (AYUSH) consultation mode",
  ayushDescription: "Adds questions about constitution, digestion, and lifestyle.",

  assistantName: "Clinical Intake Assistant",
  assistantSubtitle: "Powered by SOCRATES framework",
  greeting:
    "Hello, I'm here to help prepare your summary for the doctor. What is bothering you today? Please describe your main symptom.",
  typing: "Assistant is typing…",
  extracted: "extracted",
  inputPlaceholder: "Describe your symptoms...",
  uploadLabel: "Upload a medical document",
  uploadDocument: "Upload prescription / lab report",
  extractingDocument: "Extracting document…",
  extractionComplete: "Document data extracted",
  sendLabel: "Send",
  markers: (n) => `${n} of 8 SOCRATES markers captured`,
  viewSummary: "View clinical summary",
  genericError: "Something went wrong. Please try again.",
  priorityAlert: "⚠ Priority Alert — Staff Notified",

  summaryTitle: "Clinical Summary",
  patientId: "Patient ID",
  notVerified: "Not verified",
  filed: "Filed",
  draft: "Draft Record",
  chiefComplaint: "Chief Complaint",
  hpi: "History of Present Illness",
  pmh: "Past Medical History",
  extractedData: "Extracted Document Data",
  notRecorded: "Not yet recorded.",
  noDocuments: "No documents uploaded.",
  edit: "Edit Details",
  doneEditing: "Done Editing",
  defer: "Defer",
  confirm: "Confirm Entry",
  confirmed: "Entry Confirmed",
  confirmPush: "Confirm & Push to HIS",
  hisSuccess: "History pushed to Hospital HIS and linked to ABHA record.",
  ayushSection: "AYUSH Consultation Details",
  prakriti: "Prakriti (body constitution)",
  agni: "Agni (digestive strength)",
  aharaVihara: "Ahara-Vihara (diet and lifestyle)",
  ayushPending: "AYUSH questions will appear here after the standard interview.",
  awaitingComplaint: "Awaiting completion of the symptom interview.",
  awaitingHpi:
    "The patient interview is still in progress. Return to the intake chat so the assistant can complete the SOCRATES assessment.",
  socrates: {
    site: "Site",
    onset: "Onset",
    character: "Character",
    radiation: "Radiation",
    associations: "Associated symptoms",
    time: "Timing",
    exacerbating: "Exacerbating / relieving",
    severity: "Severity",
  },
};

const hi: Dict = {
  stationActive: "स्टेशन 04 • सक्रिय",
  welcomeTitle: "मेडीकियोस्क में आपका स्वागत है",
  welcomeSubtitle:
    "कृपया अपना ABHA आईडी तैयार रखें या डिजिटल पंजीकरण शुरू करने के लिए QR कोड स्कैन करें।",
  preferredLanguage: "पसंदीदा भाषा",
  consent:
    "मैं सहमति देता/देती हूँ कि मेडीकियोस्क इस परामर्श हेतु मेरे लक्षण और स्वास्थ्य रिकॉर्ड एकत्र करे और मेरे चिकित्सक के साथ साझा करे।",
  scanTitle: "ABHA QR कोड स्कैन करें",
  scanning: "स्कैन हो रहा है…",
  verified: "सत्यापित",
  scanHelpConsented: "अपना आईडी कार्ड फ्रेम के भीतर रखें",
  scanHelpNoConsent: "जारी रखने के लिए कृपया ऊपर सहमति स्वीकार करें",
  or: "अथवा",
  manualEntry: "ABHA नंबर मैन्युअल रूप से दर्ज करें",
  ayushMode: "आयुर्वेदिक (AYUSH) परामर्श मोड",
  ayushDescription: "शरीर की प्रकृति, पाचन और जीवनशैली से जुड़े प्रश्न जोड़े जाएंगे।",

  assistantName: "क्लिनिकल इनटेक सहायक",
  assistantSubtitle: "SOCRATES ढांचे पर आधारित",
  greeting:
    "नमस्ते, मैं डॉक्टर के लिए आपका सारांश तैयार करने में मदद करने के लिए यहाँ हूँ। आज आपको क्या तकलीफ है? कृपया अपना मुख्य लक्षण बताइए।",
  typing: "सहायक लिख रहा है…",
  extracted: "से जानकारी निकाली गई",
  inputPlaceholder: "अपने लक्षण बताइए...",
  uploadLabel: "मेडिकल दस्तावेज़ अपलोड करें",
  uploadDocument: "प्रिस्क्रिप्शन / लैब रिपोर्ट अपलोड करें",
  extractingDocument: "दस्तावेज़ से जानकारी निकाली जा रही है…",
  extractionComplete: "दस्तावेज़ से डेटा निकाला गया",
  sendLabel: "भेजें",
  markers: (n) => `8 में से ${n} SOCRATES बिंदु दर्ज`,
  viewSummary: "क्लिनिकल सारांश देखें",
  genericError: "कुछ गड़बड़ हो गई। कृपया पुनः प्रयास करें।",
  priorityAlert: "⚠ प्राथमिकता अलर्ट — स्टाफ को सूचित किया गया",

  summaryTitle: "क्लिनिकल सारांश",
  patientId: "रोगी आईडी",
  notVerified: "सत्यापित नहीं",
  filed: "दर्ज",
  draft: "प्रारूप रिकॉर्ड",
  chiefComplaint: "मुख्य शिकायत",
  hpi: "वर्तमान बीमारी का इतिहास",
  pmh: "पूर्व चिकित्सा इतिहास",
  extractedData: "दस्तावेज़ से प्राप्त डेटा",
  notRecorded: "अभी दर्ज नहीं।",
  noDocuments: "कोई दस्तावेज़ अपलोड नहीं किया गया।",
  edit: "विवरण संपादित करें",
  doneEditing: "संपादन पूर्ण",
  defer: "स्थगित करें",
  confirm: "प्रविष्टि पुष्टि करें",
  confirmed: "प्रविष्टि पुष्ट",
  confirmPush: "पुष्टि करें और HIS में भेजें",
  hisSuccess: "इतिहास Hospital HIS में भेजकर ABHA रिकॉर्ड से जोड़ दिया गया।",
  ayushSection: "AYUSH परामर्श विवरण",
  prakriti: "प्रकृति (शरीर का गठन)",
  agni: "अग्नि (पाचन शक्ति)",
  aharaVihara: "आहार-विहार (आहार और जीवनशैली)",
  ayushPending: "मानक साक्षात्कार के बाद AYUSH प्रश्नों के उत्तर यहां दिखाई देंगे।",
  awaitingComplaint: "लक्षण साक्षात्कार पूरा होने की प्रतीक्षा है।",
  awaitingHpi:
    "रोगी का साक्षात्कार अभी जारी है। कृपया चैट पर लौटें ताकि सहायक SOCRATES मूल्यांकन पूरा कर सके।",
  socrates: {
    site: "स्थान",
    onset: "शुरुआत",
    character: "प्रकृति",
    radiation: "फैलाव",
    associations: "संबंधित लक्षण",
    time: "समय",
    exacerbating: "बढ़ाने / घटाने वाले कारक",
    severity: "तीव्रता",
  },
};

const bn: Dict = {
  stationActive: "স্টেশন 04 • সক্রিয়",
  welcomeTitle: "মেডিকিয়স্কে স্বাগতম",
  welcomeSubtitle:
    "অনুগ্রহ করে আপনার ABHA আইডি প্রস্তুত রাখুন বা ডিজিটাল নিবন্ধন শুরু করতে QR কোড স্ক্যান করুন।",
  preferredLanguage: "পছন্দের ভাষা",
  consent:
    "আমি সম্মত আছি যে মেডিকিয়স্ক এই পরামর্শের জন্য আমার লক্ষণ ও স্বাস্থ্য রেকর্ড সংগ্রহ করবে এবং আমার চিকিৎসকের সাথে শেয়ার করবে।",
  scanTitle: "ABHA QR কোড স্ক্যান করুন",
  scanning: "স্ক্যান হচ্ছে…",
  verified: "যাচাই হয়েছে",
  scanHelpConsented: "আপনার আইডি কার্ড ফ্রেমের ভেতরে রাখুন",
  scanHelpNoConsent: "চালিয়ে যেতে উপরের সম্মতি গ্রহণ করুন",
  or: "অথবা",
  manualEntry: "ABHA নম্বর নিজে লিখুন",
  ayushMode: "আয়ুর্বেদিক (AYUSH) পরামর্শ মোড",
  ayushDescription: "শরীরের গঠন, হজম এবং জীবনযাপন সম্পর্কে অতিরিক্ত প্রশ্ন করা হবে।",

  assistantName: "ক্লিনিকাল ইনটেক সহকারী",
  assistantSubtitle: "SOCRATES কাঠামোর উপর ভিত্তি করে",
  greeting:
    "নমস্কার, আমি ডাক্তারের জন্য আপনার সারসংক্ষেপ তৈরিতে সাহায্য করতে এখানে আছি। আজ আপনার কী সমস্যা হচ্ছে? অনুগ্রহ করে আপনার প্রধান লক্ষণ বর্ণনা করুন।",
  typing: "সহকারী লিখছেন…",
  extracted: "থেকে তথ্য সংগ্রহ করা হয়েছে",
  inputPlaceholder: "আপনার লক্ষণ বর্ণনা করুন...",
  uploadLabel: "একটি মেডিকেল নথি আপলোড করুন",
  uploadDocument: "প্রেসক্রিপশন / ল্যাব রিপোর্ট আপলোড করুন",
  extractingDocument: "নথি থেকে তথ্য সংগ্রহ করা হচ্ছে…",
  extractionComplete: "নথি থেকে তথ্য সংগ্রহ সম্পন্ন",
  sendLabel: "পাঠান",
  markers: (n) => `8-এর মধ্যে ${n} SOCRATES চিহ্ন নথিভুক্ত`,
  viewSummary: "ক্লিনিকাল সারসংক্ষেপ দেখুন",
  genericError: "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।",
  priorityAlert: "⚠ জরুরি সতর্কতা — কর্মীদের জানানো হয়েছে",

  summaryTitle: "ক্লিনিকাল সারসংক্ষেপ",
  patientId: "রোগী আইডি",
  notVerified: "যাচাই হয়নি",
  filed: "নথিভুক্ত",
  draft: "খসড়া রেকর্ড",
  chiefComplaint: "প্রধান অভিযোগ",
  hpi: "বর্তমান অসুস্থতার ইতিহাস",
  pmh: "পূর্বের চিকিৎসা ইতিহাস",
  extractedData: "নথি থেকে প্রাপ্ত তথ্য",
  notRecorded: "এখনও নথিভুক্ত হয়নি।",
  noDocuments: "কোনো নথি আপলোড করা হয়নি।",
  edit: "বিবরণ সম্পাদনা করুন",
  doneEditing: "সম্পাদনা সম্পন্ন",
  defer: "স্থগিত করুন",
  confirm: "নথিভুক্তি নিশ্চিত করুন",
  confirmed: "নথিভুক্তি নিশ্চিত",
  confirmPush: "নিশ্চিত করুন ও HIS-এ পাঠান",
  hisSuccess: "ইতিহাস Hospital HIS-এ পাঠানো হয়েছে এবং ABHA রেকর্ডের সঙ্গে যুক্ত হয়েছে।",
  ayushSection: "AYUSH পরামর্শের বিবরণ",
  prakriti: "প্রকৃতি (শরীরের গঠন)",
  agni: "অগ্নি (হজমের শক্তি)",
  aharaVihara: "আহার-বিহার (খাদ্য ও জীবনযাপন)",
  ayushPending: "সাধারণ সাক্ষাৎকারের পরে AYUSH প্রশ্নের উত্তর এখানে দেখা যাবে।",
  awaitingComplaint: "লক্ষণ সাক্ষাৎকার সম্পন্ন হওয়ার অপেক্ষায়।",
  awaitingHpi:
    "রোগীর সাক্ষাৎকার এখনও চলছে। সহকারী SOCRATES মূল্যায়ন সম্পন্ন করতে পারে তার জন্য চ্যাটে ফিরে যান।",
  socrates: {
    site: "স্থান",
    onset: "সূচনা",
    character: "ধরন",
    radiation: "বিস্তার",
    associations: "সম্পর্কিত লক্ষণ",
    time: "সময়",
    exacerbating: "বৃদ্ধি / হ্রাসকারী কারণ",
    severity: "তীব্রতা",
  },
};

const ta: Dict = {
  stationActive: "நிலையம் 04 • செயலில்",
  welcomeTitle: "மெடிகியாஸ்க்-க்கு வரவேற்கிறோம்",
  welcomeSubtitle:
    "உங்கள் ABHA அடையாள அட்டையை தயார் செய்யவும் அல்லது பதிவைத் தொடங்க QR குறியீட்டை ஸ்கேன் செய்யவும்.",
  preferredLanguage: "விருப்ப மொழி",
  consent:
    "இந்த ஆலோசனைக்காக என் அறிகுறிகளையும் மருத்துவப் பதிவுகளையும் மெடிகியாஸ்க் சேகரித்து என் மருத்துவருடன் பகிர்ந்து கொள்ள ஒப்புக்கொள்கிறேன்.",
  scanTitle: "ABHA QR குறியீட்டை ஸ்கேன் செய்யவும்",
  scanning: "ஸ்கேன் செய்யப்படுகிறது…",
  verified: "சரிபார்க்கப்பட்டது",
  scanHelpConsented: "உங்கள் அட்டையை சட்டகத்திற்குள் வைக்கவும்",
  scanHelpNoConsent: "தொடர மேலே உள்ள ஒப்புதலை ஏற்கவும்",
  or: "அல்லது",
  manualEntry: "ABHA எண்ணை கைமுறையாக உள்ளிடவும்",
  ayushMode: "ஆயுர்வேத (AYUSH) ஆலோசனை முறை",
  ayushDescription:
    "உடல் அமைப்பு, செரிமானம் மற்றும் வாழ்க்கை முறை குறித்து கூடுதல் கேள்விகள் கேட்கப்படும்.",

  assistantName: "மருத்துவ பதிவு உதவியாளர்",
  assistantSubtitle: "SOCRATES கட்டமைப்பின் அடிப்படையில்",
  greeting:
    "வணக்கம், மருத்துவருக்கான உங்கள் சுருக்கத்தை தயாரிக்க நான் உதவுகிறேன். இன்று உங்களுக்கு என்ன தொந்தரவு? உங்கள் முக்கிய அறிகுறியை விவரிக்கவும்.",
  typing: "உதவியாளர் தட்டச்சு செய்கிறார்…",
  extracted: "இலிருந்து தரவு எடுக்கப்பட்டது",
  inputPlaceholder: "உங்கள் அறிகுறிகளை விவரிக்கவும்...",
  uploadLabel: "மருத்துவ ஆவணத்தை பதிவேற்றவும்",
  uploadDocument: "மருத்துவச் சீட்டு / ஆய்வக அறிக்கையைப் பதிவேற்றவும்",
  extractingDocument: "ஆவணத்திலிருந்து தகவல் எடுக்கப்படுகிறது…",
  extractionComplete: "ஆவணத் தரவு எடுக்கப்பட்டது",
  sendLabel: "அனுப்பு",
  markers: (n) => `8-ல் ${n} SOCRATES குறிப்புகள் பதிவு`,
  viewSummary: "மருத்துவ சுருக்கத்தைப் பார்க்க",
  genericError: "ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.",
  priorityAlert: "⚠ முன்னுரிமை எச்சரிக்கை — பணியாளர்களுக்குத் தெரிவிக்கப்பட்டது",

  summaryTitle: "மருத்துவ சுருக்கம்",
  patientId: "நோயாளி அடையாளம்",
  notVerified: "சரிபார்க்கப்படவில்லை",
  filed: "பதிவு செய்யப்பட்டது",
  draft: "வரைவு பதிவு",
  chiefComplaint: "முதன்மை புகார்",
  hpi: "தற்போதைய நோயின் வரலாறு",
  pmh: "முந்தைய மருத்துவ வரலாறு",
  extractedData: "ஆவணத்திலிருந்து பெறப்பட்ட தரவு",
  notRecorded: "இன்னும் பதிவு செய்யப்படவில்லை.",
  noDocuments: "ஆவணங்கள் எதுவும் பதிவேற்றப்படவில்லை.",
  edit: "விவரங்களை திருத்து",
  doneEditing: "திருத்தம் முடிந்தது",
  defer: "ஒத்திவை",
  confirm: "பதிவை உறுதிப்படுத்து",
  confirmed: "பதிவு உறுதி செய்யப்பட்டது",
  confirmPush: "உறுதிசெய்து HIS-க்கு அனுப்பவும்",
  hisSuccess: "வரலாறு Hospital HIS-க்கு அனுப்பப்பட்டு ABHA பதிவுடன் இணைக்கப்பட்டது.",
  ayushSection: "AYUSH ஆலோசனை விவரங்கள்",
  prakriti: "பிரகிருதி (உடல் அமைப்பு)",
  agni: "அக்னி (செரிமான வலிமை)",
  aharaVihara: "ஆஹார-விஹார (உணவு மற்றும் வாழ்க்கை முறை)",
  ayushPending: "வழக்கமான நேர்காணலுக்குப் பிறகு AYUSH கேள்விகளுக்கான பதில்கள் இங்கே தோன்றும்.",
  awaitingComplaint: "அறிகுறி நேர்காணல் முடிவடையக் காத்திருக்கிறது.",
  awaitingHpi:
    "நோயாளியின் நேர்காணல் தொடர்கிறது. உதவியாளர் SOCRATES மதிப்பீட்டை முடிக்க அரட்டைக்குத் திரும்பவும்.",
  socrates: {
    site: "இடம்",
    onset: "தொடக்கம்",
    character: "தன்மை",
    radiation: "பரவல்",
    associations: "தொடர்புடைய அறிகுறிகள்",
    time: "நேரம்",
    exacerbating: "அதிகரிக்கும் / குறைக்கும் காரணிகள்",
    severity: "தீவிரம்",
  },
};

const te: Dict = {
  stationActive: "స్టేషన్ 04 • క్రియాశీల",
  welcomeTitle: "మెడికియోస్క్‌కు స్వాగతం",
  welcomeSubtitle:
    "దయచేసి మీ ABHA ఐడిని సిద్ధం చేయండి లేదా డిజిటల్ నమోదును ప్రారంభించడానికి QR కోడ్‌ను స్కాన్ చేయండి.",
  preferredLanguage: "ప్రాధాన్య భాష",
  consent:
    "ఈ సంప్రదింపు కోసం మెడికియోస్క్ నా లక్షణాలు మరియు ఆరోగ్య రికార్డులను సేకరించి నా వైద్యుడితో పంచుకోవడానికి నేను అంగీకరిస్తున్నాను.",
  scanTitle: "ABHA QR కోడ్‌ను స్కాన్ చేయండి",
  scanning: "స్కాన్ అవుతోంది…",
  verified: "ధృవీకరించబడింది",
  scanHelpConsented: "మీ ఐడి కార్డును ఫ్రేమ్ లోపల ఉంచండి",
  scanHelpNoConsent: "కొనసాగడానికి దయచేసి పైన ఉన్న అంగీకారాన్ని అంగీకరించండి",
  or: "లేదా",
  manualEntry: "ABHA నంబర్‌ను మాన్యువల్‌గా నమోదు చేయండి",
  ayushMode: "ఆయుర్వేద (AYUSH) సంప్రదింపు మోడ్",
  ayushDescription: "శరీర స్వభావం, జీర్ణశక్తి మరియు జీవనశైలి గురించి అదనపు ప్రశ్నలు అడుగుతారు.",

  assistantName: "క్లినికల్ ఇన్‌టేక్ సహాయకుడు",
  assistantSubtitle: "SOCRATES ఫ్రేమ్‌వర్క్ ఆధారంగా",
  greeting:
    "నమస్కారం, డాక్టర్ కోసం మీ సారాంశాన్ని సిద్ధం చేయడంలో సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. ఈ రోజు మీకు ఏమి ఇబ్బంది? దయచేసి మీ ప్రధాన లక్షణాన్ని వివరించండి.",
  typing: "సహాయకుడు టైప్ చేస్తున్నాడు…",
  extracted: "నుండి సమాచారం సేకరించబడింది",
  inputPlaceholder: "మీ లక్షణాలను వివరించండి...",
  uploadLabel: "వైద్య పత్రాన్ని అప్‌లోడ్ చేయండి",
  uploadDocument: "ప్రిస్క్రిప్షన్ / ల్యాబ్ రిపోర్ట్‌ను అప్‌లోడ్ చేయండి",
  extractingDocument: "పత్రం నుండి సమాచారం సేకరిస్తోంది…",
  extractionComplete: "పత్రం నుండి డేటా సేకరించబడింది",
  sendLabel: "పంపండి",
  markers: (n) => `8లో ${n} SOCRATES గుర్తులు నమోదు`,
  viewSummary: "క్లినికల్ సారాంశాన్ని చూడండి",
  genericError: "ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.",
  priorityAlert: "⚠ ప్రాధాన్యత హెచ్చరిక — సిబ్బందికి సమాచారం అందింది",

  summaryTitle: "క్లినికల్ సారాంశం",
  patientId: "రోగి ఐడి",
  notVerified: "ధృవీకరించబడలేదు",
  filed: "నమోదు చేయబడింది",
  draft: "డ్రాఫ్ట్ రికార్డ్",
  chiefComplaint: "ప్రధాన ఫిర్యాదు",
  hpi: "ప్రస్తుత అనారోగ్య చరిత్ర",
  pmh: "గత వైద్య చరిత్ర",
  extractedData: "పత్రం నుండి పొందిన డేటా",
  notRecorded: "ఇంకా నమోదు చేయబడలేదు.",
  noDocuments: "ఏ పత్రాలు అప్‌లోడ్ చేయబడలేదు.",
  edit: "వివరాలను సవరించండి",
  doneEditing: "సవరణ పూర్తి",
  defer: "వాయిదా వేయండి",
  confirm: "నమోదును నిర్ధారించండి",
  confirmed: "నమోదు నిర్ధారించబడింది",
  confirmPush: "నిర్ధారించి HISకు పంపండి",
  hisSuccess: "చరిత్ర Hospital HISకు పంపబడింది మరియు ABHA రికార్డుతో లింక్ చేయబడింది.",
  ayushSection: "AYUSH సంప్రదింపు వివరాలు",
  prakriti: "ప్రకృతి (శరీర స్వభావం)",
  agni: "అగ్ని (జీర్ణశక్తి)",
  aharaVihara: "ఆహార-విహార (ఆహారం మరియు జీవనశైలి)",
  ayushPending: "సాధారణ ఇంటర్వ్యూ తర్వాత AYUSH ప్రశ్నల సమాధానాలు ఇక్కడ కనిపిస్తాయి.",
  awaitingComplaint: "లక్షణ ఇంటర్వ్యూ పూర్తి కావడానికి వేచి ఉంది.",
  awaitingHpi:
    "రోగి ఇంటర్వ్యూ ఇంకా కొనసాగుతోంది. సహాయకుడు SOCRATES మూల్యాంకనం పూర్తి చేయడానికి చాట్‌కు తిరిగి వెళ్ళండి.",
  socrates: {
    site: "స్థలం",
    onset: "ప్రారంభం",
    character: "స్వభావం",
    radiation: "వ్యాప్తి",
    associations: "సంబంధిత లక్షణాలు",
    time: "సమయం",
    exacerbating: "పెంచే / తగ్గించే కారణాలు",
    severity: "తీవ్రత",
  },
};

const mr: Dict = {
  stationActive: "स्टेशन 04 • सक्रिय",
  welcomeTitle: "मेडीकिओस्कमध्ये आपले स्वागत आहे",
  welcomeSubtitle:
    "कृपया आपले ABHA ओळखपत्र तयार ठेवा किंवा डिजिटल नोंदणी सुरू करण्यासाठी QR कोड स्कॅन करा.",
  preferredLanguage: "पसंतीची भाषा",
  consent:
    "या सल्ल्यासाठी मेडीकिओस्कने माझी लक्षणे व आरोग्य नोंदी गोळा करून माझ्या डॉक्टरांसोबत सामायिक करण्यास मी संमती देतो/देते.",
  scanTitle: "ABHA QR कोड स्कॅन करा",
  scanning: "स्कॅन होत आहे…",
  verified: "पडताळले",
  scanHelpConsented: "आपले ओळखपत्र चौकटीत ठेवा",
  scanHelpNoConsent: "पुढे जाण्यासाठी कृपया वरील संमती स्वीकारा",
  or: "किंवा",
  manualEntry: "ABHA क्रमांक स्वतः प्रविष्ट करा",
  ayushMode: "आयुर्वेदिक (AYUSH) सल्ला मोड",
  ayushDescription: "शरीरप्रकृती, पचनशक्ती आणि जीवनशैलीबद्दल अतिरिक्त प्रश्न विचारले जातील.",

  assistantName: "क्लिनिकल इनटेक सहाय्यक",
  assistantSubtitle: "SOCRATES चौकटीवर आधारित",
  greeting:
    "नमस्कार, डॉक्टरांसाठी आपला सारांश तयार करण्यात मी मदत करतो. आज आपल्याला काय त्रास होत आहे? कृपया आपले मुख्य लक्षण सांगा.",
  typing: "सहाय्यक लिहित आहे…",
  extracted: "मधून माहिती काढली",
  inputPlaceholder: "आपली लक्षणे सांगा...",
  uploadLabel: "वैद्यकीय कागदपत्र अपलोड करा",
  uploadDocument: "प्रिस्क्रिप्शन / लॅब रिपोर्ट अपलोड करा",
  extractingDocument: "कागदपत्रातून माहिती काढली जात आहे…",
  extractionComplete: "कागदपत्रातील माहिती काढली",
  sendLabel: "पाठवा",
  markers: (n) => `8 पैकी ${n} SOCRATES नोंदी`,
  viewSummary: "क्लिनिकल सारांश पहा",
  genericError: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
  priorityAlert: "⚠ प्राधान्य सूचना — कर्मचाऱ्यांना कळवले आहे",

  summaryTitle: "क्लिनिकल सारांश",
  patientId: "रुग्ण आयडी",
  notVerified: "पडताळलेले नाही",
  filed: "नोंदवले",
  draft: "मसुदा नोंद",
  chiefComplaint: "मुख्य तक्रार",
  hpi: "सद्य आजाराचा इतिहास",
  pmh: "पूर्वीचा वैद्यकीय इतिहास",
  extractedData: "कागदपत्रातून मिळालेली माहिती",
  notRecorded: "अद्याप नोंद नाही.",
  noDocuments: "कोणतेही कागदपत्र अपलोड केलेले नाही.",
  edit: "तपशील संपादित करा",
  doneEditing: "संपादन पूर्ण",
  defer: "पुढे ढकला",
  confirm: "नोंद निश्चित करा",
  confirmed: "नोंद निश्चित झाली",
  confirmPush: "पुष्टी करा आणि HIS वर पाठवा",
  hisSuccess: "इतिहास Hospital HIS वर पाठवून ABHA नोंदीशी जोडला आहे.",
  ayushSection: "AYUSH सल्ला तपशील",
  prakriti: "प्रकृती (शरीराची ठेवण)",
  agni: "अग्नी (पचनशक्ती)",
  aharaVihara: "आहार-विहार (आहार आणि जीवनशैली)",
  ayushPending: "नियमित मुलाखतीनंतर AYUSH प्रश्नांची उत्तरे येथे दिसतील.",
  awaitingComplaint: "लक्षण मुलाखत पूर्ण होण्याची प्रतीक्षा आहे.",
  awaitingHpi:
    "रुग्णाची मुलाखत सुरू आहे. सहाय्यक SOCRATES मूल्यांकन पूर्ण करू शकेल यासाठी चॅटवर परत जा.",
  socrates: {
    site: "ठिकाण",
    onset: "सुरुवात",
    character: "स्वरूप",
    radiation: "प्रसार",
    associations: "संबंधित लक्षणे",
    time: "वेळ",
    exacerbating: "वाढवणारे / कमी करणारे घटक",
    severity: "तीव्रता",
  },
};

const gu: Dict = {
  stationActive: "સ્ટેશન 04 • સક્રિય",
  welcomeTitle: "મેડિકિયોસ્કમાં આપનું સ્વાગત છે",
  welcomeSubtitle:
    "કૃપા કરીને તમારી ABHA આઈડી તૈયાર રાખો અથવા ડિજિટલ નોંધણી શરૂ કરવા માટે QR કોડ સ્કેન કરો.",
  preferredLanguage: "પસંદગીની ભાષા",
  consent:
    "હું સંમતિ આપું છું કે મેડિકિયોસ્ક આ પરામર્શ માટે મારા લક્ષણો અને આરોગ્ય રેકોર્ડ એકત્રિત કરે અને મારા ચિકિત્સક સાથે વહેંચે.",
  scanTitle: "ABHA QR કોડ સ્કેન કરો",
  scanning: "સ્કેન થઈ રહ્યું છે…",
  verified: "ચકાસાયેલ",
  scanHelpConsented: "તમારો આઈડી કાર્ડ ફ્રેમમાં મૂકો",
  scanHelpNoConsent: "આગળ વધવા માટે ઉપરની સંમતિ સ્વીકારો",
  or: "અથવા",
  manualEntry: "ABHA નંબર જાતે દાખલ કરો",
  ayushMode: "આયુર્વેદિક (AYUSH) સલાહ મોડ",
  ayushDescription: "શરીરની પ્રકૃતિ, પાચનશક્તિ અને જીવનશૈલી વિશે વધારાના પ્રશ્નો પૂછાશે.",

  assistantName: "ક્લિનિકલ ઈનટેક સહાયક",
  assistantSubtitle: "SOCRATES માળખા પર આધારિત",
  greeting:
    "નમસ્તે, ડોક્ટર માટે તમારો સારાંશ તૈયાર કરવામાં મદદ કરવા હું અહીં છું. આજે તમને શું તકલીફ છે? કૃપા કરીને તમારા મુખ્ય લક્ષણનું વર્ણન કરો.",
  typing: "સહાયક લખી રહ્યો છે…",
  extracted: "માંથી માહિતી કાઢવામાં આવી",
  inputPlaceholder: "તમારા લક્ષણોનું વર્ણન કરો...",
  uploadLabel: "મેડિકલ દસ્તાવેજ અપલોડ કરો",
  uploadDocument: "પ્રિસ્ક્રિપ્શન / લેબ રિપોર્ટ અપલોડ કરો",
  extractingDocument: "દસ્તાવેજમાંથી માહિતી કાઢવામાં આવી રહી છે…",
  extractionComplete: "દસ્તાવેજમાંથી ડેટા કાઢવામાં આવ્યો",
  sendLabel: "મોકલો",
  markers: (n) => `8 માંથી ${n} SOCRATES નિશાનીઓ નોંધાયેલ`,
  viewSummary: "ક્લિનિકલ સારાંશ જુઓ",
  genericError: "કંઈક ખોટું થયું. કૃપા કરીને ફરી પ્રયાસ કરો.",
  priorityAlert: "⚠ પ્રાથમિકતા ચેતવણી — સ્ટાફને જાણ કરવામાં આવી",

  summaryTitle: "ક્લિનિકલ સારાંશ",
  patientId: "દર્દી આઈડી",
  notVerified: "ચકાસાયેલ નથી",
  filed: "નોંધાયેલ",
  draft: "ડ્રાફ્ટ રેકોર્ડ",
  chiefComplaint: "મુખ્ય ફરિયાદ",
  hpi: "વર્તમાન બીમારીનો ઇતિહાસ",
  pmh: "પૂર્વ તબીબી ઇતિહાસ",
  extractedData: "દસ્તાવેજમાંથી મેળવેલ ડેટા",
  notRecorded: "હજુ નોંધાયેલ નથી.",
  noDocuments: "કોઈ દસ્તાવેજ અપલોડ થયેલ નથી.",
  edit: "વિગતો સંપાદિત કરો",
  doneEditing: "સંપાદન પૂર્ણ",
  defer: "મુલતવી મૂકો",
  confirm: "નોંધ ખાતરી કરો",
  confirmed: "નોંદ ખાતરી થયેલ",
  confirmPush: "ખાતરી કરો અને HIS પર મોકલો",
  hisSuccess: "ઇતિહાસ Hospital HIS પર મોકલવામાં આવ્યો અને ABHA રેકોર્ડ સાથે જોડાયો.",
  ayushSection: "AYUSH સલાહની વિગતો",
  prakriti: "પ્રકૃતિ (શરીરની રચના)",
  agni: "અગ્નિ (પાચન શક્તિ)",
  aharaVihara: "આહાર-વિહાર (આહાર અને જીવનશૈલી)",
  ayushPending: "નિયમિત મુલાકાત પછી AYUSH પ્રશ્નોના જવાબો અહીં દેખાશે.",
  awaitingComplaint: "લક્ષણ મુલાકાત પૂર્ણ થવાની રાહ જોવાઈ રહી છે.",
  awaitingHpi:
    "દર્દીની મુલાકાત હજુ ચાલુ છે. સહાયક SOCRATES મૂલ્યાંકન પૂર્ણ કરી શકે તે માટે ચેટ પર પાછા જાઓ.",
  socrates: {
    site: "સ્થળ",
    onset: "શરૂઆત",
    character: "સ્વભાવ",
    radiation: "ફેલાવો",
    associations: "સંબંધિત લક્ષણો",
    time: "સમય",
    exacerbating: "વધારતા / ઘટાડતા પરિબળો",
    severity: "તીવ્રતા",
  },
};

const kn: Dict = {
  stationActive: "ನಿಲ್ದಾಣ 04 • ಸಕ್ರಿಯ",
  welcomeTitle: "ಮೆಡಿಕಿಯೋಸ್ಕ್‌ಗೆ ಸ್ವಾಗತ",
  welcomeSubtitle:
    "ದಯವಿಟ್ಟು ನಿಮ್ಮ ABHA ಐಡಿಯನ್ನು ಸಿದ್ಧಗೊಳಿಸಿ ಅಥವಾ ಡಿಜಿಟಲ್ ನೋಂದಣಿಯನ್ನು ಪ್ರಾರಂಭಿಸಲು QR ಕೋಡ್ ಅನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.",
  preferredLanguage: "ಆದ್ಯತೆಯ ಭಾಷೆ",
  consent:
    "ಈ ಸಮಾಲೋಚನೆಗಾಗಿ ಮೆಡಿಕಿಯೋಸ್ಕ್ ನನ್ನ ಲಕ್ಷಣಗಳು ಮತ್ತು ಆರೋಗ್ಯ ದಾಖಲೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ ನನ್ನ ವೈದ್ಯರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.",
  scanTitle: "ABHA QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
  scanning: "ಸ್ಕ್ಯಾನ್ ಆಗುತ್ತಿದೆ…",
  verified: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
  scanHelpConsented: "ನಿಮ್ಮ ಐಡಿ ಕಾರ್ಡ್ ಅನ್ನು ಚೌಕಟ್ಟಿನೊಳಗೆ ಇರಿಸಿ",
  scanHelpNoConsent: "ಮುಂದುವರಿಯಲು ದಯವಿಟ್ಟು ಮೇಲಿನ ಒಪ್ಪಿಗೆಯನ್ನು ಸ್ವೀಕರಿಸಿ",
  or: "ಅಥವಾ",
  manualEntry: "ABHA ಸಂಖ್ಯೆಯನ್ನು ಹಸ್ತಚಾಲಿತವಾಗಿ ನಮೂದಿಸಿ",
  ayushMode: "ಆಯುರ್ವೇದ (AYUSH) ಸಮಾಲೋಚನೆ ಮೋಡ್",
  ayushDescription:
    "ದೇಹದ ರಚನೆ, ಜೀರ್ಣಶಕ್ತಿ ಮತ್ತು ಜೀವನಶೈಲಿಯ ಕುರಿತು ಹೆಚ್ಚುವರಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಲಾಗುತ್ತದೆ.",

  assistantName: "ಕ್ಲಿನಿಕಲ್ ಇನ್‌ಟೇಕ್ ಸಹಾಯಕ",
  assistantSubtitle: "SOCRATES ಚೌಕಟ್ಟಿನ ಆಧಾರದ ಮೇಲೆ",
  greeting:
    "ನಮಸ್ಕಾರ, ವೈದ್ಯರಿಗಾಗಿ ನಿಮ್ಮ ಸಾರಾಂಶವನ್ನು ಸಿದ್ಧಪಡಿಸಲು ಸಹಾಯ ಮಾಡಲು ನಾನು ಇಲ್ಲಿದ್ದೇನೆ. ಇಂದು ನಿಮಗೆ ಏನು ತೊಂದರೆ? ದಯವಿಟ್ಟು ನಿಮ್ಮ ಮುಖ್ಯ ಲಕ್ಷಣವನ್ನು ವಿವರಿಸಿ.",
  typing: "ಸಹಾಯಕ ಟೈಪ್ ಮಾಡುತ್ತಿದ್ದಾರೆ…",
  extracted: "ಇಂದ ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ",
  inputPlaceholder: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ...",
  uploadLabel: "ವೈದ್ಯಕೀಯ ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
  uploadDocument: "ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ / ಲ್ಯಾಬ್ ವರದಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
  extractingDocument: "ದಾಖಲೆಯಿಂದ ಮಾಹಿತಿ ಪಡೆಯಲಾಗುತ್ತಿದೆ…",
  extractionComplete: "ದಾಖಲೆಯಿಂದ ಮಾಹಿತಿ ಪಡೆಯಲಾಗಿದೆ",
  sendLabel: "ಕಳುಹಿಸಿ",
  markers: (n) => `8ರಲ್ಲಿ ${n} SOCRATES ಗುರುತುಗಳು ದಾಖಲಾಗಿವೆ`,
  viewSummary: "ಕ್ಲಿನಿಕಲ್ ಸಾರಾಂಶ ನೋಡಿ",
  genericError: "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
  priorityAlert: "⚠ ಆದ್ಯತೆಯ ಎಚ್ಚರಿಕೆ — ಸಿಬ್ಬಂದಿಗೆ ತಿಳಿಸಲಾಗಿದೆ",

  summaryTitle: "ಕ್ಲಿನಿಕಲ್ ಸಾರಾಂಶ",
  patientId: "ರೋಗಿ ಐಡಿ",
  notVerified: "ಪರಿಶೀಲಿಸಲಾಗಿಲ್ಲ",
  filed: "ದಾಖಲಾಗಿದೆ",
  draft: "ಕರಡು ದಾಖಲೆ",
  chiefComplaint: "ಮುಖ್ಯ ದೂರು",
  hpi: "ಪ್ರಸ್ತುತ ಅಸ್ವಸ್ಥತೆಯ ಇತಿಹಾಸ",
  pmh: "ಹಿಂದಿನ ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ",
  extractedData: "ದಾಖಲೆಯಿಂದ ಪಡೆದ ದತ್ತಾಂಶ",
  notRecorded: "ಇನ್ನೂ ದಾಖಲಾಗಿಲ್ಲ.",
  noDocuments: "ಯಾವುದೇ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿಲ್ಲ.",
  edit: "ವಿವರಗಳನ್ನು ಸಂಪಾದಿಸಿ",
  doneEditing: "ಸಂಪಾದನೆ ಪೂರ್ಣ",
  defer: "ಮುಂದೂಡಿ",
  confirm: "ದಾಖಲೆ ಖಚಿತಗೊಳಿಸಿ",
  confirmed: "ದಾಖಲೆ ಖಚಿತಗೊಂಡಿದೆ",
  confirmPush: "ಖಚಿತಪಡಿಸಿ ಮತ್ತು HIS ಗೆ ಕಳುಹಿಸಿ",
  hisSuccess: "ಇತಿಹಾಸವನ್ನು Hospital HIS ಗೆ ಕಳುಹಿಸಿ ABHA ದಾಖಲೆಯೊಂದಿಗೆ ಲಿಂಕ್ ಮಾಡಲಾಗಿದೆ.",
  ayushSection: "AYUSH ಸಮಾಲೋಚನೆ ವಿವರಗಳು",
  prakriti: "ಪ್ರಕೃತಿ (ದೇಹದ ರಚನೆ)",
  agni: "ಅಗ್ನಿ (ಜೀರ್ಣಶಕ್ತಿ)",
  aharaVihara: "ಆಹಾರ-ವಿಹಾರ (ಆಹಾರ ಮತ್ತು ಜೀವನಶೈಲಿ)",
  ayushPending: "ಸಾಮಾನ್ಯ ಸಂದರ್ಶನದ ನಂತರ AYUSH ಪ್ರಶ್ನೆಗಳ ಉತ್ತರಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ.",
  awaitingComplaint: "ಲಕ್ಷಣ ಸಂದರ್ಶನ ಪೂರ್ಣಗೊಳ್ಳಲು ಕಾಯುತ್ತಿದೆ.",
  awaitingHpi:
    "ರೋಗಿಯ ಸಂದರ್ಶನ ಇನ್ನೂ ನಡೆಯುತ್ತಿದೆ. ಸಹಾಯಕ SOCRATES ಮೌಲ್ಯಮಾಪನ ಪೂರ್ಣಗೊಳಿಸಲು ಚಾಟ್‌ಗೆ ಹಿಂತಿರುಗಿ.",
  socrates: {
    site: "ಸ್ಥಳ",
    onset: "ಆರಂಭ",
    character: "ಸ್ವಭಾವ",
    radiation: "ಹರಡುವಿಕೆ",
    associations: "ಸಂಬಂಧಿತ ಲಕ್ಷಣಗಳು",
    time: "ಸಮಯ",
    exacerbating: "ಹೆಚ್ಚಿಸುವ / ಕಡಿಮೆ ಮಾಡುವ ಅಂಶಗಳು",
    severity: "ತೀವ್ರತೆ",
  },
};

export const DICTS: Record<string, Dict> = {
  English: en,
  हिंदी: hi,
  বাংলা: bn,
  தமிழ்: ta,
  తెలుగు: te,
  मराठी: mr,
  ગુજરાતી: gu,
  ಕನ್ನಡ: kn,
};

export function getDict(language: string): Dict {
  return DICTS[language] ?? en;
}

export function useT(): Dict {
  const { language } = useKiosk();
  return getDict(language);
}
