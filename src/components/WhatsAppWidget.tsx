import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X, Send, School, User, Phone, Sparkles } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const { settings, isConsultModalOpen, setIsConsultModalOpen } = useApp();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [nama, setNama] = useState('');
  const [sekolah, setSekolah] = useState('');
  const [pesan, setPesan] = useState('');

  const handleDirectWA = () => {
    const text = encodeURIComponent(
      settings.whatsapp_default_message ||
        'Halo Tim EduStore, saya ingin konsultasi sistem aplikasi web sekolah.'
    );
    window.open(`https://wa.me/${settings.whatsapp_number}?text=${text}`, '_blank');
  };

  const handleSendCustomWA = (e: React.FormEvent) => {
    e.preventDefault();
    const compiledMessage = `Halo Tim EduStore,\n\nNama: ${nama || '-'}\nInstansi/Sekolah: ${sekolah || '-'}\n\nKebutuhan:\n${pesan || 'Konsultasi pengembangan aplikasi web sekolah.'}\n\nMohon info dan rekomendasinya. Terima kasih!`;
    const encoded = encodeURIComponent(compiledMessage);
    window.open(`https://wa.me/${settings.whatsapp_number}?text=${encoded}`, '_blank');
    setIsOpenPopup(false);
    setIsConsultModalOpen(false);
  };

  return (
    <>
      {/* Floating Button in Bottom-Right Corner */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end select-none">
        {/* Floating Tooltip / Teaser Badge */}
        {!isOpenPopup && (
          <div
            onClick={() => setIsOpenPopup(true)}
            className="mb-2 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-md text-xs font-semibold text-slate-800 hover:text-emerald-700 transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Konsultasi Kustomisasi</span>
          </div>
        )}

        {/* WhatsApp Icon Button */}
        <button
          onClick={() => setIsOpenPopup(!isOpenPopup)}
          aria-label="Konsultasi WhatsApp Admin"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-600/30 transition-all duration-300 transform hover:scale-105 cursor-pointer focus:outline-hidden"
        >
          {isOpenPopup ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}

          {/* Online status indicator */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full"></span>
        </button>
      </div>

      {/* Interactive Quick Chat Modal / Popover */}
      {(isOpenPopup || isConsultModalOpen) && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Konsultasi Kustomisasi Sekolah</h4>
                <span className="text-[10px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                  Admin EduStore Siap Membantu
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpenPopup(false);
                setIsConsultModalOpen(false);
              }}
              className="text-white/80 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSendCustomWA} className="p-4 space-y-3 bg-slate-50/50">
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Pesan khusus untuk jenjang TK, SD, SMP, SMA, Pesantren, atau integrasi aplikasi yayasan.
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Nama Anda
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Lengkap"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Nama Sekolah / Instansi
              </label>
              <input
                type="text"
                value={sekolah}
                onChange={(e) => setSekolah(e.target.value)}
                placeholder="Nama Sekolah"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Kebutuhan Aplikasi / Fitur
              </label>
              <textarea
                rows={2}
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Contoh: Butuh web profil sekolah + modul PPDB online kustom..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Mulai Chat via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleDirectWA}
                className="w-full py-1.5 text-[11px] text-slate-500 hover:text-emerald-700 transition-colors text-center cursor-pointer block"
              >
                Chat Langsung Tanpa Isi Form &rarr;
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
