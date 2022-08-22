//Imports
import axios from "axios"; // Axios

// addPost Function
export default async function addPost(req, res) {
  // Request Method is POST
  if (req.method === "POST") {
    // Data from Request Body
    const heading = req.body.heading;
    const body = req.body.body;
    const addedBy = req.body.addedBy;
    const userId = req.body.userId;

    // Api URL
    const url = "https://next-posty.herokuapp.com/addpost";

    // Data to Send as JSON
    const post = {
      heading,
      body,
      addedBy,
      userId,
    };

    // Applying Try Catch
    try {
      // Requesting using Axios
      const { data } = await axios({
        url: url,
        method: "POST",
        data: post,
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
