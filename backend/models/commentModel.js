const Cat = require("../models/cat");
const User = require("../models/user");
const Wishlist = require("../models/wishlist");
//const CatComment = require("../models/comment");

const addCommentForCat = async (req, res, next) => {
  try {
    let result;
    const paramCatId = req.params.id;
    let { userId, catId, userName, comment } = req.body;
    console.log("req.body", req.body);
    console.log("paramCatId", paramCatId);
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.json({
        status: "error",
        error: "no any user found for the user id",
      });
    }
    const cat = await Cat.findById(paramCatId);
    console.log(user);
    console.log(cat);
    if (!cat) {
      return res.json({
        status: "error",
        error: "no any cat found for the cat id",
      });
    } else {
      cat.comment.push({
        userId,
        catId,
        userName,
        comment,
      });
      result = await cat.save();
    }
    return res.status(200).json({ status: "OK", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", err: error });
    next();
  }
};

module.exports = { addCommentForCat };
