import React, { useState } from 'react';
import { Camera, Check, RefreshCw, Zap, Shield, Sparkles } from 'lucide-react';
import { Language, ProduceItem } from '../types';

interface ProduceQualityScannerProps {
  language: Language;
  selectedProduce: ProduceItem;
}

export const ProduceQualityScanner: React.FC<ProduceQualityScannerProps> = ({
  language,
  selectedProduce,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [confidence, setConfidence] = useState(selectedProduce.gradeConfidence);

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Small realistic variation around 93-97%
      const newScore = Math.min(98, Math.max(91, Math.round(92 + Math.random() * 6)));
      setConfidence(newScore);
      setIsScanning(false);
    }, 900);
  };

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 text-white relative shadow-lg">
      {/* Scanner Header */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            {language === 'en' ? 'AI Computer Vision Freshness Scanner' : 'AI ಕಂಪ್ಯೂಟರ್ ವಿಷನ್ ತಾಜಾತನ ಸ್ಕ್ಯಾನರ್'}
          </span>
        </div>
        <button
          onClick={handleRescan}
          disabled={isScanning}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin text-emerald-400' : ''}`} />
          <span>{language === 'en' ? 'Rescan Batch' : 'ಮರು-ಸ್ಕ್ಯಾನ್'}</span>
        </button>
      </div>

      {/* Viewfinder Area */}
      <div className="relative aspect-4/3 w-full bg-linear-to-b from-slate-950 via-slate-900 to-emerald-950/50 flex items-center justify-center p-6 overflow-hidden">
        {/* Animated Scan Line */}
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-bounce top-1/4 z-30 pointer-events-none" />
        )}

        {/* Viewfinder Target Reticle */}
        <div className="absolute inset-4 border border-dashed border-emerald-500/40 rounded-xl pointer-events-none z-10 flex flex-col justify-between p-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-emerald-400/80 bg-slate-950/70 px-1.5 py-0.5 rounded">
              ISO: AUTO • 24fps
            </span>
            <span className="text-[10px] font-mono text-emerald-400/80 bg-slate-950/70 px-1.5 py-0.5 rounded">
              HARVEST ID: #KS-DK-8042
            </span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-mono text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400" /> RGB Spectral: 98.4%
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-950/70 px-1.5 py-0.5 rounded">
              FOCAL: 28mm Macro
            </span>
          </div>
        </div>

        {/* Rich Graphical Produce Artwork */}
        <div className="relative z-0 text-center flex flex-col items-center justify-center">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-linear-to-tr from-emerald-900/60 to-slate-800/80 border border-emerald-500/30 flex items-center justify-center p-4 shadow-inner relative group">
            {/* Produce SVG Visual Representation */}
            {selectedProduce.id === 'ridge_gourd' ? (
              <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                {/* Ridge Gourd (Turai) Vector */}
                <path
                  d="M15,85 C25,75 35,50 48,32 C58,18 72,12 85,10 C86,14 82,24 72,35 C58,50 35,78 20,88 Z"
                  fill="#2d6a4f"
                  stroke="#52b788"
                  strokeWidth="2.5"
                />
                {/* Ribs & Ridges */}
                <path d="M22,82 C35,68 52,42 75,22" stroke="#74c69d" strokeWidth="2" strokeDasharray="1 3" fill="none" />
                <path d="M28,85 C42,65 60,35 80,18" stroke="#95d5b2" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
                <path d="M18,80 C26,62 44,45 68,28" stroke="#40916c" strokeWidth="1.5" fill="none" />
                {/* Stem */}
                <path d="M85,10 C88,6 93,5 95,8 C94,11 90,13 87,14" fill="#1b4332" stroke="#2d6a4f" strokeWidth="1.5" />
                {/* Water Dew Droplets */}
                <circle cx="45" cy="40" r="2" fill="#d8f3dc" opacity="0.8" />
                <circle cx="58" cy="30" r="1.5" fill="#d8f3dc" opacity="0.9" />
                <circle cx="34" cy="58" r="2.5" fill="#d8f3dc" opacity="0.7" />
              </svg>
            ) : selectedProduce.id === 'tomatoes' ? (
              <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                <circle cx="50" cy="55" r="35" fill="#dc2626" />
                <path d="M50,20 C48,28 42,32 35,32 C45,34 48,40 50,45 C52,40 55,34 65,32 C58,32 52,28 50,20 Z" fill="#15803d" />
                <path d="M50,20 C50,15 54,12 55,10" stroke="#166534" strokeWidth="3" strokeLinecap="round" fill="none" />
                <ellipse cx="40" cy="45" rx="8" ry="14" fill="#ef4444" opacity="0.8" />
                <circle cx="38" cy="42" r="3" fill="#fecaca" opacity="0.7" />
              </svg>
            ) : selectedProduce.id === 'cucumbers' ? (
              <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                <path
                  d="M15,80 C30,70 45,45 65,30 C75,22 85,18 90,20 C88,28 78,45 60,65 C45,80 28,88 15,80 Z"
                  fill="#15803d"
                  stroke="#4ade80"
                  strokeWidth="2"
                />
                <circle cx="45" cy="50" r="1.5" fill="#bbf7d0" />
                <circle cx="55" cy="42" r="1.5" fill="#bbf7d0" />
                <circle cx="35" cy="62" r="1.5" fill="#bbf7d0" />
              </svg>
            ) : (
              <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                <path
                  d="M20,80 C25,70 40,40 65,25 C75,18 85,16 88,18 C85,24 70,50 50,70 C35,82 25,85 20,80 Z"
                  fill="#16a34a"
                  stroke="#86efac"
                  strokeWidth="2"
                />
                <path d="M88,18 C92,14 94,12 96,14" stroke="#14532d" strokeWidth="2.5" fill="none" />
              </svg>
            )}

            {/* Bounding Box on Produce */}
            <div className="absolute inset-1 border border-emerald-400/60 rounded-lg pointer-events-none">
              <span className="absolute -top-2.5 left-2 bg-emerald-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.2 rounded font-mono">
                {selectedProduce.nameEn}: 100% ORGANIC
              </span>
            </div>
          </div>

          <div className="mt-2 text-xs font-semibold text-emerald-200">
            {language === 'en' ? selectedProduce.nameEn : selectedProduce.nameKn} (
            {selectedProduce.shelfLife} {language === 'en' ? 'shelf-life' : 'ಬಾಳಿಕೆ'})
          </div>
        </div>

        {/* Animated AI Quality Score Tag Badge (Requirement) */}
        <div className="absolute bottom-3 inset-x-3 z-20">
          <div className="bg-emerald-950/95 border border-emerald-500/80 rounded-xl p-2.5 text-center shadow-lg backdrop-blur-md flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <span>AI Quality Score: Grade-A Freshness</span>
                  <span className="px-1.5 py-0.2 text-[10px] bg-emerald-500 text-slate-950 font-bold rounded font-mono">
                    {confidence}% confidence
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  {language === 'en'
                    ? 'Optical chlorophyll density: High • Surface blemishes: 0%'
                    : 'ಕ್ಲೋರೊಫಿಲ್ ಪ್ರಮಾಣ: ಅತ್ಯುನ್ನತ • ಯಾವುದೇ ಕಲೆಗಳಿಲ್ಲ (0%)'}
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-1 text-emerald-400 font-bold text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Freshness Diagnostics Breakdown */}
      <div className="grid grid-cols-3 divide-x divide-slate-800 bg-slate-950 p-2.5 text-center text-xs">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase">
            {language === 'en' ? 'Turgidity / Dew' : 'ತೇವಾಂಶ'}
          </span>
          <span className="font-semibold text-emerald-400 font-mono">98% Optimal</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase">
            {language === 'en' ? 'Mandi Grade' : 'ಮಂಡಿ ಗ್ರೇಡ್'}
          </span>
          <span className="font-semibold text-emerald-300 font-mono">A-1 Export</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase">
            {language === 'en' ? 'Direct Pickup' : 'ಪಿಕಪ್ ಅರ್ಹತೆ'}
          </span>
          <span className="font-semibold text-emerald-400 flex items-center justify-center gap-1">
            <Check className="w-3.5 h-3.5" /> {language === 'en' ? 'Instant Eligible' : 'ಅರ್ಹ'}
          </span>
        </div>
      </div>
    </div>
  );
};
