// Imports
import axios from "axios"; // Axios

// Posts Function
export default async function posts(req, res) {
  // Request Method is POST
  if (req.method === "POST") {
    // Data from Request Body
    const num = req.body.num;

    // Api URL
    var url;
    if (num) {
      // If Page Number is Defined
      url = `https://next-posty.herokuapp.com/posts?page=${num}`;
    } else {
      // If page Number is Undefined
      url = `https://next-posty.herokuapp.com/posts`;
    }

    // Applying Try Catch
    try {
      // Requesting using Axios
      const { data } = await axios({
        url: url,
        method: "POST",
      });
      // Getting Response
      if (data.status === "OK") {
        // If Status is OK
        res.status(200).json(data);
      } else {
        // If an Error Occur
        res.status(200).json({ posts: false });
      }
    } catch (error) {
      // Catch an Error
      res.status(200).json(error);
    }
  } else {
    // If another Request Method
    res.status(500).send("Cannot " + req.method + " /");
  }
}
