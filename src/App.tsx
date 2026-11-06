import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InvoiceModal } from './components/InvoiceModal';
import { ProofUploadModal } from './components/ProofUploadModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { CodeArchitectureModal } from './components/CodeArchitectureModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { currentView, settings } = useApp();

  // Dynamic Background Style from Database Settings
  const getBackgroundClass = () => {
    switch (settings.background_style) {
      case 'subtle_grid':
        return 'bg-slate-50 [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]';
      case 'education_mesh':
        return 'bg-gradient-to-br from-slate-50 via-indigo-50/40 to-emerald-50/30';
      case 'clean_light':
      default:
        return 'bg-slate-50';
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${getBackgroundClass()}`}
      style={
        settings.background_style === 'custom_color' && settings.background_color
          ? { backgroundColor: settings.background_color }
          : undefined
      }
    >
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'store' ? (
          <>
            <HeroSection />
            <ProductCatalog />
            <FeaturesSection />
          </>
        ) : (
          <AdminDashboard />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <InvoiceModal />
      <ProofUploadModal />
      <OrderTrackerModal />
      <CodeArchitectureModal />

      {/* Floating WhatsApp Widget in Bottom-Right */}
      <WhatsAppWidget />

      {/* Toast Notification Container */}
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
