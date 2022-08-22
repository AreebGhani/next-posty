// Imports
import axios from "axios"; // Axios

// Login Function
export default async function login(req, res) {
  // Request Method is POST
  if (req.method === "POST") {
    // Data from Request Body
    const email = req.body.email;
    const password = req.body.password;

    // Api URL
    const url = "https://next-posty.herokuapp.com/login";

    // Data to Send as JSON
    const credentials = {
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
