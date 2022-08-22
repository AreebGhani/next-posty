// importing express
import express from "express";

// importing model
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

// initialize router
const router = express.Router();

// routes

// get

// "/"
router.get("/", async (req, res) => {
  res.send("Your server is ready!");
});

// "/posts"
router.get("/posts", async (req, res) => {
  try {
    const page = req.query.page || 0;
    const itemsPerPage = req.query.limit || 10;
    const totalPosts = await Post.find().count();
    var pageCount = totalPosts / itemsPerPage;
    var NumberBeforeDecimalPoint = Math.floor(pageCount);
    var NumberAfterDecimalPoint = (pageCount - NumberBeforeDecimalPoint) * 10;
    if (NumberAfterDecimalPoint > 0) {
      NumberBeforeDecimalPoint += 1;
    }
    pageCount = NumberBeforeDecimalPoint;
    var skip = (page - 1) * itemsPerPage;
    skip = skip > -1 ? skip : 0;
    var posts = await Post.find()
      .sort({ num: -1 })
      .limit(itemsPerPage)
      .skip(skip);
    if (posts) {
      res.json({
        status: "OK",
        posts: posts,
        total: totalPosts,
        pages: pageCount,
      });
    } else {
      res.json({ status: "error", post: false });
    }
  } catch (error) {
    res.json({ status: "error", post: false, error: error });
  }
});

// "/users"
router.get("/user", async (req, res) => {
  try {
    const user = await User.find({
      _id: req.query.userId,
    });
    const posts = await Post.find({
      userId: req.query.userId,
    });
    res.json({ status: "OK", data: { user, posts } });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});

// post

// "/register"
router.post("/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "OK", user: true });
  } catch (error) {
    res.json({ status: "error", error: "Email Error" });
  }
});

// "/login"
router.post("/login", async (req, res) => {
  const getUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (getUser) {
    res.json({ status: "OK", user: true, data: getUser });
  } else {
    res.json({ status: "error", user: false });
  }
});

// "/posts"
router.post("/posts", async (req, res) => {
  try {
    const page = req.query.page || 0;
    const itemsPerPage = req.query.limit || 10;
    const totalPosts = await Post.find().count();
    var pageCount = totalPosts / itemsPerPage;
    var NumberBeforeDecimalPoint = Math.floor(pageCount);
    var NumberAfterDecimalPoint = (pageCount - NumberBeforeDecimalPoint) * 10;
    if (NumberAfterDecimalPoint > 0) {
      NumberBeforeDecimalPoint += 1;
    }
    pageCount = NumberBeforeDecimalPoint;
    var skip = (page - 1) * itemsPerPage;
    skip = skip > -1 ? skip : 0;
    var posts = await Post.find()
      .sort({ num: -1 })
      .limit(itemsPerPage)
      .skip(skip);
    if (posts) {
      res.json({
        status: "OK",
        posts: posts,
        total: totalPosts,
        pages: pageCount,
      });
    } else {
      res.json({ status: "error", post: false });
    }
  } catch (error) {
    res.json({ status: "error", post: false, error: error });
  }
});

// "/getpost"
router.post("/getpost", async (req, res) => {
  try {
    const page = req.query.page || 0;
    const itemsPerPage = req.query.limit || 10;
    const totalPosts = await Post.find().count();
    var pageCount = totalPosts / itemsPerPage;
    var NumberBeforeDecimalPoint = Math.floor(pageCount);
    var NumberAfterDecimalPoint = (pageCount - NumberBeforeDecimalPoint) * 10;
    if (NumberAfterDecimalPoint > 0) {
      NumberBeforeDecimalPoint += 1;
    }
    pageCount = NumberBeforeDecimalPoint;
    var skip = (page - 1) * itemsPerPage;
    skip = skip > -1 ? skip : 0;
    var posts = await Post.find({ userId: req.query.userId })
      .sort({ num: -1 })
      .limit(itemsPerPage)
      .skip(skip);
    if (posts) {
      res.json({
        status: "OK",
        posts: posts,
        total: totalPosts,
        pages: pageCount,
      });
    } else {
      res.json({ status: "error", post: false });
    }
  } catch (error) {
    res.json({ status: "error", post: false, error: error });
  }
});

// "/addpost"
router.post("/addpost", async (req, res) => {
  try {
    var num = (await Post.find().count()) + 1;
    await Post.create({
      num: num,
      heading: req.body.heading,
      body: req.body.body,
      addedBy: req.body.addedBy,
      userId: req.body.userId,
      likedBy: ["no likes yet"],
      date: new Date(),
    });
    res.json({ status: "OK", post: "added" });
  } catch (error) {
    res.json({ status: "error", post: "error" });
  }
});

// "/delpost"
router.post("/delpost", async (req, res) => {
  try {
    await Post.remove({
      _id: req.query.postId,
    });
    res.json({ status: "OK", post: "deleted" });
  } catch (error) {
    res.json({ status: "error", post: "error" });
  }
});

// "/likepost"
router.post("/likepost", async (req, res) => {
  var post = await Post.find({
    _id: req.query.postId,
  });
  var getLike = post[0].likes;
  var likedBy = post[0].likedBy;
  var alreadyLiked = false;
  for (let i = 0; i < likedBy.length; i++) {
    if (likedBy[i] === req.query.userId) {
      alreadyLiked = true;
    }
  }
  var updateLikedBy = [];
  if (!alreadyLiked) {
    if (req.query.action === "like") {
      getLike += 1;
      updateLikedBy = [...likedBy, req.query.userId];
    }
  }
  if (alreadyLiked) {
    if (req.query.action === "unlike") {
      if (getLike > 0) {
        getLike -= 1;
        var index = likedBy.indexOf(req.query.userId);
        if (index > -1) {
          likedBy.splice(index, 1);
        }
        updateLikedBy = likedBy;
      }
    }
  }
  try {
    if (updateLikedBy.length !== 0) {
      const updateLike = await Post.updateMany(
        { _id: req.query.postId },
        {
          likes: getLike,
          likedBy: updateLikedBy,
        }
      );
      if (updateLike) {
        res.json({ status: "OK", post: req.query.action });
      } else {
        res.json({ status: "OK", post: false });
      }
    } else {
      res.json({ status: "error", post: "already " + req.query.action });
    }
  } catch (error) {
    res.json({ status: "error", post: "error" });
  }
});

// patch
router.patch("/", async (req, res) => {});

// put
router.put("/", async (req, res) => {});

// delete
router.delete("/", async (req, res) => {});

export default router;
