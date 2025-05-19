const Input = ({
  label,
  fieldName,
  register,
  color,
  errors,
  placeholder,
  field
}: any) => {
  return (
    <div>
      <label
        htmlFor={fieldName}
        className={`block text-sm pl-2 font-light ${color}`}
      >
        {label}
      </label>
      <input
        type={field}
        id={fieldName}
        // name={fieldName}
        placeholder={placeholder}
        {...register(fieldName)}
        className={`mt-1 w-full p-3 border-2 border-grey rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue sm:text-sm
          `}
      />
      {/* ${errors ? "border-red-500" : "border-grey"} */}
      {errors && (
        <p className="text-red-500 text-center font-bold text-xs italic">
          {errors.message}{" "}
        </p>
      )}
    </div>
  );
};

export default Input;
