import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Mail, MapPin, Phone, Database, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setIsCodeArchitectureOpen, setIsOrderTrackerOpen, setCurrentView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                E
              </div>
              <span>{settings.site_title || 'EduStore'}</span>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed">
              Platform marketplace & penyedia source code aplikasi web sekolah terlengkap di Indonesia. Siap pakai untuk jenjang TK, SD, SMP, SMA/SMK, hingga kustomisasi sistem pendidikan terintegrasi.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full Source Code Milik Sekolah · Garansi Support & Update</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Akses Cepat
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Katalog Aplikasi Web Sekolah
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsOrderTrackerOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cek Status Pesanan & Unduh
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCodeArchitectureOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Skema MySQL & Script PHP</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Dashboard Administrator
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Layanan & Bantuan
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>WA: +{settings.whatsapp_number}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{settings.contact_email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>{settings.office_address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 {settings.site_title}. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-1">
            Dibuat untuk memajukan digitalisasi ekosistem sekolah di seluruh Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
};
