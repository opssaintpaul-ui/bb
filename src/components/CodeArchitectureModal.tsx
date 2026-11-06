import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MYSQL_SCHEMA_SQL } from '../data/databaseSql';
import { PHP_PROJECT_FILES } from '../data/phpSourceCode';
import {
  X,
  Database,
  Code2,
  FolderTree,
  ShieldCheck,
  Copy,
  Check,
  Download,
  FileCode,
  Terminal,
  ExternalLink,
  HelpCircle,
  Server,
  AlertTriangle
} from 'lucide-react';

export const CodeArchitectureModal: React.FC = () => {
  const { isCodeArchitectureOpen, setIsCodeArchitectureOpen, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'sql' | 'folder' | 'php' | 'security' | 'hosting'>('hosting');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isCodeArchitectureOpen) return null;

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast(`${label} berhasil disalin ke clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const downloadSqlFile = () => {
    const blob = new Blob([MYSQL_SCHEMA_SQL], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'database_edustore_sekolah.sql');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('File database_edustore_sekolah.sql berhasil diunduh!');
  };

  const folderStructureTree = `
project-edustore/
├── app/
│   ├── Controllers/
│   │   ├── AuthController.php          # Login admin & session secure
│   │   ├── OrderController.php         # Transaksi, unik kode & verifikasi
│   │   ├── ProductController.php       # CRUD produk & kategori sekolah
│   │   └── SettingController.php       # Identitas dinamis (logo, favicon, bank)
│   ├── Middleware/
│   │   └── AuthMiddleware.php          # Proteksi session admin
│   └── Models/
│       ├── Order.php
│       ├── Product.php
│       └── Setting.php
├── config/
│   ├── database.php                    # Koneksi PDO (Anti SQL Injection)
│   └── app.php                         # URL & konfigurasi global
├── database/
│   ├── database.sql                    # Skema lengkap MySQL & Seeding
│   └── migrations/
├── public/
│   ├── assets/
│   │   ├── css/ (Tailwind CSS output)
│   │   ├── js/  (Alpine.js bundle)
│   │   └── images/
│   ├── uploads/
│   │   ├── bukti/                      # Direktori upload bukti transfer
│   │   └── settings/                   # Upload logo, favicon, qris
│   ├── download.php                    # Gerbang download aman berbasis token
│   ├── index.php                       # Entry point aplikasi
│   └── .htaccess                       # URL rewriting & security headers
├── views/
│   ├── admin/
│   │   ├── dashboard.php
│   │   ├── products.php
│   │   ├── orders.php
│   │   └── settings.php
│   ├── components/
│   │   ├── navbar.php
│   │   ├── footer.php
│   │   └── whatsapp_widget.php
│   └── store/
│       ├── index.php
│       ├── checkout.php
│       └── invoice.php
├── .env.example
├── composer.json
└── README.md
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                Arsitektur Backend PHP, MySQL & Keamanan Sistem
              </h2>
              <span className="text-[11px] text-slate-500">
                Skema Database Produksi & Source Code Modular Siap Deploy
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCodeArchitectureOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-200 bg-slate-50/40 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('sql')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'sql'
                ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Skema MySQL (database.sql)</span>
          </button>

          <button
            onClick={() => setActiveTab('folder')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'folder'
                ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Struktur Folder Proyek</span>
          </button>

          <button
            onClick={() => setActiveTab('php')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'php'
                ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Script PHP Modular</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Standar Keamanan</span>
          </button>

          <button
            onClick={() => setActiveTab('hosting')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hosting'
                ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-amber-500" />
            <span>Panduan Upload Hosting & Solusi Error</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* TAB 1: MySQL Schema */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <div className="text-xs text-indigo-950">
                  <span className="font-bold block">Skema 5 Tabel Relasional MySQL:</span>
                  <span className="text-indigo-700">
                    settings, products, orders, order_items, users (InnoDB, UTF8mb4, Indexing)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyText(MYSQL_SCHEMA_SQL, 'Skema SQL')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                  >
                    {copiedKey === 'Skema SQL' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Salin SQL</span>
                  </button>

                  <button
                    onClick={downloadSqlFile}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh .sql</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
                <code>{MYSQL_SCHEMA_SQL}</code>
              </pre>
            </div>
          )}

          {/* TAB 2: Folder Structure */}
          {activeTab === 'folder' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Struktur folder MVC PHP / Laravel modular:</span>
                <button
                  onClick={() => copyText(folderStructureTree, 'Struktur Folder')}
                  className="flex items-center gap-1 text-indigo-600 hover:underline font-semibold cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Salin Pohon Folder</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-900 text-emerald-300 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
                <code>{folderStructureTree}</code>
              </pre>
            </div>
          )}

          {/* TAB 3: PHP Modular Source Code */}
          {activeTab === 'php' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
                {PHP_PROJECT_FILES.map((file, idx) => (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFileIndex(idx)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      selectedFileIndex === idx
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {file.path.split('/').pop()}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    {PHP_PROJECT_FILES[selectedFileIndex].path}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {PHP_PROJECT_FILES[selectedFileIndex].description}
                  </span>
                </div>

                <button
                  onClick={() =>
                    copyText(
                      PHP_PROJECT_FILES[selectedFileIndex].code,
                      PHP_PROJECT_FILES[selectedFileIndex].path
                    )
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Kode File Ini</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
                <code>{PHP_PROJECT_FILES[selectedFileIndex].code}</code>
              </pre>
            </div>
          )}

          {/* TAB 4: Security Features */}
          {activeTab === 'security' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Proteksi SQL Injection (100% Parameterized)</span>
                  </h4>
                  <p>
                    Seluruh query database menggunakan PDO dengan <code>PDO::ATTR_EMULATE_PREPARES =&gt; false</code>. Parameter query dilewatkan secara terpisah via <code>prepare()</code> dan <code>execute([$param])</code>, mencegah teknik manipulasi tanda kutip dan injeksi SQL.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Proteksi Cross-Site Scripting (Anti-XSS)</span>
                  </h4>
                  <p>
                    Semua data masukan pengguna disaring menggunakan <code>htmlspecialchars(strip_tags(), ENT_QUOTES, 'UTF-8')</code> sebelum disimpan atau ditampilkan kembali ke halaman web.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Tokenized Automated Download Access</span>
                  </h4>
                  <p>
                    Tautan Google Drive / ZIP file tidak pernah dibocorkan langsung ke publik. Pembeli hanya mendapatkan token unik 48 karakter terenkripsi. File hanya dapat diunduh jika status order di database adalah <code>'success'</code>.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Validasi Berkas & Upload Bukti Bayar</span>
                  </h4>
                  <p>
                    Unggah bukti pembayaran diverifikasi melalui pengecekan MIME type fisik server (<code>mime_content_type()</code>), bukan hanya ekstensi nama file, dibatasi maksimal 5MB dan disimpan di luar root eksekusi skrip PHP.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PANDUAN UPLOAD HOSTING & SOLUSI ERROR */}
          {activeTab === 'hosting' && (
            <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
              {/* Alert Explanation Box */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Kenapa Muncul Keterangan: "Pilih Framework yang Kompatibel"?</span>
                </div>
                <p>
                  Keterangan ini muncul karena platform hosting Anda (seperti <strong>Vercel, Netlify, Cloudflare Pages, Hostinger Application, atau cPanel Node.js Selector</strong>) mendeteksi adanya file <code>package.json</code> dan meminta Anda menentukan preset framework aplikasi web.
                </p>
                <div className="p-3 bg-white/80 rounded-lg border border-amber-200 text-xs">
                  <span className="font-bold text-indigo-900 block mb-1">
                    👉 Jawaban / Pilihan yang Tepat:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-800">
                    <li>Pilih Framework Preset: <strong className="text-indigo-700 font-mono bg-indigo-50 px-1.5 py-0.5 rounded">Vite</strong></li>
                    <li>Build Command: <code className="font-mono bg-slate-100 px-1 rounded">npm run build</code></li>
                    <li>Output Directory: <code className="font-mono bg-slate-100 px-1 rounded">dist</code></li>
                    <li>Install Command: <code className="font-mono bg-slate-100 px-1 rounded">npm install</code></li>
                  </ul>
                </div>
              </div>

              {/* 3 Step-by-Step Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Method 1: cPanel Shared Hosting Biasa */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold">
                    <Server className="w-4 h-4" />
                    <span className="text-sm">Cara 1: Upload ke cPanel / Shared Hosting Biasa</span>
                  </div>
                  <p className="text-slate-600">
                    <strong>PENTING:</strong> Jangan upload seluruh folder project mentah (yang berisi file <code>.tsx</code>, <code>src/</code>, <code>package.json</code>) langsung ke <code>public_html</code>, karena server Apache biasa tidak bisa membaca file TypeScript mentah.
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-700 font-medium">
                    <li>Jalankan perintah build di komputer/terminal:
                      <pre className="mt-1 p-2 bg-slate-900 text-emerald-400 rounded-md font-mono text-[11px]">npm run build</pre>
                    </li>
                    <li>Akan tercipta folder bernama <strong>dist/</strong>.</li>
                    <li>Buka folder <strong>dist/</strong> tersebut, lalu kompresi seluruh isinya (termasuk <code>index.html</code>, folder <code>assets/</code>, dan file <code>.htaccess</code>) menjadi file <strong>dist.zip</strong>.</li>
                    <li>Buka File Manager cPanel &rarr; masuk ke folder <strong>public_html</strong> &rarr; Upload dan Extract file <strong>dist.zip</strong>.</li>
                    <li>Selesai! Website langsung aktif di domain Anda tanpa error.</li>
                  </ol>
                </div>

                {/* Method 2: Vercel / Netlify / Hostinger */}
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold">
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-sm">Cara 2: Deploy ke Vercel / Netlify / Cloudflare</span>
                  </div>
                  <p className="text-slate-600">
                    Jika Anda menghubungkan repository GitHub ke Vercel atau Netlify:
                  </p>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-700 font-medium">
                    <li>Di layar konfigurasi project, cari menu <strong>Framework Preset</strong>.</li>
                    <li>Pilih <strong>Vite</strong> dari daftar dropdown.</li>
                    <li>Konfigurasi otomatis:
                      <div className="mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-mono text-slate-700 space-y-0.5">
                        <div>FRAMEWORK: Vite</div>
                        <div>BUILD COMMAND: npm run build</div>
                        <div>OUTPUT DIRECTORY: dist</div>
                      </div>
                    </li>
                    <li>Klik <strong>Deploy</strong>. Sistem telah menyertakan file <code>vercel.json</code> dan <code>_redirects</code> sehingga routing otomatis aktif.</li>
                  </ol>
                </div>

                {/* Method 3: Setup Backend PHP & MySQL */}
                <div className="md:col-span-2 p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Database className="w-4 h-4 text-emerald-600" />
                    <span>Cara 3: Konfigurasi Database MySQL & Backend PHP di cPanel</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                      <span className="font-bold text-indigo-700 block">1. Buat Database</span>
                      <p className="text-slate-600">
                        Buka cPanel &rarr; <strong>MySQL Database Wizard</strong>, buat database baru dan user database dengan hak akses penuh (All Privileges).
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                      <span className="font-bold text-indigo-700 block">2. Import database.sql</span>
                      <p className="text-slate-600">
                        Buka <strong>phpMyAdmin</strong>, pilih database yang dibuat, lalu klik tab <strong>Import</strong> dan pilih file <code>database_edustore_sekolah.sql</code> (unduh di Tab 1).
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                      <span className="font-bold text-indigo-700 block">3. Hubungkan config</span>
                      <p className="text-slate-600">
                        Buka file <code>config/database.php</code>, sesuaikan nama database, username, dan password database cPanel Anda.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Kompatibel dengan PHP 8.1+, MySQL 8.0, Apache/Nginx, dan cPanel.
          </span>
          <button
            onClick={() => setIsCodeArchitectureOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
