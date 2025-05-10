import ProfilePage from "@/components/templates/ProfilePage";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function Profile() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  return <ProfilePage />;
}

export default Profile;
