import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploadFormData, fileValidationSchema } from "../../validation";
import { FaCloudArrowUp, FaXmark } from "react-icons/fa6";
import { toast } from 'react-toastify'
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const FileViewer = ({
    isOpen,
    close,
    selectedValues,
    material,
    length,
    width,
    state
}: {
    isOpen: boolean;
    close: () => void;
    selectedValues: any
    material: any,
    length: any,
    width: any,
    state: any
}) => {
    const { request } = useAxios();
    const { user } = useAuth()
    const navigate = useNavigate()
    const { shipping_charges, price, orderId, timeline } = state
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FileUploadFormData>({
        resolver: zodResolver(fileValidationSchema),
    });

    const handleNavigate = (fileName: any, comment: any) => {
        return navigate("/order", {
            state: {
                values: selectedValues,
                material: material,
                price,
                timeline,
                orderId,
                shipping_charges,
                length,
                width,
                fileName: fileName !== null ? fileName : undefined,
                comment: comment !== null ? comment : undefined,
            },
        })
    }

    const onSubmit = (data: FileUploadFormData) => {
        // console.log("Form data submitted:", data);
        const payload = {
            order_id: orderId, ...data
        }
        if (data?.file) {
            const url = `${import.meta.env.VITE_BASE_URL}/api/files/upload-gerber`;
            request(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                    "Content-Type": "multipart/form-data",
                },
                data: payload,
            })
                .then(() => {
                    handleNavigate(data?.file?.name, data?.additional_comments)
                })
                .catch((error) => {
                    console.log(error);

                    toast.error("Error occured while sending email", {
                        autoClose: 3000,
                    });
                });
        } else {
            toast.error("No file selected")
        }

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
                            className="w-full shadow shadow-gray-300 flex flex-col items-center justify-center max-w-3xl rounded-xl bg-white px-4 md:px-16 py-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
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
                            <DialogTitle as="h1" className=" text-center text-gray-700 pt-4 flex flex-row gap-2 ">
                                <FaCloudArrowUp className="text-3xl text-green" />
                                <h3 className="text-2xl font-bold ">Upload Gerber Files</h3>
                            </DialogTitle>
                            <p className="text-justify text-sm my-4 text-gray-400 px-12">
                                Layers : {selectedValues?.layers?.label},
                                Thickness : {selectedValues?.thickness?.label}, Finished Copper : {selectedValues?.["finished-copper"]?.label}, Solder Mask : {selectedValues?.solder_mask?.label}, Silkscreen : {selectedValues?.silkscreen?.label}
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="border-dotted border-2 py-4 w-full rounded-md px-2 border-blue bg-gray-200">
                                    {/* <div>
        <label htmlFor="file">Upload a file:</label> */}
                                    <Controller
                                        name="file"
                                        control={control}
                                        defaultValue={undefined}
                                        render={({ field }) => (
                                            <input
                                                type="file"
                                                accept=".rar,.zip,.7z"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    field.onChange(file);
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.file && <p className="text-xs text-red-400">{errors.file.message}</p>}
                                    {/* </div> */}
                                    <p className="text-xs text-gray-400 mt-3">(Only files with extension .rar, .zip or.7z are allowed and its maxium size should be upto 50mb)</p>
                                    <div className="mt-4">
                                        <label className="text-sm">Other Information (optional)</label>
                                        <textarea className="w-full border border-gray-400 text-sm rounded-lg p-2 min-h-20 mt-1" {...register("additional_comments")} placeholder="Please fill in any PCB details to make it as clear as possible for us to understand tour requirements." />
                                    </div>
                                </div>
                                <div className="my-4 flex flex-row gap-4 items-end justify-end">
                                    <Button
                                        className=" rounded-md bg-green py-3 px-6 justify-center text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                        type="button"
                                        onClick={() => handleNavigate(null, null)}
                                    >
                                        Skip Upload
                                    </Button>
                                    <Button
                                        className=" rounded-md bg-blue py-3 px-6 justify-center text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                        type="submit"
                                    >
                                        Submit Order
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

export default FileViewer;
