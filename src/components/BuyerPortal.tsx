import React, { useState } from 'react';
import {
  Utensils,
  Layers,
  TrendingDown,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Check,
  ShieldCheck,
  CreditCard,
  Building2,
  ArrowRight
} from 'lucide-react';
import { BulkOrder, Language, HarvestSubmission } from '../types';
import { translations } from '../translations';
import { UpiPaymentModal } from './UpiPaymentModal';

interface BuyerPortalProps {
  language: Language;
  bulkOrder: BulkOrder;
  harvestSubmission: HarvestSubmission | null;
  onSettlePayment: () => void;
  onNavigateTab: (tab: 'farmer' | 'logistics') => void;
}

export const BuyerPortal: React.FC<BuyerPortalProps> = ({
  language,
  bulkOrder,
  harvestSubmission,
  onSettlePayment,
  onNavigateTab,
}) => {
  const t = translations[language].buyer;
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleOpenPayment = () => {
    setIsPaymentModalOpen(true);
    onSettlePayment();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* UPI Payment Modal */}
      <UpiPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        order={bulkOrder}
        language={language}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>{language === 'en' ? 'Institutional Demand & Micro-Pooling' : 'ಸಂಸ್ಥೆಗಳ ಸಗಟು ಖರೀದಿ & ಪೂಲಿಂಗ್'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {t.heading}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.subheading}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
              Cluster: Moodbidri Urban / Vidyagiri
            </span>
          </div>
        </div>
      </div>

      {/* Active Order Board & Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center shrink-0">
              <Utensils className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {t.buyerTitle}
                </h2>
                <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                  Verified Bulk Client
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-2">
                <span>{t.buyerType}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" /> Vidyagiri Campus, Moodbidri
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Procurement Window
            </span>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Tomorrow 7:30 AM Delivery</span>
            </div>
          </div>
        </div>

        {/* Posted Demand Highlight Strip */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <div className="text-sm font-bold text-slate-900">
                {t.demandBadge}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Target Mix: 60 kg Ridge Gourd • 90 kg Tomatoes • 100 kg Cucumbers
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 bg-emerald-600 text-white font-mono font-bold text-xs rounded-full">
              100% Demand Pooled (250/250 kg)
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Auto-Pool Engine Card vs Direct Cost Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Auto-Pool Engine Card (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>{t.autoPoolHeading}</span>
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Cluster Route #KA-19-D
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                {language === 'en' ? 'How 3 Local Harvests Were Pooled' : '3 ಗ್ರಾಮಗಳ ಸಣ್ಣ ರೈತರ ಪೂಲಿಂಗ್ ವಿವರ'}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {t.autoPoolDesc}
              </p>
            </div>

            {/* 3 Pooled Farmers List */}
            <div className="space-y-3.5">
              {/* Farmer 1: Ramesh (Gantalkatte) */}
              <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 shadow-xs">
                    1
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {t.farmer1}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900">
                        {language === 'en' ? 'Grade-A Certified' : 'ಗ್ರೇಡ್-A ಪ್ರಮಾಣೀಕೃತ'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Produce: <strong className="text-slate-900">Ridge Gourd (ಹೀರೆಕಾಯಿ)</strong> • Village: Gantalkatte (11 km)
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <div className="text-base font-black text-slate-900 font-mono">
                    60 kg <span className="text-xs font-normal text-slate-500">@ ₹26/kg</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-800 font-mono">
                    ₹1,560 Direct Payout
                  </div>
                </div>
              </div>

              {/* Farmer 2: Suresh (Beluvai) */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-white font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {t.farmer2}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        Vine Ripe
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Produce: <strong className="text-slate-900">Tomatoes (ಟೊಮೇಟೊ)</strong> • Village: Beluvai (8 km)
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <div className="text-base font-black text-slate-900 font-mono">
                    90 kg <span className="text-xs font-normal text-slate-500">@ ₹24/kg</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-800 font-mono">
                    ₹2,160 Direct Payout
                  </div>
                </div>
              </div>

              {/* Farmer 3: Anand (Shirtady) */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-white font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {t.farmer3}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        Crisp Salad Grade
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Produce: <strong className="text-slate-900">Cucumbers (ಸೌತೆಕಾಯಿ)</strong> • Village: Shirtady (14 km)
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <div className="text-base font-black text-slate-900 font-mono">
                    100 kg <span className="text-xs font-normal text-slate-500">@ ₹22/kg</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-800 font-mono">
                    ₹2,200 Direct Payout
                  </div>
                </div>
              </div>
            </div>

            {/* Total Aggregate Verification */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Single Tata Ace Eco route serves all 3 farms in 1 hr 20 min</span>
              </div>
              <button
                onClick={() => onNavigateTab('logistics')}
                className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Route Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Direct Cost Comparison Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.costComparisonTitle}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                {language === 'en' ? 'Institutional Savings Breakdown' : 'ಸಂಸ್ಥೆಯ ಒಟ್ಟು ಉಳಿತಾಯ ಲೆಕ್ಕಾಚಾರ'}
              </h3>
            </div>

            {/* Comparison Metrics */}
            <div className="space-y-4">
              {/* Traditional Wholesale Cost */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-600">
                    {t.traditionalWholesale}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Mangaluru Central Mandi + 3x Middleman margins
                  </div>
                </div>
                <div className="text-xl font-black text-slate-700 font-mono line-through decoration-red-500 decoration-2">
                  ₹8,000
                </div>
              </div>

              {/* KisanSetu Direct Cost */}
              <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.kisanSetuCost}</span>
                  </div>
                  <div className="text-xs text-emerald-700 mt-0.5">
                    Direct Farmgate Rate + Pooled Route Fee
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-900 font-mono">
                  ₹6,500
                </div>
              </div>

              {/* Instant Buyer Savings Highlight */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-100">
                      {t.buyerSavings}
                    </div>
                    <div className="text-xl font-black font-mono">
                      ₹1,500 <span className="text-xs font-semibold">(18.7% Saved)</span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs text-amber-100 font-medium hidden sm:block">
                  Annualized Mess Savings: ~₹5.4 Lakhs
                </div>
              </div>
            </div>

            {/* Quality & Freshness Guarantee */}
            <div className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Harvested at 5:00 AM • Delivered to kitchen by 6:50 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero transit storage delay • 100% Traceable to individual farmers</span>
              </div>
            </div>

            {/* Accept Delivery & Release Payment Action */}
            <button
              onClick={handleOpenPayment}
              className="w-full py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>{t.acceptButton}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
