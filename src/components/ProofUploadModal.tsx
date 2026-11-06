import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Upload, Image, Check, AlertCircle } from 'lucide-react';

export const ProofUploadModal: React.FC = () => {
  const {
    isProofModalOpen,
    setIsProofModalOpen,
    activeInvoice,
    uploadTransferProof,
    showToast
  } = useApp();

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    activeInvoice?.bukti_transfer || null
  );
  const [isUploading, setIsUploading] = useState(false);

  if (!isProofModalOpen || !activeInvoice) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Ukuran berkas maksimal 5MB!', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseSampleReceipt = () => {
    // High-quality mock bank transfer receipt image
    const sample = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80';
    setPreviewUrl(sample);
    showToast('Contoh struk bukti transfer terpasang.');
  };

  const handleSave = () => {
    if (!previewUrl) {
      showToast('Pilih gambar bukti transfer terlebih dahulu!', 'error');
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      uploadTransferProof(activeInvoice.invoice_code, previewUrl);
      setIsUploading(false);
      setIsProofModalOpen(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">
              Unggah Bukti Pembayaran: {activeInvoice.invoice_code}
            </h2>
          </div>
          <button
            onClick={() => setIsProofModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600">
            Unggah foto screenshot atau struk ATM bukti transfer sejumlah{' '}
            <strong className="text-indigo-700 font-mono">
              Rp {activeInvoice.total_bayar.toLocaleString('id-ID')}
            </strong>.
          </p>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors bg-slate-50/50">
            {previewUrl ? (
              <div className="space-y-3">
                <img
                  src={previewUrl}
                  alt="Bukti Transfer"
                  className="max-h-60 mx-auto rounded-lg border border-slate-200 object-contain shadow-xs"
                />
                <label className="inline-block text-xs text-indigo-600 font-semibold cursor-pointer hover:underline">
                  Ganti Gambar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <Image className="w-10 h-10 text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-slate-700 block">
                  Klik untuk Memilih Foto Bukti Transfer
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  Format JPG, PNG, atau WEBP (Maksimal 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
            )}
          </div>

          {/* Preset Helper for instant testing */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-500">Uji coba cepat tanpa file?</span>
            <button
              type="button"
              onClick={handleUseSampleReceipt}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              Gunakan Contoh Struk
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={() => setIsProofModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={!previewUrl || isUploading}
            className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isUploading ? 'Menyimpan...' : 'Kirim Bukti Pembayaran'}
          </button>
        </div>

      </div>
    </div>
  );
};
