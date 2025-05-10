import { CiEdit } from "react-icons/ci";
import Modal from "../Modal";
import ProfileForm from "./ProfileForm";
import { useState } from "react";

function ProfileData({ data, onUpdate }) {
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = async (updatedData) => {
    const result = await onUpdate(updatedData);
    if (result.status === "success") {
      setShowModal(false);
    }
    return result; 
  };

  return (
    <>
      <div className="mt-5">
        <div className="flex items-center mb-[10px]">
          <span className="text-[#7f7e86] text-[1rem] mr-[5px]">Name: </span>
          <p className="text-xl text-[#494a52] font-medium">{data.name}</p>
        </div>
        <div className="flex items-center mb-[10px]">
          <span className="text-[#7f7e86] text-[1rem] mr-[5px]">
            Last Name:{" "}
          </span>
          <p className="text-xl text-[#494a52] font-medium">{data.lastName}</p>
        </div>
        <div className="flex items-center mb-[10px]">
          <span className="text-[#7f7e86] text-[1rem] mr-[5px]">Email: </span>
          <p className="text-xl text-[#494a52] font-medium">{data.email}</p>
        </div>
        <CiEdit
          className="text-3xl cursor-pointer mt-5"
          onClick={() => {
            setShowModal(true);
          }}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ProfileForm initialData={data} onSubmit={handleUpdate} submitLabel="Update" />
      </Modal>
    </>
  );
}

export default ProfileData;
