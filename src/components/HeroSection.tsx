import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, MessageSquareCode, CheckCircle, Code2, Server, Award, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setIsConsultModalOpen, settings } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ekosistem Aplikasi Web Sekolah Modern 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              SOLUSI DIGITALISASI SEKOLAH TERBAIK
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Katalog source code aplikasi web sekolah siap pakai untuk jenjang <strong className="text-slate-900 font-semibold">TK, SD, SMP, SMA/SMK</strong>, serta layanan pengembangan sistem kustomisasi terintegrasi berbasis <strong className="text-slate-900 font-semibold">PHP & MySQL</strong> dengan garansi unduhan instan.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <MessageSquareCode className="w-4 h-4" />
                <span>Konsultasi Kustomisasi</span>
              </button>

              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all whitespace-nowrap shadow-xs"
              >
                <span>Jelajahi Aplikasi</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Trust Points */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">100% Source Code</span>
                  <span className="text-slate-500">Milik sekolah penuh</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">Tanpa Langganan</span>
                  <span className="text-slate-500">Sekali beli selamanya</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">Unduhan Instan</span>
                  <span className="text-slate-500">Akses token otomatis</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 block">Support Instalasi</span>
                  <span className="text-slate-500">Panduan cPanel & VPS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group">
              <img
                src="/src/assets/images/hero_school_digital_1793934197262.jpg"
                alt="Sistem Digitalisasi Sekolah Terintegrasi"
                className="w-full h-auto object-cover aspect-16/10 group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Siap Pakai & Kustomisasi</span>
                </div>
                <h2 className="text-lg font-bold tracking-tight text-white leading-snug">
                  Platform Terpadu Siswa, Guru & Manajemen
                </h2>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  Ditenagai arsitektur modular PHP 8.2, MySQL InnoDB, Tailwind CSS, dan Alpine.js yang ringan untuk server sekolah.
                </p>
              </div>
            </div>

            {/* Subtle floating feature pills */}
            <div className="absolute -bottom-4 -left-3 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-md text-xs font-medium text-slate-800">
              <Code2 className="w-4 h-4 text-indigo-600" />
              <span>Clean Code PHP & MySQL</span>
            </div>
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-md text-xs font-medium text-slate-800">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Kurikulum Merdeka Ready</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
