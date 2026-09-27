export type SupportedLanguage = 
  | 'en' 
  | 'hi' 
  | 'kn' 
  | 'ta' 
  | 'te' 
  | 'ml' 
  | 'bn' 
  | 'mr';

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  speechLocale: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechLocale: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechLocale: 'ta-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechLocale: 'te-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', speechLocale: 'ml-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechLocale: 'bn-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechLocale: 'mr-IN' },
];

export interface TranslationDictionary {
  appTitle: string;
  subtitle: string;
  searchPlaceholder: string;
  startChat: string;
  exploreMap: string;
  chat: string;
  dashboard: string;
  weatherMap: string;
  insights: string;
  alerts: string;
  settings: string;
  travelRisk: string;
  decisionSupport: string;
  confidence: string;
  sources: string;
  safeWindow: string;
  rainProbability: string;
  windSpeed: string;
  humidity: string;
  uvIndex: string;
  visibility: string;
  officialWarningFirst: string;
  flagshipPrompt: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appTitle: 'WeatherGPT',
    subtitle: 'Conversational AI for Weather Forecasting, Alerts & Climate Intelligence',
    searchPlaceholder: 'Ask anything about weather...',
    startChat: 'Start Chat',
    exploreMap: 'Explore Live Weather',
    chat: 'Chat',
    dashboard: 'Dashboard',
    weatherMap: 'Weather Map',
    insights: 'Insights',
    alerts: 'Alerts',
    settings: 'Settings',
    travelRisk: 'Travel Risk',
    decisionSupport: 'AI Decision Support',
    confidence: 'Confidence',
    sources: 'Sources',
    safeWindow: 'Safest Travel Window',
    rainProbability: 'Rain Probability',
    windSpeed: 'Wind Speed',
    humidity: 'Humidity',
    uvIndex: 'UV Index',
    visibility: 'Visibility',
    officialWarningFirst: 'Official Warning Active',
    flagshipPrompt: 'Will it rain tomorrow in Bengaluru, and is it safe to travel?'
  },
  hi: {
    appTitle: 'वेदर-जीपीटी',
    subtitle: 'मौसम पूर्वानुमान, चेतावनी और जलवायु बुद्धिमत्ता के लिए संवादात्मक एआई',
    searchPlaceholder: 'मौसम के बारे में कुछ भी पूछें...',
    startChat: 'बातचीत शुरू करें',
    exploreMap: 'मौसम मानचित्र देखें',
    chat: 'चैट',
    dashboard: 'डैशबोर्ड',
    weatherMap: 'मौसम मानचित्र',
    insights: 'जलवायु अंतर्दृष्टि',
    alerts: 'चेतावनी',
    settings: 'सेटिंग्स',
    travelRisk: 'यात्रा जोखिम',
    decisionSupport: 'एआई निर्णय सहायता',
    confidence: 'विश्वास स्कोर',
    sources: 'मौसम स्रोत',
    safeWindow: 'सबसे सुरक्षित यात्रा समय',
    rainProbability: 'बारिश की संभावना',
    windSpeed: 'हवा की गति',
    humidity: 'नमी',
    uvIndex: 'यूवी इंडेक्स',
    visibility: 'दृश्यता',
    officialWarningFirst: 'आधिकारिक चेतावनी सक्रिय',
    flagshipPrompt: 'क्या कल बेंगलुरु में बारिश होगी और क्या यात्रा करना सुरक्षित है?'
  },
  kn: {
    appTitle: 'ವೆದರ್ ಜಿಪಿಟಿ',
    subtitle: 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ, ಎಚ್ಚರಿಕೆ ಮತ್ತು ಹವಾಮಾನ ಗುಪ್ತಚರಕ್ಕಾಗಿ ಸಂವಾದಾತ್ಮಕ AI',
    searchPlaceholder: 'ಹವಾಮಾನದ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ...',
    startChat: 'ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
    exploreMap: 'ಹವಾಮಾನ ನಕ್ಷೆ ವೀಕ್ಷಿಸಿ',
    chat: 'ಚಾಟ್',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    weatherMap: 'ಹವಾಮಾನ ನಕ್ಷೆ',
    insights: 'ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ',
    alerts: 'ಎಚ್ಚರಿಕೆಗಳು',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    travelRisk: 'ಪ್ರಯಾಣದ ಅಪಾಯ',
    decisionSupport: 'AI ನಿರ್ಧಾರ ಬೆಂಬಲ',
    confidence: 'ವಿಶ್ವಾಸಾರ್ಹತೆ',
    sources: 'ಮೂಲಗಳು',
    safeWindow: 'ಸುರಕ್ಷಿತ ಪ್ರಯಾಣದ ಸಮಯ',
    rainProbability: 'ಮಳೆಯ ಸಾಧ್ಯತೆ',
    windSpeed: 'ಗಾಳಿಯ ವೇಗ',
    humidity: 'ತೇವಾಂಶ',
    uvIndex: 'ಯುವಿ ಸೂಚ್ಯಂಕ',
    visibility: 'ಗೋಚರತೆ',
    officialWarningFirst: 'ಅಧಿಕೃತ ಮುನ್ನೆಚ್ಚರಿಕೆ ಜಾರಿಯಲ್ಲಿದೆ',
    flagshipPrompt: 'ನಾಳೆ ಬೆಂಗಳೂರಿನಲ್ಲಿ ಮಳೆ ಬರುತ್ತದೆಯೇ ಮತ್ತು ಪ್ರಯಾಣಿಸುವುದು ಸುರಕ್ಷಿತವೇ?'
  },
  ta: {
    appTitle: 'வெதர்ஜிபிடி',
    subtitle: 'வானிலை முன்னறிவிப்பு, எச்சரிக்கைகள் மற்றும் காலநிலை நுண்ணறிவுக்கான உரையாடல் AI',
    searchPlaceholder: 'வானிலை பற்றி எதையும் கேளுங்கள்...',
    startChat: 'உரையாடலைத் தொடங்கு',
    exploreMap: 'வானிலை வரைபடம்',
    chat: 'அரட்டை',
    dashboard: 'முகப்பு பலகை',
    weatherMap: 'வானிலை வரைபடம்',
    insights: 'காலநிலை நுண்ணறிவு',
    alerts: 'எச்சரிக்கைகள்',
    settings: 'அமைப்புகள்',
    travelRisk: 'பயண இடர்',
    decisionSupport: 'AI முடிவு ஆதரவு',
    confidence: 'நம்பகத்தன்மை',
    sources: 'வானிலை தரவு மூலங்கள்',
    safeWindow: 'பாதுகாப்பான பயண நேரம்',
    rainProbability: 'மழை வாய்ப்பு',
    windSpeed: 'காற்றின் வேகம்',
    humidity: 'ஈரப்பதம்',
    uvIndex: 'புற ஊதா குறியீடு',
    visibility: 'பார்வைத்திறன்',
    officialWarningFirst: 'அதிகாரப்பூர்வ எச்சரிக்கை செயலில் உள்ளது',
    flagshipPrompt: 'நாளை பெங்களூரில் மழை பெய்யுமா, பயணம் செய்வது பாதுகாப்பானதா?'
  },
  te: {
    appTitle: 'వెదర్‌జిపిటి',
    subtitle: 'వాతావరణ సూచనలు, హెచ్చరికలు & వాతావరణ సమాచారం కోసం సంభాషణాత్మక AI',
    searchPlaceholder: 'వాతావరణం గురించి ఏదైనా అడగండి...',
    startChat: 'చాట్ ప్రారంభించండి',
    exploreMap: 'వాతావరణ పటం చూడండి',
    chat: 'చాట్',
    dashboard: 'డాష్‌బోర్డ్',
    weatherMap: 'వాతావరణ పటం',
    insights: 'విశ్లేషణలు',
    alerts: 'హెచ్చరికలు',
    settings: 'సెట్టింగ్‌లు',
    travelRisk: 'ప్రయాణ ప్రమాదం',
    decisionSupport: 'AI నిర్ణయ మద్దతు',
    confidence: 'విశ్వసనీయత',
    sources: 'మూలాలు',
    safeWindow: 'సురక్షిత ప్రయాణ సమయం',
    rainProbability: 'వర్షం సంభావ్యత',
    windSpeed: 'గాలి వేగం',
    humidity: 'తేమ',
    uvIndex: 'UV సూచిక',
    visibility: 'దృశ్యత',
    officialWarningFirst: 'అధికారిక హెచ్చరిక సక్రియంగా ఉంది',
    flagshipPrompt: 'రేపు బెంగళూరులో వర్షం పడుతుందా, ప్రయాణం సురక్షితమేనా?'
  },
  ml: {
    appTitle: 'വെതർജിപിടി',
    subtitle: 'കാലാവസ്ഥ പ്രവചനം, മുന്നറിയിപ്പുകൾ എന്നിവയ്ക്കുള്ള സംഭാഷണ AI',
    searchPlaceholder: 'കാലാവസ്ഥയെക്കുറിച്ച് എന്തും ചോദിക്കൂ...',
    startChat: 'ചാറ്റ് ആരംഭിക്കുക',
    exploreMap: 'കാലാവസ്ഥ ഭൂപടം',
    chat: 'ചാറ്റ്',
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    weatherMap: 'കാലാവസ്ഥ ഭൂപടം',
    insights: 'കാലാവസ്ഥ വിശകലനം',
    alerts: 'മുന്നറിയിപ്പുകൾ',
    settings: 'ക്രമീകരണങ്ങൾ',
    travelRisk: 'യാത്രാ സാധ്യത',
    decisionSupport: 'AI തീരുമാന പിന്തുണ',
    confidence: 'വിശ്വാസ്യത',
    sources: 'ഉറവിടങ്ങൾ',
    safeWindow: 'സുരക്ഷിതമായ യാത്രാ സമയം',
    rainProbability: 'മഴ സാധ്യത',
    windSpeed: 'കാറ്റിന്റെ വേഗത',
    humidity: 'ഈർപ്പം',
    uvIndex: 'UV സൂചിക',
    visibility: 'കാഴ്ച പരിധി',
    officialWarningFirst: 'ഔദ്യോഗിക മുന്നറിയിപ്പ് നിലവിലുണ്ട്',
    flagshipPrompt: 'നാളെ ബെംഗളൂരുവിൽ മഴ പെയ്യുമോ, യാത്ര ചെയ്യുന്നത് സുരക്ഷിതമാണോ?'
  },
  bn: {
    appTitle: 'ওয়েদারজিপিটি',
    subtitle: 'আবহাওয়ার পূর্বাভাস এবং সতর্কতার জন্য এআই সহকারী',
    searchPlaceholder: 'আবহাওয়া সম্পর্কে যা কিছু জিজ্ঞাসা করুন...',
    startChat: 'চ্যাট শুরু করুন',
    exploreMap: 'আবহাওয়া মানচিত্র',
    chat: 'চ্যাট',
    dashboard: 'ড্যাশবোর্ড',
    weatherMap: 'আবহাওয়া মানচিত্র',
    insights: 'জলবায়ু অন্তর্দৃষ্টি',
    alerts: 'সতর্কতা',
    settings: 'সেটিংস',
    travelRisk: 'ভ্রমণ ঝুঁকি',
    decisionSupport: 'এআই সিদ্ধান্ত সহায়তা',
    confidence: 'নির্ভরযোগ্যতা',
    sources: 'উৎসসমূহ',
    safeWindow: 'নিরাপদ ভ্রমণের সময়',
    rainProbability: 'বৃষ্টির সম্ভাবনা',
    windSpeed: 'বাতাসের গতি',
    humidity: 'আর্দ্রতা',
    uvIndex: 'ইউভি সূচক',
    visibility: 'দৃশ্যমানতা',
    officialWarningFirst: 'অফিসিয়াল সতর্কতা সক্রিয়',
    flagshipPrompt: 'আগামীকাল কি বেঙ্গালুরুতে বৃষ্টি হবে এবং ভ্রমণ করা কি নিরাপদ?'
  },
  mr: {
    appTitle: 'वेदरजीपीटी',
    subtitle: 'हवामान अंदाज, सतर्कता आणि हवामान बुद्धिमत्तेसाठी संभाषण एआय',
    searchPlaceholder: 'हवामानाबद्दल काहीही विचारा...',
    startChat: 'संभाषण सुरू करा',
    exploreMap: 'हवामान नकाशा पहा',
    chat: 'चॅट',
    dashboard: 'डॅशबोर्ड',
    weatherMap: 'हवामान नकाशा',
    insights: 'हवामान विश्लेषण',
    alerts: 'इशारे',
    settings: 'सेटिंग्ज',
    travelRisk: 'प्रवास धोका',
    decisionSupport: 'एआय निर्णय सहाय्य',
    confidence: 'विश्वासार्हता',
    sources: 'स्रोत',
    safeWindow: 'सुरक्षित प्रवास वेळ',
    rainProbability: 'पावसाची शक्यता',
    windSpeed: 'वाऱ्याचा वेग',
    humidity: 'आर्द्रता',
    uvIndex: 'यूव्ही निर्देशांक',
    visibility: 'दृश्यमानता',
    officialWarningFirst: 'अधिकृत इशारा सक्रिय',
    flagshipPrompt: 'उद्या बंगळुरूमध्ये पाऊस पडेल का आणि प्रवास करणे सुरक्षित आहे का?'
  }
};
