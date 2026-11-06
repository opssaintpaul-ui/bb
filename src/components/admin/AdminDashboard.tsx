import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Order, OrderItem, OrderStatus, WebsiteSettings } from '../../types';
import { ProductFormModal } from './ProductFormModal';
import { MYSQL_SCHEMA_SQL } from '../../data/databaseSql';
import {
  ShieldCheck,
  Package,
  ShoppingCart,
  Settings,
  Database,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  LogOut,
  Upload,
  Link as LinkIcon,
  Search,
  ExternalLink,
  DollarSign,
  Clock,
  Sparkles,
  Layers,
  Save,
  RefreshCw,
  Copy,
  Download,
  Image as ImageIcon
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdmin,
    adminUser,
    adminLogin,
    adminLogout,
    setCurrentView,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetDefaultProducts,
    orders,
    updateOrderStatus,
    deleteOrder,
    settings,
    updateSettings,
    resetDefaultSettings,
    showToast
  } = useApp();

  // Admin Login State
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('admin123');

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'transaksi' | 'produk' | 'pengaturan' | 'database'>('transaksi');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Order Filters
  const [orderFilter, setOrderFilter] = useState<'semua' | 'pending' | 'success' | 'rejected'>('semua');
  const [orderSearch, setOrderSearch] = useState('');
  const [previewProofOrder, setPreviewProofOrder] = useState<Order | null>(null);

  // Settings form state
  const [localSettings, setLocalSettings] = useState<WebsiteSettings>(settings);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  // Metrics
  const totalOmset = orders
    .filter((o: Order) => o.status === 'success')
    .reduce((sum: number, o: Order) => sum + o.total_bayar, 0);
  const totalPendingOrders = orders.filter((o: Order) => o.status === 'pending').length;
  const totalSuccessOrders = orders.filter((o: Order) => o.status === 'success').length;

  // Filtered Orders
  const filteredOrders = orders.filter((o: Order) => {
    const matchStatus = orderFilter === 'semua' || o.status === orderFilter;
    const q = orderSearch.toLowerCase().trim();
    const matchSearch =
      q === '' ||
      o.invoice_code.toLowerCase().includes(q) ||
      o.nama_pelanggan.toLowerCase().includes(q) ||
      o.nama_sekolah.toLowerCase().includes(q) ||
      o.no_wa.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  // Handle Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
  };

  // Handle Logo Upload via File
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLocalSettings((prev: WebsiteSettings) => ({ ...prev, logo_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle QRIS Upload via File
  const handleQrisUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLocalSettings((prev: WebsiteSettings) => ({ ...prev, qris_image_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Login Administrator</h2>
            <p className="text-xs text-slate-500">
              Kelola katalog aplikasi, verifikasi transaksi, unduhan, dan identitas website.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              adminLogin(usernameInput, passwordInput);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Username Admin
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="admin123"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 flex items-center justify-between">
              <span>Akun Default: <strong>admin</strong> / <strong>admin123</strong></span>
              <button
                type="button"
                onClick={() => {
                  setUsernameInput('admin');
                  setPasswordInput('admin123');
                }}
                className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                Isi Otomatis
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              Masuk ke Dashboard
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => setCurrentView('store')}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              &larr; Kembali ke Halaman Toko
            </button>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Bar / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dashboard Pengelolaan Penuh</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Panel Administrator EduStore
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Login sebagai <strong>{adminUser?.nama_lengkap}</strong> ({adminUser?.username})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('store')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
          >
            Lihat Tampilan Toko
          </button>
          <button
            onClick={adminLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Total Omset Sukses</span>
          <span className="text-xl font-bold font-mono text-emerald-700 tabular-nums block">
            {formatRupiah(totalOmset)}
          </span>
          <span className="text-[11px] text-slate-500">{totalSuccessOrders} transaksi lunas</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Pesanan Menunggu</span>
          <span className="text-xl font-bold font-mono text-amber-600 tabular-nums block">
            {totalPendingOrders} Pesanan
          </span>
          <span className="text-[11px] text-slate-500">Perlu cek bukti transfer</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Total Katalog Aplikasi</span>
          <span className="text-xl font-bold font-mono text-indigo-700 tabular-nums block">
            {products.length} Produk
          </span>
          <span className="text-[11px] text-slate-500">TK, SD, SMP, SMA, & Kustom</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Semua Transaksi</span>
          <span className="text-xl font-bold font-mono text-slate-900 tabular-nums block">
            {orders.length} Order
          </span>
          <span className="text-[11px] text-slate-500">Database MySQL Aktif</span>
        </div>
      </div>

      {/* Dashboard Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('transaksi')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'transaksi'
              ? 'border-indigo-600 text-indigo-600 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Verifikasi Transaksi & Unduhan</span>
          {totalPendingOrders > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-white">
              {totalPendingOrders}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('produk')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'produk'
              ? 'border-indigo-600 text-indigo-600 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Manajemen Produk & Link Download</span>
        </button>

        <button
          onClick={() => setActiveTab('pengaturan')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'pengaturan'
              ? 'border-indigo-600 text-indigo-600 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Pengaturan Website & Identitas</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'database'
              ? 'border-indigo-600 text-indigo-600 bg-white'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Skema MySQL & Export Data</span>
        </button>
      </div>

      {/* TAB 1: TRANSAKSI & VERIFIKASI */}
      {activeTab === 'transaksi' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
              {(['semua', 'pending', 'success', 'rejected'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors cursor-pointer ${
                    orderFilter === st
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st === 'semua' ? 'Semua Status' : st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Cari invoice / sekolah..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
              />
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3.5">Invoice & Tanggal</th>
                    <th className="p-3.5">Sekolah & Pemesan</th>
                    <th className="p-3.5">Aplikasi Dibeli</th>
                    <th className="p-3.5">Total Bayar</th>
                    <th className="p-3.5">Bukti Bayar</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Aksi Verifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((ord: Order) => (
                      <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="font-bold font-mono text-slate-900 block">
                            {ord.invoice_code}
                          </span>
                          <span className="text-[11px] text-slate-400">{ord.created_at}</span>
                        </td>

                        <td className="p-3.5">
                          <span className="font-bold text-slate-800 block">{ord.nama_sekolah}</span>
                          <span className="text-slate-600 block">{ord.nama_pelanggan}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{ord.no_wa}</span>
                        </td>

                        <td className="p-3.5">
                          <div className="space-y-0.5">
                            {ord.items.map((it: OrderItem) => (
                              <span key={it.id} className="block text-slate-700 truncate max-w-xs">
                                • {it.nama_produk}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          <span className="font-bold font-mono text-slate-900 block">
                            {formatRupiah(ord.total_bayar)}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {ord.metode_pembayaran === 'transfer_bank' ? 'Transfer Bank' : 'QRIS'}
                          </span>
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          {ord.bukti_transfer ? (
                            <button
                              onClick={() => setPreviewProofOrder(ord)}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Lihat Bukti</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400 italic">Belum diunggah</span>
                          )}
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          {ord.status === 'success' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3" />
                              SUKSES (Unduhan Aktif)
                            </span>
                          ) : ord.status === 'rejected' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                              <XCircle className="w-3 h-3" />
                              DITOLAK
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                              <Clock className="w-3 h-3" />
                              PENDING
                            </span>
                          )}
                        </td>

                        <td className="p-3.5 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {ord.status !== 'success' && (
                              <button
                                onClick={() => {
                                  updateOrderStatus(ord.id, 'success');
                                  showToast(`Pesanan ${ord.invoice_code} diverifikasi: Unduhan otomatis terbuka untuk pembeli!`);
                                }}
                                title="Verifikasi & Buka Akses Unduhan"
                                className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition-colors cursor-pointer"
                              >
                                Setujui (Sukses)
                              </button>
                            )}

                            {ord.status === 'pending' && (
                              <button
                                onClick={() => updateOrderStatus(ord.id, 'rejected')}
                                title="Tolak Bukti Transfer"
                                className="px-2 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                              >
                                Tolak
                              </button>
                            )}

                            <button
                              onClick={() => {
                                if (confirm(`Hapus transaksi ${ord.invoice_code}?`)) {
                                  deleteOrder(ord.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        Tidak ada transaksi pada filter ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAJEMEN PRODUK */}
      {activeTab === 'produk' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Katalog Produk Sekolah</h2>
              <p className="text-xs text-slate-500">
                Tambah, edit informasi, atur harga, dan konfigurasi tautan unduhan masing-masing aplikasi.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetDefaultProducts}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Aplikasi Baru</span>
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3.5">Aplikasi</th>
                    <th className="p-3.5">Jenjang</th>
                    <th className="p-3.5">Harga</th>
                    <th className="p-3.5">Link Download (Tujuan)</th>
                    <th className="p-3.5">Live Demo</th>
                    <th className="p-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p: Product) => (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.gambar}
                            alt={p.nama}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0 bg-slate-100"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{p.nama}</span>
                            <span className="text-[11px] text-slate-500 line-clamp-1 max-w-sm">
                              {p.deskripsi}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                          {p.kategori}
                        </span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap font-mono font-bold text-slate-900">
                        {formatRupiah(p.harga)}
                      </td>

                      <td className="p-3.5 max-w-xs truncate font-mono text-[11px] text-slate-600">
                        <a
                          href={p.link_download}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 hover:underline flex items-center gap-1"
                        >
                          <LinkIcon className="w-3 h-3 shrink-0" />
                          <span className="truncate">{p.link_download}</span>
                        </a>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        {p.demo_url ? (
                          <a
                            href={p.demo_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1"
                          >
                            <span>Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      <td className="p-3.5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsProductModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus produk ${p.nama}?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PENGATURAN WEBSITE (IDENTITAS DINAMIS) */}
      {activeTab === 'pengaturan' && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">Pengaturan Identitas & Pembayaran</h2>
              <p className="text-xs text-slate-500">
                Konfigurasi disimpan langsung ke database settings dan otomatis mengubah favicon, logo, WhatsApp, bank, dan QRIS.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetDefaultSettings}
                className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                Reset Default
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Konfigurasi</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: Brand & Identity */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Identitas Website (Logo, Favicon & Nama)</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Brand Website (site_title)
                </label>
                <input
                  type="text"
                  value={localSettings.site_title}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, site_title: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Slogan Branding (site_tagline)
                </label>
                <input
                  type="text"
                  value={localSettings.site_tagline}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, site_tagline: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Logo Website (URL atau Unggah Berkas)
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={localSettings.logo_url}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, logo_url: e.target.value })
                    }
                    placeholder="https://domain.com/logo.png"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Unggah Berkas Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Favicon URL (favicon_url)
                </label>
                <input
                  type="text"
                  value={localSettings.favicon_url}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, favicon_url: e.target.value })
                  }
                  placeholder="https://domain.com/favicon.ico"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gaya Latar Belakang Website (background_style)
                </label>
                <select
                  value={localSettings.background_style}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      background_style: e.target.value as any
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                >
                  <option value="clean_light">Clean Light (Abu-abu Bersih)</option>
                  <option value="subtle_grid">Subtle Grid (Pola Titik Halus)</option>
                  <option value="education_mesh">Education Mesh (Gradien Indigo-Emerald)</option>
                  <option value="custom_color">Warna Kustom</option>
                </select>
              </div>
            </div>

            {/* Box 2: WhatsApp & Rekening Bank & QRIS */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Pengaturan WhatsApp & Pembayaran Bank / QRIS</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor WhatsApp Konsultasi (Format Internasional: 628xxx)
                </label>
                <input
                  type="text"
                  value={localSettings.whatsapp_number}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, whatsapp_number: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Bank Utama
                  </label>
                  <input
                    type="text"
                    value={localSettings.bank_name}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, bank_name: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor Rekening
                  </label>
                  <input
                    type="text"
                    value={localSettings.bank_account_number}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        bank_account_number: e.target.value
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Atas Nama Rekening
                  </label>
                  <input
                    type="text"
                    value={localSettings.bank_account_holder}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        bank_account_holder: e.target.value
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gambar / Barcode QRIS Toko
                </label>
                <div className="flex items-center gap-3">
                  <img
                    src={localSettings.qris_image_url}
                    alt="QRIS Preview"
                    className="w-16 h-16 rounded-lg object-contain border border-slate-200 bg-slate-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={localSettings.qris_image_url}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          qris_image_url: e.target.value
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200"
                      placeholder="URL QRIS"
                    />
                    <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer">
                      <Upload className="w-3 h-3" />
                      <span>Ganti dengan upload gambar</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleQrisUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* TAB 4: DATABASE & EXPORT */}
      {activeTab === 'database' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-indigo-50/80 rounded-xl border border-indigo-100">
            <div>
              <h2 className="text-sm font-bold text-indigo-950">
                Skema Database MySQL Resmi & Pencadangan Data
              </h2>
              <p className="text-xs text-indigo-800">
                Tabel: settings, products, orders, order_items, users dengan index and constraint.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(MYSQL_SCHEMA_SQL);
                  showToast('File SQL berhasil disalin ke clipboard!');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin SQL</span>
              </button>

              <button
                onClick={() => {
                  const blob = new Blob([MYSQL_SCHEMA_SQL], { type: 'text/sql' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'database_edustore.sql';
                  a.click();
                  showToast('File database_edustore.sql berhasil diunduh!');
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh database.sql</span>
              </button>
            </div>
          </div>

          <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto max-h-96 leading-relaxed">
            <code>{MYSQL_SCHEMA_SQL}</code>
          </pre>
        </div>
      )}

      {/* Product Form Modal (Add / Edit) */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        product={editingProduct}
        onClose={() => {
          setIsProductModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={(data) => {
          if (editingProduct) {
            updateProduct(editingProduct.id, data);
          } else {
            addProduct(data);
          }
        }}
      />

      {/* Modal Preview Bukti Transfer */}
      {previewProofOrder && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Bukti Transfer: {previewProofOrder.invoice_code}
                </h4>
                <span className="text-xs text-slate-500">
                  {previewProofOrder.nama_sekolah} · Rp {previewProofOrder.total_bayar.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                onClick={() => setPreviewProofOrder(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
              {previewProofOrder.bukti_transfer ? (
                <img
                  src={previewProofOrder.bukti_transfer}
                  alt="Struk Transfer"
                  className="w-full max-h-80 object-contain mx-auto"
                />
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  Tidak ada berkas bukti
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setPreviewProofOrder(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Tutup
              </button>
              {previewProofOrder.status !== 'success' && (
                <button
                  onClick={() => {
                    updateOrderStatus(previewProofOrder.id, 'success');
                    setPreviewProofOrder(null);
                    showToast(`Pembayaran #${previewProofOrder.invoice_code} telah disetujui!`);
                  }}
                  className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                >
                  Setujui & Buka Akses Unduhan
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
