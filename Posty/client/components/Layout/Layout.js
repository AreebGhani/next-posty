// Imports
import NavBar from "../NavBar/NavBar"; // NavBar Component
import Footer from "../Footer/Footer"; // Footer Component

// Layout Component
function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
