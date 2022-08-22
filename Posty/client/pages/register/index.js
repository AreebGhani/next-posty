// Imports
import { useState } from "react"; // useState
import Title from "../../components/Title/Title"; // Title
import axios from "axios"; // Axios
import { useRouter } from "next/router"; // Next Router

// Register Component
export default function Register() {
  // Using useRouter Function
  const router = useRouter();

  // Applying Middleware

  // For Guest User
  if (!localStorage.getItem("user")) {
    // If User Not Login

    // useStates
    const [name, setName] = useState(""); // For Handling Name Input Field
    const [email, setEmail] = useState(""); // For Handling Email Input Field
    const [password, setPassword] = useState(""); // For Handling Password Input Field

    // Submit Form Function
    const submit = async (e) => {
      // Preventing Form from Submission
      e.preventDefault();
      // Applying Validation
      if (!name || !email || !password) {
        // If Name or Email or Password Fields is Empty
        alert("Please fill all the fields");
      } else {
        // If all field are fill

        // Date to Send as JSON
        var credentials = {
          name,
          email,
          password,
        };

        // Applying Try Catch
        try {
          // Requesting using Axios
          const { data } = await axios({
            url: "/api/auth/register",
            method: "POST",
            data: credentials,
          });
          // Getting Response
          if (data.user) {
            // If User is Register
            alert("Register Succesfully");
            console.log("Register Succesfully");
            router.push("/login"); // Redirect to Login
          } else {
            // If an Error Occur
            alert("Email Already Exists");
            console.log(data);
          }
        } catch (error) {
          // Catch an Error
          alert("Something went wrong");
          console.log("Error: ", error);
        }
      }
    };

    // Function Register Return
    return (
      <>
        <Title title="Register" />
        <div className="formContainer">
          <form onSubmit={submit}>
            <label className="label">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              name="name"
              id="name"
              required
              autoComplete="true"
            />
            <br />
            <label className="label">Email</label>
            <br />
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              name="email"
              id="email"
              required
              autoComplete="true"
            />
            <br />
            <label className="label">Password</label>
            <br />
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              name="password"
              id="password"
              required
              autoComplete="true"
            />
            <br />
            <button type="submit" className="btn">
              Register
            </button>
            <br />
          </form>
        </div>
      </>
    );
  } else {
    // For Auth User
    router.push("/dashboard"); // Redirect to Dashboard
  }
}
