import React, { useState, useEffect } from 'react';
import { Mic, CheckCircle2, Volume2, X } from 'lucide-react';
import { Language } from '../types';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyVoiceData: () => void;
  language: Language;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  onApplyVoiceData,
  language,
}) => {
  const [transcribing, setTranscribing] = useState(true);
  const [transcribedText, setTranscribedText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTranscribing(true);
      setTranscribedText('');
      const fullText =
        language === 'en'
          ? '60 kg fresh Ridge Gourd ready for harvest tomorrow morning from Gantalkatte'
          : 'ನಾಳೆ ಬೆಳಿಗ್ಗೆ ಗಂಟಾಲ್ಕಟ್ಟೆಯಿಂದ 60 ಕೆಜಿ ತಾಜಾ ಹೀರೆಕಾಯಿ ಕೊಯ್ಲಿಗೆ ಸಿದ್ಧವಿದೆ';

      const timer = setTimeout(() => {
        setTranscribing(false);
        setTranscribedText(fullText);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [isOpen, language]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-emerald-500/30 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pulsing Mic Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-inner mb-4 relative">
          <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-25" />
          <Mic className="w-8 h-8 relative z-10" />
        </div>

        <h3 className="text-lg font-bold text-slate-900">
          {language === 'en'
            ? 'Local Dialect Voice Recognition'
            : 'ಸ್ಥಳೀಯ ಕನ್ನಡ / ತುಳು ಧ್ವನಿ ಗ್ರಹಿಕೆ'}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'en'
            ? 'Simulating spoken dialect audio capture from Dakshina Kannada cluster'
            : 'ದಕ್ಷಿಣ ಕನ್ನಡದ ಸ್ಥಳೀಯ ಗ್ರಾಮೀಣ ಭಾಷಾ ಶೈಲಿಯನ್ನು ಪಠ್ಯಕ್ಕೆ ಪರಿವರ್ತಿಸಲಾಗುತ್ತಿದೆ'}
        </p>

        {/* Animated Audio Wave Bars */}
        <div className="my-6 flex items-center justify-center gap-1.5 h-12 bg-slate-50 rounded-xl p-3 border border-slate-200">
          {[40, 75, 20, 90, 60, 30, 85, 45, 95, 35, 70, 50].map((h, i) => (
            <div
              key={i}
              className={`w-1.5 bg-emerald-600 rounded-full transition-all duration-150 ${
                transcribing ? 'animate-pulse' : ''
              }`}
              style={{
                height: transcribing ? `${Math.max(15, Math.round(h * Math.random()))}%` : '20%',
                animationDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>

        {/* Transcribed Speech Bubble */}
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-left mb-6">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 uppercase tracking-wide mb-1">
            <Volume2 className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Transcribed Audio' : 'ಧ್ವನಿ ಪಠ್ಯ ರೂಪ'}</span>
          </div>
          {transcribing ? (
            <div className="text-xs text-slate-400 italic flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>{language === 'en' ? 'Processing speech in Moodbidri dialect...' : 'ಮೂಡುಬಿದಿರೆ ಧ್ವನಿಯನ್ನು ಗ್ರಹಿಸಲಾಗುತ್ತಿದೆ...'}</span>
            </div>
          ) : (
            <p className="text-sm font-semibold text-slate-800 leading-snug">
              {transcribedText}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {language === 'en' ? 'Cancel' : 'ರದ್ದುಮಾಡಿ'}
          </button>
          <button
            onClick={() => {
              onApplyVoiceData();
              onClose();
            }}
            disabled={transcribing}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'en' ? 'Auto-Fill Harvest Form' : 'ಕೊಯ್ಲು ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
