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
    res.status(200);
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

catRouter.get('/cat_like/:Cat_id', async (req, res) => {
  //const cats = await cat.findOne({ Cat_id: req.params.Cat_id });
  // cat.like++
  //console.log('Cat Likes', cats);
  console.log('req.params.Cat_id ', req.params.Cat_id);
  // if (cats) {
  //   res.send(cats);

  const cats = await cat.findOne({ Cat_id: req.params.Cat_id });

  cats.Likes++;
  await cats.save();

  res.status(200).send({ message: '404 Not Found !!!' });
  // } else {
  //   res.status(404).send({ message: '404 Not Found !!!' });
  // }
});

catRouter.get('/cat_unlike/:Cat_id', async (req, res) => {
  //const cats = await cat.findOne({ Cat_id: req.params.Cat_id });
  // cat.unlike++
  // if (cats) {
  //   res.send(cats);
  // } else {
  //   res.status(404).send({ message: '404 Not Found !!!' });
  //  }
  const cats = await cat.findOne({ Cat_id: req.params.Cat_id });

  cats.unlikes++;
  await cats.save();

  res.status(404).send({ message: '404 Not Found !!!' });
});

export default catRouter;
