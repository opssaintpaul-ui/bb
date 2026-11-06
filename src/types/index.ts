export type ProductCategory = 'Semua' | 'TK' | 'SD' | 'SMP' | 'SMA' | 'Umum' | 'Kustom';

export interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  kategori: 'TK' | 'SD' | 'SMP' | 'SMA' | 'Umum' | 'Kustom';
  gambar: string;
  link_download: string;
  demo_url?: string;
  fitur: string[];
  tech_stack: string[];
  popular?: boolean;
  versi?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  nama_produk: string;
  harga: number;
  subtotal: number;
  link_download?: string;
}

export type OrderStatus = 'pending' | 'success' | 'rejected';
export type PaymentMethod = 'transfer_bank' | 'qris';

export interface Order {
  id: number;
  invoice_code: string;
  nama_pelanggan: string;
  email: string;
  no_wa: string;
  nama_sekolah: string;
  total_harga: number;
  kode_unik: number;
  total_bayar: number;
  metode_pembayaran: PaymentMethod;
  bank_tujuan?: string;
  bukti_transfer: string | null;
  status: OrderStatus;
  download_token: string;
  catatan?: string;
  created_at: string;
  items: OrderItem[];
}

export interface WebsiteSettings {
  site_title: string;
  site_tagline: string;
  logo_url: string;
  favicon_url: string;
  background_style: 'clean_light' | 'subtle_grid' | 'education_mesh' | 'custom_color';
  background_color: string;
  whatsapp_number: string;
  whatsapp_default_message: string;
  bank_name: string;
  bank_account_number: string;
  bank_account_holder: string;
  secondary_bank_name: string;
  secondary_bank_account: string;
  secondary_bank_holder: string;
  qris_merchant_name: string;
  qris_nmid: string;
  qris_image_url: string;
  contact_email: string;
  office_address: string;
}

export interface AdminUser {
  id: number;
  username: string;
  nama_lengkap: string;
  email: string;
}
