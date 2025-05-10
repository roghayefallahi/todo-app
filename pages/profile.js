import ProfilePage from "@/components/templates/ProfilePage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Profile() {

  const router = useRouter();
  const { status } = useSession();

   useEffect(() => {
    if (status === "unauthenticated" && router.pathname !== "/login") {
      router.replace("/login");
    }
  }, [status, router]);

  return <ProfilePage />;
}

export default Profile;
