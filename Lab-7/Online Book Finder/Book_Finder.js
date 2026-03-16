const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 4000;
const MONGO_URI = 'mongodb+srv://riyanwankhede_db_user:<password>@cluster0.rjfdah8.mongodb.net/';
const DB_NAME = 'book_finder';

let db;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(MONGO_URI)
  .then(async client => {
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');

    const count = await db.collection('books').countDocuments();
    if (count === 0) {
      await db.collection('books').insertMany([
        { title: "JavaScript Essentials",     author: "John Smith",       category: "Programming",  price: 450, rating: 4.5, year: 2023 },
        { title: "MongoDB in Action",          author: "Kyle Banker",      category: "Database",     price: 600, rating: 4.8, year: 2022 },
        { title: "Clean Code",                 author: "Robert Martin",    category: "Programming",  price: 520, rating: 4.9, year: 2021 },
        { title: "The Pragmatic Programmer",   author: "Andy Hunt",        category: "Programming",  price: 480, rating: 4.7, year: 2020 },
        { title: "Design Patterns",            author: "Gang of Four",     category: "Architecture", price: 700, rating: 4.6, year: 2019 },
        { title: "Python Crash Course",        author: "Eric Matthes",     category: "Programming",  price: 390, rating: 4.4, year: 2023 },
        { title: "Database Systems",           author: "Thomas Connolly",  category: "Database",     price: 850, rating: 4.2, year: 2021 },
        { title: "Eloquent JavaScript",        author: "Marijn Haverbeke", category: "Programming",  price: 350, rating: 4.3, year: 2022 },
        { title: "You Don't Know JS",          author: "Kyle Simpson",     category: "Programming",  price: 299, rating: 4.6, year: 2020 },
        { title: "Introduction to Algorithms", author: "Thomas Cormen",    category: "Algorithms",   price: 950, rating: 4.8, year: 2018 },
        { title: "NoSQL Distilled",            author: "Martin Fowler",    category: "Database",     price: 420, rating: 4.1, year: 2019 },
        { title: "System Design Interview",    author: "Alex Xu",          category: "Architecture", price: 560, rating: 4.9, year: 2023 },
      ]);
      console.log('Books seeded!');
    }

    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));

// 1. SEARCH BY TITLE
app.get('/books/search', async (req, res) => {
  const books = await db.collection('books')
    .find({ title: { $regex: req.query.title, $options: 'i' } })
    .toArray();
  res.json(books);
});

// 2. FILTER BY CATEGORY
app.get('/books/category/:cat', async (req, res) => {
  const books = await db.collection('books')
    .find({ category: { $regex: req.params.cat, $options: 'i' } })
    .toArray();
  res.json(books);
});

// 3. TOP RATED
app.get('/books/top', async (req, res) => {
  const books = await db.collection('books')
    .find({ rating: { $gte: 4 } })
    .sort({ rating: -1 })
    .limit(5)
    .toArray();
  res.json(books);
});

// 4. SORT BY PRICE OR RATING
app.get('/books/sort/:field', async (req, res) => {
  const field = req.params.field;
  const order = field === 'rating' ? -1 : 1;
  const books = await db.collection('books')
    .find()
    .sort({ [field]: order })
    .toArray();
  res.json(books);
});

// 5. PAGINATION
app.get('/books', async (req, res) => {
  const page  = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip  = (page - 1) * limit;
  const total = await db.collection('books').countDocuments();
  const books = await db.collection('books').find().skip(skip).limit(limit).toArray();
  res.json({ books, total, page, totalPages: Math.ceil(total / limit) });
});
