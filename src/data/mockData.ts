import { ProduceItem, BulkOrder, LogisticsPlan, HarvestSubmission } from '../types';

export const PRODUCE_CATALOG: ProduceItem[] = [
  {
    id: 'ridge_gourd',
    nameEn: 'Ridge Gourd',
    nameKn: 'ಹೀರೆಕಾಯಿ',
    category: 'Cucurbits',
    defaultPriceApmc: 22,
    middlemanPrice: 14,
    kisanSetuPrice: 26,
    iconEmoji: '🥒',
    unit: 'kg',
    gradeConfidence: 94,
    shelfLife: '3-4 days'
  },
  {
    id: 'tomatoes',
    nameEn: 'Tomatoes',
    nameKn: 'ಟೊಮೇಟೊ',
    category: 'Solanaceous',
    defaultPriceApmc: 20,
    middlemanPrice: 12,
    kisanSetuPrice: 24,
    iconEmoji: '🍅',
    unit: 'kg',
    gradeConfidence: 96,
    shelfLife: '4-5 days'
  },
  {
    id: 'cucumbers',
    nameEn: 'Cucumbers',
    nameKn: 'ಸೌತೆಕಾಯಿ',
    category: 'Cucurbits',
    defaultPriceApmc: 18,
    middlemanPrice: 11,
    kisanSetuPrice: 22,
    iconEmoji: '🥒',
    unit: 'kg',
    gradeConfidence: 92,
    shelfLife: '5-6 days'
  },
  {
    id: 'green_chillies',
    nameEn: 'Green Chillies',
    nameKn: 'ಹಸಿಮೆಣಸು',
    category: 'Condiments',
    defaultPriceApmc: 35,
    middlemanPrice: 22,
    kisanSetuPrice: 42,
    iconEmoji: '🌶️',
    unit: 'kg',
    gradeConfidence: 95,
    shelfLife: '7 days'
  }
];

export const TALUK_VILLAGES: Record<string, string[]> = {
  Moodbidri: ['Gantalkatte', 'Beluvai', 'Shirtady', 'Padumarnadu', 'Tenkamijar', 'Ganjimutt', 'Alangar'],
  Bantwal: ['BC Road', 'Panemangalore', 'Vittal', 'Mani', 'Kalladka', 'Kavalamudoor'],
  Mangaluru: ['Bajpe', 'Kinnigoli', 'Surathkal', 'Gurupura', 'Mulki', 'Kateel'],
  Belthangady: ['Ujire', 'Dharmasthala', 'Venur', 'Kokkada', 'Madanthyar'],
  Puttur: ['Uppinangady', 'Kabaka', 'Kumbra', 'Sampya', 'Ishwaramangala']
};

export const INITIAL_HARVEST_SUBMISSION: HarvestSubmission = {
  id: 'KS-8042',
  farmerName: 'Ramesh Poojary',
  farmerPhone: '+91 94812 30982',
  taluk: 'Moodbidri',
  village: 'Gantalkatte',
  cluster: 'Moodbidri East Cluster',
  produceId: 'ridge_gourd',
  produceNameEn: 'Ridge Gourd',
  produceNameKn: 'ಹೀರೆಕಾಯಿ',
  quantityKg: 60,
  expectedHarvestDate: 'Tomorrow, 5:00 AM',
  aiQualityScore: 94,
  qualityGrade: 'Grade-A',
  middlemanQuotePerKg: 14,
  apmcYardPerKg: 22,
  kisanSetuPricePerKg: 26,
  totalEarnings: 1560,
  pickupPassNumber: 'KS-8042',
  pickupSlot: '5:30 AM - 5:45 AM',
  status: 'pooled',
  timestamp: new Date().toISOString()
};

export const INITIAL_BULK_ORDER: BulkOrder = {
  id: 'BO-ALVAS-250',
  buyerName: "Alva's Central Kitchen / Mess",
  buyerType: 'Hostel Mess (8,500 students)',
  location: 'Alva’s Campus, Moodbidri',
  neededByTime: '7:30 AM Tomorrow',
  totalKgNeeded: 250,
  targetVegetableTypes: ['Ridge Gourd', 'Tomatoes', 'Cucumbers'],
  status: 'matched',
  traditionalWholesaleCost: 8000,
  kisanSetuDirectCost: 6500,
  savingsAmount: 1500,
  savingsPercent: 18.75,
  pooledFarmers: [
    {
      farmerId: 'F-01',
      farmerName: 'Farmer Ramesh Poojary',
      village: 'Gantalkatte',
      produce: 'Ridge Gourd',
      produceKn: 'ಹೀರೆಕಾಯಿ',
      quantityKg: 60,
      pricePerKg: 26,
      totalPayout: 1560,
      upiId: 'ramesh.poojary@sbi',
      bankAccountLast4: '4891',
      status: 'pooled'
    },
    {
      farmerId: 'F-02',
      farmerName: 'Farmer Suresh Gowda',
      village: 'Beluvai',
      produce: 'Tomatoes',
      produceKn: 'ಟೊಮೇಟೊ',
      quantityKg: 90,
      pricePerKg: 24,
      totalPayout: 2160,
      upiId: 'suresh.gowda@canarabank',
      bankAccountLast4: '7103',
      status: 'pooled'
    },
    {
      farmerId: 'F-03',
      farmerName: 'Farmer Anand Kulal',
      village: 'Shirtady',
      produce: 'Cucumbers',
      produceKn: 'ಸೌತೆಕಾಯಿ',
      quantityKg: 100,
      pricePerKg: 22,
      totalPayout: 2200,
      upiId: 'anand.kulal@okaxis',
      bankAccountLast4: '9024',
      status: 'pooled'
    }
  ]
};

export const INITIAL_LOGISTICS_PLAN: LogisticsPlan = {
  vehicleModel: 'Tata Ace Eco Electric',
  vehicleNumber: 'KA-19-D-4821',
  driverName: 'Manjunath Gowda',
  driverPhone: '+91 98452 71044',
  maxCapacityKg: 750,
  currentPayloadKg: 250,
  soloTempoCostPerFarmer: 650,
  kisanSetuCostPerFarmer: 95,
  totalMilkRunCost: 285,
  savingsPercentage: 85.3,
  status: 'scheduled',
  currentStopIndex: 0,
  stops: [
    {
      stopNumber: 1,
      time: '5:30 AM',
      location: 'Gantalkatte Junction',
      village: 'Gantalkatte',
      farmerName: 'Ramesh Poojary',
      action: 'Pick up 60 kg Fresh Ridge Gourd',
      produceDetail: 'Ridge Gourd (ಹೀರೆಕಾಯಿ) - 2 Crated Bags',
      quantityKg: 60,
      completed: false,
      coordinates: { lat: 13.0485, lng: 74.9965 }
    },
    {
      stopNumber: 2,
      time: '5:50 AM',
      location: 'Shirtady Cross Road',
      village: 'Shirtady',
      farmerName: 'Anand Kulal',
      action: 'Pick up 100 kg Farm Cucumbers',
      produceDetail: 'Cucumbers (ಸೌತೆಕಾಯಿ) - 4 Harvest Crates',
      quantityKg: 100,
      completed: false,
      coordinates: { lat: 13.0821, lng: 75.0354 }
    },
    {
      stopNumber: 3,
      time: '6:15 AM',
      location: 'Beluvai Market Point',
      village: 'Beluvai',
      farmerName: 'Suresh Gowda',
      action: 'Pick up 90 kg Vine Tomatoes',
      produceDetail: 'Tomatoes (ಟೊಮೇಟೊ) - 3 Crates',
      quantityKg: 90,
      completed: false,
      coordinates: { lat: 13.0912, lng: 74.9658 }
    },
    {
      stopNumber: 4,
      time: '6:50 AM',
      location: "Alva's Central Dining Hall / Mess",
      village: 'Moodbidri Town',
      farmerName: 'Direct Delivery to Buyer',
      action: 'Consolidated Delivery: 250 kg Vegetables',
      produceDetail: 'Full Order Fulfillment for 8,500 Campus Meals',
      quantityKg: 250,
      completed: false,
      coordinates: { lat: 13.0645, lng: 74.9982 }
    }
  ]
};
