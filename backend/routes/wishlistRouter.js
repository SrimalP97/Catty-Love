/* import express from 'express';
import cat from '../models/catModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const wishlistRouter = express.Router();

userRouter.get(
    '/wishlist',
    expressAsyncHandler(async (req, res) => {
      // await User.remove({});
      const wishlistItems = await wishlist.insertMany(data.wishlistItems);
      res.send({ wishlistItems });
    })
  );

  export default wishlistRouter; */