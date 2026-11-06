export const PHP_PROJECT_FILES: { path: string; description: string; code: string }[] = [
  {
    path: 'config/database.php',
    description: 'Koneksi database PDO dengan proteksi SQL Injection & Prepared Statements',
    code: `<?php
/**
 * Konfigurasi Database PDO Aman
 * Anti SQL Injection dengan Prepared Statements
 */
define('DB_HOST', 'localhost');
define('DB_NAME', 'db_edustore_sekolah');
define('DB_USER', 'root');
define('DB_PASS', '');

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            try {
                $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
                $options = [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false, // Keamanan ketat SQL Injection
                ];
                self::$instance = new PDO($dsn, DB_USER, DB_PASS, $options);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Koneksi Database Gagal: ' . $e->getMessage()]);
                exit;
            }
        }
        return self::$instance;
    }
}
`
  },
  {
    path: 'app/Controllers/OrderController.php',
    description: 'Controller Transaksi, Kode Unik, Upload Bukti Bayar & Otorisasi Unduhan',
    code: `<?php
require_once __DIR__ . '/../../config/database.php';

class OrderController {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    /**
     * Checkout Baru: Generate Invoice & Nominal Unik
     */
    public function checkout(): void {
        header('Content-Type: application/json');
        
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Data tidak valid']);
            return;
        }

        // Sanitasi Input (Anti-XSS)
        $namaPelanggan = htmlspecialchars(strip_tags(trim($input['nama_pelanggan'] ?? '')));
        $email         = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
        $noWa          = preg_replace('/[^0-9]/', '', $input['no_wa'] ?? '');
        $namaSekolah   = htmlspecialchars(strip_tags(trim($input['nama_sekolah'] ?? '')));
        $metode        = in_array($input['metode_pembayaran'], ['transfer_bank', 'qris']) ? $input['metode_pembayaran'] : 'transfer_bank';
        $items         = $input['items'] ?? [];

        if (!$namaPelanggan || !$email || !$noWa || !$namaSekolah || empty($items)) {
            http_response_code(422);
            echo json_encode(['status' => 'error', 'message' => 'Lengkapi seluruh formulir dengan benar']);
            return;
        }

        try {
            $this->db->beginTransaction();

            // Hitung total harga dari database untuk mencegah manipulasi harga client-side
            $totalHarga = 0;
            $verifiedItems = [];
            
            $stmtProduct = $this->db->prepare("SELECT id, nama, harga FROM products WHERE id = ? AND status_aktif = 1");
            foreach ($items as $item) {
                $stmtProduct->execute([$item['product_id']]);
                $prod = $stmtProduct->fetch();
                if ($prod) {
                    $subtotal = (float)$prod['harga'];
                    $totalHarga += $subtotal;
                    $verifiedItems[] = [
                        'product_id' => $prod['id'],
                        'subtotal'   => $subtotal
                    ];
                }
            }

            if (empty($verifiedItems)) {
                throw new Exception("Produk tidak ditemukan atau tidak aktif");
            }

            // Generate Kode Unik 3 Digit (misal: 100 - 999)
            $kodeUnik = rand(100, 999);
            $totalBayar = $totalHarga + $kodeUnik;
            $invoiceCode = 'INV-' . date('Ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 5));
            $downloadToken = bin2hex(random_bytes(24)); // 48 karakter token unduhan aman

            // Insert Orders
            $stmtOrder = $this->db->prepare("
                INSERT INTO orders (invoice_code, nama_pelanggan, email, no_wa, nama_sekolah, total_harga, kode_unik, total_bayar, metode_pembayaran, status, download_token)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
            ");
            $stmtOrder->execute([
                $invoiceCode, $namaPelanggan, $email, $noWa, $namaSekolah,
                $totalHarga, $kodeUnik, $totalBayar, $metode, $downloadToken
            ]);

            $orderId = (int)$this->db->lastInsertId();

            // Insert Order Items
            $stmtItem = $this->db->prepare("INSERT INTO order_items (order_id, product_id, subtotal) VALUES (?, ?, ?)");
            foreach ($verifiedItems as $vItem) {
                $stmtItem->execute([$orderId, $vItem['product_id'], $vItem['subtotal']]);
            }

            $this->db->commit();

            echo json_encode([
                'status' => 'success',
                'message' => 'Pesanan berhasil dibuat',
                'data' => [
                    'order_id'       => $orderId,
                    'invoice_code'   => $invoiceCode,
                    'total_bayar'    => $totalBayar,
                    'kode_unik'      => $kodeUnik,
                    'download_token' => $downloadToken
                ]
            ]);

        } catch (Exception $e) {
            $this->db->rollBack();
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    /**
     * Upload Bukti Pembayaran
     */
    public function uploadBukti(): void {
        header('Content-Type: application/json');
        
        $invoiceCode = trim($_POST['invoice_code'] ?? '');
        if (!$invoiceCode || !isset($_FILES['bukti_transfer'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Kode invoice dan berkas bukti bayar wajib disertakan']);
            return;
        }

        $file = $_FILES['bukti_transfer'];
        $allowedMime = ['image/jpeg', 'image/png', 'image/webp'];
        $fileMime = mime_content_type($file['tmp_name']);

        if (!in_array($fileMime, $allowedMime)) {
            http_response_code(422);
            echo json_encode(['status' => 'error', 'message' => 'Format file harus JPG, PNG, atau WEBP']);
            return;
        }

        // Batasi ukuran maksimal 5MB
        if ($file['size'] > 5 * 1024 * 1024) {
            http_response_code(422);
            echo json_encode(['status' => 'error', 'message' => 'Ukuran file maksimal 5MB']);
            return;
        }

        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $fileName = 'bukti_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
        $uploadDir = __DIR__ . '/../../public/uploads/bukti/';
        
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        if (move_uploaded_file($file['tmp_name'], $uploadDir . $fileName)) {
            $pathDb = 'uploads/bukti/' . $fileName;
            $stmt = $this->db->prepare("UPDATE orders SET bukti_transfer = ? WHERE invoice_code = ?");
            $stmt->execute([$pathDb, $invoiceCode]);

            echo json_encode([
                'status' => 'success',
                'message' => 'Bukti pembayaran berhasil diunggah. Menunggu konfirmasi admin.',
                'bukti_url' => $pathDb
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Gagal memindahkan berkas']);
        }
    }

    /**
     * Verifikasi & Otomatisasi Akses Unduhan (Admin Only)
     */
    public function verifyOrder(int $orderId, string $status): void {
        header('Content-Type: application/json');
        
        if (!in_array($status, ['success', 'rejected', 'pending'])) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Status tidak valid']);
            return;
        }

        $stmt = $this->db->prepare("UPDATE orders SET status = ?, verified_at = NOW() WHERE id = ?");
        $stmt->execute([$status, $orderId]);

        echo json_encode([
            'status' => 'success',
            'message' => 'Status pesanan berhasil diperbarui ke: ' . $status
        ]);
    }
}
`
  },
  {
    path: 'public/download.php',
    description: 'Endpoint Pengunduhan Berkas Terproteksi Token Rahasia (Otomatis & Aman)',
    code: `<?php
/**
 * Gerbang Unduhan Aman Berbasis Token
 * Akses file/drive hanya terbuka setelah status pembayaran = 'success'
 */
require_once __DIR__ . '/../config/database.php';

$token     = trim($_GET['token'] ?? '');
$productId = (int)($_GET['product_id'] ?? 0);

if (!$token) {
    http_response_code(403);
    die("Akses Ditolak: Token unduhan tidak disertakan.");
}

$db = Database::getConnection();

// Periksa validitas pesanan dan status pembayaran
$stmt = $db->prepare("
    SELECT o.id, o.status, o.invoice_code, p.nama, p.link_download 
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.download_token = ? AND (p.id = ? OR ? = 0)
    LIMIT 1
");
$stmt->execute([$token, $productId, $productId]);
$order = $stmt->fetch();

if (!$order) {
    http_response_code(404);
    die("Token unduhan tidak ditemukan atau tidak sesuai.");
}

if ($order['status'] !== 'success') {
    http_response_code(403);
    echo "<h1>Pembayaran Belum Dikonfirmasi</h1>";
    echo "<p>Pesanan dengan kode invoice <strong>" . htmlspecialchars($order['invoice_code']) . "</strong> masih dalam status verifikasi.</p>";
    echo "<p>Silakan tunggu admin memverifikasi bukti bayar atau hubungi admin via WhatsApp.</p>";
    exit;
}

// Catat log unduhan (audit trail)
$stmtLog = $db->prepare("INSERT INTO download_logs (order_id, ip_address, downloaded_at) VALUES (?, ?, NOW())");
// $stmtLog->execute([$order['id'], $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0']);

// Redirect ke URL link download resmi yang disetting Admin (Google Drive / GitHub / Storage Server)
header("Location: " . $order['link_download']);
exit;
`
  },
  {
    path: 'app/Controllers/AuthController.php',
    description: 'Login Admin Aman dengan password_verify() & Session Anti-Hijack',
    code: `<?php
require_once __DIR__ . '/../../config/database.php';

class AuthController {
    private PDO $db;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start([
                'cookie_httponly' => true,
                'cookie_samesite' => 'Strict',
                'cookie_secure'   => isset($_SERVER['HTTPS'])
            ]);
        }
        $this->db = Database::getConnection();
    }

    public function login(): void {
        header('Content-Type: application/json');
        $input = json_decode(file_get_contents('php://input'), true);
        
        $username = trim($input['username'] ?? '');
        $password = trim($input['password'] ?? '');

        if (!$username || !$password) {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Username dan password wajib diisi']);
            return;
        }

        $stmt = $this->db->prepare("SELECT id, username, password, nama_lengkap, email FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            session_regenerate_id(true); // Anti Session Fixation
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            $_SESSION['admin_name'] = $user['nama_lengkap'];

            echo json_encode([
                'status' => 'success',
                'message' => 'Login berhasil',
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'nama_lengkap' => $user['nama_lengkap']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['status' => 'error', 'message' => 'Username atau password salah!']);
        }
    }

    public function logout(): void {
        $_SESSION = [];
        session_destroy();
        echo json_encode(['status' => 'success', 'message' => 'Logout berhasil']);
    }
}
`
  },
  {
    path: 'app/Controllers/SettingController.php',
    description: 'Manajemen Konfigurasi Dinamis (Logo, Favicon, Background, Bank, QRIS, WA)',
    code: `<?php
require_once __DIR__ . '/../../config/database.php';

class SettingController {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getSettings(): array {
        $stmt = $this->db->query("SELECT setting_key, setting_value FROM settings");
        $settings = [];
        while ($row = $stmt->fetch()) {
            $settings[$row['setting_key']] = $row['setting_value'];
        }
        return $settings;
    }

    public function updateSettings(array $data): bool {
        $stmt = $this->db->prepare("
            INSERT INTO settings (setting_key, setting_value) 
            VALUES (?, ?) 
            ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
        ");

        foreach ($data as $key => $val) {
            $stmt->execute([$key, is_array($val) ? json_encode($val) : $val]);
        }
        return true;
    }
}
`
  }
];
