// import { FieldError } from "react-hook-form";

interface RegisterInputProps {
  fieldName: string;
  register: any;
  placeholder: string;
  type: string;
  errors?: any;
}

const RegisterInput = ({
  fieldName,
  register,
  placeholder,
  type,
  errors,
}: RegisterInputProps) => {
  return (
    <div>
      <input
        type={type}
        id={fieldName}
        // name={fieldName}
        {...register(fieldName)}
        placeholder={placeholder}
        className={`mt-1 w-full p-3 border-2 rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue sm:text-sm 
          `}
        maxLength={fieldName === "phone_number" ? 10 : undefined}
      />
      {errors && (
        <p className="text-red-500 text-center font-bold text-xs italic">
          {errors.message}{" "}
        </p>
      )}
    </div>
  );
};

export default RegisterInput;
