import { useEffect, useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaEye, FaEyeSlash, FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { LoginSchema, RegisterSchema } from "../../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterInput from "../ui/RegisterInput";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
// import Login from "./Login";
import Dropdown from "../ui/Dropdown";
import { Countries } from "../../constant";
import Input from "../ui/Input";
import ForgotPassword from "./ForgotPassword";

const Auth = ({
  isRegisterOpen,
  isLoginOpen,
  close,
  setIsLoginOpen,
  setIsRegisterOpen,
}: {
  isRegisterOpen: boolean;
  isLoginOpen: boolean;
  close: () => void;
  setIsLoginOpen: any;
  setIsRegisterOpen: any;
}) => {
  const { request } = useAxios();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  //   const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPswdVisible, setConfirmPswdVisible] = useState(false)
  const [country, setCountry] = useState<any>("");
  const [countryCode, setCountryCode] = useState("+1");
  const [isError, setIsError] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  //   const [passwordVisible, setPasswordVisible] = useState(false);
  //   const [isForgotOpen, setIsForgotOpen] = useState(false);
  //   const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const countryCodes = [
    { code: "+1", country: "USA/Canada" },
    { code: "+52", country: "Mexico" },
  ];
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPswdVisibility = () => {
    setConfirmPswdVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (country) {
      setIsError(false);
    }
  }, [country]);

  const onSubmit = (data: any) => {
    if (data?.password !== data?.confirm_password) {
      toast.error("Password and Confirm Password doesn't match")
      return
    }

    if (country === "") {
      setIsError(true);
      return;
    }
    const payload = {
      ...data,
      country: country?.key,
      phone_number: data?.country_code + data?.phone_number,
    };
    delete payload.country_code;
    const url = `${import.meta.env.VITE_BASE_URL}/api/users/register`;
    request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    })
      .then((res) => {
        if (res?.status === 201) {
          login(JSON.stringify(data));
          close();
        }
      })
      .catch(() => {
        toast.error("Error occured while creating account", {
          autoClose: 3000,
        });
      });
  };

  // function closePopup() {
  //   setIsForgotOpen(false);
  //   setIsRegisterOpen(false);
  // }

  function openPopup() {
    setIsForgotOpen(true);
    close();
  }
  const changeState = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsRegisterOpen(!isRegisterOpen);
  };
  // const togglePasswordVisibility = () => {
  //   setPasswordVisible((prevState) => !prevState);
  // };
console.log(errors1)
  const onSubmit1 = (data: any) => {
    // console.log("Form data submitted:", data);
    const url = `${import.meta.env.VITE_BASE_URL}/api/auth/login`;
    request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        if (res?.data?.message === "Login successful") {
          login(JSON.stringify(res.data));
          close();
        }
      })
      .catch((error) => {
        console.log(error);

        toast.error("Error occured while login", {
          autoClose: 3000,
        });
      });
  };
  function closePopup() {
    setIsForgotOpen(false);
    setIsRegisterOpen(false);
  }

  return (
    <>
      <ForgotPassword isOpen={isForgotOpen} close={closePopup} />
      {isRegisterOpen && (
        <Dialog
          open={isRegisterOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          {/* <Login isOpen={isLoginOpen} close={close} />; */}
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center">
              <DialogPanel
                transition
                className="w-full shadow shadow-gray-300 flex flex-col items-center justify-center max-w-xl rounded-xl bg-white px-4 md:px-32 py-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <button
                  onClick={close}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-600 bg-black rounded-full p-1 text-xs"
                  aria-label="Close"
                >
                  <FaXmark className="text-lg" />
                </button>
                <DialogTitle
                  as="h1"
                  className="text-2xl flex flex-row gap-1 text-green pt-2 pb-2 md:pb-6 font-bold"
                >
                  Create an account
                </DialogTitle>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  <div className="mb-2">
                    <RegisterInput
                      fieldName="first_name"
                      register={register}
                      errors={errors.first_name}
                      placeholder="Enter your First Name"
                      type="text"
                    />
                  </div>

                  <div className="mb-2">
                    <RegisterInput
                      fieldName="last_name"
                      register={register}
                      errors={errors.last_name}
                      placeholder="Enter your Last Name"
                      type="text"
                    />
                  </div>

                  <div className="mb-2">
                    <RegisterInput
                      fieldName="email"
                      register={register}
                      errors={errors.email}
                      placeholder="Enter your Email"
                      type="email"
                    />
                  </div>

                  <div className="mb-2">
                    <div className="flex items-center space-x-8">
                      <select
                        {...register("country_code")}
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="px-2 py-4 border rounded w-1/2 text-xs"
                      >
                        {countryCodes.map((item) => (
                          <option
                            key={item.code}
                            value={item.code}
                            className=""
                          >
                            {item.code} ({item.country})
                          </option>
                        ))}
                      </select>

                      {/* Phone Number Input */}
                      <RegisterInput
                        fieldName="phone_number"
                        register={register}
                        errors={errors.phone_number}
                        placeholder="Enter your Phone Number"
                        type="text"
                      />
                    </div>
                  </div>

                  <Dropdown
                    selected={country}
                    setSelected={setCountry}
                    options={Countries}
                    isProfile={true}
                    placeholder="Select Country"
                  />
                  {isError && (
                    <p className="text-red-500 text-center font-bold text-xs italic">
                      {"Country is Required"}{" "}
                    </p>
                  )}
                  <div className="my-2">
                    <RegisterInput
                      fieldName="company_name"
                      register={register}
                      errors={errors.companyName}
                      placeholder="Enter your Company Name"
                      type="text"
                    />
                  </div>

                  <div className="mb-2 relative">
                    <RegisterInput
                      fieldName="password"
                      register={register}
                      errors={errors.password}
                      placeholder="Enter your Password"
                      type={passwordVisible ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute bottom-4 right-4"
                      aria-label="Toggle Password Visibility"
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <div className="mb-2 relative">
                    <RegisterInput
                      fieldName="confirm_password"
                      register={register}
                      errors={errors.confirm_password}
                      placeholder="Enter Confirm Password"
                      type={confirmPswdVisible ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPswdVisibility}
                      className="absolute bottom-4 right-4"
                      aria-label="Toggle Password Visibility"
                    >
                      {confirmPswdVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <div className="mb-2">
                    <Button
                      className=" w-full rounded-md bg-green w-78 h-12 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </div>
                </form>

                <div className="flex flex-row items-center justify-center py-4">
                  <h3 className="underline">Already have an account?</h3>
                  <h3
                    className="text-blue font-semibold underline ml-2 cursor-pointer"
                    onClick={changeState}
                  >
                    Login
                  </h3>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
      {isLoginOpen && (
        <Dialog
          open={isLoginOpen}
          as="div"
          className="relative z-10  focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full shadow shadow-gray-300 flex flex-col items-center justify-center max-w-xl rounded-xl bg-white px-4 md:px-32 py-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <button
                  onClick={close}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-600 bg-black rounded-full p-1 text-xs"
                  aria-label="Close"
                >
                  <FaXmark className="text-lg" />
                </button>
                <DialogTitle
                  as="h1"
                  className="text-2xl flex flex-row gap-1 text-gray-700 pt-4 pb-10 font-bold"
                >
                  {/* <h3>Hi,</h3> */}
                  <p className="text-blue">Welcome to PCB Hunter</p>
                </DialogTitle>
                <form onSubmit={handleSubmit1(onSubmit1)} className="w-full">
                  <div className="mb-4">
                    <Input
                      label="Email"
                      fieldName="email"
                      register={register1}
                      color="text-blue"
                      errors={errors1}
                      placeholder="example@gmail.com"
                      field="email"
                    />
                  </div>
                  <div className="mb-8 relative">
                    <Input
                      label="Password"
                      fieldName="password"
                      register={register1}
                      color="text-blue"
                      errors={errors1}
                      placeholder="Enter your Password"
                      field={passwordVisible ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute bottom-4 right-4"
                      aria-label="Toggle Password Visibility"
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-between w-80">
                    <div className="flex flex-row items-center gap-2">
                      <div></div>
                    </div>
                    <button
                      type="button"
                      className="text-red-600"
                      onClick={openPopup}
                    >
                      Forgot Password ?
                    </button>
                  </div>
                  <div className="my-4">
                    <Button
                      className="inline-flex items-center gap-2 w-full rounded-md bg-blue py-3 px-36 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      type="submit"
                    >
                      Login
                    </Button>
                  </div>
                </form>
                <div className="flex flex-row items-center justify-center gap-1 pt-4 pb-8">
                  <h3>Don't have an account ?</h3>
                  <h3
                    className=" cursor-pointer font-semibold"
                    onClick={changeState}
                  >
                    Sign Up
                  </h3>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Auth;
