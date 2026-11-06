import React, { useState, useEffect } from 'react';
import { Product, ProductCategory } from '../../types';
import { X, Save, Image, Link as LinkIcon, Sparkles } from 'lucide-react';

interface ProductFormModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<Product, 'id'>) => void;
}

const CATEGORIES: ('TK' | 'SD' | 'SMP' | 'SMA' | 'Umum' | 'Kustom')[] = [
  'TK',
  'SD',
  'SMP',
  'SMA',
  'Umum',
  'Kustom'
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave
}) => {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState<number>(500000);
  const [kategori, setKategori] = useState<'TK' | 'SD' | 'SMP' | 'SMA' | 'Umum' | 'Kustom'>('SMA');
  const [gambar, setGambar] = useState('');
  const [linkDownload, setLinkDownload] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [fiturText, setFiturText] = useState('');
  const [techStackText, setTechStackText] = useState('');
  const [versi, setVersi] = useState('v1.0.0');

  useEffect(() => {
    if (product) {
      setNama(product.nama);
      setDeskripsi(product.deskripsi);
      setHarga(product.harga);
      setKategori(product.kategori);
      setGambar(product.gambar);
      setLinkDownload(product.link_download);
      setDemoUrl(product.demo_url || '');
      setFiturText(product.fitur.join('\n'));
      setTechStackText(product.tech_stack.join(', '));
      setVersi(product.versi || 'v1.0.0');
    } else {
      setNama('');
      setDeskripsi('');
      setHarga(750000);
      setKategori('SMA');
      setGambar('/src/assets/images/app_school_portal_1793934198218.jpg');
      setLinkDownload('https://drive.google.com/drive/folders/source-code-sekolah?usp=sharing');
      setDemoUrl('https://demo.sekolahdigital.id');
      setFiturText('Multi User Admin & Guru\nManajemen Data Terintegrasi\nEkspor Laporan Excel & PDF');
      setTechStackText('PHP 8.2, MySQL, Tailwind CSS, Alpine.js');
      setVersi('v1.0.0');
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fitur = fiturText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const tech_stack = techStackText
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onSave({
      nama,
      deskripsi,
      harga: Number(harga),
      kategori,
      gambar: gambar || '/src/assets/images/app_school_portal_1793934198218.jpg',
      link_download: linkDownload,
      demo_url: demoUrl,
      fitur,
      tech_stack,
      versi
    });
    onClose();
  };

  const handleSampleImage = (img: string) => {
    setGambar(img);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <h2 className="text-sm font-bold text-slate-900">
            {product ? 'Edit Aplikasi Web Sekolah' : 'Tambah Aplikasi Baru ke Katalog'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Aplikasi Web Sekolah *
              </label>
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Sistem Presensi Wajah & GPS Siswa"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kategori Jenjang *
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'Umum' ? 'Umum (Semua Jenjang)' : `Jenjang ${cat}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Harga Source Code (IDR) *
              </label>
              <input
                type="number"
                required
                min={0}
                step={50000}
                value={harga}
                onChange={(e) => setHarga(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL Link Unduhan Resmi (Google Drive / GitHub / ZIP Server) *
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  required
                  value={linkDownload}
                  onChange={(e) => setLinkDownload(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                * Tautan ini akan otomatis diberikan kepada pembeli setelah pembayaran terverifikasi.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL Live Demo (Opsional)
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://demo.sekolahdigital.id"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Versi Rilis Aplikasi
              </label>
              <input
                type="text"
                value={versi}
                onChange={(e) => setVersi(e.target.value)}
                placeholder="v3.2.0"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL Gambar / Screenshot Aplikasi
              </label>
              <input
                type="text"
                value={gambar}
                onChange={(e) => setGambar(e.target.value)}
                placeholder="/src/assets/images/app_school_portal_1793934198218.jpg"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                <span>Pilih cepat:</span>
                <button
                  type="button"
                  onClick={() => handleSampleImage('/src/assets/images/app_school_portal_1793934198218.jpg')}
                  className="text-indigo-600 hover:underline cursor-pointer"
                >
                  Portal Web
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => handleSampleImage('/src/assets/images/app_face_attendance_1793934199050.jpg')}
                  className="text-indigo-600 hover:underline cursor-pointer"
                >
                  Presensi Wajah
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => handleSampleImage('/src/assets/images/app_cbt_exam_1793934198999.jpg')}
                  className="text-indigo-600 hover:underline cursor-pointer"
                >
                  CBT Ujian
                </button>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Deskripsi Singkat Aplikasi
              </label>
              <textarea
                rows={3}
                required
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Jelaskan kegunaan dan keunggulan aplikasi..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Daftar Fitur Utama (Satu baris per fitur)
              </label>
              <textarea
                rows={3}
                value={fiturText}
                onChange={(e) => setFiturText(e.target.value)}
                placeholder="Contoh:&#10;Multi User Login&#10;Laporan Otomatis Excel&#10;Koneksi Database PDO"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono text-[11px]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Teknologi Stack (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={techStackText}
                onChange={(e) => setTechStackText(e.target.value)}
                placeholder="PHP 8.2, MySQL, Tailwind CSS, Alpine.js"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{product ? 'Simpan Perubahan' : 'Tambahkan Aplikasi'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
