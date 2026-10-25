import React from 'react';
import { MapPin, TrendingUp, ShieldCheck, Warehouse, Globe2, ChevronDown } from 'lucide-react';
import { District, Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  selectedDistrict: District;
  onDistrictChange: (district: District) => void;
  activeTab: 'farmer' | 'buyer' | 'logistics';
  onTabChange: (tab: 'farmer' | 'buyer' | 'logistics') => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  selectedDistrict,
  onDistrictChange,
  activeTab,
  onTabChange,
}) => {
  const t = translations[language];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
          {/* Brand Wordmark & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white shadow-sm shadow-emerald-900/20 font-bold text-xl tracking-tight">
              ಕೇ
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  KisanSetu
                </span>
                <span className="text-sm font-semibold text-emerald-800">
                  | ಕಿಸಾನ್ ಸೇತು
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Center Tabs Navigation */}
          <nav aria-label="Role portals" className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            <button
              onClick={() => onTabChange('farmer')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'farmer'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🌱 {t.tabs.farmer}
            </button>
            <button
              onClick={() => onTabChange('buyer')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'buyer'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🏢 {t.tabs.buyer}
            </button>
            <button
              onClick={() => onTabChange('logistics')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'logistics'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🚛 {t.tabs.logistics}
            </button>
          </nav>

          {/* Right Region & Language Selector */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* District Selector */}
            <div className="relative">
              <label htmlFor="district-select" className="sr-only">
                {t.regionLabel}
              </label>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <select
                  id="district-select"
                  aria-label={t.regionLabel}
                  value={selectedDistrict}
                  onChange={(e) => onDistrictChange(e.target.value as District)}
                  className="bg-transparent focus:outline-hidden cursor-pointer pr-4 appearance-none"
                >
                  <option value="Dakshina Kannada">Dakshina Kannada (ದಕ್ಷಿಣ ಕನ್ನಡ)</option>
                  <option value="Udupi">Udupi (ಉಡುಪಿ)</option>
                  <option value="Shivamogga">Shivamogga (ಶಿವಮೊಗ್ಗ)</option>
                  <option value="Hassan">Hassan (ಹಾಸನ)</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-500 pointer-events-none absolute right-2" />
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('kn')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  language === 'kn'
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Impact Metric Strip */}
      <div className="bg-slate-900 text-slate-200 border-t border-slate-800 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-400">{t.middlemanCut}:</span>
            <span className="font-bold text-emerald-400 font-mono tabular-nums">35%</span>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-400">{t.profitIncrease}:</span>
            <span className="font-bold text-amber-300 font-mono tabular-nums">+₹12/kg</span>
          </div>

          <div className="flex items-center gap-2">
            <Warehouse className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-slate-400">{t.activeClusters}:</span>
            <span className="font-semibold text-slate-200">{t.activeCount}</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <Globe2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[11px]">Direct FPO Trade Network • Moodbidri Hub</span>
          </div>
        </div>
      </div>
    </header>
  );
};
