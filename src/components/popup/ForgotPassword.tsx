import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "../../hooks/useAxios";
import { ForgotPswdSchema } from "../../validation";
import { toast } from "react-toastify";
import { FaXmark } from "react-icons/fa6";

const ForgotPassword = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const { request } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPswdSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form data submitted:", data);
    const url = `${import.meta.env.VITE_BASE_URL}/api/auth/forgot-password`;
    request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then(() => {
        // toast.success("Forgot Password Email sent successfully", {
        //   autoClose: 3000,
        // });
      })
      .catch((error) => {
        console.log(error);

        toast.error("Error occured while sending email", {
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <Dialog
        open={isOpen}
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
              {/* <div className="flex items-center justify-end">
                <FaXmark className="text-red-400 bg-black rounded-full p-1 text-lg" />
              </div> */}
              <button
                onClick={close}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 bg-black rounded-full p-1 text-xs"
                aria-label="Close"
              >
                <FaXmark className="text-lg" />
              </button>
              <DialogTitle as="h1" className=" text-center text-gray-700 py-4 ">
                <h3 className="text-2xl font-bold">Forgot Password</h3>
                <p className="text-justify text-sm mt-2">
                  If your email address is registered with us, you will receive
                  a password reset email shortly. Please check your inbox (and
                  spam folder) for further instructions.
                </p>
              </DialogTitle>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="mb-4">
                  <Input
                    label="Email"
                    fieldName="email"
                    register={register}
                    color="text-blue"
                    errors={errors}
                    placeholder="example@gmail.com"
                  />
                </div>
                <div className="my-4">
                  <Button
                    className="inline-flex items-center gap-2 w-full rounded-md bg-blue py-3 md:px-36 justify-center text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ForgotPassword;
