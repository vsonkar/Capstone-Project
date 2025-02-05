export interface QualityCheck {
  organization: string;
  score: number;
  timestamp: string;
  certificationId: string;
  notes: string[];
}

export interface ProductHistory {
  timestamp: string;
  action: string;
  actor: string;
  role: string;
  location: string;
  details: string;
}

export interface Product {
  id: string;
  name: string;
  origin: string;
  farmer: string;
  manufacturer: string;
  distributor: string;
  wholesaler: string;
  retailer: string;
  productionDate: string;
  qualityChecks: QualityCheck[];
  history: ProductHistory[];
}