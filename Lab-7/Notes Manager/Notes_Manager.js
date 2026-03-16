const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://riyanwankhede_db_user:<password>@cluster0.rjfdah8.mongodb.net/';
const DB_NAME = 'student_notes';

let db;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));

// 1. ADD NOTE
app.post('/notes', async (req, res) => {
  const { title, subject, description } = req.body;
  const result = await db.collection('notes').insertOne({
    title, subject, description,
    created_date: new Date().toISOString().split('T')[0]
  });
  res.status(201).json({ message: 'Note added', id: result.insertedId });
});

// 2. VIEW ALL NOTES
app.get('/notes', async (req, res) => {
  const notes = await db.collection('notes').find().sort({ created_date: -1 }).toArray();
  res.json(notes);
});

// 3. UPDATE NOTE
app.put('/notes/:id', async (req, res) => {
  const { title, subject, description } = req.body;
  await db.collection('notes').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { title, subject, description } }
  );
  res.json({ message: 'Note updated' });
});

// 4. DELETE NOTE
app.delete('/notes/:id', async (req, res) => {
  await db.collection('notes').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: 'Note deleted' });
});
