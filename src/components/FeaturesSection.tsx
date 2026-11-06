import React from 'react';
import { ShieldCheck, Cpu, Code2, Headphones, DownloadCloud, FileCheck, Layers, Sparkles } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const benefits = [
    {
      icon: <Code2 className="w-5 h-5 text-indigo-600" />,
      title: 'Full Source Code 100% Milik Anda',
      description: 'Seluruh script PHP, query database MySQL, styling Tailwind CSS, dan asset disediakan lengkap tanpa enkripsi ionCube / obfuscator. Bebas dimodifikasi sepuasnya.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-600" />,
      title: 'Ringan & Hemat Resource Server',
      description: 'Dibangun dengan PHP Native & arsitektur MVC modern serta Alpine.js yang sangat ringan. Sangat lancar berjalan di shared hosting murah cPanel maupun VPS sekolah.'
    },
    {
      icon: <DownloadCloud className="w-5 h-5 text-indigo-600" />,
      title: 'Otomatisasi Unduhan Instan',
      description: 'Sistem terintegrasi dengan kode verifikasi transfer unik dan token download aman. Segera setelah pembayaran diverifikasi, tombol unduh file langsung aktif.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
      title: 'Keamanan Standar Industri (Anti-SQLi)',
      description: 'Menggunakan PDO Prepared Statements ketat dan sanitasi input anti-XSS, menjamin keamanan data NISN siswa, nilai rapor, dan privasi guru terjaga maksimal.'
    },
    {
      icon: <FileCheck className="w-5 h-5 text-indigo-600" />,
      title: 'Standar Kurikulum Merdeka & Dapodik',
      description: 'Format data siswa, modul capaian pembelajaran, penilaian rapor, hingga format pendaftaran PPDB disesuaikan dengan regulasi terbaru Kemdikbudristek.'
    },
    {
      icon: <Headphones className="w-5 h-5 text-indigo-600" />,
      title: 'Garansi & Bantuan Instalasi',
      description: 'Dilengkapi panduan instalasi langkah-demi-langkah berformat PDF dan video, plus dukungan tim teknis via WhatsApp untuk setup database dan domain sekolah.'
    }
  ];

  return (
    <section id="keunggulan" className="py-16 bg-slate-100/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Kualitas Teruji di 250+ Sekolah</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Mengapa Memilih Aplikasi dari EduStore?
          </h2>
          <p className="text-sm text-slate-600">
            Dibuat khusus untuk menjawab kebutuhan operasional nyata sekolah dari jenjang usia dini hingga sekolah menengah atas.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow duration-200 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
