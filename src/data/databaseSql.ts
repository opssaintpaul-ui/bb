export const MYSQL_SCHEMA_SQL = `-- ========================================================
-- SISTEM MARKETPLACE & PENJUALAN APLIKASI WEB SEKOLAH
-- Skema Database MySQL Produksi
-- Mesin Penyimpanan: InnoDB | Karakter: utf8mb4_unicode_ci
-- Keamanan: Dilengkapi Primary Key, Foreign Key & Index
-- ========================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

-- --------------------------------------------------------
-- 1. Tabel users (Admin Authentication)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL COMMENT 'Bcrypt hash $2y$10$...',
  \`nama_lengkap\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 2. Tabel settings (Konfigurasi Dinamis Identitas Website)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`settings\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`setting_key\` VARCHAR(100) NOT NULL UNIQUE,
  \`setting_value\` LONGTEXT DEFAULT NULL,
  \`description\` VARCHAR(255) DEFAULT NULL,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  INDEX \`idx_setting_key\` (\`setting_key\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. Tabel products (Katalog Aplikasi Web Sekolah)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`products\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`nama\` VARCHAR(200) NOT NULL,
  \`deskripsi\` TEXT NOT NULL,
  \`harga\` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  \`kategori\` ENUM('TK', 'SD', 'SMP', 'SMA', 'Umum', 'Kustom') NOT NULL DEFAULT 'Umum',
  \`gambar\` VARCHAR(255) DEFAULT NULL,
  \`link_download\` VARCHAR(500) NOT NULL COMMENT 'Link unduhan resmi (Google Drive / GitHub / ZIP Server)',
  \`demo_url\` VARCHAR(255) DEFAULT NULL COMMENT 'Tautan live preview aplikasi',
  \`fitur\` TEXT DEFAULT NULL COMMENT 'JSON array fitur utama aplikasi',
  \`tech_stack\` VARCHAR(255) DEFAULT 'PHP 8.2, MySQL, Tailwind CSS',
  \`versi\` VARCHAR(20) DEFAULT 'v1.0.0',
  \`status_aktif\` TINYINT(1) NOT NULL DEFAULT 1,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  INDEX \`idx_kategori\` (\`kategori\`),
  INDEX \`idx_status\` (\`status_aktif\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. Tabel orders (Transaksi & Verifikasi Bukti Bayar)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`orders\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`invoice_code\` VARCHAR(50) NOT NULL UNIQUE,
  \`nama_pelanggan\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`no_wa\` VARCHAR(25) NOT NULL,
  \`nama_sekolah\` VARCHAR(150) NOT NULL,
  \`total_harga\` DECIMAL(12,2) NOT NULL,
  \`kode_unik\` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  \`total_bayar\` DECIMAL(12,2) NOT NULL,
  \`metode_pembayaran\` ENUM('transfer_bank', 'qris') NOT NULL DEFAULT 'transfer_bank',
  \`bank_tujuan\` VARCHAR(100) DEFAULT NULL,
  \`bukti_transfer\` VARCHAR(255) DEFAULT NULL COMMENT 'Path berkas bukti bayar upload pembeli',
  \`status\` ENUM('pending', 'success', 'rejected') NOT NULL DEFAULT 'pending',
  \`download_token\` VARCHAR(64) NOT NULL UNIQUE COMMENT 'Token rahasia akses unduhan otomatis',
  \`catatan\` TEXT DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`verified_at\` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  INDEX \`idx_invoice\` (\`invoice_code\`),
  INDEX \`idx_status\` (\`status\`),
  INDEX \`idx_download_token\` (\`download_token\`),
  INDEX \`idx_no_wa\` (\`no_wa\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. Tabel order_items (Rincian Produk dalam Pesanan)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`order_items\` (
  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`order_id\` INT UNSIGNED NOT NULL,
  \`product_id\` INT UNSIGNED NOT NULL,
  \`subtotal\` DECIMAL(12,2) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  INDEX \`idx_order_id\` (\`order_id\`),
  INDEX \`idx_product_id\` (\`product_id\`),
  CONSTRAINT \`fk_order_items_order\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`fk_order_items_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- DATA DEFAULT / SEEDING AWAL
-- --------------------------------------------------------

-- Default Admin (User: admin | Pass: admin123)
-- Password hash menggunakan password_hash('admin123', PASSWORD_BCRYPT)
INSERT INTO \`users\` (\`id\`, \`username\`, \`password\`, \`nama_lengkap\`, \`email\`) VALUES
(1, 'admin', '$2y$10$vI8aWBnW3fID.ZQ4/zo1G.q1lR0e7t38wF4r2nO9fA6aK7V5e3lTu', 'Administrator EduStore', 'admin@sekolahdigital.id')
ON DUPLICATE KEY UPDATE \`username\` = VALUES(\`username\`);

-- Default Settings
INSERT INTO \`settings\` (\`setting_key\`, \`setting_value\`, \`description\`) VALUES
('site_title', 'EduStore Indonesia', 'Nama situs aplikasi marketplace'),
('site_tagline', 'Solusi Digitalisasi Sekolah Terbaik & Terintegrasi', 'Slogan branding toko'),
('logo_url', '', 'URL atau path file logo website'),
('favicon_url', '', 'URL atau path file favicon website'),
('background_style', 'clean_light', 'clean_light | subtle_grid | education_mesh | custom_color'),
('whatsapp_number', '6281234567890', 'Nomor WA floating konsultasi admin'),
('whatsapp_default_message', 'Halo Tim EduStore, saya ingin konsultasi aplikasi web sekolah.', 'Template pesan konsultasi'),
('bank_name', 'BCA (Bank Central Asia)', 'Nama bank utama penerima pembayaran'),
('bank_account_number', '8830-1928-4411', 'Nomor rekening bank utama'),
('bank_account_holder', 'PT EDUSTORE DIGITAL INDONESIA', 'Nama pemilik rekening bank'),
('secondary_bank_name', 'Bank Mandiri', 'Nama bank alternatif'),
('secondary_bank_account', '1410-0982-3321', 'Nomor rekening bank kedua'),
('secondary_bank_holder', 'PT EDUSTORE DIGITAL INDONESIA', 'Nama pemilik rekening kedua'),
('qris_merchant_name', 'EDUSTORE DIGITAL EDUKASI', 'Nama merchant QRIS'),
('qris_nmid', 'ID10203040506070', 'Kode NMID QRIS'),
('qris_image_url', 'assets/uploads/qris_default.png', 'File barcode QRIS statis / dinamis')
ON DUPLICATE KEY UPDATE \`setting_value\` = VALUES(\`setting_value\`);

COMMIT;
`;
