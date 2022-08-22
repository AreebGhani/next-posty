// Imports
import axios from "axios"; // Axios

// getPost Function
export default async function getPost(req, res) {
  // Request Method is POST
  if (req.method === "POST") {
    // Data from Request Body
    const id = req.body.id;
    const num = req.body.num;

    // Api URL
    var url;
    if (num) {
      // If Page Number is Defined
      url = `https://next-posty.herokuapp.com/getpost?userId=${id}&page=${num}`;
    } else {
      // If Page Number is Undefined
      url = `https://next-posty.herokuapp.com/getpost?userId=${id}`;
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
