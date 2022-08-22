// Imports
import { useState, useEffect } from "react"; // useState | useEffect
import "../styles/globals.css"; // Global CSS
import Layout from "../components/Layout/Layout"; // Layouts

// MyApp Function
function MyApp({ Component, pageProps }) {
  // Wait Document For Loading Local Storage

  // useStates
  const [load, setLoad] = useState(null);

  // Applying useEffect
  useEffect(() => {
    const value = localStorage; // Getting Local Storage
    const load = !!value ? value : undefined; // Applying Condition
    setLoad(load); // Updatindg State
  }, []);

  if (!load) {
    // If Not Load Return Loading
    return (
      <>
        <div className="postContainer">
          <h1 className="text-center">Loading . . .</h1>
        </div>
      </>
    );
  } else {
    // If Load Return MyApp
    return (
      <>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}

export default MyApp;
