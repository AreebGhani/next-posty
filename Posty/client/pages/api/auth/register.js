// Imports
import axios from "axios"; // Axios

// Register Function
export default async function register(req, res) {
  // Request Method is POST
  if (req.method === "POST") {
    // Data from Request Body
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Api URL
    const url = "https://next-posty.herokuapp.com/register";

    // Data to Sens as JSON
    const credentials = {
      name,
      email,
      password,
    };

    // Applying Try Catch
    try {
      // Requesting using Axios
      const { data } = await axios({
        url: url,
        method: "POST",
        data: credentials,
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
