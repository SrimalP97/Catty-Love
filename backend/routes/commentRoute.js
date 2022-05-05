const express = require("express");
const router = express.Router();

const { addCommentForCat } = require("../models/commentModel");

// register user
router.route("/:id").post(addCommentForCat);
// router.route("/:id").get(getWishlistCats);
// router.route("/removecat/:id").post(removeCatFromWishList);

module.exports = router;
