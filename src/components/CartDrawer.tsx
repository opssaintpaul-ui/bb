import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
    clearCart
  } = useApp();

  if (!isCartOpen) return null;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Keranjang Belanja"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Keranjang Belanja</h2>
              <span className="text-xs font-semibold text-slate-500 tabular-nums">
                ({cartCount} item)
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-slate-100">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <img
                    src={item.product.gambar}
                    alt={item.product.nama}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-100"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-indigo-600 block mb-0.5">
                      Jenjang {item.product.kategori}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.nama}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                      {formatRupiah(item.product.harga)}
                    </p>

                    {/* Stepper & Delete */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 rounded-l-lg cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium text-slate-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 rounded-r-lg cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-16">
                <ShoppingBag className="w-12 h-12 text-slate-300 stroke-1 mb-3" />
                <p className="text-sm font-semibold text-slate-700">Keranjang masih kosong</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Pilih aplikasi web sekolah dari katalog untuk memulai pemesanan.
                </p>
              </div>
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Subtotal Aplikasi</span>
                  <span className="font-mono tabular-nums">{formatRupiah(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Lisensi & Panduan</span>
                  <span className="text-emerald-600 font-semibold">Gratis</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Sementara</span>
                  <span className="text-base text-indigo-700 font-mono tabular-nums">
                    {formatRupiah(cartTotal)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  <span>Lanjut ke Formulir Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Kosongkan Keranjang
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
