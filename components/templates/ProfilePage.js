import ProfileForm from "@/components/module/ProfileForm";
import ProfileData from "/components/module/ProfileData";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

function ProfilePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const result = await res.json();
    if (
      result.status === "success" &&
      result.data.name &&
      result.data.lastName
    ) {
      setData(result.data);
    }
  };

  const submitHandler = async (data) => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    
    if (result.status === "success") {
      await fetchProfile(); 
      return { status: "success" };
    } else {
      return { status: "error", message: result.message };
    }
  };

  return (
    <div className="p-5">
      <h2 className="flex items-center mb-5 text-[#494a52] text-xl font-bold">
        <CgProfile className="mr-[10px]" />
        Profile
      </h2>

      {data ? (
        <ProfileData data={data} onUpdate={submitHandler} />
      ) : (
        <ProfileForm onSubmit={submitHandler} />
      )}
    </div>
  );
}

export default ProfilePage;
