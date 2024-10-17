const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Data Dummy (seharusnya menggunakan database)
let laptops = [
    { id: 0, brand: 'Asus', model: 'ZenBook', price: 15000 },
    { id: 1, brand: 'Acer', model: 'Predator', price: 20000 },
];

// Rute untuk menampilkan daftar laptop
app.get('/laptops', (req, res) => {
    res.render('index', { laptops });
});

// Rute untuk menampilkan form tambah laptop
app.get('/laptops/new', (req, res) => {
    res.render('new');
});

// Rute untuk menyimpan laptop baru
app.post('/laptops', (req, res) => {
    const { brand, model, price } = req.body;
    const newLaptop = { id: laptops.length, brand, model, price };
    laptops.push(newLaptop);
    res.redirect('/laptops');
});

// Rute untuk menampilkan form edit laptop
app.get('/laptops/:id/edit', (req, res) => {
    const laptop = laptops[req.params.id];
    res.render('edit', { laptop });
});

// Rute untuk memperbarui laptop
app.put('/laptops/:id', (req, res) => {
    const { brand, model, price } = req.body;
    laptops[req.params.id] = { id: req.params.id, brand, model, price };
    res.redirect('/laptops');
});

// Rute untuk menghapus laptop
app.delete('/laptops/:id', (req, res) => {
    laptops.splice(req.params.id, 1);
    res.redirect('/laptops');
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
