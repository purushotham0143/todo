const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

const mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

const TodoSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', TodoSchema);

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const newTodo = new Todo({ title: req.body.title });
  const saved = await newTodo.save();
  res.status(201).json(saved);
});

app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
