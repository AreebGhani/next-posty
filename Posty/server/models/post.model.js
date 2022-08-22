// dependencies
import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
  {
    num: { type: Number, require: true },
    heading: { type: String, require: true },
    body: { type: String, require: true },
    addedBy: { type: String, require: true },
    userId: { type: String, require: true },
    likes: { type: Number, default: "0" },
    likedBy: [{ type: String, require: true }],
    date: { type: Date, require: true },
  },
  { collection: "posts" }
);

// export the created Schema
const Post = new mongoose.model("posts", postsSchema);

export default Post;
