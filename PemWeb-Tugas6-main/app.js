// Mengimpor dependensi yang diperlukan
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/auth'); // Rute otentikasi

// Membuat instance aplikasi Express
const app = express();

// Konfigurasi view engine menggunakan EJS
app.set('view engine', 'ejs');

// Middleware untuk mengurai body permintaan (request body)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi express-session untuk mengatur sesi pengguna
app.use(session({
    secret: 'secret', // Kunci rahasia
    resave: false, // Tidak menyimpan ulang sesi yang belum diubah
    saveUninitialized: true // Menyimpan sesi yang baru meskipun belum ada perubahan
}));

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk mengatur akses berdasarkan status sesi
app.use((req, res, next) => {
    if (!req.session.user && !['/auth/login', '/auth/register'].includes(req.path)) {
        return res.redirect('/auth/login');
    }
    if (req.session.user && req.path === '/') {
        return res.redirect('/auth/profile');
    }
    next();
});

// Menggunakan rute otentikasi
app.use('/auth', authRoutes);

// Rute utama
app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/auth/profile');
    }
    return res.redirect('/auth/login');
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}, buka di http://localhost:${PORT}`);
});

// Rute untuk halaman biodata
app.get('/biodata', (req, res) => {
    if (req.session.user) {
        res.render('biodata', { user: req.session.user });
    } else {
        res.redirect('/auth/login');
    }
});
