const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Mengimpor rute otentikasi dari file terpisah
const path = require('path'); // Modul untuk menangani path file

// Membuat instance aplikasi Express
const app = express();

// Mengatur view engine menggunakan EJS
app.set('view engine', 'ejs');

// Menggunakan body-parser untuk mengurai JSON dan URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Menggunakan express-session untuk mengatur sesi pengguna
app.use(session({
    secret: 'secret', // Kunci rahasia untuk sesi
    resave: false, // Tidak menyimpan kembali sesi yang belum diubah
    saveUninitialized: true // Menyimpan sesi baru yang belum diinisialisasi
}));

// Mengatur folder 'public' sebagai lokasi untuk file statis seperti CSS, gambar, dll.
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk mengatur akses ke rute berdasarkan status sesi pengguna
app.use((req, res, next) => {
    if (!req.session.user && !['/auth/login', '/auth/register'].includes(req.path)) {
        return res.redirect('/auth/login'); // Alihkan ke halaman login jika tidak terautentikasi
    }
    next(); // Melanjutkan ke middleware berikutnya
});

// Menggunakan rute otentikasi yang diimpor sebelumnya
app.use('/auth', authRoutes);

// Rute untuk halaman utama
app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/auth/profile'); // Alihkan ke halaman profil jika terautentikasi
    }
    return res.redirect('/auth/login'); // Alihkan ke halaman login jika tidak terautentikasi
});

// Rute untuk halaman about (opsional)
app.get('/about', (req, res) => {
    res.render('about'); // Render halaman about
});

// Menjalankan server di port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}, buka di http://localhost:${PORT}`);
});
