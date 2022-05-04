import express from 'express';
import cat from '../models/catModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await cat.remove({});
  const createdcats = await cat.insertMany(data.cats);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdcats, createdUsers });
});

export default seedRouter;
