// Imports
import Link from "next/link"; // Next Link
import { useRouter } from "next/router"; /// Next Router

// NavBar Component
function NavBar() {
  // Using useRouter Function
  const router = useRouter();

  // Applying Middleware

  // For Auth Users
  if (localStorage.getItem("user")) {
    // If User Login

    var user = JSON.parse(localStorage.getItem("user")); // Getting User from Local Storage

    var name = user.name; // Getting User Name
    var userId = user._id; // Getting User Id

    // getUser Function
    const getUser = () => {
      router.push(`/user?userId=${userId}`); // Redirect to User Page
    };

    // Logout Function
    const logout = () => {
      var e = confirm("Do you want to Logout . . . ?"); // Confirming User
      if (e) {
        router.push("/logout"); // Redirect to Logout Page
      }
    };

    // Function NavBar Return
    return (
      <>
        <nav className="NavBar">
          <ul className="left">
            <Link href="/">
              <li className="navLink">Home</li>
            </Link>
            <Link href="/dashboard">
              <li className="navLink">Dashboard</li>
            </Link>
          </ul>
          <ul className="right">
            <li className="navLink" onClick={getUser}>
              {name}
            </li>
            <li className="navLink" onClick={logout}>
              Logout
            </li>
          </ul>
        </nav>
      </>
    );
  } else {
    // For Guest Users

    // Function NavBar Return
    return (
      <>
        <nav className="NavBar">
          <ul className="left">
            <Link href="/">
              <li className="navLink">Home</li>
            </Link>
          </ul>
          <ul className="right">
            <Link href="/login">
              <li className="navLink">Login</li>
            </Link>
            <Link href="/register">
              <li className="navLink">Register</li>
            </Link>
          </ul>
        </nav>
      </>
    );
  }
}

export default NavBar;
