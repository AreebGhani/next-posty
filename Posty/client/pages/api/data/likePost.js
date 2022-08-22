// Imports
import axios from "axios"; // Axios

// likePost Function
export default async function likePost(req, res) {
  // Request Method is POST
  if (req.method === "POST") {
    // Data from Request Body
    const postId = req.body.postId;
    const action = req.body.action;
    const userId = req.body.id;

    // Api URL
    const url = `https://next-posty.herokuapp.com/likepost?postId=${postId}&action=${action}&userId=${userId}`;

    // Applying Try Catch
    try {
      // Requesting using Axios
      const { data } = await axios({
        url: url,
        method: "POST",
      });
      // Getting Response
      res.status(200).json(data);
    } catch (error) {
      // Catch an Error
      res.status(200).json(error);
    }
  } else {
    // If another Request Method
    res.status(500).send("Cannot " + req.method + " /");
  }
}
