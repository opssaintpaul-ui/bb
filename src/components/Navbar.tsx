import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ShieldCheck, Database, Search } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    settings,
    cartCount,
    setIsCartOpen,
    currentView,
    setCurrentView,
    setIsCodeArchitectureOpen,
    setIsOrderTrackerOpen,
    isAdmin
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Dynamic Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentView('store')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            {settings.logo_url ? (
              <img
                src={settings.logo_url}
                alt={settings.site_title}
                className="h-9 w-auto max-w-[140px] object-contain rounded"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                E
              </div>
            )}
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
              {settings.site_title || 'EduStore'}
            </span>
          </button>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#katalog"
            onClick={(e) => {
              if (currentView !== 'store') {
                e.preventDefault();
                setCurrentView('store');
                setTimeout(() => {
                  document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            Katalog Aplikasi
          </a>
          <a
            href="#keunggulan"
            onClick={(e) => {
              if (currentView !== 'store') {
                e.preventDefault();
                setCurrentView('store');
                setTimeout(() => {
                  document.getElementById('keunggulan')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            Keunggulan Sistem
          </a>
          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Cek Status & Unduh</span>
          </button>
          <button
            onClick={() => setIsCodeArchitectureOpen(true)}
            className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-slate-400" />
            <span>Skema PHP & MySQL</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Interactive Cart Badge */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Keranjang Belanja"
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Keranjang</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold text-white bg-indigo-600 rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mode Switch (Store <-> Admin Dashboard) */}
          {currentView === 'store' ? (
            <button
              onClick={() => setCurrentView('admin')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>{isAdmin ? 'Dashboard Admin' : 'Login Admin'}</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('store')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Kembali ke Toko</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
