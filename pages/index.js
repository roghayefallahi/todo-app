import HomePage from "@/components/templates/HomePage";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  return <HomePage />;
}
