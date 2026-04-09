const express = require('express');
const app = express();
app.use(express.json());

app.use((res, req, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

app.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        console.log('No auth token - continuing as guest');
    } else {
        console.log('Auth token found:', token);
    }
    next();
});

const adminOnly = (req, res, next) => {
    const role = req.headers['role'];
    if (role != 'admin') {
        return res.status(403).json({ message: 'Access denied - admin only' });
    }
    console.log('Admin access granted');
    next();
};

app.get('/', (req, res) => {
    res.json({ message: 'Public route - everyone can access' });
});

app.get('/admin', adminOnly, (req, res) => {
    res.json({ message: 'Admin route - restricted access' });
});

app.get('/about', (req, res) => {
    res.json({ message: 'About page' });
});

app.listen(5000, () => console.log('Middleware demo at http://localhost:5000'));

// Visit http://localhost:5000 and http://localhost:5000/about