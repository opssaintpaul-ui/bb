import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Eye, ExternalLink, Check, Code, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, setIsConsultModalOpen } = useApp();
  const [imageError, setImageError] = useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  const isCustom = product.kategori === 'Kustom';

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden">
      {/* Visual Image Header */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        {!imageError && product.gambar ? (
          <img
            src={product.gambar}
            alt={product.nama}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-slate-100 text-slate-400">
            <Code className="w-10 h-10 mb-2 text-indigo-400/60" />
            <span className="text-xs font-medium text-slate-500 text-center">{product.nama}</span>
          </div>
        )}

        {/* Quiet Kicker Overlay */}
        <div className="absolute top-3 left-3">
          <div className="text-[11px] font-semibold text-slate-800 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
            Jenjang: {product.kategori}
          </div>
        </div>

        {product.popular && (
          <div className="absolute top-3 right-3">
            <div className="text-[11px] font-semibold text-indigo-700 bg-indigo-50/95 backdrop-blur-sm px-2.5 py-1 rounded-md border border-indigo-200 shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>Terpopuler</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Zero-Pill Clean Metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Kategori {product.kategori}</span>
          <span aria-hidden="true">·</span>
          <span>{product.versi || 'v1.0'}</span>
          <span aria-hidden="true">·</span>
          <span>PHP & MySQL</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => setSelectedProduct(product)}
          className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
        >
          {product.nama}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {product.deskripsi}
        </p>

        {/* Key Feature Highlights (Max 2) */}
        <ul className="space-y-1.5 pt-1 text-xs text-slate-600">
          {product.fitur.slice(0, 2).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="truncate">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Bottom Contiguous Price & Action Bar */}
        <div className="pt-3 border-t border-slate-100 mt-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Harga Source Code</span>
            <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
              {formatRupiah(product.harga)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setSelectedProduct(product)}
              title="Lihat Detail & Demo"
              aria-label="Lihat Detail & Demo"
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </button>

            {isCustom ? (
              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              >
                Konsultasi
              </button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Beli</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
