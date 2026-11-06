import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Search, FileText, CheckCircle2, Clock, Download, AlertCircle } from 'lucide-react';
import { Order } from '../types';

export const OrderTrackerModal: React.FC = () => {
  const {
    isOrderTrackerOpen,
    setIsOrderTrackerOpen,
    findOrderByInvoice,
    findOrdersByPhoneOrEmail,
    setActiveInvoice,
    setIsInvoiceModalOpen,
    showToast
  } = useApp();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Order[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOrderTrackerOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      showToast('Masukkan kode invoice, email, atau nomor WhatsApp!', 'error');
      return;
    }

    const single = findOrderByInvoice(query);
    if (single) {
      setResults([single]);
    } else {
      const multiple = findOrdersByPhoneOrEmail(query);
      setResults(multiple);
    }
    setHasSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Lacak Status Pesanan & Akses Unduhan
            </h2>
          </div>
          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600">
            Masukkan <strong>Kode Invoice</strong> (contoh: <code>INV-202611-001</code>), <strong>Nomor WhatsApp</strong>, atau <strong>Nama Sekolah</strong> Anda:
          </p>

          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="INV-XXXXX atau 0812xxxxxx"
              className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
            >
              Cari Pesanan
            </button>
          </form>

          {/* Quick test suggestion */}
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span>Contoh transaksi coba:</span>
            <button
              type="button"
              onClick={() => {
                setQuery('INV-202611-001');
              }}
              className="text-indigo-600 hover:underline font-mono"
            >
              INV-202611-001 (Sukses)
            </button>
            <span>atau</span>
            <button
              type="button"
              onClick={() => {
                setQuery('INV-202611-002');
              }}
              className="text-indigo-600 hover:underline font-mono"
            >
              INV-202611-002 (Pending)
            </button>
          </div>

          {/* Search Results */}
          {hasSearched && (
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Hasil Pencarian ({results.length})
              </h3>

              {results.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {results.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-300 transition-all flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-mono text-slate-900">
                            {ord.invoice_code}
                          </span>
                          {ord.status === 'success' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3" />
                              Lunas / Siap Unduh
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
                              <Clock className="w-3 h-3" />
                              Menunggu Verifikasi
                            </span>
                          )}
                        </div>
                        <span className="text-slate-600 block mt-0.5">
                          {ord.nama_sekolah} · {ord.nama_pelanggan}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {ord.items.length} Aplikasi · Rp {ord.total_bayar.toLocaleString('id-ID')}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setActiveInvoice(ord);
                          setIsOrderTrackerOpen(false);
                          setIsInvoiceModalOpen(true);
                        }}
                        className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer shrink-0"
                      >
                        Buka Detail
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-slate-400 text-xs">
                  <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <span>Tidak ditemukan pesanan dengan data tersebut.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
