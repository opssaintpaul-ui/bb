import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, ExternalLink, ShoppingBag, MessageSquare, Download, Layers, Server } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCheckoutOpen, setIsConsultModalOpen } = useApp();

  if (!selectedProduct) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  const isCustom = selectedProduct.kategori === 'Kustom';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Kategori: {selectedProduct.kategori}</span>
            <span aria-hidden="true">·</span>
            <span>Versi: {selectedProduct.versi || 'v1.0.0'}</span>
          </div>

          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Image Showcase */}
          <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
            <img
              src={selectedProduct.gambar}
              alt={selectedProduct.nama}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              {selectedProduct.demo_url && (
                <a
                  href={selectedProduct.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900/90 text-white backdrop-blur-sm hover:bg-slate-900 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Title & Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {selectedProduct.nama}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Lisensi Source Code Penuh · Garansi Instalasi Server Sekolah
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs text-slate-400 block font-medium">Harga Investasi</span>
              <span className="text-2xl font-extrabold text-indigo-700 font-mono tabular-nums">
                {formatRupiah(selectedProduct.harga)}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Deskripsi Sistem</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedProduct.deskripsi}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Fitur & Modul Utama</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedProduct.fitur.map((fitur, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{fitur}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Teknologi & Persyaratan Server</h4>
            <div className="flex flex-wrap items-center gap-2">
              {selectedProduct.tech_stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-400">
              * Kompatibel dengan semua shared hosting cPanel, Plesk, Cloud VPS (Ubuntu/Debian), dan XAMPP/Laragon lokal.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={() => setSelectedProduct(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            Tutup
          </button>

          {isCustom ? (
            <button
              onClick={() => {
                setSelectedProduct(null);
                setIsConsultModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Konsultasi Kustomisasi</span>
            </button>
          ) : (
            <button
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Tambah ke Keranjang</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
