// Imports
import { useState } from "react"; // useState
import Title from "../../components/Title/Title"; // Title
import axios from "axios"; // Axios
import { useRouter } from "next/router"; // Next Router

// Login Component
export default function Login() {
  // Using useRouter Function
  const router = useRouter();

  // Applying Middleware

  // For Guest Users
  if (!localStorage.getItem("user")) {
    // If User Not Login

    // use States
    const [email, setEmail] = useState(""); // For Handling Email Input Field
    const [password, setPassword] = useState(""); // For Handling Password Input Field

    // Submit Form Function
    const submit = async (e) => {
      // Preventing Form from Submission
      e.preventDefault();
      // Applying Validation
      if (!email || !password) {
        // If Email or Password Field is Empty
        alert("Please fill all the fields");
      } else {
        // If all field are fill

        // Date to Send as JSON
        var credentials = {
          email,
          password,
        };

        // Applying Try Catch
        try {
          // Requesting using Axios
          const { data } = await axios({
            url: "/api/auth/login",
            method: "POST",
            data: credentials,
          });
          // Getting Response
          if (data.user) {
            // If User is Login
            alert("Login Succesfully");
            console.log("Login Succesfully");
            localStorage.setItem("user", JSON.stringify(data.data)); // Saving User in Local Storage
            router.push("/dashboard"); // Redirect to Dashboard
          } else {
            // If an Error Occur
            alert("Invalid Credentails");
            console.log("Invalid Credentails");
          }
        } catch (error) {
          // Catch an error
          alert("Something went wrong");
          console.log("Error: ", error);
        }
      }
    };

    // Function Login Return
    return (
      <>
        <Title title="Login" />
        <div className="formContainer">
          <form onSubmit={submit}>
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
              Login
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
