import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import Dropdown from "../ui/Dropdown";
import { Countries } from "../../constant";

// Zod schema for address validation
const addressSchema = z.object({
  address_line_1: z.string().nonempty("Address is required"),
  address_line_2: z.optional(z.string()),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  phone_number: z.string().nonempty("State is required"),
  postal_code: z
    .string()
    .nonempty("Postal code is required")
    .regex(/^\d{5}$/, "Postal code must be 5 digits"),
});

// TypeScript type based on the schema
type AddressData = z.infer<typeof addressSchema>;
interface AddressModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressModal: React.FC<AddressModalProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  const { request } = useAxios();
  const [country, setCountry] = useState<any>();
  const [address, setAddress] = useState([]);
  const [addAddress, setAddAddress] = useState(false);
  // Use React Hook Form with Zod resolver
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
  });
  console.log(address);

  // Submit handler
  const onSubmit = (data: AddressData) => {
    const payload = {
      ...data,
      country: country?.key,
    };
    const url = `${import.meta.env.VITE_BASE_URL}/api/addresses`;
    request(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    })
      .then((res) => {
        if (res?.status === 201) {
          toast.success("Address Saved Successfully", {
            autoClose: 3000,
          });
          setAddAddress(false);
          getAddress()
        }
      })
      .catch(() => {
        toast.error("Error occured while saving address", {
          autoClose: 3000,
        });
      });
  };

  // Toggle modal visibility
  const toggleModal = () => setIsOpen(!isOpen);
  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/api/addresses/list`;
    request(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setAddress(res?.data?.addresses);
      })
      .catch(() => {
        toast.error("Error occured while saving address", {
          autoClose: 3000,
        });
      });
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10  focus:outline-none"
        onClose={toggleModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full shadow shadow-gray-300 flex flex-row items-center justify-center max-w-md rounded-xl bg-white py-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h1" className=" text-center text-gray-700 py-4 ">
                {addAddress ? (
                  <>
                    <h3 className="text-2xl font-bold my-4">Add Address</h3>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="text-sm"
                    >
                      {/* Street Address */}
                      <div className="mb-4 flex flex-row items-center justify-center">
                        {/* <label
                      htmlFor="street"
                      className="block mb-1 text-gray-700"
                    >
                      Address line 1
                    </label> */}
                        <Controller
                          name="address_line_1"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="text"
                              {...field}
                              placeholder="Enter address"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          )}
                        />
                        {errors.address_line_1 && (
                          <p className="text-red-500 text-sm">
                            {errors.address_line_1.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4 flex flex-row items-center justify-center">
                        {/* <label
                      htmlFor="street"
                      className="block mb-1 text-gray-700"
                    >
                      Address line 2
                    </label> */}
                        <Controller
                          name="address_line_2"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="text"
                              {...field}
                              placeholder="Enter address"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          )}
                        />
                        {errors.address_line_2 && (
                          <p className="text-red-500 text-sm">
                            {errors.address_line_2.message}
                          </p>
                        )}
                      </div>

                      {/* City */}
                      <div className="mb-4 flex flex-row items-center justify-center">
                        {/* <label htmlFor="city" className="block mb-1 text-gray-700">
                      City
                    </label> */}
                        <Controller
                          name="city"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="text"
                              {...field}
                              placeholder="Enter city"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          )}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      {/* State */}
                      <div className="mb-4 flex flex-row items-center justify-center">
                        {/* <label htmlFor="state" className="block mb-1 text-gray-700">
                      State
                    </label> */}
                        <Controller
                          name="state"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="text"
                              {...field}
                              placeholder="Enter state"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          )}
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm">
                            {errors.state.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4 flex flex-row items-center justify-center">
                        {/* <label htmlFor="state" className="block mb-1 text-gray-700">
                      State
                    </label> */}
                        <Controller
                          name="phone_number"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="text"
                              {...field}
                              placeholder="Enter state"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          )}
                        />
                        {errors.phone_number && (
                          <p className="text-red-500 text-sm">
                            {errors.phone_number.message}
                          </p>
                        )}
                      </div>

                      {/* Postal Code */}
                      <div className="mb-4 flex flex-row items-center justify-center">
                        {/* <label
                      htmlFor="postal_code"
                      className="block mb-1 text-gray-700"
                    >
                      Postal Code
                    </label> */}
                        <Controller
                          name="postal_code"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="text"
                              {...field}
                              placeholder="Enter postal code"
                              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          )}
                        />
                        {errors.postal_code && (
                          <p className="text-red-500 text-sm">
                            {errors.postal_code.message}
                          </p>
                        )}
                      </div>

                      <Dropdown
                        selected={country}
                        setSelected={setCountry}
                        options={Countries}
                        isProfile={true}
                      />

                      <div className="mt-6 flex justify-end gap-4">
                        <button
                          type="submit"
                          className="bg-blue text-white px-6 py-2 rounded-md hover:bg-blue-600"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="bg-green text-white px-6 py-2 rounded-md hover:bg-blue-600"
                          onClick={() => setAddAddress(false)}
                        >
                          Back
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      Select an Address
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      {address.map((item: any, index: number) => (
                        <label
                          key={index}
                          className="relative block border border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-lg focus-within:border-blue-500"
                        >
                          <input
                            type="radio"
                            name="selectedAddress"
                            className="absolute top-4 right-4 h-5 w-5 text-blue-600 focus:ring-blue-500"
                          /> 
                          <div className="mt-6">
                            {/* <p className="font-semibold text-gray-700">
                          Selected Address:
                        </p> */}
                            <p className="text-gray-600 text-sm">
                              Address - {item?.address_line_1} +{" "}
                              {item?.address_line_2} <br></br>
                              City/State - {item?.city}, {item?.state} <br></br>
                     
                              Postal Code - {item?.postal_code} <br></br>
                              {/* Country - {item?.country} <br></br> */}
                            </p>
                          </div>
                        </label>
                      ))}
                      <Button
                        className="bg-blue text-white px-6 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => setAddAddress(true)}
                      >
                        Add Address
                      </Button>
                    </div>
                  </div>
                )}{" "}
              </DialogTitle>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddressModal;
