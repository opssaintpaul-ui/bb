import { Product, WebsiteSettings, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    nama: 'Portal Web Sekolah Terpadu (TK / SD / SMP / SMA)',
    deskripsi: 'Sistem informasi profil sekolah modern berbasis PHP & MySQL dengan CMS berita, agenda sekolah, galeri kegiatan, direktori guru, informasi kurikulum, dan formulir kontak dinamis.',
    harga: 850000,
    kategori: 'SMA',
    gambar: '/src/assets/images/app_school_portal_1793934198218.jpg',
    link_download: 'https://drive.google.com/drive/folders/demo-portal-sekolah-v3?usp=sharing',
    demo_url: 'https://demo-portal.sekolahdigital.id',
    fitur: [
      'Multi-level Admin (Kepala Sekolah, Operator, Guru)',
      'Manajemen Berita, Pengumuman & Agenda Akademik',
      'Direktori Guru & Tenaga Kependidikan dengan Foto',
      'Desain Responsif Mobile & SEO Ready',
      'Integrasi Media Sosial & YouTube Kampus',
      'Clean Code PHP Native / Laravel Architecture'
    ],
    tech_stack: ['PHP 8.2', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'Bootstrap 5'],
    popular: true,
    versi: 'v3.4.0'
  },
  {
    id: 2,
    nama: 'Sistem Presensi & Absensi (Wajah & GPS Geolocation)',
    deskripsi: 'Aplikasi absensi guru & siswa online berbasis Progressive Web App (PWA) dengan deteksi wajah (Face Recognition via kamera) dan radius geofencing GPS radius sekolah anti-fake GPS.',
    harga: 1450000,
    kategori: 'Umum',
    gambar: '/src/assets/images/app_face_attendance_1793934199050.jpg',
    link_download: 'https://drive.google.com/drive/folders/demo-presensi-gps-wajah?usp=sharing',
    demo_url: 'https://demo-presensi.sekolahdigital.id',
    fitur: [
      'Deteksi Wajah Biometrik via Web Cam / Smartphone',
      'Validasi Radius Titik Koordinat GPS Sekolah (Anti Mock)',
      'Rekap Kehadiran Otomatis (Hadir, Sakit, Izin, Alpa)',
      'Ekspor Laporan Bulanan ke Excel & PDF Sekali Klik',
      'Notifikasi WhatsApp Otomatis ke Orang Tua Siswa',
      'Support Shift Guru & Jam Belajar Mengajar'
    ],
    tech_stack: ['PHP 8.2', 'MySQL', 'FaceAPI.js', 'Leaflet GPS', 'Tailwind CSS'],
    popular: true,
    versi: 'v2.8.1'
  },
  {
    id: 3,
    nama: 'SPMB / PPDB Online & SKL (Surat Keterangan Lulus)',
    deskripsi: 'Sistem pendaftaran peserta didik baru terintegrasi mulai dari pengisian biodata, upload berkas persyaratan, seleksi nilai zonasi, hingga cetak bukti pendaftaran dan pengumuman SKL kelulusan ber-barcode.',
    harga: 1200000,
    kategori: 'SMP',
    gambar: '/src/assets/images/hero_school_digital_1793934197262.jpg',
    link_download: 'https://drive.google.com/drive/folders/demo-spmb-skl-online?usp=sharing',
    demo_url: 'https://demo-spmb.sekolahdigital.id',
    fitur: [
      'Jalur Zonasi, Afirmasi, Prestasi & Perpindahan Tugas',
      'Verifikasi Berkas Digital (KK, Akta, Rapor) Realtime',
      'Sistem Scoring & Ranking Seleksi Otomatis',
      'Pengumuman Kelulusan SKL Ber-QR Code Tervalidasi',
      'Cetak Formulir F1 & Kartu Ujian Berformat PDF Standar',
      'Pengaturan Kuota Pagu Tiap Jurusan / Kelas'
    ],
    tech_stack: ['PHP 8.1+', 'MySQL', 'FPDF Library', 'Tailwind CSS'],
    popular: true,
    versi: 'v4.1.2'
  },
  {
    id: 4,
    nama: 'E-Voting Pemilihan Ketua OSIS & MPK Online',
    deskripsi: 'Aplikasi pemungutan suara pemilihan umum OSIS / MPK sekolah yang demokratis, aman, dan transparan dengan token unik sekali pakai untuk setiap siswa dan quick count hasil realtime.',
    harga: 650000,
    kategori: 'SMA',
    gambar: '/src/assets/images/app_cbt_exam_1793934198999.jpg',
    link_download: 'https://drive.google.com/drive/folders/demo-evoting-osis?usp=sharing',
    demo_url: 'https://demo-evoting.sekolahdigital.id',
    fitur: [
      'Generate Token Unik Pemilih (Anti Vote Ganda)',
      'Profil Paslon Lengkap Visi, Misi & Video Kampanye',
      'Dashboard Quick Count Realtime Grafik Interaktif',
      'Export Rekapitulasi Suara & Berita Acara Pelaksanaan',
      'Login Ramah Siswa Cukup Masukkan NISN + Token',
      'Log Audit Keamanan Suara Terenkripsi SHA-256'
    ],
    tech_stack: ['PHP Native', 'MySQL PDO', 'Chart.js', 'Tailwind CSS'],
    popular: false,
    versi: 'v2.2.0'
  },
  {
    id: 5,
    nama: 'Kasir Kantin Modern, POS Sekolah & Tabungan Siswa',
    deskripsi: 'Sistem Point of Sale (POS) kantin sekolah cashless, pembayaran administrasi SPP sekolah, dan buku tabungan digital siswa dengan kartu barcode / RFID NISN siswa.',
    harga: 1350000,
    kategori: 'SD',
    gambar: '/src/assets/images/app_school_portal_1793934198218.jpg',
    link_download: 'https://drive.google.com/drive/folders/demo-pos-tabungan-sekolah?usp=sharing',
    demo_url: 'https://demo-pos.sekolahdigital.id',
    fitur: [
      'Transaksi Kasir Kantin Cepat dengan Scan Barcode Siswa',
      'Modul Tabungan Siswa: Setor, Tarik & Riwayat Mutasi',
      'Manajemen Tagihan SPP, Uang Seragam & Kegiatan',
      'Cetak Struk Thermal 58mm / 80mm Bluetooth & USB',
      'Laporan Omset Penjualan Harian, Mingguan, Bulanan',
      'Support Kartu Siswa Ber-Barcode & Saldo E-Wallet'
    ],
    tech_stack: ['PHP 8.2', 'MySQL', 'Receipt ESC/POS', 'Tailwind CSS'],
    popular: true,
    versi: 'v3.0.5'
  },
  {
    id: 6,
    nama: 'Administrasi Guru, Jurnal Mengajar & Rapor Kurikulum Merdeka',
    deskripsi: 'Platform pendukung kerja bapak/ibu guru dalam mencatat jurnal mengajar harian, presensi kelas, modul ajar, penilaian formatif-sumatif, serta cetak rapor Kurikulum Merdeka otomatis.',
    harga: 1100000,
    kategori: 'SMP',
    gambar: '/src/assets/images/hero_school_digital_1793934197262.jpg',
    link_download: 'https://drive.google.com/drive/folders/demo-jurnal-rapor-guru?usp=sharing',
    demo_url: 'https://demo-guru.sekolahdigital.id',
    fitur: [
      'Input Jurnal Harian Materi, Capaian Pembelajaran & Refleksi',
      'Pengolahan Nilai Formatif & Sumatif Lingkup Materi',
      'Generate Deskripsi Capaian Kompetensi Siswa Otomatis',
      'Format Cetak Rapor Standar Kemdikbudristek',
      'Bank Modul Ajar, Silabus & Perangkat Pembelajaran',
      'Export Rekap Nilai ke Format Excel Siap Sinkronisasi'
    ],
    tech_stack: ['PHP 8.2', 'Laravel / Native', 'MySQL', 'PhpSpreadsheet', 'Tailwind CSS'],
    popular: false,
    versi: 'v3.1.0'
  },
  {
    id: 7,
    nama: 'eLibrary (Sistem Manajemen Perpustakaan Digital)',
    deskripsi: 'Sistem automasi perpustakaan sekolah terpadu dengan katalog buku (OPAC), sirkulasi peminjaman/pengembalian ber-barcode, denda keterlambatan, dan e-book reader terintegrasi.',
    harga: 950000,
    kategori: 'SMA',
    gambar: '/src/assets/images/app_school_portal_1793934198218.jpg',
    link_download: 'https://drive.google.com/drive/folders/demo-elibrary-sekolah?usp=sharing',
    demo_url: 'https://demo-perpus.sekolahdigital.id',
    fitur: [
      'Katalog Publik OPAC (Online Public Access Catalog)',
      'Manajemen Barcode Buku & Cetak Label Nomor Punggung',
      'Modul Sirkulasi Pinjam, Kembali & Perpanjangan',
      'Kalkulasi Otomatis Denda Keterlambatan Pengembalian',
      'Repository Digital: Upload & Baca E-Book PDF',
      'Laporan Statistik Pengunjung & Buku Paling Favorit'
    ],
    tech_stack: ['PHP 8.1', 'MySQL', 'PDF.js Reader', 'Tailwind CSS'],
    popular: false,
    versi: 'v2.5.4'
  },
  {
    id: 8,
    nama: 'CBT (Computer Based Test) & Ujian Online Anti-Curang',
    deskripsi: 'Aplikasi ujian berbasis komputer berkecepatan tinggi dengan proteksi anti-buka tab baru, acak soal & acak opsi jawaban, support audio listening bahasa, rumus matematika KaTeX, dan koreksi otomatis.',
    harga: 1600000,
    kategori: 'SMA',
    gambar: '/src/assets/images/app_cbt_exam_1793934198999.jpg',
    link_download: 'https://drive.google.com/drive/folders/demo-cbt-ujian-online?usp=sharing',
    demo_url: 'https://demo-cbt.sekolahdigital.id',
    fitur: [
      'Fitur Anti-Curang (Deteksi Pindah Tab & Layar Penuh)',
      'Acak Urutan Soal & Pilihan Jawaban Tiap Peserta',
      'Support Gambar, Rumus Matematika (KaTeX) & Audio Soal',
      'Penilaian Otomatis Pilihan Ganda & Analisis Butir Soal',
      'Kapasitas Ringan, Mampu Melayani 500+ Siswa Bersamaan',
      'Tombol Reset Login Siswa & Monitoring Status Live'
    ],
    tech_stack: ['PHP 8.2', 'MySQL PDO', 'Tailwind CSS', 'KaTeX Engine'],
    popular: true,
    versi: 'v5.0.1'
  },
  {
    id: 9,
    nama: 'Sistem Inventaris Sarpras (Sarana & Prasarana)',
    deskripsi: 'Aplikasi pendataan inventaris aset barang, gedung, laboratorium, dan ruangan sekolah dengan pencatatan nomor register, pelacakan peminjaman alat, serta kartu kondisi pemeliharaan aset.',
    harga: 850000,
    kategori: 'Umum',
    gambar: '/src/assets/images/hero_school_digital_1793934197262.jpg',
    link_download: 'https://drive.google.com/drive/folders/demo-sarpras-inventaris?usp=sharing',
    demo_url: 'https://demo-sarpras.sekolahdigital.id',
    fitur: [
      'Pencatatan Kode Barang Standar Permendagri / Kemdikbud',
      'Generate QR Code / Barcode Label Aset untuk Ditempel',
      'Modul Peminjaman & Pengembalian Sarana Pembelajaran',
      'Pencatatan Kondisi Aset (Baik, Rusak Ringan, Rusak Berat)',
      'Laporan Depresiasi & Nilai Total Aset Lembaga',
      'Export Data Aset ke Excel & Format Kartu Inventaris Ruangan (KIR)'
    ],
    tech_stack: ['PHP 8.2', 'MySQL', 'QR Scanner', 'Tailwind CSS'],
    popular: false,
    versi: 'v2.1.0'
  },
  {
    id: 10,
    nama: 'Layanan Kustomisasi Aplikasi Pendidikan (Tailor-Made)',
    deskripsi: 'Solusi pembuatan software & modifikasi sistem sekolah sesuai SOP khusus yayasan atau sekolah Anda (misal: sistem tahfidz Al-Quran, boarding school / pesantren, multi-kampus terpadu).',
    harga: 2500000,
    kategori: 'Kustom',
    gambar: '/src/assets/images/app_face_attendance_1793934199050.jpg',
    link_download: 'https://drive.google.com/drive/folders/konsultasi-custom-edusoftware?usp=sharing',
    demo_url: 'https://demo-custom.sekolahdigital.id',
    fitur: [
      'Analisis Kebutuhan Sistem & Pembuatan Desain UI/UX Khusus',
      'Fitur Sesuai Alur Prosedur Operasional Standar Sekolah',
      'Full Source Code Kepemilikan 100% Tanpa Iuran Bulanan',
      'Pendampingan Instalasi di Hosting / Server Sekolah',
      'Garansi Bug & Pemeliharaan Teknis Selama 6 Bulan',
      'Sesi Pelatihan Online / Offline untuk Tenaga Operator'
    ],
    tech_stack: ['PHP 8.2 / Laravel 11', 'MySQL', 'Tailwind CSS', 'REST API'],
    popular: true,
    versi: 'Custom On-Demand'
  }
];

export const INITIAL_SETTINGS: WebsiteSettings = {
  site_title: 'EduStore Indonesia',
  site_tagline: 'Penyedia Source Code & Aplikasi Web Sekolah Terlengkap di Indonesia',
  logo_url: '',
  favicon_url: '',
  background_style: 'clean_light',
  background_color: '#f8fafc',
  whatsapp_number: '6281234567890',
  whatsapp_default_message: 'Halo Tim EduStore, saya tertarik untuk konsultasi pembuatan/kustomisasi aplikasi web sekolah untuk institusi kami.',
  bank_name: 'BCA (Bank Central Asia)',
  bank_account_number: '8830-1928-4411',
  bank_account_holder: 'PT EDUSTORE DIGITAL INDONESIA',
  secondary_bank_name: 'Bank Mandiri',
  secondary_bank_account: '1410-0982-3321',
  secondary_bank_holder: 'PT EDUSTORE DIGITAL INDONESIA',
  qris_merchant_name: 'EDUSTORE DIGITAL EDUKASI',
  qris_nmid: 'ID10203040506070',
  qris_image_url: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://edustore.id/pay/qris-simulasi',
  contact_email: 'halo@edustore.id',
  office_address: 'Gedung Menara Edukasi Digital Lt. 4, Jl. Pendidikan Mandiri No. 88, Jakarta Selatan'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 1,
    invoice_code: 'INV-202611-001',
    nama_pelanggan: 'Drs. H. Mulyadi, M.Pd',
    email: 'mulyadi@sman1nusantara.sch.id',
    no_wa: '081234567891',
    nama_sekolah: 'SMA Negeri 1 Nusantara',
    total_harga: 1450000,
    kode_unik: 234,
    total_bayar: 1450234,
    metode_pembayaran: 'transfer_bank',
    bank_tujuan: 'BCA (Bank Central Asia) - 8830-1928-4411',
    bukti_transfer: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
    status: 'success',
    download_token: 'TOKEN-DL-98214-SMA1N',
    catatan: 'Mohon panduan instalasi di cPanel hosting sekolah kami.',
    created_at: '2026-11-04 10:15:00',
    items: [
      {
        id: 1,
        order_id: 1,
        product_id: 2,
        nama_produk: 'Sistem Presensi & Absensi (Wajah & GPS Geolocation)',
        harga: 1450000,
        subtotal: 1450000,
        link_download: 'https://drive.google.com/drive/folders/demo-presensi-gps-wajah?usp=sharing'
      }
    ]
  },
  {
    id: 2,
    invoice_code: 'INV-202611-002',
    nama_pelanggan: 'Ibu Ratna Dewi, S.Kom',
    email: 'ratna.dewi@smpit-alikhlas.sch.id',
    no_wa: '085799887766',
    nama_sekolah: 'SMP IT Al-Ikhlas Cemerlang',
    total_harga: 1200000,
    kode_unik: 582,
    total_bayar: 1200582,
    metode_pembayaran: 'qris',
    bukti_transfer: null,
    status: 'pending',
    download_token: 'TOKEN-DL-11029-SMPIT',
    catatan: 'Untuk persiapan pendaftaran siswa baru tahun ajaran depan.',
    created_at: '2026-11-05 14:30:00',
    items: [
      {
        id: 2,
        order_id: 2,
        product_id: 3,
        nama_produk: 'SPMB / PPDB Online & SKL (Surat Keterangan Lulus)',
        harga: 1200000,
        subtotal: 1200000,
        link_download: 'https://drive.google.com/drive/folders/demo-spmb-skl-online?usp=sharing'
      }
    ]
  }
];
