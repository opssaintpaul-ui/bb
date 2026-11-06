import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';
import { X, CreditCard, QrCode, ShieldCheck, School, User, Mail, Phone, ArrowRight, Info } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    createOrder,
    settings,
    showToast
  } = useApp();

  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [email, setEmail] = useState('');
  const [noWa, setNoWa] = useState('');
  const [namaSekolah, setNamaSekolah] = useState('');
  const [catatan, setCatatan] = useState('');
  const [metodePembayaran, setMetodePembayaran] = useState<PaymentMethod>('transfer_bank');
  const [pilihanBank, setPilihanBank] = useState(`${settings.bank_name} - ${settings.bank_account_number}`);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen || cart.length === 0) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaPelanggan.trim() || !email.trim() || !noWa.trim() || !namaSekolah.trim()) {
      showToast('Harap lengkapi semua kolom wajib!', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      createOrder({
        nama_pelanggan: namaPelanggan.trim(),
        email: email.trim(),
        no_wa: noWa.trim(),
        nama_sekolah: namaSekolah.trim(),
        metode_pembayaran: metodePembayaran,
        bank_tujuan: metodePembayaran === 'transfer_bank' ? pilihanBank : undefined,
        catatan: catatan.trim()
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Formulir Checkout & Data Lisensi</h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Order Summary Snapshot */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Ringkasan Pesanan ({cart.length} Aplikasi)
            </span>
            <div className="divide-y divide-slate-200/60 text-xs">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800">{item.product.nama}</span>
                    <span className="text-slate-500 block text-[11px]">Jenjang {item.product.kategori} (Qty: {item.quantity})</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {formatRupiah(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer & School Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Data Pemesan & Instansi Sekolah
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Pemesan *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={namaPelanggan}
                    onChange={(e) => setNamaPelanggan(e.target.value)}
                    placeholder="Contoh: Budi Prasetyo, S.Pd"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Sekolah / Yayasan *
                </label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={namaSekolah}
                    onChange={(e) => setNamaSekolah(e.target.value)}
                    placeholder="Contoh: SMA Negeri 1 Bandung"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Aktif (Pengiriman Lisensi) *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@sekolah.sch.id"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  No. WhatsApp Aktif *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={noWa}
                    onChange={(e) => setNoWa(e.target.value)}
                    placeholder="081234567890"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                rows={2}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                placeholder="Catatan khusus instalasi server, spesifikasi hosting, dll."
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Pilih Metode Pembayaran
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: Transfer Bank */}
              <label
                className={`relative flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  metodePembayaran === 'transfer_bank'
                    ? 'border-indigo-600 bg-indigo-50/40 text-slate-900 shadow-xs ring-1 ring-indigo-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="transfer_bank"
                  checked={metodePembayaran === 'transfer_bank'}
                  onChange={() => setMetodePembayaran('transfer_bank')}
                  className="sr-only"
                />
                <CreditCard className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block text-slate-900">Transfer Bank Otomatis</span>
                  <span className="text-[11px] text-slate-500">BCA, Mandiri (Verifikasi Kode Unik)</span>
                </div>
              </label>

              {/* Option 2: QRIS */}
              <label
                className={`relative flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  metodePembayaran === 'qris'
                    ? 'border-indigo-600 bg-indigo-50/40 text-slate-900 shadow-xs ring-1 ring-indigo-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="qris"
                  checked={metodePembayaran === 'qris'}
                  onChange={() => setMetodePembayaran('qris')}
                  className="sr-only"
                />
                <QrCode className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold block text-slate-900">QRIS Instan All-Payment</span>
                  <span className="text-[11px] text-slate-500">BCA Mobile, GoPay, OVO, Dana, LinkAja</span>
                </div>
              </label>
            </div>

            {metodePembayaran === 'transfer_bank' && (
              <div className="mt-3">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Pilih Rekening Tujuan:
                </label>
                <select
                  value={pilihanBank}
                  onChange={(e) => setPilihanBank(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                >
                  <option value={`${settings.bank_name} - ${settings.bank_account_number}`}>
                    {settings.bank_name} ({settings.bank_account_number}) a.n {settings.bank_account_holder}
                  </option>
                  {settings.secondary_bank_name && (
                    <option value={`${settings.secondary_bank_name} - ${settings.secondary_bank_account}`}>
                      {settings.secondary_bank_name} ({settings.secondary_bank_account}) a.n {settings.secondary_bank_holder}
                    </option>
                  )}
                </select>
              </div>
            )}

            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-800">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Sistem akan menambahkan <strong>3 digit kode unik acak</strong> pada nominal pembayaran agar transaksi dapat diverifikasi secara otomatis dan cepat.
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Total Tagihan Sementara</span>
              <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {formatRupiah(cartTotal)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Memproses...' : 'Buat Pesanan & Bayar'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
