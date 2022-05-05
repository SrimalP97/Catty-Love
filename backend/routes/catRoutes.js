import express from 'express';
import cat from '../models/catModel.js';

const catRouter = express.Router();

catRouter.get('/', async (req, res) => {
  const cats = await cat.find();
  res.send(cats);
});

catRouter.get('/Cat_id/:Cat_id', async (req, res) => {
  const cats = await cat.findOne({ Cat_id: req.params.Cat_id });
  if (cats) {
    res.send(cats);
  } else {
    res.status(404).send({ message: '404 Not Found !!!' });
  }
});

catRouter.get('/:id', async (req, res) => {
  const cats = await cat.findById(req.params.id);
  if (cats) {
    res.send(cats);
  } else {
    res.status(404).send({ message: '404 Not Found !!!' });
  }
});

catRouter.post('/cat_like/:Cat_id', async (req, res) => {
  try {
    const { userId } = req.body;

    const cats = await cat.findOne({ Cat_id: req.params.Cat_id });
    console.log('userId', userId);
    console.log('cats', cats);

    let isUserLiked = cats.Likeduser.includes(userId.toString());

    if (isUserLiked) {
      return res.json({
        status: 'error',
        message: 'Already Liked',
      });
    }

    if (cats) {
      cats.Likeduser.push(userId);
      cats.Likes++;
      await cats.save();
    } else {
      return res.json({
        status: 'error',
        message: 'No cat found for the given id',
      });
    }

    res.status(200).send({ status: 'OK', message: 'Successfull' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', err: error });
  }
});

catRouter.post('/cat_unlike/:Cat_id', async (req, res) => {
  try {
    const { userId } = req.body;
    const cats = await cat.findOne({ Cat_id: req.params.Cat_id });
    console.log('userId', userId);
    console.log('cats', cats);

    let isUserLiked = cats.Likeduser.includes(userId.toString());
    let isUserunLiked = cats.unlikeduser.includes(userId.toString());

    if (isUserLiked) {
      cats.unlikeduser.push(userId);
      cats.unlike++;
      cats.likes--;
      await cats.save();
    }

    if (isUserunLiked) {
      cats.unlikeduser.push(userId);
      return res.json({
        status: 'error',
        message: 'Already UnLiked',
      });
    }

    if (cats) {
      cats.unlikeduser.push(userId);
      cats.unlike++;
      cats.likes--;
      await cats.save();
    } else {
      return res.json({
        status: 'error',
        message: 'No cat found for the given id',
      });
    }

    if (cats) {
      cats.Likeduser.push(userId);
      cats.unlike++;

      await cats.save();
    } else {
      return res.json({
        status: 'error',
        message: 'No cat found for the given id',
      });
    }

    res.status(200).send({ status: 'OK', message: 'Successfull' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', err: error });
  }
});

export default catRouter;
