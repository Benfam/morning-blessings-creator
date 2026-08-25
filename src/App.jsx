import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Sparkles, Settings, Download, X, ChevronDown } from 'lucide-react';

export default function MorningBlessingsCreator() {
  const [theme, setTheme] = useState('cheerful');
  const [message, setMessage] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [name, setName] = useState('');
  const [customColor, setCustomColor] = useState('amber');
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef(null);

  const colorSchemes = {
    amber: { 
      light: 'from-amber-50 to-rose-50', 
      accent: 'bg-amber-400', 
      text: 'text-amber-600',
      border: 'border-amber-200',
    },
    pink: { 
      light: 'from-pink-50 to-rose-50', 
      accent: 'bg-pink-500', 
      text: 'text-pink-600',
      border: 'border-pink-200',
    },
    purple: { 
      light: 'from-purple-50 to-pink-50', 
      accent: 'bg-purple-500', 
      text: 'text-purple-600',
      border: 'border-purple-200',
    },
    teal: { 
      light: 'from-teal-50 to-blue-50', 
      accent: 'bg-teal-500', 
      text: 'text-teal-600',
      border: 'border-teal-200',
    },
    coral: { 
      light: 'from-orange-50 to-rose-50', 
      accent: 'bg-orange-400', 
      text: 'text-orange-600',
      border: 'border-orange-200',
    },
    indigo: { 
      light: 'from-indigo-50 to-blue-50', 
      accent: 'bg-indigo-600', 
      text: 'text-indigo-600',
      border: 'border-indigo-200',
    },
  };

  const messageLibrary = {
    cheerful: {
      decorations: ['☀️', '🚐', '🌻', '🌼'],
      greetings: [
        'Good Morning!',
        'Rise & Shine!',
        'A Beautiful Day Awaits!',
        'Let\'s Go Make Today Amazing!',
        'Sunshine & Smiles Today!',
      ],
      primary: [
        'Spread joy everywhere you go.',
        'Let your light shine bright.',
        'Make today count!',
        'Chase your dreams today.',
        'Be the happiness you want to see.',
      ],
      secondary: [
        'The sun is shining just for you. Make this day unforgettable and full of joy!',
        'Every morning is a fresh start to be amazing. Believe in yourself.',
        'You have the power to make today extraordinary. Go out and shine!',
        'Surround yourself with positive energy. Today is your day to sparkle!',
        'Life is beautiful. Make today your masterpiece!',
      ],
    },
    romantic: {
      decorations: ['🌹', '☕', '💕', '🌸'],
      greetings: [
        'Good Morning, Beautiful!',
        'Rise with Grace!',
        'A Day for You!',
        'Embrace This Moment!',
        'Love This Day!',
      ],
      primary: [
        'You are cherished.',
        'Today is yours.',
        'Bloom beautifully.',
        'Live with intention.',
        'Celebrate yourself.',
      ],
      secondary: [
        'Like a rose unfolding, let yourself bloom today with grace and beauty.',
        'You deserve all the wonderful things this day brings. Embrace them fully.',
        'Start your day with self-love and watch how everything falls into place.',
        'Every moment is an opportunity to show yourself kindness.',
        'You are worthy of a beautiful, peaceful, and joyful day.',
      ],
    },
    cartoon: {
      decorations: ['🦋', '🐕', '🎉', '🌺'],
      greetings: [
        'Happy Saturday!',
        'Happy Morning!',
        'Let\'s Celebrate Today!',
        'It\'s Your Day to Shine!',
        'Good Morning Sunshine!',
      ],
      primary: [
        'Jump into the day with joy!',
        'Spread those butterfly wings!',
        'Dance through your day!',
        'Be absolutely fabulous!',
        'Life is a celebration!',
      ],
      secondary: [
        'Wake up and let your happy show! Today is full of exciting possibilities!',
        'Be like a butterfly—transform today into something beautiful and free!',
        'Your happiness is contagious. Share it with everyone you meet today!',
        'Every day is a celebration when you choose joy. Make today epic!',
        'Life is too short to be boring. Have fun and enjoy every second!',
      ],
    },
    sketch: {
      decorations: ['💕', '🌸', '👧', '✨'],
      greetings: [
        'Good Morning!',
        'Beautiful Morning!',
        'Rise & Shine Beautiful!',
        'Gorgeous New Day!',
        'Feel Amazing Today!',
      ],
      primary: [
        'May you feel beautiful.',
        'Embrace your strength.',
        'You are enough.',
        'Walk with confidence.',
        'Be unapologetically you.',
      ],
      secondary: [
        'You are beautiful inside and out. Let that shine through today.',
        'Don\'t just exist—live boldly and authentically. Be brave today.',
        'Your imperfections make you perfect. Love yourself completely.',
        'Draw your own path today. You are the artist of your life.',
        'Bloom where you are planted. Your beauty is your story.',
      ],
    },
    coffeeMorning: {
      decorations: ['☕', '🍩', '💕', '📅'],
      greetings: [
        'Good Morning Monday!',
        'Rise & Grind!',
        'Coffee & Motivation!',
        'Monday Goals!',
        'Start Your Week Strong!',
      ],
      primary: [
        'Fuel your dreams.',
        'Make it matter.',
        'Sip slow, live well.',
        'Chase your goals today.',
        'Create your magic.',
      ],
      secondary: [
        'Start your day with purpose. With coffee in hand, you can conquer anything!',
        'Monday is a blank canvas. Paint it with effort, kindness, and amazing choices!',
        'Take time for yourself. A quiet morning sets the tone for success.',
        'Be grateful for this new week. Make it count with every choice.',
        'This week is your chance to be amazing. Seize it!',
      ],
    },
    calligraphy: {
      decorations: ['🌻', '💛', '🤍', '🌼'],
      greetings: [
        'Good Morning!',
        'Rise & Embrace!',
        'Welcome to Today!',
        'A Fresh Start!',
        'New Blessings Await!',
      ],
      primary: [
        'Be happy.',
        'Be bright.',
        'Be you.',
        'Stay grateful.',
        'Keep faith.',
      ],
      secondary: [
        'Every new day is a fresh start. Stay positive, work hard, and amaze yourself.',
        'You are capable of amazing things. Believe in yourself today.',
        'This is your day to shine. Make it count.',
        'Today brings endless possibilities. Embrace them with open arms.',
        'You have everything you need to succeed. Trust yourself.',
      ],
    },
    witness: {
      decorations: ['📖', '🌸', '💎', '🕊️'],
      greetings: [
        'Good Morning in Service!',
        'Rejoice in Jehovah\'s Love!',
        'May You Walk in Truth Today!',
        'Stand Firm in Faith!',
        'Endure with Purpose!',
      ],
      primary: [
        'Jehovah is your strength.',
        'Keep the Kingdom first.',
        'Serve with joy.',
        'Be a powerful witness.',
        'Walk in faith.',
      ],
      secondary: [
        'Jehovah has not given us a spirit of fear, but of power and love. Step out boldly!',
        'Your faithful endurance glorifies Jehovah. He sees your heart and rewards loyalty.',
        'The world may oppose you, but Jehovah defends those who stand firm.',
        'In this organization, you are never alone. Together, you are unbreakable.',
        'Every day is an opportunity to prove your love for Jehovah. This is your victory.',
      ],
    },
  };

  const themeNames = {
    cheerful: '☀️ Cheerful & Bright',
    romantic: '🌹 Romantic & Elegant',
    cartoon: '🦋 Playful Cartoon',
    sketch: '✨ Sketch Art',
    coffeeMorning: '☕ Coffee Morning',
    calligraphy: '✍️ Calligraphy',
    witness: '🙏 Jehovah\'s Witness',
  };

  const generateMessage = useCallback(() => {
  setIsAnimating(true);
  setTimeout(() => {
    const themeLib = messageLibrary[theme];
    
    setMessage({
      greeting: themeLib.greetings[Math.floor(Math.random() * themeLib.greetings.length)],
      primary: themeLib.primary[Math.floor(Math.random() * themeLib.primary.length)],
      secondary: themeLib.secondary[Math.floor(Math.random() * themeLib.secondary.length)],
      decorations: themeLib.decorations,
    });
    setIsAnimating(false);
  }, 300);
}, [theme]);

  const downloadCard = async () => {
    if (!cardRef.current) {
      alert('Card not ready. Please wait a moment.');
      return;
    }
    
    setIsDownloading(true);
    
    try {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      
      script.onload = async () => {
        try {
          const canvas = await window.html2canvas(cardRef.current, {
            allowTaint: true,
            useCORS: true,
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
          });

          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            const today = new Date();
            const dateStr = today.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit' 
            }).replace(/\//g, '-');
            
            link.download = `morning-blessings-${dateStr}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(url);
            setIsDownloading(false);
          }, 'image/png');
        } catch (error) {
          console.error('Error:', error);
          alert('Failed to create image.');
          setIsDownloading(false);
        }
      };

      document.body.appendChild(script);
    } catch (error) {
      alert('Download failed.');
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    generateMessage();
  }, [theme]);

  const colors = colorSchemes[customColor];
  const getThemeGradient = () => {
    switch(theme) {
      case 'cheerful': return 'from-yellow-50 to-orange-50';
      case 'romantic': return 'from-rose-50 to-pink-50';
      case 'cartoon': return 'from-amber-50 to-yellow-50';
      case 'sketch': return 'from-pink-50 to-purple-50';
      case 'coffeeMorning': return 'from-amber-100 to-orange-50';
      case 'calligraphy': return 'from-amber-50 to-rose-50';
      case 'witness': return 'from-indigo-50 to-blue-50';
      default: return colors.light;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeGradient()} p-4 sm:p-8 transition-all duration-500`}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-10 h-10" />
            Morning Blessings Creator
          </h1>
          <p className="text-gray-600 text-lg">Create & share beautiful daily blessing cards</p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-3 rounded-full transition-all shadow-lg ${
              showSettings 
                ? `${colors.accent} text-white` 
                : 'bg-white text-gray-700 border-2 ' + colors.border
            }`}
          >
            {showSettings ? <X className="w-6 h-6" /> : <Settings className="w-6 h-6" />}
          </button>
        </div>

        {showSettings && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 animate-fadeIn">
            <h3 className="font-bold text-2xl text-gray-800 mb-6">Personalize Your Blessings</h3>
            
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-lg"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Card Color</label>
              <div className="flex flex-wrap gap-4">
                {Object.keys(colorSchemes).map((color) => (
                  <button
                    key={color}
                    onClick={() => setCustomColor(color)}
                    className={`w-14 h-14 rounded-full ${colorSchemes[color].accent} shadow-lg transform transition-all ${
                      customColor === color 
                        ? 'scale-125 ring-4 ring-offset-2 ring-gray-400' 
                        : 'hover:scale-110 active:scale-95'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <button
                onClick={() => setShowThemes(!showThemes)}
                className="w-full flex items-center justify-between p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                <span className="font-semibold text-gray-700">Select Blessing Style</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${showThemes ? 'rotate-180' : ''}`} />
              </button>

              {showThemes && (
                <div className="mt-4 grid grid-cols-2 gap-3 animate-fadeIn">
                  {Object.keys(themeNames).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTheme(t);
                        setShowThemes(false);
                      }}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all text-sm ${
                        theme === t
                          ? `${colors.accent} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {themeNames[t]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="w-full py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-xl font-bold hover:from-gray-300 hover:to-gray-400 transition-all"
            >
              Done
            </button>
          </div>
        )}

        <div className="flex justify-center mb-8">
          {message && (
            <div
              ref={cardRef}
              className={`w-full max-w-sm bg-white rounded-3xl shadow-2xl p-10 text-center transform transition-all duration-500 relative overflow-hidden ${
                isAnimating ? 'scale-95 opacity-75' : 'scale-100 opacity-100'
              }`}
              style={{
                backgroundImage: 'linear-gradient(135deg, rgba(255,193,7,0.08) 0%, rgba(244,63,94,0.08) 100%)',
              }}
            >
              <div className="absolute top-4 left-4 text-5xl opacity-40">{message.decorations[0]}</div>
              <div className="absolute top-4 right-4 text-5xl opacity-40">{message.decorations[1]}</div>
              <div className="absolute bottom-4 left-4 text-5xl opacity-40">{message.decorations[1]}</div>
              <div className="absolute bottom-4 right-4 text-5xl opacity-40">{message.decorations[0]}</div>

              <h2 className={`mb-8 text-gray-800 leading-tight ${
                theme === 'calligraphy' 
                  ? 'text-5xl italic font-light' 
                  : 'text-4xl font-bold'
              }`}>
                {message.greeting}
              </h2>

              <div className="mb-8">
                <p className="text-2xl font-semibold text-gray-700">
                  {message.decorations[2]} {message.primary}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <span className="text-2xl">💜</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>

              <p className="text-base text-gray-600 leading-relaxed mb-8 italic">
                {message.secondary}
              </p>

              <div className="text-5xl mb-6">{message.decorations[0]}</div>

              {name && (
                <div className={`text-xl font-semibold ${colors.text} mb-4 italic`}>
                  ~ {name} ~
                </div>
              )}

              <div className="text-sm text-gray-500 mt-6 font-medium">
                {theme === 'witness' 
                  ? '✨ May Jehovah Bless Your Day ✨' 
                  : '✨ Make Today Blessed ✨'}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 flex-wrap mb-12">
          <button
            onClick={generateMessage}
            disabled={isAnimating}
            className={`flex items-center gap-2 px-8 py-4 ${colors.accent} text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all disabled:opacity-60`}
          >
            <RotateCcw className="w-5 h-5" />
            Generate New
          </button>
          <button
            onClick={downloadCard}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-8 py-4 bg-white text-gray-800 font-bold text-lg rounded-full border-3 ${colors.border} shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all disabled:opacity-60`}
          >
            <Download className="w-5 h-5" />
            {isDownloading ? 'Downloading...' : 'Download PNG'}
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <p className="font-bold text-2xl text-gray-800 mb-4">🎨 Create Beautiful Blessings</p>
          <p className="text-gray-600">Generate inspiring cards daily and share with your community</p>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Click the Settings icon to personalize and select from 7 unique blessing styles
            </p>
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm mt-8">
          <p>Create beautiful blessings • Download & share daily</p>
          <p className="mt-2 text-gray-500">Made with 💕</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
      `}</style>
    </div>
  );
}

Commit changes
