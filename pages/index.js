import HomePage from "@/components/templates/HomePage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" && router.pathname !== "/login") {
      router.replace("/login");
    }
  }, [status, router]);
  
  if (status !== "authenticated") {
    return null; // جلوگیری از نمایش هرگونه محتوا
  }

  return <HomePage />;
}
