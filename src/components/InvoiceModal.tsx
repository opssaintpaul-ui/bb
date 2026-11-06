import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Copy,
  Check,
  Upload,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  QrCode,
  CreditCard,
  ExternalLink,
  Sparkles,
  FileText
} from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const {
    activeInvoice,
    setActiveInvoice,
    isInvoiceModalOpen,
    setIsInvoiceModalOpen,
    setIsProofModalOpen,
    updateOrderStatus,
    settings,
    showToast
  } = useApp();

  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isInvoiceModalOpen || !activeInvoice) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`${fieldName} berhasil disalin ke clipboard!`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const isSuccess = activeInvoice.status === 'success';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                Invoice Resmi: {activeInvoice.invoice_code}
              </h2>
              <span className="text-[11px] text-slate-500">
                Diterbitkan pada {activeInvoice.created_at}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsInvoiceModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Status Banner */}
          {isSuccess ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-emerald-900 block text-sm">
                  Pembayaran Terverifikasi & Sukses!
                </span>
                <p className="text-emerald-700 mt-0.5">
                  Terima kasih! Lisensi dan tautan unduhan source code aplikasi Anda telah dibuka secara otomatis di bawah ini.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 block text-sm">
                    Menunggu Pembayaran
                  </span>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Status: PENDING
                  </span>
                </div>
                <p className="text-amber-800 mt-1">
                  Mohon transfer tepat sampai 3 digit terakhir untuk verifikasi otomatis sistem.
                </p>
              </div>
            </div>
          )}

          {/* Amount to Pay Spotlight */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-md relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div>
                <span className="text-xs text-indigo-200 block uppercase tracking-wider font-semibold">
                  Nominal yang Harus Dibayar
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-white tabular-nums">
                    {formatRupiah(activeInvoice.total_bayar)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(activeInvoice.total_bayar.toString(), 'Nominal Transfer')}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Salin Nominal"
                  >
                    {copiedField === 'Nominal Transfer' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-indigo-200" />
                    )}
                  </button>
                </div>
                <span className="text-[11px] text-indigo-300 block mt-1">
                  * Termasuk 3 digit kode unik verifikasi: <strong className="text-amber-300 font-mono">+{activeInvoice.kode_unik}</strong>
                </span>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-xs text-indigo-200 block">Metode Pembayaran</span>
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  {activeInvoice.metode_pembayaran === 'transfer_bank' ? 'Transfer Bank' : 'QRIS Digital'}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Destination Details (Bank or QRIS) */}
          {!isSuccess && (
            <div className="space-y-4">
              {activeInvoice.metode_pembayaran === 'transfer_bank' ? (
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <span>Rekening Tujuan Transfer</span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 block">Bank Mandiri / BCA</span>
                      <span className="text-base font-extrabold font-mono text-slate-900 tracking-wider">
                        {settings.bank_account_number}
                      </span>
                      <span className="text-xs text-slate-600 block mt-0.5">
                        a.n {settings.bank_account_holder}
                      </span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(settings.bank_account_number.replace(/[^0-9]/g, ''), 'Nomor Rekening')}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      {copiedField === 'Nomor Rekening' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                    <QrCode className="w-4 h-4 text-indigo-600" />
                    <span>Kode QRIS Resmi EduStore</span>
                  </div>

                  <div className="inline-block p-3 bg-white rounded-xl border border-slate-200 shadow-xs mx-auto">
                    <img
                      src={settings.qris_image_url}
                      alt="QRIS Pembayaran"
                      className="w-48 h-48 object-contain mx-auto"
                      referrerPolicy="no-referrer"
                    />
                    <div className="mt-2 text-xs text-slate-700 font-semibold">
                      {settings.qris_merchant_name}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      NMID: {settings.qris_nmid}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    Buka BCA Mobile, GoPay, OVO, Dana, LinkAja, atau ShopeePay lalu scan QRIS di atas.
                  </p>
                </div>
              )}

              {/* Upload Proof Prompt */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <div className="text-xs text-indigo-950">
                  <span className="font-bold block">Sudah Selesai Melakukan Transfer?</span>
                  <span className="text-indigo-700">Unggah bukti bayar Anda untuk diverifikasi oleh admin.</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsProofModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{activeInvoice.bukti_transfer ? 'Ubah Bukti Bayar' : 'Unggah Bukti Bayar'}</span>
                  </button>
                </div>
              </div>

              {/* Simulator Action for Instant Demo Testing */}
              <div className="p-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Mode Pengujian: Ingin langsung menguji sistem unduhan?</span>
                </div>
                <button
                  onClick={() => {
                    updateOrderStatus(activeInvoice.id, 'success');
                    showToast('Simulasi Berhasil: Status pesanan otomatis diubah menjadi SUKSES!');
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors cursor-pointer"
                >
                  Simulasikan Bayar Sukses
                </button>
              </div>
            </div>
          )}

          {/* AUTOMATED DOWNLOAD SECTION (Only unlocked when status === 'success') */}
          {isSuccess && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Akses Unduhan Source Code Aplikasi Anda</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-500">
                  Token: {activeInvoice.download_token.substring(0, 14)}...
                </span>
              </div>

              <div className="divide-y divide-slate-200 border border-emerald-200 rounded-xl overflow-hidden bg-white shadow-xs">
                {activeInvoice.items.map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/20">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {item.nama_produk}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Lisensi Resmi Institusi: {activeInvoice.nama_sekolah}
                      </span>
                    </div>

                    <a
                      href={item.link_download || 'https://drive.google.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition-colors cursor-pointer shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh Aplikasi Sekarang</span>
                    </a>
                  </div>
                ))}
              </div>

              {/* Secret Token & Verification Proof Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Token Akses Unduhan Permanen:</span>
                  <button
                    onClick={() => copyToClipboard(activeInvoice.download_token, 'Token Unduhan')}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                  >
                    {copiedField === 'Token Unduhan' ? 'Tersalin' : 'Salin Token'}
                  </button>
                </div>
                <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-slate-800 break-all select-all">
                  {activeInvoice.download_token}
                </div>
                <p className="text-[11px] text-slate-500">
                  Simpan invoice code atau token ini. Anda dapat mengunduh ulang source code kapan saja melalui menu <strong>Cek Status & Unduh</strong> di navigasi atas.
                </p>
              </div>
            </div>
          )}

          {/* Customer & Institution Info Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
            <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
              Tujuan Pengiriman & Identitas Pemesan
            </span>
            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <div>
                <span className="text-slate-400 block text-[11px]">Nama Pemesan:</span>
                <span className="font-medium text-slate-800">{activeInvoice.nama_pelanggan}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Instansi Sekolah:</span>
                <span className="font-medium text-slate-800">{activeInvoice.nama_sekolah}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">WhatsApp:</span>
                <span className="font-medium text-slate-800">{activeInvoice.no_wa}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Email:</span>
                <span className="font-medium text-slate-800">{activeInvoice.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            Butuh bantuan? Hubungi WhatsApp Admin di pojok kanan bawah.
          </span>
          <button
            onClick={() => setIsInvoiceModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
          >
            Tutup Invoice
          </button>
        </div>

      </div>
    </div>
  );
};
