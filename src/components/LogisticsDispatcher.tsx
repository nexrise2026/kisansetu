import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  TrendingDown,
  Phone,
  CheckCircle2,
  Navigation,
  Check,
  AlertCircle,
  Fuel,
  BatteryCharging,
  Maximize2
} from 'lucide-react';
import { LogisticsPlan, Language, RouteStop } from '../types';
import { translations } from '../translations';

interface LogisticsDispatcherProps {
  language: Language;
  logisticsPlan: LogisticsPlan;
  onUpdateStopStatus: (stopNumber: number, completed: boolean) => void;
  onNavigateTab: (tab: 'buyer' | 'farmer') => void;
}

export const LogisticsDispatcher: React.FC<LogisticsDispatcherProps> = ({
  language,
  logisticsPlan,
  onUpdateStopStatus,
  onNavigateTab,
}) => {
  const t = translations[language].logistics;
  const [activeStop, setActiveStop] = useState<number>(1);

  // Utilization calculation
  const payloadPercent = Math.round(
    (logisticsPlan.currentPayloadKg / logisticsPlan.maxCapacityKg) * 100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>{language === 'en' ? 'Smart Milk-Run Route Aggregation' : 'ಸ್ಥಳೀಯ ಹಂಚಿಕೆಯ ಮುಂಜಾನೆ ಸಾಗಣೆ ಮಾರ್ಗ'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {t.heading}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.subheading}
            </p>
          </div>

          {/* Vehicle Assignment & Driver Pill */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-extrabold text-slate-900 font-mono">
                {logisticsPlan.vehicleNumber}
              </div>
              <div className="text-slate-500 font-medium">
                {t.driverInfo}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 2 KPI Cards: Vehicle Load Capacity Bar & Shared Transport Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Vehicle Load Capacity Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.capacityBarTitle}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                EV Eco Mode
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              {t.capacityStatus}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Optimized for zero empty backhauls in Moodbidri - Karkala rural belt.
            </p>
          </div>

          {/* Graphical Capacity Bar (Requirement) */}
          <div className="my-5 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600">Payload: <strong className="text-slate-900 font-mono">{logisticsPlan.currentPayloadKg} kg</strong></span>
              <span className="text-slate-500 font-mono">Max: {logisticsPlan.maxCapacityKg} kg</span>
            </div>

            {/* Segmented Meter Bar */}
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200 flex">
              <div
                className="h-full bg-linear-to-r from-emerald-500 via-teal-500 to-blue-600 rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${payloadPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-0.5">
              <span>0 kg</span>
              <span>Available Margin: {logisticsPlan.maxCapacityKg - logisticsPlan.currentPayloadKg} kg (Next pickup: Padumarnadu)</span>
              <span>750 kg</span>
            </div>
          </div>

          {/* Quick Vehicle Specs */}
          <div className="grid grid-cols-3 divide-x divide-slate-100 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">BATTERY</span>
              <span className="font-bold text-slate-800 font-mono flex items-center justify-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" /> 84%
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">ROUTE DIST.</span>
              <span className="font-bold text-slate-800 font-mono">34.2 km</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">EST. TIME</span>
              <span className="font-bold text-slate-800 font-mono">1 hr 20m</span>
            </div>
          </div>
        </div>

        {/* Shared Logistics Cost Breakdown Card (7 Cols) (Requirement) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                {t.costBreakdownTitle}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>{t.savingsBadge}</span>
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              {language === 'en' ? 'Solo Tempo vs Shared Milk-Run Economics' : 'ವೈಯಕ್ತಿಕ ಬಾಡಿಗೆ vs ಹಂಚಿಕೆಯ ವೆಚ್ಚ'}
            </h3>
          </div>

          {/* Cost Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            {/* Solo Tempo */}
            <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
              <span className="text-xs font-semibold text-red-900 block">
                {t.soloCost}
              </span>
              <div className="text-2xl font-black text-red-700 font-mono mt-1">
                ₹{logisticsPlan.soloTempoCostPerFarmer}
              </div>
              <p className="text-[11px] text-red-600/90 mt-1">
                If each farmer hired a solo autorickshaw/tempo to Mangaluru APMC (Total for 3 farmers: <strong>₹1,950</strong>)
              </p>
            </div>

            {/* KisanSetu Shared Cost */}
            <div className="p-4 rounded-xl bg-emerald-50/80 border-2 border-emerald-500">
              <span className="text-xs font-bold text-emerald-900 block">
                {t.sharedCost}
              </span>
              <div className="text-2xl font-black text-emerald-900 font-mono mt-1">
                ₹{logisticsPlan.kisanSetuCostPerFarmer}
              </div>
              <p className="text-[11px] text-emerald-700 mt-1">
                Shared consolidated pickup at farmgate. Total collective fuel/driver cost: <strong>₹285</strong>
              </p>
            </div>
          </div>

          {/* Summary Callout */}
          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-semibold text-slate-800">
              Each smallholder keeps ₹555 in their pocket every morning.
            </span>
            <span className="font-bold text-emerald-700 font-mono">
              ₹1,665 Total Cluster Savings
            </span>
          </div>
        </div>
      </div>

      {/* Main Visual Route Flow Stepper & Interactive Route Map */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span>{t.timelineTitle}</span>
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              Early Morning Consolidation Route (Moodbidri Cluster)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>{t.liveTelemetry}</span>
            </span>
          </div>
        </div>

        {/* Visual Interactive Route Flow / Timeline (Requirement) */}
        <div className="relative">
          {/* Stepper Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {logisticsPlan.stops.map((stop, index) => {
              const isSelected = activeStop === stop.stopNumber;
              const isLast = index === logisticsPlan.stops.length - 1;

              return (
                <div
                  key={stop.stopNumber}
                  onClick={() => setActiveStop(stop.stopNumber)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                    stop.completed
                      ? 'bg-emerald-50/60 border-emerald-400 ring-1 ring-emerald-400'
                      : isSelected
                      ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-400/30'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Header with Time & Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500 font-mono">
                        {stop.time}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isLast
                            ? 'bg-purple-100 text-purple-800'
                            : stop.completed
                            ? 'bg-emerald-200 text-emerald-900'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isLast ? 'Delivery' : stop.completed ? 'Loaded' : 'Pending'}
                      </span>
                    </div>

                    {/* Village & Action */}
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {stop.location}
                    </h4>
                    <p className="text-xs font-semibold text-slate-700 mt-1">
                      {stop.action}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {stop.farmerName} • {stop.produceDetail}
                    </p>
                  </div>

                  {/* Bottom Toggle or Confirmation */}
                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      +{stop.quantityKg} kg
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStopStatus(stop.stopNumber, !stop.completed);
                      }}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                        stop.completed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{stop.completed ? 'Completed' : t.markCompleted}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Map Layout Graphic for Dakshina Kannada Clusters */}
        <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dakshina Kannada Hyperlocal Route Visualizer (Moodbidri Cluster)</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              GPS Lat: 13.0645° N, 74.9982° E
            </span>
          </div>

          {/* Graphical Simulated Route Vector */}
          <div className="relative h-44 w-full bg-slate-950 rounded-lg p-4 overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* SVG Visual Road Path */}
            <svg viewBox="0 0 600 160" className="w-full h-full">
              {/* Road Curve */}
              <path
                d="M 50,110 C 130,40 220,130 320,50 C 420,-10 490,120 550,80"
                fill="none"
                stroke="#334155"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 50,110 C 130,40 220,130 320,50 C 420,-10 490,120 550,80"
                fill="none"
                stroke="#10b981"
                strokeWidth="4"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />

              {/* Stop 1: Gantalkatte */}
              <g transform="translate(50, 110)">
                <circle r="12" fill="#047857" stroke="#10b981" strokeWidth="3" />
                <text y="-18" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">
                  1. Gantalkatte (5:30 AM)
                </text>
                <text y="24" textAnchor="middle" fill="#94a3b8" fontSize="9">
                  Ramesh (60kg)
                </text>
              </g>

              {/* Stop 2: Shirtady */}
              <g transform="translate(230, 95)">
                <circle r="12" fill="#047857" stroke="#10b981" strokeWidth="3" />
                <text y="-18" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">
                  2. Shirtady (5:50 AM)
                </text>
                <text y="24" textAnchor="middle" fill="#94a3b8" fontSize="9">
                  Anand (100kg)
                </text>
              </g>

              {/* Stop 3: Beluvai */}
              <g transform="translate(370, 40)">
                <circle r="12" fill="#047857" stroke="#10b981" strokeWidth="3" />
                <text y="-18" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">
                  3. Beluvai (6:15 AM)
                </text>
                <text y="24" textAnchor="middle" fill="#94a3b8" fontSize="9">
                  Suresh (90kg)
                </text>
              </g>

              {/* Stop 4: Alva's Campus */}
              <g transform="translate(550, 80)">
                <circle r="14" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="3" />
                <text y="-20" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">
                  4. Alva's Mess (6:50 AM)
                </text>
                <text y="26" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">
                  250 kg Delivered
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
