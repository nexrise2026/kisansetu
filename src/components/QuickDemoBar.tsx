import React from 'react';
import { Play, CheckCircle2, RotateCcw, ArrowRight, Sparkles, Truck, Layers, Sprout } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface QuickDemoBarProps {
  language: Language;
  currentStep: number;
  onSimulateHarvest: () => void;
  onSimulateMatching: () => void;
  onSimulateLogisticsAndPayment: () => void;
  onResetDemo: () => void;
}

export const QuickDemoBar: React.FC<QuickDemoBarProps> = ({
  language,
  currentStep,
  onSimulateHarvest,
  onSimulateMatching,
  onSimulateLogisticsAndPayment,
  onResetDemo,
}) => {
  const t = translations[language].demoBar;

  return (
    <aside aria-label="Demo simulation bar" className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-white border-b border-emerald-800/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Left Title Indicator */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {t.title}
              </div>
              <div className="text-[11px] text-slate-300">
                {language === 'en'
                  ? 'Click sequential steps below to simulate the end-to-end Dakshina Kannada trade flow'
                  : 'ದಕ್ಷಿಣ ಕನ್ನಡ ಕೃಷಿ ಪೂಲಿಂಗ್‌ನ ಸಂಪೂರ್ಣ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಹಂತ-ಹಂತವಾಗಿ ಪರೀಕ್ಷಿಸಿ'}
              </div>
            </div>
          </div>

          {/* Sequential 3-Step Simulation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 max-w-4xl">
            {/* Step 1 */}
            <button
              onClick={onSimulateHarvest}
              className={`group relative text-left p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                currentStep >= 1
                  ? 'bg-emerald-900/60 border-emerald-500/70 shadow-sm shadow-emerald-900/40 text-emerald-100'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 text-slate-200 hover:border-emerald-500/50'
              }`}
            >
              <div className="flex items-start justify-between gap-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-xs text-white">
                  <Sprout className={`w-3.5 h-3.5 ${currentStep >= 1 ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="truncate">{t.step1}</span>
                </div>
                {currentStep >= 1 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 shrink-0 transition-colors" />
                )}
              </div>
              <div className="text-[11px] text-slate-300 mt-1 line-clamp-1">
                {currentStep >= 1 ? t.step1Done : t.step1Sub}
              </div>
              <div className="absolute top-0 right-0 -mt-1 -mr-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-emerald-600 text-white">
                1
              </div>
            </button>

            {/* Step 2 */}
            <button
              onClick={onSimulateMatching}
              className={`group relative text-left p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                currentStep >= 2
                  ? 'bg-amber-900/60 border-amber-500/70 shadow-sm shadow-amber-900/40 text-amber-100'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 text-slate-200 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-start justify-between gap-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-xs text-white">
                  <Layers className={`w-3.5 h-3.5 ${currentStep >= 2 ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="truncate">{t.step2}</span>
                </div>
                {currentStep >= 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 shrink-0 transition-colors" />
                )}
              </div>
              <div className="text-[11px] text-slate-300 mt-1 line-clamp-1">
                {currentStep >= 2 ? t.step2Done : t.step2Sub}
              </div>
              <div className="absolute top-0 right-0 -mt-1 -mr-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-amber-600 text-white">
                2
              </div>
            </button>

            {/* Step 3 */}
            <button
              onClick={onSimulateLogisticsAndPayment}
              className={`group relative text-left p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                currentStep >= 3
                  ? 'bg-blue-900/60 border-blue-400/80 shadow-sm shadow-blue-900/40 text-blue-100'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 text-slate-200 hover:border-blue-400/50'
              }`}
            >
              <div className="flex items-start justify-between gap-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-xs text-white">
                  <Truck className={`w-3.5 h-3.5 ${currentStep >= 3 ? 'text-blue-300' : 'text-slate-400'}`} />
                  <span className="truncate">{t.step3}</span>
                </div>
                {currentStep >= 3 ? (
                  <CheckCircle2 className="w-4 h-4 text-blue-300 shrink-0" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-300 shrink-0 transition-colors" />
                )}
              </div>
              <div className="text-[11px] text-slate-300 mt-1 line-clamp-1">
                {currentStep >= 3 ? t.step3Done : t.step3Sub}
              </div>
              <div className="absolute top-0 right-0 -mt-1 -mr-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-blue-600 text-white">
                3
              </div>
            </button>
          </div>

          {/* Reset Demo Button */}
          <div className="shrink-0 flex items-center justify-end">
            <button
              onClick={onResetDemo}
              title="Reset all states to initial"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="whitespace-nowrap">{t.reset}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
