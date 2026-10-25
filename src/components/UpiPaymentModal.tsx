import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  X,
  QrCode,
  ShieldCheck,
  Download,
  Building,
  UserCheck,
  Check,
  Sparkles
} from 'lucide-react';
import { BulkOrder, Language } from '../types';
import { translations } from '../translations';

interface UpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: BulkOrder;
  language: Language;
}

export const UpiPaymentModal: React.FC<UpiPaymentModalProps> = ({
  isOpen,
  onClose,
  order,
  language,
}) => {
  const t = translations[language].upiModal;
  const [processing, setProcessing] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProcessing(true);
      setShowReceipt(false);
      const timer = setTimeout(() => {
        setProcessing(false);
        setShowReceipt(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-emerald-500/30 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>NPCI • Direct APMC UPI Gateway</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {t.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {t.subtitle}
          </p>
        </div>

        {/* Processing State */}
        {processing ? (
          <div className="py-12 text-center space-y-4">
            <div className="relative mx-auto w-16 h-16">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-emerald-700">
                UPI
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">
                {language === 'en'
                  ? 'Verifying Alva’s Institutional Escrow...'
                  : 'ಆಳ್ವಾಸ್ ಇನ್‌ಸ್ಟಿಟ್ಯೂಷನಲ್ ಎಸ್ಕ್ರೋ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...'}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {language === 'en'
                  ? 'Splitting ₹6,500 into 3 farmer bank accounts simultaneously'
                  : 'ರೂ. 6,500 ಅನ್ನು 3 ರೈತರ ಖಾತೆಗಳಿಗೆ ನೇರವಾಗಿ ವಿಭಜಿಸಲಾಗುತ್ತಿದೆ'}
              </div>
            </div>
          </div>
        ) : (
          /* Success Receipt & QR Settlement */
          <div className="space-y-5 animate-in zoom-in-95 duration-200">
            {/* Animated Confirmation Badge (Required by prompt) */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-600 to-green-800 text-white shadow-lg text-center relative overflow-hidden">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 text-white shadow-inner">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-emerald-200 mb-0.5">
                Instant Settlement Successful
              </div>
              <h3 className="text-base sm:text-lg font-black leading-snug">
                {t.verifiedMsg}
              </h3>
              <div className="text-[11px] font-mono text-emerald-100/80 mt-1">
                Ref UTR: UPI/2026/DK-MOOD/984521093 • {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Simulated UPI QR Code Viewport */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 bg-white p-2 rounded-lg border border-slate-300 shadow-xs shrink-0 flex items-center justify-center">
                {/* SVG QR Code Illustration */}
                <svg viewBox="0 0 100 100" className="w-20 h-20">
                  <rect x="0" y="0" width="30" height="30" fill="#0f172a" />
                  <rect x="5" y="5" width="20" height="20" fill="#fff" />
                  <rect x="10" y="10" width="10" height="10" fill="#0f172a" />

                  <rect x="70" y="0" width="30" height="30" fill="#0f172a" />
                  <rect x="75" y="5" width="20" height="20" fill="#fff" />
                  <rect x="80" y="10" width="10" height="10" fill="#0f172a" />

                  <rect x="0" y="70" width="30" height="30" fill="#0f172a" />
                  <rect x="5" y="75" width="20" height="20" fill="#fff" />
                  <rect x="10" y="80" width="10" height="10" fill="#0f172a" />

                  <rect x="40" y="10" width="10" height="20" fill="#0f172a" />
                  <rect x="55" y="5" width="10" height="15" fill="#0f172a" />
                  <rect x="35" y="45" width="30" height="15" fill="#0f172a" />
                  <rect x="75" y="45" width="20" height="10" fill="#0f172a" />
                  <rect x="40" y="70" width="20" height="20" fill="#0f172a" />
                  <rect x="70" y="75" width="25" height="15" fill="#0f172a" />
                </svg>
              </div>

              <div className="text-left flex-1">
                <div className="text-xs font-bold text-slate-800">
                  {language === 'en' ? 'Direct Payer Account' : 'ಪಾವತಿದಾರರ ಖಾತೆ'}
                </div>
                <div className="text-xs text-slate-600 font-semibold">
                  Alva's Education Foundation Moodbidri Mess A/c
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  UPI ID: alvasmess.dk@canarabank
                </div>
                <div className="mt-2 text-xs font-bold text-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>0% Gateway Fee (Agricultural Direct Exemption)</span>
                </div>
              </div>
            </div>

            {/* Beneficiary Breakdown List */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                <span>{language === 'en' ? 'Instant Farmer Payout Ledger' : 'ರೈತರ ಖಾತೆಗೆ ಜಮೆಯಾದ ವಿವರ'}</span>
                <span>{t.beneficiaries}</span>
              </div>

              <div className="space-y-2">
                {order.pooledFarmers.map((farmer, idx) => (
                  <div
                    key={farmer.farmerId}
                    className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">
                          {farmer.farmerName} ({farmer.village})
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {farmer.produce} ({farmer.quantityKg} kg) • UPI: {farmer.upiId}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-black text-emerald-700 font-mono text-sm">
                        ₹{farmer.totalPayout}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 justify-end">
                        <CheckCircle2 className="w-3 h-3" /> Credited
                      </div>
                    </div>
                  </div>
                ))}

                {/* Logistics Share */}
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-500" />
                    <span>Shared Tata Ace Driver & Fuel Pool (Moodbidri Cluster)</span>
                  </div>
                  <span className="font-bold font-mono text-slate-900">₹285</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  alert(
                    language === 'en'
                      ? 'KisanSetu Official Payment Receipt #KS-ALVAS-6500 generated. Downloaded to device.'
                      : 'ಕಿಸಾನ್ ಸೇತು ಪಾವತಿ ರಶೀದಿ #KS-ALVAS-6500 ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ.'
                  );
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadReceipt}</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
