// Imports
import axios from "axios"; // Axios

// delPost function
export default async function delPost(req, res) {
  // Request Method is POST
  if (req.method === "POST") {
    // Data from Request Body
    const postId = req.body.postId;

    // Api URL
    const url = `https://next-posty.herokuapp.com/delpost?postId=${postId}`;

    // Applying Try Catch
    try {
      // Requesting  using Axios
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
