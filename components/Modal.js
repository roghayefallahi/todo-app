function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center overflow-y-scroll">
      <div className="bg-white p-5 rounded-lg w-[90%] max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl cursor-pointer">
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
