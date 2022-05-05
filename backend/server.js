import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import catRouter from './routes/catRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)

  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/cats', catRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get('/api/cats/:id', (req, res) => {
  const cat = data.cats.find((x) => x.id === req.params.id);
  if (cat) {
    res.send(cat);
  } else {
    res.status(404).send({ message: 'Cat Not Found' });
  }
});
app.get('/api/cats/:id', (req, res) => {
  const cat = data.cats.find((x) => x._id === req.params.id);
  if (cat) {
    res.send(cat);
  } else {
    res.status(404).send({ message: 'Cat Not Found' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
