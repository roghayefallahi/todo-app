function RadioButton({ status, setStatus, value, title, children }) {
  return (
    <div
      className={`bg-${value} flex items-center justify-between py-0 px-[10px] rounded-[10px] text-white mt-[10px] mx-0`}
    >
      <label htmlFor={value} className="text-white flex items-center">
        {children}
        {title}
      </label>
      <input
        className="ml-[10px] w-[18px] shadow-none"
        type="radio"
        id={value}
        value={value}
        checked={status === value}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
}

export default RadioButton;
