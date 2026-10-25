'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sparkles, 
  Send, 
  Store, 
  MapPin, 
  MessageSquare, 
  Video, 
  HelpCircle, 
  ChevronRight,
  ShieldCheck,
  Search,
  Mic,
  MicOff,
  Globe
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getStoredBusinesses, StoredBusiness } from '@/lib/storage';
import { CATEGORIES } from '@/data/mockData';

interface ChatMessage {
  id: string;
  sender: 'dora' | 'user';
  text: string;
  links?: { label: string; href: string }[];
  businessResults?: StoredBusiness[];
  timestamp: string;
}

export default function DoraAIPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'తెలుగు' | 'हिंदी'>('English');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'dora',
      text: 'Namaste! I am Dora, your Needora AI Assistant. How can I help you discover local businesses, send enquiries, or promote your shop today?',
      links: [
        { label: 'Find Nearby Services', href: '/services' },
        { label: 'List My Business Free', href: '/listing' },
        { label: 'Watch Merchant Reels', href: '/videos' },
        { label: 'My Enquiries', href: '/my-enquiries' },
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Switch greeting on language change
  const handleLanguageChange = (lang: 'English' | 'తెలుగు' | 'हिंदी') => {
    setSelectedLanguage(lang);
    let greetingText = '';
    let links = [
      { label: 'Find Nearby Services', href: '/services' },
      { label: 'List My Business Free', href: '/listing' },
      { label: 'Watch Merchant Reels', href: '/videos' },
      { label: 'My Enquiries', href: '/my-enquiries' },
    ];

    if (lang === 'తెలుగు') {
      greetingText = 'నమస్కారం! నేను డోరా (Dora), మీ నీడోరా ఏఐ అసిస్టెంట్. స్థానిక దుకాణాలు, హోమ్ డెకర్, క్లీనింగ్, ఉచిత వ్యాపార నమోదు లేదా కస్టమర్ ఎంక్వైరీల గురించి నన్ను అడగండి.';
      links = [
        { label: 'స్థానిక సర్వీసులు', href: '/services' },
        { label: 'ఉచిత వ్యాపార నమోదు', href: '/listing' },
        { label: 'మర్చంట్ రీల్స్ చూడండి', href: '/videos' },
        { label: 'నా ఎంక్వైరీలు', href: '/my-enquiries' },
      ];
    } else if (lang === 'हिंदी') {
      greetingText = 'नमस्ते! मैं डोरा (Dora) हूँ, आपकी नीडोरा एआई सहायक। स्थानीय दुकानों, होम डेकोर, क्लीनिंग, मुफ्त दुकान लिस्टिंग या इन्क्वायरी के बारे में कुछ भी पूछें।';
      links = [
        { label: 'स्थानीय सेवाएं खोजें', href: '/services' },
        { label: 'मुफ्त दुकान जोड़ें', href: '/listing' },
        { label: 'मर्चेंट रील्स देखें', href: '/videos' },
        { label: 'मेरी इन्क्वायरी', href: '/my-enquiries' },
      ];
    } else {
      greetingText = 'Namaste! I am Dora, your Needora AI Assistant. How can I help you discover local businesses, send enquiries, or promote your shop today?';
    }

    setMessages(prev => [
      ...prev,
      {
        id: 'lang-' + Date.now(),
        sender: 'dora',
        text: greetingText,
        links,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  // Voice speech-to-text with Web Speech API in native language
  const handleToggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    // Vernacular Speech Code
    if (selectedLanguage === 'తెలుగు') {
      recognition.lang = 'te-IN';
    } else if (selectedLanguage === 'हिंदी') {
      recognition.lang = 'hi-IN';
    } else {
      recognition.lang = 'en-IN';
    }

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setInputText(speechResult);
      setIsListening(false);
      handleSend(speechResult);
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      respondToQuery(query);
      setIsTyping(false);
    }, 600);
  };

  const respondToQuery = (query: string) => {
    const q = query.toLowerCase();
    const businesses = getStoredBusinesses();

    // 1. Payment or Pricing inquiries (English / Telugu / Hindi)
    const isPaymentQuery = 
      q.includes('pay') || q.includes('payment') || q.includes('upi') || q.includes('price') || q.includes('cost') || q.includes('fee') ||
      q.includes('డబ్బు') || q.includes('చెల్లింపు') || q.includes('ఫీజు') || q.includes('ధర') || q.includes('పేమెంట్') || q.includes('పైసలు') ||
      q.includes('पैसा') || q.includes('भुगतान') || q.includes('फीस') || q.includes('दाम') || q.includes('कीमत') || q.includes('पेमेंट') || q.includes('रुपये');

    if (isPaymentQuery) {
      let reply = 'Needora does NOT collect online payments, UPI transfers, or checkout fees! Our platform connects you directly to local businesses for 100% free enquiries. You discuss quotes, scope, and payment directly with the merchant with no middlemen.';
      if (selectedLanguage === 'తెలుగు') {
        reply = 'Needora లో ఎలాంటి ఆన్‌లైన్ పేమెంట్లు లేదా UPI లావాదేవీలు ఉండవు! స్థానిక వ్యాపారులతో నేరుగా ఉచితంగా మాట్లాడవచ్చు మరియు ఎంక్వైరీ పంపవచ్చు. ఎలాంటి కమీషన్ లేదా మధ్యవర్తి రుసుము ఉండదు.';
      } else if (selectedLanguage === 'हिंदी') {
        reply = 'Needora पर कोई ऑनलाइन भुगतान, UPI या चेकआउट शुल्क नहीं लिया जाता! यहां आप स्थानीय दुकानदारों को 100% मुफ्त इन्क्वायरी भेज सकते हैं और सीधे बात कर सकते हैं।';
      }

      setMessages(prev => [
        ...prev,
        {
          id: 'dora-' + Date.now(),
          sender: 'dora',
          text: reply,
          links: [
            { label: selectedLanguage === 'తెలుగు' ? 'సర్వీసులు చూడండి' : selectedLanguage === 'हिंदी' ? 'सभी सेवाएं' : 'View All Services', href: '/services' },
            { label: selectedLanguage === 'తెలుగు' ? 'నా ఎంక్వైరీలు' : selectedLanguage === 'हिंदी' ? 'मेरी इन्क्वायरी' : 'Check My Enquiries', href: '/my-enquiries' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    // 2. Business listing inquiries (English / Telugu / Hindi)
    const isListingQuery = 
      q.includes('register') || q.includes('list') || q.includes('merchant') || q.includes('add my shop') || q.includes('owner') ||
      q.includes('నమోదు') || q.includes('రిజిస్టర్') || q.includes('షాప్') || q.includes('వ్యాపారం') || q.includes('దుకాణం') ||
      q.includes('रजिस्टर') || q.includes('दुकान') || q.includes('व्यापार') || q.includes('लिस्ट') || q.includes('जोड़ें');

    if (isListingQuery) {
      let reply = 'Listing your shop on Needora is completely FREE! You get a dedicated merchant profile, direct customer enquiries via SMS/WhatsApp, and can upload promotional video reels to reach local customers.';
      if (selectedLanguage === 'తెలుగు') {
        reply = 'Needora లో మీ వ్యాపారాన్ని లేదా దుకాణాన్ని నమోదు చేయడం 100% పూర్తిగా ఉచితం! మీకు ప్రత్యేక ప్రొఫైల్ లభిస్తుంది, కస్టమర్ల నుండి నేరుగా కాల్స్/వాట్సాప్ ఎంక్వైరీలు వస్తాయి, మరియు వీడియో రీల్స్ అప్‌లోడ్ చేయవచ్చు.';
      } else if (selectedLanguage === 'हिंदी') {
        reply = 'Needora पर अपनी दुकान या व्यवसाय लिस्ट करना बिल्कुल मुफ्त है! आपको एक समर्पित प्रोफाइल मिलता है, ग्राहक सीधे फोन/व्हाट्सएप से संपर्क करेंगे, और आप वीडियो रील्स भी पोस्ट कर सकते हैं।';
      }

      setMessages(prev => [
        ...prev,
        {
          id: 'dora-' + Date.now(),
          sender: 'dora',
          text: reply,
          links: [
            { label: selectedLanguage === 'తెలుగు' ? 'ఉచిత రిజిస్ట్రేషన్ ఫారం' : selectedLanguage === 'हिंदी' ? 'मुफ्त लिस्टिंग फॉर्म' : 'Open Free Listing Form', href: '/listing' },
            { label: selectedLanguage === 'తెలుగు' ? 'మర్చంట్ డాష్‌బోర్డ్' : selectedLanguage === 'हिंदी' ? 'मर्चेंट डैशबोर्ड' : 'Go to Merchant Dashboard', href: '/merchant' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    // 3. Video or Reels inquiries (English / Telugu / Hindi)
    const isReelQuery = 
      q.includes('video') || q.includes('reel') || q.includes('watch') || q.includes('clip') ||
      q.includes('వీడియో') || q.includes('రీల్స్') || q.includes('రీల్') || q.includes('స్టోరీ') ||
      q.includes('वीडियो') || q.includes('रील्स') || q.includes('रील');

    if (isReelQuery) {
      let reply = 'You can explore vertical video reels uploaded by real local merchants, or upload your own store walkthroughs!';
      if (selectedLanguage === 'తెలుగు') {
        reply = 'స్థానిక దుకాణదారులు పోస్ట్ చేసిన ఆకర్షణీయమైన వీడియో రీల్స్ చూడవచ్చు లేదా మీ స్వంత దుకాణ వీడియోను అప్‌లోడ్ చేయవచ్చు!';
      } else if (selectedLanguage === 'हिंदी') {
        reply = 'स्थानीय व्यापारियों द्वारा शेयर किए गए वीडियो रील्स देखें या अपनी दुकान का वीडियो अपलोड करें!';
      }

      setMessages(prev => [
        ...prev,
        {
          id: 'dora-' + Date.now(),
          sender: 'dora',
          text: reply,
          links: [
            { label: selectedLanguage === 'తెలుగు' ? 'వీడియో రీల్స్ చూడండి' : selectedLanguage === 'हिंदी' ? 'वीडियो रील्स देखें' : 'Watch Video Reels', href: '/videos' },
            { label: selectedLanguage === 'తెలుగు' ? 'వీడియో అప్‌లోడ్ చేయండి' : selectedLanguage === 'हिंदी' ? 'वीडियो अपलोड करें' : 'Upload Store Video', href: '/create' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    // 4. Vernacular Category Matching (Telugu & Hindi keywords mapping)
    let targetCategorySlug = '';
    let targetCategoryName = '';

    if (q.includes('హోమ్ డెకర్') || q.includes('ఫర్నిచర్') || q.includes('డెకరేషన్') || q.includes('होम डेकोर') || q.includes('फर्नीचर')) {
      targetCategorySlug = 'home-decor';
      targetCategoryName = 'Home Decor';
    } else if (q.includes('రెస్టారెంట్') || q.includes('భోజనం') || q.includes('ఫుడ్') || q.includes('తిండి') || q.includes('रेस्टोरेंट') || q.includes('खाना') || q.includes('भोजन')) {
      targetCategorySlug = 'food-dining';
      targetCategoryName = 'Food & Dining';
    } else if (q.includes('క్లీనింగ్') || q.includes('శుభ్రం') || q.includes('क्लीनिंग') || q.includes('सफाई')) {
      targetCategorySlug = 'home-cleaning';
      targetCategoryName = 'Home Cleaning';
    } else if (q.includes('సెలూన్') || q.includes('బ్యూటీ') || q.includes('స్పా') || q.includes('सैलून') || q.includes('ब्यूटी') || q.includes('स्पा')) {
      targetCategorySlug = 'beauty-salon';
      targetCategoryName = 'Beauty & Salon';
    } else if (q.includes('ఎలక్ట్రీషియన్') || q.includes('ప్లంబర్') || q.includes('రిపేర్') || q.includes('इलेक्ट्रीशियन') || q.includes('प्लंबर') || q.includes('मरम्मत')) {
      targetCategorySlug = 'repairs-services';
      targetCategoryName = 'Repairs & Services';
    } else if (q.includes('ఇల్లు') || q.includes('అద్దె') || q.includes('ఫ్లాట్') || q.includes('मकान') || q.includes('किराया') || q.includes('फ्लैट')) {
      targetCategorySlug = 'real-estate';
      targetCategoryName = 'Real Estate';
    }

    if (targetCategorySlug) {
      let reply = `Looking for ${targetCategoryName}? You can explore verified providers, compare quotes, and send instant enquiries for this category!`;
      if (selectedLanguage === 'తెలుగు') {
        reply = `${targetCategoryName} కోసం వెతుకుతున్నారా? ధృవీకరించబడిన స్థానిక ప్రొవైడర్లను చూడండి మరియు ఉచిత ఎంక్వైరీ పంపండి!`;
      } else if (selectedLanguage === 'हिंदी') {
        reply = `${targetCategoryName} के लिए खोज रहे हैं? सत्यापित स्थानीय दुकानों को देखें और मुफ्त में इन्क्वायरी भेजें!`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: 'dora-' + Date.now(),
          sender: 'dora',
          text: reply,
          links: [
            { label: selectedLanguage === 'తెలుగు' ? `${targetCategoryName} చూడండి` : selectedLanguage === 'हिंदी' ? `${targetCategoryName} देखें` : `Explore ${targetCategoryName}`, href: `/categories/${targetCategorySlug}` },
            { label: selectedLanguage === 'తెలుగు' ? 'ఉచిత ఎంక్వైరీ' : selectedLanguage === 'हिंदी' ? 'मुफ्त इन्क्वायरी' : 'Submit Free Enquiry', href: '/services' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    // 5. Search real businesses & categories
    const matchedBusinesses = businesses.filter(b => 
      b.name.toLowerCase().includes(q) || 
      b.category.toLowerCase().includes(q) || 
      b.description.toLowerCase().includes(q)
    );

    const matchedCategory = CATEGORIES.find(c => 
      c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    );

    if (matchedBusinesses.length > 0) {
      setMessages(prev => [
        ...prev,
        {
          id: 'dora-' + Date.now(),
          sender: 'dora',
          text: selectedLanguage === 'తెలుగు'
            ? `"${query}" కోసం Needora లో ${matchedBusinesses.length} ధృవీకరించబడిన వ్యాపారాలు దొరికాయి:`
            : selectedLanguage === 'हिंदी'
            ? `"${query}" के लिए Needora पर ${matchedBusinesses.length} सत्यापित व्यवसाय मिले:`
            : `I found ${matchedBusinesses.length} verified business(es) on Needora matching "${query}":`,
          businessResults: matchedBusinesses.slice(0, 3),
          links: [
            { label: selectedLanguage === 'తెలుగు' ? 'మరిన్ని వివరాలు' : selectedLanguage === 'हिंदी' ? 'और परिणाम देखें' : 'View in Full Search', href: `/search` }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    if (matchedCategory) {
      setMessages(prev => [
        ...prev,
        {
          id: 'dora-' + Date.now(),
          sender: 'dora',
          text: selectedLanguage === 'తెలుగు'
            ? `${matchedCategory.name} కోసం వెతుకుతున్నారా? మీరు రేట్లు పోల్చవచ్చు మరియు ఉచిత ఎంక్వైరీ పంపవచ్చు!`
            : selectedLanguage === 'हिंदी'
            ? `${matchedCategory.name} की खोज में हैं? आप सत्यापित दुकानों को मुफ्त इन्क्वायरी भेज सकते हैं!`
            : `Looking for ${matchedCategory.name}? You can explore verified providers, compare quotes, and send instant enquiries for this category!`,
          links: [
            { label: `Explore ${matchedCategory.name}`, href: `/categories/${matchedCategory.slug}` },
            { label: 'Submit Free Enquiry', href: '/services' }
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      return;
    }

    // Default intelligent guidance
    let defaultReply = `I can help you locate trusted local professionals, find store hours, track your enquiries, or publish your own business. What would you like to explore next?`;
    if (selectedLanguage === 'తెలుగు') {
      defaultReply = `మీ ప్రాంతంలోని ఉత్తమ దుకాణాలు, హోమ్ డెకర్, రిపేర్లు కనుగొనడంలో నేను మీకు సహాయపడతాను. మీరు ఏమి అన్వేషించాలనుకుంటున్నారు?`;
    } else if (selectedLanguage === 'हिंदी') {
      defaultReply = `मैं आपके इलाके के बेहतरीन होम डेकोर, ब्यूटी सैलून, सफाई और मरम्मत सेवा प्रदाताओं को खोजने में मदद कर सकती हूँ। आप क्या देखना चाहते हैं?`;
    }

    setMessages(prev => [
      ...prev,
      {
        id: 'dora-' + Date.now(),
        sender: 'dora',
        text: defaultReply,
        links: [
          { label: selectedLanguage === 'తెలుగు' ? 'అన్ని సర్వీసులు' : selectedLanguage === 'हिंदी' ? 'सभी सेवाएं' : 'Search All Services', href: '/services' },
          { label: selectedLanguage === 'తెలుగు' ? 'కేటగిరీలు' : selectedLanguage === 'हिंदी' ? 'श्रेणियां' : 'Browse Categories', href: '/categories' },
          { label: selectedLanguage === 'తెలుగు' ? 'ఉచిత నమోదు' : selectedLanguage === 'हिंदी' ? 'मुफ्त रजिस्ट्रेशन' : 'Register Free Business', href: '/listing' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const getQuickPrompts = () => {
    if (selectedLanguage === 'తెలుగు') {
      return [
        'ఉచితంగా దుకాణాన్ని ఎలా నమోదు చేయాలి?',
        'నా దగ్గర హోమ్ డెకర్ షాపులు ఉన్నాయా?',
        'Needora లో పేమెంట్ ఎలా?',
        'మర్చంట్ వీడియో రీల్స్ చూపించు',
      ];
    }
    if (selectedLanguage === 'हिंदी') {
      return [
        'मुफ्त में अपनी दुकान कैसे लिस्ट करें?',
        'आस-पास के होम डेकोर स्टोर्स दिखाएं',
        'क्या कोई पेमेंट फीस लगती है?',
        'दुकानों के वीडियो रील्स दिखाएं',
      ];
    }
    return [
      'How do I list my business for free?',
      'Does Needora charge any payment fee?',
      'Show me Home Decor and Cleaning services',
      'Where can I see my customer enquiries?',
    ];
  };

  const quickPrompts = getQuickPrompts();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Dora AI Assistant</span>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-h-[550px]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white shadow-inner">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h2 className="font-bold text-base flex items-center gap-2">
                  Dora AI Hyperlocal Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h2>
                <p className="text-xs text-blue-100">Live platform navigation & vernacular discovery</p>
              </div>
            </div>

            {/* Vernacular Language Selector Pills (Requirement 5) */}
            <div className="flex items-center gap-1 bg-black/20 p-1 rounded-2xl border border-white/10 self-start sm:self-auto">
              {(['English', 'తెలుగు', 'हिंदी'] as const).map(lang => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-white text-blue-900 shadow-md scale-105'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[60vh]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-slate-100 text-slate-900 rounded-bl-xs border border-slate-200/60'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                  {/* Optional Embedded Business Cards */}
                  {msg.businessResults && msg.businessResults.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.businessResults.map(biz => (
                        <div key={biz.id} className="bg-white p-3 rounded-xl border border-slate-200 text-slate-800">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">{biz.name}</span>
                            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                              {biz.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 truncate">{biz.address}, {biz.city}</p>
                          <div className="mt-2 flex gap-2">
                            <Link
                              href="/services"
                              className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md hover:bg-emerald-100 transition-colors"
                            >
                              Send Free Enquiry
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optional Quick Links */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.links.map(link => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 transition-colors shadow-2xs"
                        >
                          <span>{link.label}</span>
                          <ChevronRight className="w-3 h-3 text-blue-500" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Dora is checking verified listings...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">Try asking:</span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(prompt)}
                className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-700 whitespace-nowrap transition-colors shrink-0 shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer with Native Voice Recording */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              {/* Native Voice Microphone Button (Web Speech API) */}
              <button
                type="button"
                onClick={handleToggleVoice}
                title={`Speak in ${selectedLanguage} (Click to toggle voice)`}
                className={`p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-600 animate-pulse ring-4 ring-rose-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {isListening ? <Mic className="w-5 h-5 animate-bounce text-white" /> : <Mic className="w-5 h-5 text-slate-600" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  selectedLanguage === 'తెలుగు'
                    ? 'స్థానిక దుకాణాలు, హోమ్ డెకర్ లేదా ఎంక్వైరీ గురించి అడగండి...'
                    : selectedLanguage === 'हिंदी'
                    ? 'स्थानीय दुकानों, होम डेकोर या फ्री इन्क्वायरी के बारे में पूछें...'
                    : 'Ask Dora about local stores, free listings, or quotations...'
                }
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold rounded-2xl transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>{selectedLanguage === 'తెలుగు' ? 'అడగండి' : selectedLanguage === 'हिंदी' ? 'पूछें' : 'Ask'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
