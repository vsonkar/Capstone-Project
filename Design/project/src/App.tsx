import React, { useState } from 'react';
import { 
  Leaf, 
  Shield, 
  Link as ChainIcon, 
  FileCheck, 
  Truck, 
  Users,
  ArrowRight,
  Search,
  Package,
  Factory,
  Store,
  Warehouse,
  ShoppingCart,
  User,
  LogOut,
  CheckCircle2
} from 'lucide-react';

type UserRole = 'user' | 'farmer' | 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
}

interface ProductHistory {
  timestamp: string;
  action: string;
  actor: string;
  role: string;
  location: string;
  details: string;
}

interface QualityCheck {
  organization: string;
  score: number;
  timestamp: string;
  certificationId: string;
  notes: string[];
}

interface Product {
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

function LoginPage({ onLogin }: { onLogin: (role: UserRole) => void }) {
  const roles: { role: UserRole; icon: React.ElementType; label: string }[] = [
    { role: 'user', icon: User, label: 'Consumer' },
    { role: 'farmer', icon: Leaf, label: 'Farmer' },
    { role: 'manufacturer', icon: Factory, label: 'Manufacturer' },
    { role: 'distributor', icon: Truck, label: 'Distributor' },
    { role: 'wholesaler', icon: Warehouse, label: 'Wholesaler' },
    { role: 'retailer', icon: Store, label: 'Retailer' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center gap-2 mb-8">
          <ChainIcon className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-800">AgriChain Login</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {roles.map(({ role, icon: Icon, label }) => (
            <button
              key={role}
              onClick={() => onLogin(role)}
              className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <Icon className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductForm({ onSubmit }: { onSubmit: (data: Partial<Product>) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    productionDate: '',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', origin: '', productionDate: '', details: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Add Product Details</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
          <input
            type="text"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Production Date</label>
          <input
            type="date"
            value={formData.productionDate}
            onChange={(e) => setFormData({ ...formData, productionDate: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
          <textarea
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}

function QualityIndicator({ score }: { score: number }) {
  const getColorClass = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`flex items-center gap-2 ${getColorClass(score)}`}>
      <CheckCircle2 className="h-5 w-5" />
      <span className="font-bold">{score}%</span>
    </div>
  );
}

function ProductTracker() {
  const [searchId, setSearchId] = useState('');
  const [product, setProduct] = useState<Product | null>(null);

  const mockProduct: Product = {
    id: "PROD123",
    name: "Organic Tomatoes",
    origin: "Green Valley Farms, California",
    farmer: "John Smith",
    manufacturer: "Fresh Pack Co.",
    distributor: "Quick Ship Logistics",
    wholesaler: "Metro Foods",
    retailer: "Fresh Market",
    productionDate: "2024-02-15",
    qualityChecks: [
      {
        organization: "AgriCert International",
        score: 95,
        timestamp: "2024-02-15 09:30",
        certificationId: "CERT-2024-001",
        notes: [
          "Meets organic certification standards",
          "Pesticide-free verification completed",
          "Optimal ripeness confirmed"
        ]
      },
      {
        organization: "Food Safety Alliance",
        score: 92,
        timestamp: "2024-02-16 11:00",
        certificationId: "FSA-2024-123",
        notes: [
          "Storage conditions verified",
          "Temperature monitoring compliant",
          "Packaging integrity confirmed"
        ]
      }
    ],
    history: [
      {
        timestamp: "2024-02-15 08:00",
        action: "Harvested",
        actor: "John Smith",
        role: "Farmer",
        location: "Green Valley Farms",
        details: "Harvested at optimal ripeness"
      },
      {
        timestamp: "2024-02-16 10:00",
        action: "Processed",
        actor: "Fresh Pack Co.",
        role: "Manufacturer",
        location: "Processing Facility",
        details: "Cleaned and packaged"
      },
      {
        timestamp: "2024-02-17 09:00",
        action: "Shipped",
        actor: "Quick Ship Logistics",
        role: "Distributor",
        location: "Distribution Center",
        details: "Temperature controlled transport"
      },
      {
        timestamp: "2024-02-18 14:00",
        action: "Received",
        actor: "Metro Foods",
        role: "Wholesaler",
        location: "Wholesale Market",
        details: "Quality check passed"
      },
      {
        timestamp: "2024-02-19 11:00",
        action: "Stocked",
        actor: "Fresh Market",
        role: "Retailer",
        location: "Store #123",
        details: "Display temperature: 4°C"
      }
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.toUpperCase() === "PROD123") {
      setProduct(mockProduct);
    } else {
      setProduct(null);
      alert("Product not found");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Product ID (try PROD123)"
          className="flex-1 p-2 border rounded-md"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Search className="h-5 w-5" />
          Track
        </button>
      </form>

      {product && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">Product Details</h3>
              <div className="flex items-center gap-4">
                {product.qualityChecks.map((check, index) => (
                  <div key={index} className="text-center">
                    <QualityIndicator score={check.score} />
                    <p className="text-xs text-gray-600 mt-1">{check.organization}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Product ID</p>
                <p className="font-medium">{product.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{product.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Origin</p>
                <p className="font-medium">{product.origin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Production Date</p>
                <p className="font-medium">{product.productionDate}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Quality Assurance</h4>
            <div className="space-y-4">
              {product.qualityChecks.map((check, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-lg">{check.organization}</p>
                      <p className="text-sm text-gray-600">Certification ID: {check.certificationId}</p>
                    </div>
                    <QualityIndicator score={check.score} />
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">Quality Notes:</p>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {check.notes.map((note, noteIndex) => (
                        <li key={noteIndex}>{note}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Verified on: {check.timestamp}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Supply Chain History</h4>
            <div className="space-y-4">
              {product.history.map((event, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-lg">{event.action}</p>
                      <p className="text-sm text-gray-600">by {event.actor} ({event.role})</p>
                    </div>
                    <span className="text-sm text-gray-500">{event.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600">Location: {event.location}</p>
                  <p className="text-sm text-gray-700">{event.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({ role, onLogout }: { role: UserRole; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'track' | 'add'>('track');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ChainIcon className="h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold">AgriChain</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="h-5 w-5" />
                <span className="font-medium capitalize">{role}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('track')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'track'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Track Product
            </button>
            {role !== 'user' && (
              <button
                onClick={() => setActiveTab('add')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'add'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Add Product
              </button>
            )}
          </div>
        </div>

        {activeTab === 'track' ? (
          <ProductTracker />
        ) : (
          <ProductForm onSubmit={(data) => {
            console.log('Product added:', data);
            alert('Product added successfully!');
          }} />
        )}
      </main>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    role: null
  });

  const handleLogin = (role: UserRole) => {
    setAuth({
      isAuthenticated: true,
      role
    });
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      role: null
    });
  };

  if (!auth.isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard role={auth.role!} onLogout={handleLogout} />;
}

export default App;