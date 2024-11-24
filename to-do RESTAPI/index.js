const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let tasks = [];
let idCounter = 1;


app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = { id: idCounter++, title, status: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});


app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  const task = tasks.find((t) => t.id == id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (title !== undefined) task.title = title;
  if (status !== undefined) task.status = status;

  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id != id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Url is => http://localhost:${PORT}`);
});
