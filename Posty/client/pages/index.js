// Imports
import { useRouter } from "next/router"; // Next Router

// Index Component
export default function Index() {
  // Using useRouter Function
  const router = useRouter();
  // Redirect to Home
  router.push("/home");
  // Function Index Return
  return <></>;
}
