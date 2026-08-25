import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Settings, Download, X, ChevronDown } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('cheerful');
  const [message, setMessage] = useState({ greeting: 'Good Morning!', primary: 'Have a great day!', secondary: 'Make today amazing!' });
  const [name, setName] = useState('');
  const [color, setColor] = useState('amber');
  const [showSettings, setShowSettings] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const cardRef = useRef(null);

  const colors = { amber: 'bg-amber-400', pink: 'bg-pink-500', purple: 'bg-purple-500', teal: 'bg-teal-500' };
  const themes = { cheerful: 'Cheerful', romantic: 'Romantic', cartoon: 'Cartoon', sketch: 'Sketch' };

  const msgs = {
    cheerful: { greeting: 'Good Morning!', primary: 'Spread joy!', secondary: 'Make today great!' },
    romantic: { greeting: 'Good Morning Beautiful!', primary: 'You are cherished.', secondary: 'Have a wonderful day!' },
    cartoon: { greeting: 'Happy Morning!', primary: 'Celebrate today!', secondary: 'Have fun!' },
    sketch: { greeting: 'Good Morning!', primary: 'You are beautiful.', secondary: 'Be yourself!' },
  };

  const generate = () => {
    setMessage(msgs[theme]);
  };

  const download = async () => {
    if (!cardRef.current) return;
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = async () => {
      const canvas = await window.html2canvas(cardRef.current, { scale: 2 });
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'blessing.png';
      link.click();
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
  generate();
}, [theme, generate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Morning Blessings Creator</h1>
          <p className="text-gray-600">Create beautiful daily blessing cards</p>
        </div>

        <div className="flex justify-end mb-4">
          <button onClick={() => setShowSettings(!showSettings)} className={`p-3 rounded-full ${showSettings ? colors[color] + ' text-white' : 'bg-white border-2'}`}>
            {showSettings ? <X /> : <Settings />}
          </button>
        </div>

        {showSettings && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h3 className="font-bold text-2xl mb-6">Personalize</h3>
            
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">Your Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name..." className="w-full px-5 py-3 border-2 rounded-xl" />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold mb-4">Color</label>
              <div className="flex gap-4">
                {Object.keys(colors).map((c) => (
                  <button key={c} onClick={() => setColor(c)} className={`w-14 h-14 rounded-full ${colors[c]} ${color === c ? 'ring-4' : ''}`} />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <button onClick={() => setShowThemes(!showThemes)} className="w-full flex justify-between p-4 bg-gray-100 rounded-xl">
                <span>Select Style</span>
                <ChevronDown className={`transform ${showThemes ? 'rotate-180' : ''}`} />
              </button>
              {showThemes && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {Object.keys(themes).map((t) => (
                    <button key={t} onClick={() => { setTheme(t); setShowThemes(false); }} className={`px-4 py-3 rounded-xl font-semibold ${theme === t ? colors[color] + ' text-white' : 'bg-gray-100'}`}>
                      {themes[t]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setShowSettings(false)} className="w-full py-3 bg-gray-200 rounded-xl font-bold">Done</button>
          </div>
        )}

        <div className="flex justify-center mb-8">
          <div ref={cardRef} className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-10 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">{message.greeting}</h2>
            <p className="text-2xl font-semibold text-gray-700 mb-6">✨ {message.primary}</p>
            <div className="flex justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <span className="text-2xl">💜</span>
              <div className="w-12 h-0.5 bg-gray-300"></div>
            </div>
            <p className="text-base text-gray-600 mb-6 italic">{message.secondary}</p>
            {name && <div className="text-lg font-semibold text-gray-700 mb-4">~ {name} ~</div>}
            <div className="text-sm text-gray-500">✨ Make Today Blessed ✨</div>
          </div>
        </div>

        <div className="flex justify-center gap-4 flex-wrap mb-12">
          <button onClick={generate} className={`flex gap-2 px-8 py-4 ${colors[color]} text-white font-bold rounded-full`}>
            <RotateCcw className="w-5 h-5" />
            Generate New
          </button>
          <button onClick={download} className="flex gap-2 px-8 py-4 bg-white text-gray-800 font-bold rounded-full border-3">
            <Download className="w-5 h-5" />
            Download PNG
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">🎨 Create Beautiful Blessings</p>
          <p className="text-gray-600">Generate inspiring cards daily and share with your community</p>
        </div>
      </div>
    </div>
  );
}
