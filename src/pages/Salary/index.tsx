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
  const [isOpen, setIsOpen] = useState(false);
  const totalSteps = 3;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(salarySchema),
  });
  const { request } = useAxios();
  const navigate = useNavigate();
  const formValues = getValues();
  const [step, setStep] = useState(1);
  const progressPercent = (step / totalSteps) * 100;
  // console.log(errors);

  const onSubmit = (data: any) => {
    // console.log(data);
    // return
    
    const url = `${import.meta.env.VITE_BASE_URL}salary/submit-salary`;

    const payload = {
      // ...data,
      base_salary: data?.base_salary,
      hoursWorked: data?.hoursWorked,
      bonus: data?.bonus,
      city: data?.city,
      satisfactionLevel: data?.satisfactionLevel,
      ptoWeeks: data?.ptoWeeks,
      practiceSetting: data?.practiceSetting,
      production_percentage: data?.prod_per,
      specialty: data?.specialty_raw,
      state: data?.state,
      insights_improvement: data?.insight1,
      insights_work_life_balance: data?.insight2,
      would_choose_specialty_again  : data?.chooseSpecialty,
      
      yearsOfExperience: data?.yearsOfExperience,
      compensation_type  :data?.compensationType,
      // specialty: data.specialty_raw || "", // replace specialty with specialty_raw
    };

    // delete payload.specialty_raw;

    request(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload, // ✅ send form data here
    })
      .then((res) => {
        console.log("Salary submitted:", res);
        if (res?.status === 201) {
          toast.success("Details Submitted Successfully");
          navigate("/thank-you");
        }
      })
      .catch(() => {
        toast.error("Error occurred while submitting salary", {
          autoClose: 3000,
        });
      });
  };

  // console.log(errors);

  return (
    <main className="container mx-auto md:px-4 md:py-8">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg p-6">
          {/* <div className="text-center mb-6">
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
          </div> */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Join <span className="text-blue-600">2,622</span> physicians
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-blue-700 mb-4 leading-relaxed">
              Help improve salary transparency in medicine 🚀
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl px-4 mb-6 max-w-2xl mx-auto">
              <div
                className={`flex ${
                  isOpen ? "items-start" : "items-center"
                } space-x-3`}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 ${
                      isOpen ? "mt-3" : "mt-0"
                    } bg-green-100 rounded-full flex items-center justify-center`}
                  >
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-green-900">
                        Our Mission: Free Data for All Physicians
                      </h3>
                      <svg
                        className={`w-5 h-5 text-green-700 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div>
                      <p className="text-green-800 text-sm leading-relaxed">
                        We're building the largest{" "}
                        <strong>free and open database</strong> of physician
                        compensation. Unlike expensive industry reports, our
                        data will{" "}
                        <strong>
                          always be accessible to every physician{" "}
                        </strong>
                        at no cost. Your contribution helps level the playing
                        field and empowers all doctors with transparent
                        compensation.
                      </p>
                      <div className="mt-3 flex justify-center">
                        <div className="flex items-start text-xs text-green-700 pb-2">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <span className="font-medium">
                            100% Free Forever • No Paywalls • Open Access
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-6">
              <svg
                className="w-4 h-4 text-green-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              <span className="text-sm font-medium text-green-800">
                100% Anonymous &amp; Secure
              </span>
            </div>
            <div className="bg-white rounded-full p-1 shadow-sm mb-2">
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {" "}
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
                trigger={trigger}
              />
            )}
            {step === 2 && (
              <CompensationDetails
                register={register}
                setValue={setValue}
                step={step}
                setStep={setStep}
                trigger={trigger}
                errors={errors}
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
                formValues={formValues}
              />
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default SalaryViewer;
