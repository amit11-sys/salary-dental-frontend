import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { salarySchema } from "../../validation";
import BasicDetails from "./BasicDetails";
import CompensationDetails from "./CompensationDetails";
import Workload from "./Workload";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SalaryViewer = () => {
  const totalSteps = 3;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(salarySchema),
  });
const { request } = useAxios();
const navigate=useNavigate()
  const [step, setStep] = useState(1);
  const progressPercent = (step / totalSteps) * 100;

const onSubmit = (data: any) => {
  
  const url = `${import.meta.env.VITE_BASE_URL}salary/submit-salary`;

    const payload = {
    ...data,
    specialty: data.specialty_raw || "", // replace specialty with specialty_raw
  };

  delete payload.specialty_raw;

  request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data:payload, // ✅ send form data here
  })
    .then((res) => {
      console.log("Salary submitted:", res);
      if(res?.status===201){
        toast.success("Details Submitted Successfully")
        navigate("/")
      }
    })
    .catch(() => {
      toast.error("Error occurred while submitting salary", {
        autoClose: 3000,
      });
    });
};


    console.log(errors);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">
              Join <span className="text-[#4169E1]">2,477</span> doctors and
              help improve salary transparency! 🚀
            </h1>
            <div className="bg-gray-50 rounded-lg p-3 mt-3">
              <p className="text-gray-600 text-sm">
                Your data is anonymous and secure.{" "}
                <a className="text-blue-600" href="/privacy">
                  Privacy Policy
                </a>
                <span className="ml-2 bg-blue-600 text-white px-2 py-0.5 rounded text-sm">
                  SECURE
                </span>
              </p>
            </div>
            <p className="text-gray-600 mt-3 text-sm">
              Your contribution helps fellow physicians make informed career
              decisions
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-right text-gray-600 mt-1 text-sm">
              Step {step} of {totalSteps}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <BasicDetails
                watch={watch}
                register={register}
                setValue={setValue}
                step={step}
                setStep={setStep}
                errors={errors}
              />
            )}
            {step === 2 && (
              <CompensationDetails
                register={register}
                setValue={setValue}
                step={step}
                setStep={setStep}
              />
            )}
            {step === 3 && (
              <Workload
                register={register}
                watch={watch}
                setValue={setValue}
                step={step}
                setStep={setStep}
                errors={errors}
              />
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default SalaryViewer;
