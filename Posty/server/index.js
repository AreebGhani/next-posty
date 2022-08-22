// constants
const PORT = process.env.PORT || 3000;

const DATABASE_URI =
  "mongodb+srv://AreebGhani:areebghani22112003@cluster0.3iosysx.mongodb.net/?retryWrites=true&w=majority";

// dependencies
import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes.js";

// create connection to database
mongoose.connect(DATABASE_URI);
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("connected", () => console.log("Connected to Database"));

// initiating the rest api
const app = express();

// middlewares
app.use(express.json());

// initialize routes
app.use("/", routes);

// starting our server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
