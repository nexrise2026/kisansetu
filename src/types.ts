export type Language = 'en' | 'kn';

export type District = 'Dakshina Kannada' | 'Udupi' | 'Shivamogga' | 'Hassan';

export type Taluk = 'Moodbidri' | 'Bantwal' | 'Mangaluru' | 'Belthangady' | 'Puttur';

export interface ProduceItem {
  id: string;
  nameEn: string;
  nameKn: string;
  category: string;
  defaultPriceApmc: number; // per kg
  middlemanPrice: number;   // per kg
  kisanSetuPrice: number;   // per kg
  iconEmoji: string;
  unit: string;
  gradeConfidence: number;
  shelfLife: string;
}

export interface HarvestSubmission {
  id: string;
  farmerName: string;
  farmerPhone: string;
  taluk: Taluk;
  village: string;
  cluster: string;
  produceId: string;
  produceNameEn: string;
  produceNameKn: string;
  quantityKg: number;
  expectedHarvestDate: string;
  aiQualityScore: number;
  qualityGrade: 'Grade-A' | 'Grade-B';
  middlemanQuotePerKg: number;
  apmcYardPerKg: number;
  kisanSetuPricePerKg: number;
  totalEarnings: number;
  pickupPassNumber: string;
  pickupSlot: string;
  status: 'pooled' | 'dispatched' | 'paid';
  timestamp: string;
}

export interface PooledFarmerContribution {
  farmerId: string;
  farmerName: string;
  village: string;
  produce: string;
  produceKn: string;
  quantityKg: number;
  pricePerKg: number;
  totalPayout: number;
  upiId: string;
  bankAccountLast4: string;
  status: 'pooled' | 'in_transit' | 'paid';
}

export interface BulkOrder {
  id: string;
  buyerName: string;
  buyerType: string;
  location: string;
  neededByTime: string;
  totalKgNeeded: number;
  targetVegetableTypes: string[];
  status: 'open' | 'matched' | 'settled';
  pooledFarmers: PooledFarmerContribution[];
  traditionalWholesaleCost: number;
  kisanSetuDirectCost: number;
  savingsAmount: number;
  savingsPercent: number;
}

export interface RouteStop {
  stopNumber: number;
  time: string;
  location: string;
  village: string;
  farmerName: string;
  action: string;
  produceDetail: string;
  quantityKg: number;
  completed: boolean;
  coordinates?: { lat: number; lng: number };
}

export interface LogisticsPlan {
  vehicleModel: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  maxCapacityKg: number;
  currentPayloadKg: number;
  soloTempoCostPerFarmer: number;
  kisanSetuCostPerFarmer: number;
  totalMilkRunCost: number;
  savingsPercentage: number;
  status: 'scheduled' | 'on_route' | 'delivered';
  currentStopIndex: number;
  stops: RouteStop[];
}
