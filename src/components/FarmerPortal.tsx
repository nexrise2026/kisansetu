import React, { useState } from 'react';
import {
  MapPin,
  Mic,
  ArrowRight,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Truck,
  IndianRupee,
  Layers
} from 'lucide-react';
import { Language, Taluk, HarvestSubmission, ProduceItem } from '../types';
import { PRODUCE_CATALOG, TALUK_VILLAGES } from '../data/mockData';
import { translations } from '../translations';
import { ProduceQualityScanner } from './ProduceQualityScanner';
import { VoiceInputModal } from './VoiceInputModal';

interface FarmerPortalProps {
  language: Language;
  harvestSubmission: HarvestSubmission | null;
  onHarvestSubmit: (submission: HarvestSubmission) => void;
  onNavigateTab: (tab: 'buyer' | 'logistics') => void;
}

export const FarmerPortal: React.FC<FarmerPortalProps> = ({
  language,
  harvestSubmission,
  onHarvestSubmit,
  onNavigateTab,
}) => {
  const t = translations[language].farmer;

  // Local Form States
  const [selectedTaluk, setSelectedTaluk] = useState<Taluk>('Moodbidri');
  const [selectedVillage, setSelectedVillage] = useState('Gantalkatte');
  const [customVillage, setCustomVillage] = useState('');
  const [useCustomVillage, setUseCustomVillage] = useState(false);
  const [selectedProduce, setSelectedProduce] = useState<ProduceItem>(PRODUCE_CATALOG[0]); // Ridge Gourd
  const [quantity, setQuantity] = useState<number>(60);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Calculations
  const middlemanTotal = quantity * selectedProduce.middlemanPrice;
  const apmcTotal = quantity * selectedProduce.defaultPriceApmc;
  const kisanSetuTotal = quantity * selectedProduce.kisanSetuPrice;
  const netEarningsDifference = kisanSetuTotal - middlemanTotal;

  // Handle Voice Auto-Fill
  const handleApplyVoiceData = () => {
    setSelectedTaluk('Moodbidri');
    setSelectedVillage('Gantalkatte');
    setUseCustomVillage(false);
    setSelectedProduce(PRODUCE_CATALOG[0]); // Ridge Gourd
    setQuantity(60);
  };

  // Submit Harvest
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalVillage = useCustomVillage && customVillage.trim() ? customVillage.trim() : selectedVillage;

    const newSubmission: HarvestSubmission = {
      id: 'KS-8042',
      farmerName: 'Ramesh Poojary',
      farmerPhone: '+91 94812 30982',
      taluk: selectedTaluk,
      village: finalVillage,
      cluster: `${selectedTaluk} East Cluster`,
      produceId: selectedProduce.id,
      produceNameEn: selectedProduce.nameEn,
      produceNameKn: selectedProduce.nameKn,
      quantityKg: quantity,
      expectedHarvestDate: 'Tomorrow, 5:00 AM',
      aiQualityScore: selectedProduce.gradeConfidence,
      qualityGrade: 'Grade-A',
      middlemanQuotePerKg: selectedProduce.middlemanPrice,
      apmcYardPerKg: selectedProduce.defaultPriceApmc,
      kisanSetuPricePerKg: selectedProduce.kisanSetuPrice,
      totalEarnings: kisanSetuTotal,
      pickupPassNumber: 'KS-8042',
      pickupSlot: '5:30 AM - 5:45 AM',
      status: 'pooled',
      timestamp: new Date().toISOString(),
    };

    onHarvestSubmit(newSubmission);
    setJustSubmitted(true);
  };

  const villageOptions = TALUK_VILLAGES[selectedTaluk] || TALUK_VILLAGES['Moodbidri'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Voice Recognition Modal */}
      <VoiceInputModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onApplyVoiceData={handleApplyVoiceData}
        language={language}
      />

      {/* Section Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>{language === 'en' ? 'Direct Smallholder Aggregation' : 'ಸ್ಥಳೀಯ ಸಣ್ಣ ರೈತರ ನೇರ ವಹಿವಾಟು'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {t.heading}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.subheading}
            </p>
          </div>

          {/* Voice Input Action Button */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white rounded-xl shadow-sm text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0"
          >
            <Mic className="w-4 h-4 animate-pulse text-amber-200" />
            <span>{t.voiceButton}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Entry Form vs Camera Scanner & Price Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Location & Produce Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            {/* Cluster & Location Card */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {language === 'en' ? '01. Rural Location & Cluster' : '01. ಸ್ಥಳ ಮತ್ತು ಕ್ಲಸ್ಟರ್ ವಿವರ'}
                </label>
                <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {t.clusterBadge}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Taluk */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.taluk}
                  </label>
                  <select
                    value={selectedTaluk}
                    onChange={(e) => {
                      const taluk = e.target.value as Taluk;
                      setSelectedTaluk(taluk);
                      setSelectedVillage(TALUK_VILLAGES[taluk]?.[0] || '');
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Moodbidri">Moodbidri (ಮೂಡುಬಿದಿರೆ)</option>
                    <option value="Bantwal">Bantwal (ಬಂಟ್ವಾಳ)</option>
                    <option value="Mangaluru">Mangaluru (ಮಂಗಳೂರು)</option>
                    <option value="Belthangady">Belthangady (ಬೆಳ್ತಂಗಡಿ)</option>
                    <option value="Puttur">Puttur (ಪುತ್ತೂರು)</option>
                  </select>
                </div>

                {/* Village */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.village}
                  </label>
                  {!useCustomVillage ? (
                    <select
                      value={selectedVillage}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setUseCustomVillage(true);
                        } else {
                          setSelectedVillage(e.target.value);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    >
                      {villageOptions.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                      <option value="__custom__">+ {language === 'en' ? 'Add Other Hamlet / Junction' : 'ಬೇರೆ ಗ್ರಾಮ ನಮೂದಿಸಿ'}</option>
                    </select>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Gantalkatte Junction"
                        value={customVillage}
                        onChange={(e) => setCustomVillage(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-emerald-500 rounded-xl text-sm font-semibold text-slate-900 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setUseCustomVillage(false)}
                        className="px-2.5 py-1 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Produce Selector Chips */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                02. {t.produceLabel}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRODUCE_CATALOG.map((item) => {
                  const isSelected = selectedProduce.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedProduce(item)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{item.iconEmoji}</div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {language === 'en' ? item.nameEn : item.nameKn}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {language === 'en' ? item.nameKn : item.nameEn}
                        </div>
                      </div>
                      <div className="mt-2 text-[11px] font-bold text-emerald-700 font-mono">
                        ₹{item.kisanSetuPrice}/kg
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Harvest Quantity Slider (10 kg to 500 kg, default 60 kg) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  03. {t.quantityLabel}
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                    {quantity}
                  </span>
                  <span className="text-sm font-bold text-slate-600">kg</span>
                </div>
              </div>

              {/* Slider Control */}
              <input
                type="range"
                min="10"
                max="500"
                step="5"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              {/* Preset Quick Increment Chips */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>10 kg (Micro)</span>
                <div className="flex gap-1.5">
                  {[30, 60, 100, 250].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className={`px-2 py-0.5 rounded text-xs font-semibold cursor-pointer ${
                        quantity === preset
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {preset} kg
                    </button>
                  ))}
                </div>
                <span>500 kg (Max)</span>
              </div>
            </div>

            {/* Submit Harvest Action */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-700 to-green-800 hover:from-emerald-800 hover:to-green-900 text-white font-bold text-base shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-3"
            >
              <span>{t.submitHarvest}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Active Pickup Pass Card (Shows when submitted or loaded) */}
          {(harvestSubmission || justSubmitted) && (
            <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white rounded-2xl p-6 border border-emerald-500/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <QrCode className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                      {t.passTitle}
                    </span>
                    <h3 className="text-xl font-black text-white font-mono tracking-tight">
                      {t.passNumber}
                    </h3>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t.statusPooled}</span>
                  </span>
                </div>
              </div>

              {/* Pass Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5 text-xs">
                <div className="bg-slate-950/50 p-3 rounded-xl border border-emerald-900/50">
                  <span className="text-slate-400 block text-[11px]">{language === 'en' ? 'Farmer Name' : 'ರೈತರ ಹೆಸರು'}</span>
                  <span className="font-bold text-white text-sm">Ramesh Poojary</span>
                  <span className="text-[11px] text-slate-400 block">+91 94812 30982</span>
                </div>

                <div className="bg-slate-950/50 p-3 rounded-xl border border-emerald-900/50">
                  <span className="text-slate-400 block text-[11px]">{language === 'en' ? 'Pickup Slot' : 'ಪಿಕಪ್ ಸಮಯ'}</span>
                  <span className="font-bold text-emerald-300 text-sm">{t.pickupTime}</span>
                  <span className="text-[11px] text-slate-400 block">{t.pickupLocation}</span>
                </div>

                <div className="bg-slate-950/50 p-3 rounded-xl border border-emerald-900/50">
                  <span className="text-slate-400 block text-[11px]">{language === 'en' ? 'Batch Quantity' : 'ಒಟ್ಟು ಪ್ರಮಾಣ'}</span>
                  <span className="font-bold text-white text-sm font-mono">{quantity} kg ({selectedProduce.nameEn})</span>
                  <span className="text-[11px] text-emerald-400 font-bold block font-mono">₹{kisanSetuTotal} Guaranteed</span>
                </div>
              </div>

              {/* Cross-Portal Navigation Shortcuts */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-300 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'en' ? 'Driver Manjunath notified via SMS' : 'ಚಾಲಕ ಮಂಜುನಾಥ್‌ರಿಗೆ SMS ರವಾನೆಯಾಗಿದೆ'}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onNavigateTab('buyer')}
                    className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{t.viewInBuyerTab}</span>
                  </button>
                  <button
                    onClick={() => onNavigateTab('logistics')}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>{t.viewInLogisticsTab}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Freshness Scanner & Real-Time Price Transparency Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Quality Scanner */}
          <ProduceQualityScanner
            language={language}
            selectedProduce={selectedProduce}
          />

          {/* Real-Time Price Transparency Card (Specified Requirement) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.priceHeader}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {selectedProduce.nameEn} ({quantity} kg)
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                {language === 'en' ? 'Triple Price Comparison' : 'ಮೂರು ಹಂತದ ಬೆಲೆ ಹೋಲಿಕೆ'}
              </h3>
            </div>

            {/* 3 Price Benchmarks */}
            <div className="space-y-3">
              {/* 1. Middleman / Broker Quote */}
              <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-red-900">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <span>{t.middlemanQuote}</span>
                  </div>
                  <div className="text-lg font-black text-red-700 font-mono mt-0.5">
                    ₹{selectedProduce.middlemanPrice} <span className="text-xs font-normal text-red-600">/kg</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-200/80 text-red-800">
                    {t.middlemanLoss} ₹{netEarningsDifference}
                  </span>
                  <div className="text-xs font-mono font-bold text-red-900 mt-1">
                    Total: ₹{middlemanTotal}
                  </div>
                </div>
              </div>

              {/* 2. Nearest APMC Mandi Benchmark (Mangaluru Yard) */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-700">
                    {t.apmcYard}
                  </div>
                  <div className="text-lg font-black text-slate-800 font-mono mt-0.5">
                    ₹{selectedProduce.defaultPriceApmc} <span className="text-xs font-normal text-slate-500">/kg</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-200 text-slate-700">
                    {language === 'en' ? 'Mandi Baseline' : 'ಮಂಡಿ ಮೂಲ ದರ'}
                  </span>
                  <div className="text-xs font-mono font-bold text-slate-700 mt-1">
                    Total: ₹{apmcTotal}
                  </div>
                </div>
              </div>

              {/* 3. KisanSetu Direct Price (Glowing Green) */}
              <div className="p-4 rounded-xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-100 shadow-sm shadow-emerald-200 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>{t.kisanSetuPrice}</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-900 font-mono mt-0.5">
                    ₹{selectedProduce.kisanSetuPrice} <span className="text-xs font-semibold text-emerald-700">/kg</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-xs">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{t.farmerEarns}: ₹{kisanSetuTotal}</span>
                  </span>
                  <div className="text-xs font-mono font-bold text-emerald-900 mt-1.5">
                    +{Math.round(((kisanSetuTotal - middlemanTotal) / middlemanTotal) * 100)}% {language === 'en' ? 'Net Gain' : 'ಹೆಚ್ಚಿನ ಆದಾಯ'}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Highlights */}
            <div className="pt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{language === 'en' ? 'Zero Transport Hassle for Farmer' : 'ರೈತರಿಗೆ ಶೂನ್ಯ ಸಾರಿಗೆ ಅಲೆದಾಟ'}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {language === 'en'
                  ? 'Pickup is handled directly at your Gantalkatte village gate by shared vehicle KA-19-D-4821. No commission or mandi unloading cuts.'
                  : 'ನಿಮ್ಮ ಗಂಟಾಲ್ಕಟ್ಟೆ ಗ್ರಾಮದ ಬಳಿಯೇ ಹಂಚಿಕೆಯ ವಾಹನದಿಂದ ಪಿಕಪ್. ಯಾವುದೇ ದಲ್ಲಾಳಿ ಕಮಿಷನ್ ಅಥವಾ ಮಂಡಿ ಇಳಿಸುವಿಕೆ ಶುಲ್ಕವಿಲ್ಲ.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
