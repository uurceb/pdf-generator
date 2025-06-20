import React, { useState } from 'react';
import { Header } from './components/Header';
import { CustomerList } from './components/CustomerList';
import { OrderList } from './components/OrderList';
import { ReportsView } from './components/ReportsView';

function App() {
  const [activeTab, setActiveTab] = useState('customers');

  const renderContent = () => {
    switch (activeTab) {
      case 'customers':
        return <CustomerList />;
      case 'orders':
        return <OrderList />;
      case 'reports':
        return <ReportsView />;
      default:
        return <CustomerList />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

export default App;