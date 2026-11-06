import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../types';
import { Search, Filter, Layers, RefreshCw } from 'lucide-react';

const CATEGORIES: ProductCategory[] = ['Semua', 'TK', 'SD', 'SMP', 'SMA', 'Umum', 'Kustom'];

export const ProductCatalog: React.FC = () => {
  const { products, resetDefaultProducts } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchCategory =
        selectedCategory === 'Semua' || prod.kategori === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        query === '' ||
        prod.nama.toLowerCase().includes(query) ||
        prod.deskripsi.toLowerCase().includes(query) ||
        prod.kategori.toLowerCase().includes(query) ||
        prod.fitur.some((f) => f.toLowerCase().includes(query));

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="katalog" className="py-12 lg:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wider uppercase mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Katalog Resmi 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pilihan Aplikasi Web Sekolah Terpadu
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Source code lengkap, database MySQL, dan modul siap pasang di server sekolah.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari aplikasi atau fitur..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Interactive Category Segmented Control (Allowed per §1.A for filter buttons) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl overflow-x-auto no-scrollbar mb-8 border border-slate-200/60">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat === 'Semua' ? 'Semua Jenjang' : `Jenjang ${cat}`}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200/80 p-8">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Tidak ada aplikasi yang cocok</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Coba ubah kata kunci pencarian atau ganti filter kategori jenjang sekolah di atas.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
              }}
              className="px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filter
            </button>
            <button
              onClick={resetDefaultProducts}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Muat Data Standar</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
