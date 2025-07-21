"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { compaireSalarySchema } from "../../validation";
import { z } from "zod";
// import { practiceOptions } from "@/lib/constants"; // example options
import { useState } from "react";
import { debounce, usStates } from "../../lib/constant";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

type SalaryFormType = z.infer<typeof compaireSalarySchema>;

const SalaryComparison = () => {
  const { request } = useAxios();
  const [specialities, setSpecialities] = useState<any>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // console.log(specialities);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SalaryFormType>({
    resolver: zodResolver(compaireSalarySchema),
  });
  const speciality=watch("specialty");

  // const [submittedData, setSubmittedData] = useState<SalaryFormType | null>(null);

  const onSubmit = (data: SalaryFormType) => {
    // console.log(data, "submitted data");

    const queryParams = new URLSearchParams({
      compensation: data.totalCompensation,
      yearsOfExperience: data.yearsOfExperience?.toString() || "",
      specialty: data.specialty || "",
      practice: data.practiceSetting || "",
      state: data.state || "",
    });
    const url = `${
      import.meta.env.VITE_BASE_URL
    }salary/compensation-analysis?${queryParams.toString()}`;
    request(url, {
      method: "GET",
    })
      .then((res) => {
        console.log(res, "request");
        setAnalysis(res?.data);
        setIsSubmitted(true);
      })
      .catch(() => {
        toast.error("Error occurred while getting specialities", {
          autoClose: 3000,
        });
      });
  };
  // console.log(submittedData)

  const practiceOptions = [
    {
      key: 1,
      name: "Private Practice (Solo)",
      value: "Private Practice (Solo)",
    },
    {
      key: 2,
      name: "Private Practice (Group)",
      value: "Private Practice (Group)",
    },
    {
      key: 3,
      name: "Dental Service Organization (DSO) / Corporate Dentistry",
      value: "Dental Service Organization (DSO) / Corporate Dentistry",
    },
    {
      key: 4,
      name: "Community Health Center (CHC)",
      value: "Community Health Center (CHC)",
    },
    { key: 5, name: "Academic Dentistry", value: "Academic Dentistry" },
    {
      key: 6,
      name: "Public Health Dentistry",
      value: "Public Health Dentistry",
    },
    { key: 7, name: "Military Dentistry", value: "Military Dentistry" },
    {
      key: 8,
      name: "Correctional Facility Dentistry",
      value: "Correctional Facility Dentistry",
    },
    { key: 9, name: "Mobile Dentistry", value: "Mobile Dentistry" },
    {
      key: 10,
      name: "School-Based Dentistry",
      value: "School-Based Dentistry",
    },
  ];
  const fetchSuggestions = debounce((e: any) => {
    const query = e.target.value;
    if (!query || query?.length < 2) return;

    // setLoading(true);
    const url = `${
      import.meta.env.VITE_BASE_URL
    }speciality?key=${encodeURIComponent(query)}`;
    request(url, {
      method: "GET",
    })
      .then((res) => {
        console.log(res, "request");
        setSpecialities(res?.data);
      })
      .catch(() => {
        toast.error("Error occurred while getting specialities", {
          autoClose: 3000,
        });
      });
  }, 300);

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Dental Salary Comparison Tool
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                BETA
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Compare your compensation with peers in your specialty and
              location
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="bg-white rounded-lg  p-8 max-w-xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Enter Your Details
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  {/* Total Compensation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Compensation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("totalCompensation")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="$250,000"
                    />
                    {errors.totalCompensation && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.totalCompensation.message}
                      </p>
                    )}
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience (Optional)
                    </label>
                    <input
                      type="number"
                      {...register("yearsOfExperience")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter years"
                    />
                    {errors.yearsOfExperience && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.yearsOfExperience.message}
                      </p>
                    )}
                  </div>

                  {/* Specialty */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Medical Specialty <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for specialty or subspecialty..."
                        className="w-full px-2 py-3 border-2 rounded-xl text-base transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 border-gray-200 hover:border-gray-300"
                        autoComplete="off"
                        {...register("specialty")}
                        onChange={fetchSuggestions}
                      />

                      {errors.specialty && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors?.specialty?.message}
                        </p>
                      )}

                      {specialities?.length > 0 && (
                        <ul
                          className="absolute z-10 bg-white border w-full mt-1 rounded shadow text-sm max-h-60 overflow-auto"
                          role="listbox"
                        >
                          {specialities.map((item: any) => (
                            <li
                              key={item._id}
                              onMouseDown={() => {
                                // setShouldShowSuggestions(false); // prevent re-fetch

                                setValue(
                                  "specialty",
                                  item.speciality && item.sub_specialty
                                    ? `${item.speciality} - ${item.sub_specialty}`
                                    : item.speciality || ""
                                );
                                // setValue("sub_speciality", item.sub_specialty || "");
                                // setValue("specialty_raw", item.speciality || "");

                                setSpecialities([]); // hide list

                                // Re-enable backend fetch after short delay
                                // setTimeout(() => setShouldShowSuggestions(true), 300);
                              }}
                              className="p-2 hover:bg-gray-100 cursor-pointer"
                              role="option"
                            >
                              {item.speciality && item.sub_specialty
                                ? `${item.speciality} - ${item.sub_specialty}`
                                : item.speciality || ""}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  {/* state Setting */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location (Optional)
                    </label>
                    <select
                      {...register("state")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Locations</option>
                      {usStates.map((option) => (
                        <option key={option.key} value={option.abbreviation}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Practice Setting */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Practice Setting (Optional)
                    </label>
                    <select
                      {...register("practiceSetting")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Practice Settings</option>
                      {practiceOptions.map((option) => (
                        <option key={option.key} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Analyze My Salary
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              {isSubmitted && analysis ? ( <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Your Analysis
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Your Compensation:
                  </label>
                  <p className="text-3xl font-bold text-gray-900">${analysis?.yourCompensation}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Market Average:
                  </label>
                  <p className="text-3xl font-bold text-gray-900">${analysis?.marketAverage}</p>
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Percentile:
                  </label>
                  <p className="text-2xl font-semibold text-blue-600">Bottom</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Grade:
                  </label>
                  <p className="text-2xl font-semibold text-yellow-600">C</p>
                </div> */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    Your compensation is significantly below market rate.
                    Consider exploring other opportunities.
                  </p>
                </div>
                <div className="text-sm text-gray-500 mt-4">
                  Based on {analysis?.totalParsed} {speciality} across the US{" "}
                </div>
                <button className="mt-6 w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Help Others By Submitting Your Salary
                </button>
              </div>
              </> ) : (
                <div className="text-center text-gray-500">
                  <p className="text-lg mb-4">
                    Enter your details to see how your salary compares with
                    others in your specialty.
                  </p>
                  <p className="text-sm">
                    Your data will help improve the accuracy of our salary
                    database.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-16 prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About Our Dental Salary Comparison Tool
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our dental salary comparison tool provides real-time insights
              into medical compensation across all 50 states and major medical
              specialties. Whether you're a practicing dental, in residency,
              or considering a career move, this tool helps you understand your
              market value based on actual compensation data from our dental
              salary database.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              How to Use the Salary Comparison Tool
            </h3>
            <ol className="list-decimal pl-6 mb-8 space-y-2">
              <li className="text-gray-700">
                Enter your total annual compensation
              </li>
              <li className="text-gray-700">Select your years of experience</li>
              <li className="text-gray-700">Choose your medical specialty</li>
              <li className="text-gray-700">
                Optionally select your state for regional comparison
              </li>
              <li className="text-gray-700">
                Optionally specify your practice setting
              </li>
            </ol>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Understanding Your Results
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              The tool analyzes your input against our comprehensive database of
              dental salaries. You'll receive:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li className="text-gray-700">
                Your percentile ranking among peers
              </li>
              <li className="text-gray-700">
                Market average for your specialty and location
              </li>
              <li className="text-gray-700">
                A grade assessment of your compensation
              </li>
              <li className="text-gray-700">
                Personalized recommendations based on the analysis
              </li>
            </ul>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Compare Dental Salaries?
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Salary transparency is crucial in the medical field. Our tool
              helps dental:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li className="text-gray-700">
                Negotiate better compensation packages
              </li>
              <li className="text-gray-700">Make informed career decisions</li>
              <li className="text-gray-700">
                Understand regional salary variations
              </li>
              <li className="text-gray-700">Plan career progression</li>
            </ul>
            <p className="text-lg text-gray-700 mt-8">
              Looking to calculate your take-home pay? Use our Dental Take
              Home Calculator to estimate your after-tax income.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default SalaryComparison;
