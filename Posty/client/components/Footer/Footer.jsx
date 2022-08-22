// Imports
import Link from "next/link"; // Next Link

// Footer Component
export default function Footer() {
  // Get Local System Date Year
  var date = new Date().getFullYear();

  return (
    <>
      <footer className="Footer">
        © {date} - All Rights Reserved. -{" "}
        <Link href="/">
          <span className="link">Posty</span>
        </Link>
      </footer>
    </>
  );
}
