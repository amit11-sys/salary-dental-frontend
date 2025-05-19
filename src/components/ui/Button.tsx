const Btn = ({ title, btnColor, className, onClick }:any) => {
  return (
    <div>
      <button
        className={`${className === "w-full" ? "w-full" : "w-40"} h-12 text-white text-xl font-bold rounded-[5px] ${btnColor}`}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Btn;
