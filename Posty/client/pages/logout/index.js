// Imports
import { useRouter } from "next/router"; // Next Router

// Logout Function
export default function Logout() {
  // Using useRouter Function
  const router = useRouter();
  // Clearing Saved User
  localStorage.clear();
  // Redirect to Login
  router.push("/login");
}
