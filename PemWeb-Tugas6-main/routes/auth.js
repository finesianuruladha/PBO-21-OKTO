// Mengimpor modul mysql untuk berinteraksi dengan database MySQL
const mysql = require('mysql');

// Membuat koneksi ke database MySQL dengan pengaturan yang diperlukan
const db = mysql.createConnection({
    host: 'localhost', // Alamat host database, di sini menggunakan localhost
    user: 'root', // Nama pengguna untuk mengakses database
    password: '', // Kata sandi untuk pengguna (kosong jika tidak ada kata sandi)
    database: 'user_management', // Nama database yang akan diakses (ganti sesuai dengan nama database Anda)
    port: 3307 // Port yang digunakan untuk menghubungkan ke database, pastikan port ini sesuai jika menggunakan port 3307
});

// Menghubungkan ke database dan menangani kesalahan
db.connect((err) => {
    if (err) {
        // Menangani kesalahan koneksi dan menampilkan pesan di konsol
        console.error('Database connection failed:', err.stack); // Menampilkan detail kesalahan
        return; // Menghentikan eksekusi jika koneksi gagal
    }
    console.log('Database connected...'); // Jika berhasil, tampilkan pesan di konsol
});

// Mengekspor objek koneksi database agar dapat digunakan di file lain
module.exports = db;

app.get('/auth/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    res.render('profile', { user: req.session.user }); // Render halaman profil dengan data pengguna
});

const express = require('express');
const router = express.Router();


// Rute untuk menampilkan halaman profil
router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login'); // Redirect jika tidak ada sesi pengguna
    }
    res.render('profil', { user: req.session.user }); // Render halaman profil
});

// Tambahkan rute lain (login, register, dll.) di sini jika ada

module.exports = router;


// Rute untuk menampilkan halaman biodata
router.get('/biodata', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login'); // Redirect jika tidak ada sesi pengguna
    }
    res.render('biodata', { user: req.session.user }); // Render halaman biodata
});

// Tambahkan rute lain (login, register, dll.) di sini jika ada

module.exports = router;

