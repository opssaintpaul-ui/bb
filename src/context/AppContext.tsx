import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, WebsiteSettings, AdminUser, OrderStatus, PaymentMethod } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, INITIAL_ORDERS } from '../data/initialData';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  resetDefaultProducts: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Orders & Transactions
  orders: Order[];
  createOrder: (orderData: {
    nama_pelanggan: string;
    email: string;
    no_wa: string;
    nama_sekolah: string;
    metode_pembayaran: PaymentMethod;
    bank_tujuan?: string;
    catatan?: string;
  }) => Order;
  uploadTransferProof: (invoiceCode: string, proofUrl: string) => void;
  updateOrderStatus: (orderId: number, status: OrderStatus) => void;
  deleteOrder: (orderId: number) => void;
  findOrderByInvoice: (invoiceCode: string) => Order | undefined;
  findOrdersByPhoneOrEmail: (query: string) => Order[];

  // Settings
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  resetDefaultSettings: () => void;

  // Admin Auth
  isAdmin: boolean;
  adminUser: AdminUser | null;
  adminLogin: (username: string, pass: string) => boolean;
  adminLogout: () => void;

  // Views & Modals
  currentView: 'store' | 'admin';
  setCurrentView: (view: 'store' | 'admin') => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  activeInvoice: Order | null;
  setActiveInvoice: (order: Order | null) => void;
  isInvoiceModalOpen: boolean;
  setIsInvoiceModalOpen: (open: boolean) => void;
  isProofModalOpen: boolean;
  setIsProofModalOpen: (open: boolean) => void;
  isConsultModalOpen: boolean;
  setIsConsultModalOpen: (open: boolean) => void;
  isCodeArchitectureOpen: boolean;
  setIsCodeArchitectureOpen: (open: boolean) => void;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;

  // Toasts
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('edustore_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    try {
      const saved = localStorage.getItem('edustore_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('edustore_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('edustore_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('edustore_admin_session') === 'true';
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    return localStorage.getItem('edustore_admin_session') === 'true'
      ? { id: 1, username: 'admin', nama_lengkap: 'Administrator EduStore', email: 'admin@sekolahdigital.id' }
      : null;
  });

  // UI state
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeInvoice, setActiveInvoice] = useState<Order | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isCodeArchitectureOpen, setIsCodeArchitectureOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('edustore_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('edustore_settings', JSON.stringify(settings));
    // Dynamic website title
    if (settings.site_title) {
      document.title = `${settings.site_title} - ${settings.site_tagline}`;
    }
    // Dynamic favicon if provided
    if (settings.favicon_url) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = settings.favicon_url;
    }
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('edustore_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('edustore_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3800);
  };

  // Product Actions
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const item: Product = { ...newProd, id };
    setProducts((prev) => [item, ...prev]);
    showToast(`Produk "${item.nama}" berhasil ditambahkan.`);
  };

  const updateProduct = (id: number, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast('Data produk berhasil diperbarui.');
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    showToast('Produk berhasil dihapus.', 'info');
  };

  const resetDefaultProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    showToast('Katalog produk direset ke data awal pabrik.', 'info');
  };

  // Cart Actions
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        // Since software licenses are usually 1 license per purchase, keep it at 1 or allow increment
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.product.harga }
            : item
        );
      }
      return [...prev, { product, quantity: 1, subtotal: product.harga }];
    });
    showToast(`"${product.nama}" masuk ke keranjang.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item dihapus dari keranjang.', 'info');
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity, subtotal: quantity * item.product.harga }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Orders Actions
  const createOrder = (orderData: {
    nama_pelanggan: string;
    email: string;
    no_wa: string;
    nama_sekolah: string;
    metode_pembayaran: PaymentMethod;
    bank_tujuan?: string;
    catatan?: string;
  }): Order => {
    const totalHarga = cartTotal;
    // Generate unique 3-digit verification code (e.g. 101 - 899)
    const kodeUnik = Math.floor(100 + Math.random() * 899);
    const totalBayar = totalHarga + kodeUnik;
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const invoiceCode = `INV-${dateStr}-${randCode}`;
    const downloadToken = `DL-TOKEN-${Math.random().toString(36).substring(2, 12).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

    const orderId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;

    const items = cart.map((c, idx) => ({
      id: idx + 1,
      order_id: orderId,
      product_id: c.product.id,
      nama_produk: c.product.nama,
      harga: c.product.harga,
      subtotal: c.subtotal,
      link_download: c.product.link_download
    }));

    const newOrder: Order = {
      id: orderId,
      invoice_code: invoiceCode,
      nama_pelanggan: orderData.nama_pelanggan,
      email: orderData.email,
      no_wa: orderData.no_wa,
      nama_sekolah: orderData.nama_sekolah,
      total_harga: totalHarga,
      kode_unik: kodeUnik,
      total_bayar: totalBayar,
      metode_pembayaran: orderData.metode_pembayaran,
      bank_tujuan: orderData.bank_tujuan || `${settings.bank_name} - ${settings.bank_account_number}`,
      bukti_transfer: null,
      status: 'pending',
      download_token: downloadToken,
      catatan: orderData.catatan,
      created_at: now.toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveInvoice(newOrder);
    setIsCheckoutOpen(false);
    setIsInvoiceModalOpen(true);
    showToast(`Invoice ${invoiceCode} berhasil dibuat! Segera lakukan pembayaran.`);
    return newOrder;
  };

  const uploadTransferProof = (invoiceCode: string, proofUrl: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.invoice_code === invoiceCode
          ? { ...o, bukti_transfer: proofUrl }
          : o
      )
    );
    // Update active invoice if viewing
    setActiveInvoice((prev) =>
      prev?.invoice_code === invoiceCode ? { ...prev, bukti_transfer: proofUrl } : prev
    );
    showToast('Bukti pembayaran berhasil diunggah! Admin akan segera memverifikasi.');
  };

  const updateOrderStatus = (orderId: number, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    setActiveInvoice((prev) => (prev?.id === orderId ? { ...prev, status } : prev));
    showToast(`Status transaksi #${orderId} diubah menjadi "${status.toUpperCase()}".`);
  };

  const deleteOrder = (orderId: number) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('Data transaksi berhasil dihapus.', 'info');
  };

  const findOrderByInvoice = (invoiceCode: string): Order | undefined => {
    const clean = invoiceCode.trim().toUpperCase();
    return orders.find(
      (o) =>
        o.invoice_code.toUpperCase() === clean ||
        o.download_token.toUpperCase() === clean
    );
  };

  const findOrdersByPhoneOrEmail = (query: string): Order[] => {
    const q = query.trim().toLowerCase();
    return orders.filter(
      (o) =>
        o.no_wa.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.nama_sekolah.toLowerCase().includes(q) ||
        o.invoice_code.toLowerCase().includes(q)
    );
  };

  // Settings Actions
  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Konfigurasi website berhasil disimpan.');
  };

  const resetDefaultSettings = () => {
    setSettings(INITIAL_SETTINGS);
    showToast('Pengaturan website dikembalikan ke default.', 'info');
  };

  // Admin Auth
  const adminLogin = (user: string, pass: string): boolean => {
    // Default admin: admin / admin123
    if (user.trim() === 'admin' && pass.trim() === 'admin123') {
      setIsAdmin(true);
      setAdminUser({
        id: 1,
        username: 'admin',
        nama_lengkap: 'Administrator EduStore',
        email: 'admin@sekolahdigital.id'
      });
      localStorage.setItem('edustore_admin_session', 'true');
      showToast('Selamat datang, Administrator!');
      return true;
    }
    showToast('Username atau password admin salah!', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    setAdminUser(null);
    localStorage.removeItem('edustore_admin_session');
    setCurrentView('store');
    showToast('Anda telah logout dari dashboard admin.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetDefaultProducts,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,

        orders,
        createOrder,
        uploadTransferProof,
        updateOrderStatus,
        deleteOrder,
        findOrderByInvoice,
        findOrdersByPhoneOrEmail,

        settings,
        updateSettings,
        resetDefaultSettings,

        isAdmin,
        adminUser,
        adminLogin,
        adminLogout,

        currentView,
        setCurrentView,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        activeInvoice,
        setActiveInvoice,
        isInvoiceModalOpen,
        setIsInvoiceModalOpen,
        isProofModalOpen,
        setIsProofModalOpen,
        isConsultModalOpen,
        setIsConsultModalOpen,
        isCodeArchitectureOpen,
        setIsCodeArchitectureOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,

        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
