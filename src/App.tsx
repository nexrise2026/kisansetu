import React, { useState, useEffect } from 'react';
import { District, Language, HarvestSubmission, BulkOrder, LogisticsPlan } from './types';
import {
  INITIAL_HARVEST_SUBMISSION,
  INITIAL_BULK_ORDER,
  INITIAL_LOGISTICS_PLAN
} from './data/mockData';
import { QuickDemoBar } from './components/QuickDemoBar';
import { Header } from './components/Header';
import { FarmerPortal } from './components/FarmerPortal';
import { BuyerPortal } from './components/BuyerPortal';
import { LogisticsDispatcher } from './components/LogisticsDispatcher';
import { UpiPaymentModal } from './components/UpiPaymentModal';

const STORAGE_KEYS = {
  LANGUAGE: 'kisansetu_lang_v1',
  DISTRICT: 'kisansetu_district_v1',
  TAB: 'kisansetu_tab_v1',
  HARVEST: 'kisansetu_harvest_v1',
  BULK_ORDER: 'kisansetu_bulk_order_v1',
  LOGISTICS: 'kisansetu_logistics_v1',
  STEP: 'kisansetu_sim_step_v1',
};

export default function App() {
  // Initialize state with localStorage fallbacks
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return (saved as Language) || 'en';
  });

  const [selectedDistrict, setSelectedDistrict] = useState<District>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DISTRICT);
    return (saved as District) || 'Dakshina Kannada';
  });

  const [activeTab, setActiveTab] = useState<'farmer' | 'buyer' | 'logistics'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TAB);
    return (saved as 'farmer' | 'buyer' | 'logistics') || 'farmer';
  });

  const [simulationStep, setSimulationStep] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STEP);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [harvestSubmission, setHarvestSubmission] = useState<HarvestSubmission | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HARVEST);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_HARVEST_SUBMISSION;
      }
    }
    return INITIAL_HARVEST_SUBMISSION;
  });

  const [bulkOrder, setBulkOrder] = useState<BulkOrder>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BULK_ORDER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_BULK_ORDER;
      }
    }
    return INITIAL_BULK_ORDER;
  });

  const [logisticsPlan, setLogisticsPlan] = useState<LogisticsPlan>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGISTICS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_LOGISTICS_PLAN;
      }
    }
    return INITIAL_LOGISTICS_PLAN;
  });

  const [isDirectUpiOpen, setIsDirectUpiOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DISTRICT, selectedDistrict);
  }, [selectedDistrict]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TAB, activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STEP, simulationStep.toString());
  }, [simulationStep]);

  useEffect(() => {
    if (harvestSubmission) {
      localStorage.setItem(STORAGE_KEYS.HARVEST, JSON.stringify(harvestSubmission));
    }
  }, [harvestSubmission]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BULK_ORDER, JSON.stringify(bulkOrder));
  }, [bulkOrder]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGISTICS, JSON.stringify(logisticsPlan));
  }, [logisticsPlan]);

  // 1. Quick Demo Step 1: Simulate Farmer Harvest (Moodbidri Cluster)
  const handleSimulateHarvest = () => {
    const harvest: HarvestSubmission = {
      ...INITIAL_HARVEST_SUBMISSION,
      timestamp: new Date().toISOString(),
    };
    setHarvestSubmission(harvest);
    setSimulationStep(Math.max(1, simulationStep));
    setActiveTab('farmer');
  };

  // 2. Quick Demo Step 2: Simulate Bulk Demand Matching
  const handleSimulateMatching = () => {
    // If step 1 wasn't done yet, ensure harvest is present
    if (!harvestSubmission) {
      setHarvestSubmission(INITIAL_HARVEST_SUBMISSION);
    }
    setBulkOrder((prev) => ({
      ...prev,
      status: 'matched',
    }));
    setSimulationStep(Math.max(2, simulationStep));
    setActiveTab('buyer');
  };

  // 3. Quick Demo Step 3: Simulate Logistics & UPI Payout
  const handleSimulateLogisticsAndPayment = () => {
    setLogisticsPlan((prev) => ({
      ...prev,
      status: 'on_route',
      stops: prev.stops.map((stop, i) =>
        i < 3 ? { ...stop, completed: true } : stop
      ),
    }));
    setSimulationStep(3);
    setActiveTab('buyer');
    setIsDirectUpiOpen(true);
  };

  // Reset Demo Data
  const handleResetDemo = () => {
    localStorage.removeItem(STORAGE_KEYS.HARVEST);
    localStorage.removeItem(STORAGE_KEYS.BULK_ORDER);
    localStorage.removeItem(STORAGE_KEYS.LOGISTICS);
    localStorage.removeItem(STORAGE_KEYS.STEP);

    setHarvestSubmission(INITIAL_HARVEST_SUBMISSION);
    setBulkOrder(INITIAL_BULK_ORDER);
    setLogisticsPlan(INITIAL_LOGISTICS_PLAN);
    setSimulationStep(0);
    setActiveTab('farmer');
    setIsDirectUpiOpen(false);
  };

  // Farmer Portal submission handler (updates buyer and logistics state dynamically)
  const handleFarmerHarvestSubmit = (submission: HarvestSubmission) => {
    setHarvestSubmission(submission);

    // Dynamically update farmer 1 in the bulk order
    setBulkOrder((prev) => {
      const updatedFarmers = prev.pooledFarmers.map((f) => {
        if (f.farmerId === 'F-01') {
          return {
            ...f,
            village: submission.village,
            produce: submission.produceNameEn,
            produceKn: submission.produceNameKn,
            quantityKg: submission.quantityKg,
            pricePerKg: submission.kisanSetuPricePerKg,
            totalPayout: submission.totalEarnings,
          };
        }
        return f;
      });

      const totalPooledKg = updatedFarmers.reduce((acc, f) => acc + f.quantityKg, 0);

      return {
        ...prev,
        totalKgNeeded: totalPooledKg,
        pooledFarmers: updatedFarmers,
      };
    });

    // Dynamically update stop 1 in logistics
    setLogisticsPlan((prev) => {
      const updatedStops = prev.stops.map((s) => {
        if (s.stopNumber === 1) {
          return {
            ...s,
            village: submission.village,
            location: `${submission.village} Junction`,
            quantityKg: submission.quantityKg,
            produceDetail: `${submission.produceNameEn} (${submission.produceNameKn})`,
            action: `Pick up ${submission.quantityKg} kg Fresh ${submission.produceNameEn}`,
          };
        }
        return s;
      });

      const totalPayload = updatedStops
        .filter((s) => s.stopNumber !== 4)
        .reduce((sum, s) => sum + s.quantityKg, 0);

      return {
        ...prev,
        currentPayloadKg: totalPayload,
        stops: updatedStops,
      };
    });

    setSimulationStep(Math.max(1, simulationStep));
  };

  // Toggle stop completion in logistics
  const handleUpdateStopStatus = (stopNumber: number, completed: boolean) => {
    setLogisticsPlan((prev) => ({
      ...prev,
      stops: prev.stops.map((s) =>
        s.stopNumber === stopNumber ? { ...s, completed } : s
      ),
    }));
  };

  // Release payment
  const handleSettlePayment = () => {
    setBulkOrder((prev) => ({
      ...prev,
      status: 'settled',
      pooledFarmers: prev.pooledFarmers.map((f) => ({ ...f, status: 'paid' })),
    }));
    setSimulationStep(3);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
      {/* 1. Quick Demo Bar (Topmost) */}
      <QuickDemoBar
        language={language}
        currentStep={simulationStep}
        onSimulateHarvest={handleSimulateHarvest}
        onSimulateMatching={handleSimulateMatching}
        onSimulateLogisticsAndPayment={handleSimulateLogisticsAndPayment}
        onResetDemo={handleResetDemo}
      />

      {/* 2. Global Header & Location Bar */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        selectedDistrict={selectedDistrict}
        onDistrictChange={setSelectedDistrict}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* 3. Main Role Portal Viewport */}
      <main className="flex-1 pb-16">
        {activeTab === 'farmer' && (
          <FarmerPortal
            language={language}
            harvestSubmission={harvestSubmission}
            onHarvestSubmit={handleFarmerHarvestSubmit}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'buyer' && (
          <BuyerPortal
            language={language}
            bulkOrder={bulkOrder}
            harvestSubmission={harvestSubmission}
            onSettlePayment={handleSettlePayment}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'logistics' && (
          <LogisticsDispatcher
            language={language}
            logisticsPlan={logisticsPlan}
            onUpdateStopStatus={handleUpdateStopStatus}
            onNavigateTab={setActiveTab}
          />
        )}
      </main>

      {/* Standalone Triggered UPI Modal if triggered by Quick Demo Step 3 */}
      {isDirectUpiOpen && (
        <UpiPaymentModal
          isOpen={isDirectUpiOpen}
          onClose={() => setIsDirectUpiOpen(false)}
          order={bulkOrder}
          language={language}
        />
      )}

      {/* Global Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">KisanSetu (ಕಿಸಾನ್ ಸೇತು)</span>
            <span>·</span>
            <span>Dakshina Kannada & Udupi Agricultural FPO Trade Network</span>
          </div>
          <div className="text-slate-400 text-center sm:text-right">
            Zero Middlemen • Hyperlocal Pooling • Direct UPI Settlement
          </div>
        </div>
      </footer>
    </div>
  );
}
