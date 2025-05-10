import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProfileForm({ initialData = {}, onSubmit, submitLabel = "Submit" }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setLastName(initialData.lastName || "");
    }
  }, []);

  const handleSubmit = async () => {
    const payload = {
      name,
      lastName,
      password,
    };
  
    const result = await onSubmit(payload);
    console.log(result);

    if (result?.status === "success") {
      toast.success("Profile updated successfully.");
      setPassword("");
    } else {
      toast.error(result?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="mt-5">
        <div className="flex flex-col mb-5">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="last-name">Last Name:</label>
          <input
            id="last-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="border-none text-[1.4rem] flex items-center bg-[#d6d6d6] text-[#727272] py-[5px] px-5 rounded-[10px] cursor-pointer"
      >
        {submitLabel}
      </button>
    </>
  );
}

export default ProfileForm;
