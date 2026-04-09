const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const MONGO_URI = 'mongodb+srv://riyanwankhede_db_user:<password>@cluster0.rjfdah8.mongodb.net/Lab-12_db';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    marks: { type: Number, required: true }
});

const Student = mongoose.model('Student', studentSchema);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(6000, () => console.log('Mongoose CRUD at http://localhost:6000'));
    })
    .catch(err => console.error(err));

app.post('/students', async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json({ message: 'Student created', student });
});

app.get('/student', async (req, res) => {
    const student = await Student.find();
    res.json(student);
});

app.get('/student/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
});

app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json({ message: 'Student updated', student });
});

app.delete('/student/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
});