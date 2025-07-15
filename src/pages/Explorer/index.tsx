import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { salaryViewerSchema } from "../../validation";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { debounce, practiceOptions, usStates } from "../../lib/constant";
import CustomDropdown from "../../components/Dropdown";
import EmploymentCard from "../../components/cards/EmploymentCard";
import { ChartComponent } from "../../components/Chart";
import SpecialityCard from "../../components/cards/SpecialityCard";
import { Link } from "react-router-dom";

const SalaryExplorer = () => {
  const { request } = useAxios();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(salaryViewerSchema),
  });
  const watchSpecialty = watch("specialty");
  const stateInput = watch("state");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [filteredStates, setFilteredStates] = useState<typeof usStates>([]);
  const [salaryData, setSalaryData] = useState([]);
  const [practiceData, setPracticeData] = useState([]);
  const [overallSummary, setOverallSummary] = useState<any>([]);
  const [topSpecialitites, setTopSpecialitites] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [avgHourlyRate, setAvgHourlyRate] = useState<number | null>(null);
  const [showData, setShowData] = useState(false);
const [percentiles, setPercentiles] = useState<{
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
} | null>(null); // or `undefined`

  const handleSuggestionClick = () => {
    setSuggestions([]);
  };
  useEffect(() => {
    if (watchSpecialty && watchSpecialty.length > 1) {
      fetchSuggestions(watchSpecialty);
    }
  }, [watchSpecialty]);
  useEffect(() => {
    if (!stateInput) {
      setFilteredStates([]);
      return;
    }

    const results = usStates.filter((state) =>
      state.name.toLowerCase().includes(stateInput.toLowerCase())
    );
    setFilteredStates(results);
  }, [stateInput]);
  const fetchSuggestions = debounce((query: string) => {
    if (!query || query.length < 2) return;

    // setLoading(true);
    const url = `${import.meta.env.VITE_BASE_URL}speciality?key=${query}`;
    request(url, {
      method: "GET",
    })
      .then((res) => {
        setSuggestions(res?.data);
      })
      .catch(() => {
        toast.error("Error occurred while getting specialities", {
          autoClose: 3000,
        });
      });
  }, 300); // 300ms debounce
  // useEffect(() => {
  //   // Simulate default user input
  //   fetchSuggestions("op"); // or any keyword to fetch initial data
  // }, []);
  console.log(errors);
  
  const onSubmit = (data: Record<string, any>) => {
    const payload = {
      ...data,
      specialty: data.specialty_raw || "", 
     ...(data.practiceSetting !== undefined && { practice: data.practiceSetting })
      
    };

    const queryParams = new URLSearchParams(payload).toString();
    const url = `${
      import.meta.env.VITE_BASE_URL
    }salary/search-salaries?${queryParams}`;

    request(url, {
      method: "GET",
    })
      .then((res: any) => {
        console.log("Salary fetched:", res?.data);
        setSalaryData(res?.data?.data);
        setPracticeData(res?.data?.summary);
        setOverallSummary(res?.data?.overallSummary);
        setTopSpecialitites(res?.data?.topSatisfactionSpecialties);
        setPercentiles(res?.data?.percentile);
        setAvgHourlyRate(res?.data?.avgHourlyRate);
        setTotalRecords(res?.data?.totalParsed);
        setShowData(true);
      })
      .catch(() => {
        toast.error("Error occurred while fetching salary", {
          autoClose: 3000,
        });
      });
  };

  // const [hasAutoSelected, setHasAutoSelected] = useState(false);
  //   useEffect(() => {
  //     if (suggestions.length > 0 && !hasAutoSelected) {
  //       console.log(hasAutoSelected);

  //       const item = suggestions[0];

  //       handleSuggestionClick();
  //       setValue(
  //         "specialty",
  //         item?.speciality && item?.sub_specialty
  //           ? `${item.speciality} - ${item.sub_specialty}`
  //           : item?.speciality || ""
  //       );
  //       setValue("sub_speciality", item?.sub_specialty || "");
  //       setValue("specialty_raw", item?.speciality || "");

  //       setHasAutoSelected(true);
  //     }
  //   }, [suggestions, hasAutoSelected]);
  // console.log(hasAutoSelected);

  const handleStateSuggestion = (state: (typeof usStates)[number]) => {
    setValue("state", state.name);
    setFilteredStates([]);
  };
  return (
    <main className="container mx-auto md:px-4 md:py-8">
      <div className="max-w-7xl mx-auto px-0 md:px-4 lg:px-8 py-8">
        <header className="mb-6 mt-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Dental Salary Explorer
            </h1>
            <p className="text-gray-600 mt-2 mb-6">
              Explore real dental salary data by specialty, location, and
              practice type. Updated daily with anonymous submissions from
              verified physicians.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap gap-4 items-center mt-4">
                <div className="flex-1 min-w-[200px] relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for specialty or subspecialty..."
                      className="w-full p-2.5 border rounded-lg text-sm"
                      value={watch("specialty")}
                      onChange={(e) => {
                        const query = e.target.value;
                        setValue("specialty", query);
                        // setHasAutoSelected(false); // re-enable auto-select for new search
                        fetchSuggestions(query);
                      }}
                      autoComplete="off"
                    />
                    {/* {errors.specialty && (
  <p className="text-red-500 text-sm mt-1">{errors?.specialty?.message}</p>
)} */}

                    {suggestions.length > 0 && (
                      <ul
                        className="absolute z-10 bg-white border w-full mt-1 rounded shadow text-sm max-h-60 overflow-auto"
                        role="listbox"
                      >
                        {suggestions.map((item: any) => (
                          <li
                            key={item?._id}
                           onClick={() => {
  const displayValue =
    item?.speciality && item?.sub_specialty
      ? `${item.speciality} - ${item.sub_specialty}`
      : item?.speciality || "";

  setValue("specialty", displayValue); // updates input
  setValue("sub_speciality", item?.sub_specialty || "");
  setValue("specialty_raw", item?.speciality || "");

  setSelectedSpecialty(displayValue); // ✅ only set when user selects
  handleSuggestionClick(); // optional
}}

                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            role="option"
                          >
                            {item?.speciality && item?.sub_specialty
                              ? `${item.speciality} - ${item.sub_specialty}`
                              : item?.speciality || ""}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="relative">
                  {/* <label className="block text-base font-semibold text-blue-600 mb-1.5">
            State (Required)
          </label> */}
                  <input
                    type="text"
                    placeholder="Search State..."
                    className="w-full p-2.5 border rounded-lg text-sm"
                    {...register("state")}
                    autoComplete="off"
                  />

                  {/* {errors.state && (
    <p className="text-red-500 text-sm mt-1">
      {errors.state.message}
    </p>
  )} */}

                  {filteredStates.length > 0 && (
                    <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow text-sm max-h-60 overflow-auto">
                      {filteredStates.map((item) => (
                        <li
                          key={item.key}
                          onClick={() => handleStateSuggestion(item)}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="w-full md:w-auto relative">
                  <CustomDropdown
                    setValue={setValue}
                    options={practiceOptions}
                    placeholder={"Select Practice"}
                    fieldName="practiceSetting"
                  />
                </div>
                <button className="px-6 py-2.5 bg-[#3B3C84] text-white font-semibold rounded-lg hover:bg-[#2E2F6F] transition-colors">
                  Search
                </button>
              </div>
            </form>
          </div>
        </header>

        <div
          className="bg-blue-100 border border-blue-200 rounded-lg p-4 hidden md:flex items-center"
          style={{ marginTop: "0px" }}
        >
          <div className="text-blue-700 mr-3">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </div>
          <p className="text-blue-800">
            Trusted by our community of 8,000+ followers on X -{" "}
            <a
              href="https://x.com/salarydental"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Follow us @salarydental
            </a>{" "}
            for salary insights and career tips.
          </p>
        </div>
{showData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className=" bg-white shadow-md rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedSpecialty} in All Regions
                </h2>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900">
                      ${avgHourlyRate}/hr
                    </span>
                    <span className="text-gray-600">
                      Avg Total Comp ({totalRecords} Salaries)
                    </span>
                  </div>
                  {/* <div className="text-gray-500 mt-1">Updated 5/16/2025</div> */}
                </div>
                <ChartComponent percentiles={percentiles} />
              </div>
            </div>
            <div className="">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Comparison by Employment Type
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {practiceData && practiceData?.length > 0 ? (
                    practiceData.map((item: any) => (
                      <div key={item?._id}>
                        <EmploymentCard
                          practice={item?.practiceSetting}
                          compensation={item?.avgTotalCompensation}
                          submissions={item?.submissionCount}
                        />
                      </div>
                    ))
                  ) : (
                    <>No records found</>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-[#ECFDF3] border border-[#D1FADF] rounded-lg p-4 flex items-center gap-3">
              <div className="text-[#027A48]">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  ></path>
                </svg>
              </div>
              <p className="text-[#027A48]">
                Help other physicians make informed career decisions -{" "}
                <button className="underline hover:text-[#027A48]/80">
                  refer a colleague
                </button>{" "}
                to continue growing the community.
              </p>
            </div>
            <div className="mt-8 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4 px-6 pt-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Recent Submissions
                </h2>
                <Link
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  to="/all-salaries"
                >
                  View All Salaries
                  <svg
                    className="w-5 h-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
              <div className="hidden md:block overflow-x-auto px-6">
                <div className="w-full">
                  <div className="md:inline-block min-w-full align-middle">
                    <div>
                      <div
                        className="block md:hidden"
                        style={{
                          height: "calc(-150px + 100vh)",
                          maxHeight: "80vh",
                          overflow: "auto",
                          position: "relative",
                          willChange: "transform",
                        }}
                      >
                        <table className="min-w-full table-auto">
                          <thead className="bg-[#EEF2FF] sticky top-0 z-10">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-[#4B587C] uppercase tracking-wider"
                              >
                                Posted
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-[#4B587C] uppercase tracking-wider"
                              >
                                Specialty
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-2 text-right text-xs font-medium text-[#4B587C] uppercase tracking-wider"
                              >
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                colSpan={3}
                                className="p-0 border-t border-gray-200"
                              >
                                <div
                                  style={{
                                    height: "400px",
                                    width: "100%",
                                    position: "relative",
                                  }}
                                ></div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="hidden md:block overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-[#F7F8FB]">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Posted
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Specialty
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Location
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Practice Type
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Total Comp
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {salaryData && salaryData?.length > 0 ? (
                              salaryData.map((item: any) => (
                                <tr
                                  className="hover:bg-gray-50 cursor-pointer "
                                  key={item?._id}
                                >
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                      {item?.createdAt &&
                                      !isNaN(new Date(item.createdAt).getTime())
                                        ? new Date(
                                            item.createdAt
                                          ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                          })
                                        : ""}
                                    </div>
                                  </td>
                                  <td className="px-4 py-2">
                                    <div className="text-sm text-gray-900 font-medium">
                                      {item?.specialty}
                                    </div>
                                  </td>
                                  <td className="px-4 py-2">
                                    <div className="text-sm text-gray-900">
                                      {item?.state}
                                    </div>
                                  </td>
                                  <td className="px-4 py-2">
                                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium inline-block whitespace-nowrap min-w-[110px] text-center">
                                      {item?.practiceSetting}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {item?.yearsOfExperience} years experience
                                    </div>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="text-sm font-medium text-[#6366F1]">
                                      ${item?.base_salary}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Bonus/Incentive ${item?.bonus}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  className="text-center text-sm text-gray-900 font-medium"
                                  colSpan={5}
                                >
                                  No records found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="md:hidden px-0 pb-12 space-y-2">
                <div className="sticky top-0 z-10 bg-white px-4 py-3 border-b border-gray-200 shadow-sm">
                  <div className="flex flex-col space-y-3">
                    <h2 className="text-lg font-bold text-gray-900">
                      Hospital Medicine Salaries
                    </h2>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 relative">
                        <input
                          placeholder="Search specialties..."
                          className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          type="text"
                          value="Hospital Medicine"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <button className="py-2 px-3 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-4 space-y-4 pt-2">
                  <div
                    className="bg-gradient-to-r from-white to-indigo-50/30 rounded-lg border border-gray-200 
      shadow-sm 
      transition-all duration-300 ease-in-out
      "
                  >
                    <div className="p-4 cursor-pointer active:bg-indigo-50/50 transition-colors duration-150">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Hospital Medicine
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md inline-block">
                            $330,000
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Includes $40,000 bonus
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
                        <div className="bg-white/80 p-2 rounded-md">
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-sm font-medium">Florida</p>
                        </div>
                        <div className="bg-white/80 p-2 rounded-md">
                          <p className="text-xs text-gray-500">Practice Type</p>
                          <p className="text-sm font-medium">
                            Hospital-employed
                          </p>
                        </div>
                        <div className="bg-white/80 p-2 rounded-md">
                          <p className="text-xs text-gray-500">Experience</p>
                          <p className="text-sm font-medium">5 years</p>
                        </div>
                        <div className="bg-white/80 p-2 rounded-md">
                          <p className="text-xs text-gray-500">
                            Would Choose Again
                          </p>
                          <div className="mt-1">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">
                              No
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center text-gray-500 mt-2">
                        <span className="text-sm font-medium">
                          View details
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="h-5 w-5 ml-1 transition-transform duration-300 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
                      <div className="p-4 pt-0 border-t border-gray-200 bg-white">
                        <div className="space-y-5 pt-4">
                          <div className="bg-indigo-50/80 p-3 rounded-lg">
                            <h4 className="text-sm font-semibold mb-3 text-indigo-800">
                              Employment Details
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white p-2 rounded">
                                <p className="text-xs text-gray-500">
                                  Hours/Week
                                </p>
                                <p className="text-sm font-medium">40 hours</p>
                              </div>
                              <div className="bg-white p-2 rounded">
                                <p className="text-xs text-gray-500">PTO</p>
                                <p className="text-sm font-medium">0 weeks</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-indigo-50/80 p-3 rounded-lg">
                            <h4 className="text-sm font-semibold mb-3 text-indigo-800">
                              Satisfaction
                            </h4>
                            <div className="flex items-center gap-2 mb-3 bg-white p-2 rounded">
                              <div className="flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="h-5 w-5 text-yellow-400"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="h-5 w-5 text-yellow-400"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="h-5 w-5 text-yellow-400"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="h-5 w-5 text-yellow-400"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="h-5 w-5 text-yellow-400"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                  ></path>
                                </svg>
                              </div>
                              <span className="text-sm font-medium">4/5</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-2 rounded">
                              <p className="text-xs text-gray-500">
                                Would Choose Again
                              </p>
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">
                                No
                              </span>
                            </div>
                          </div>
                          <div className="bg-indigo-50/80 p-3 rounded-lg">
                            <h4 className="text-sm font-semibold mb-2 text-indigo-800">
                              Submission Info
                            </h4>
                            <p className="text-sm text-gray-500 bg-white p-2 rounded">
                              Submitted Mar 2025
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-gradient-to-r from-white to-indigo-50/30 rounded-lg border border-gray-200 
      shadow-sm 
      transition-all duration-300 ease-in-out
      "
                  >
                    <div className="p-4 cursor-pointer active:bg-indigo-50/50 transition-colors duration-150">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Hospital Medicine
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md inline-block">
                            $320,000
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Includes $40,000 bonus
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
                        <div className="bg-white/80 p-2 rounded-md">
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-sm font-medium">Florida</p>
                        </div>
                        <div className="bg-white/80 p-2 rounded-md">
                          <p className="text-xs text-gray-500">Practice Type</p>
                          <p className="text-sm font-medium">
                            Hospital-employed
                          </p>
                        </div>
                        <div className="bg-white/80 p-2 rounded-md">
                          <p className="text-xs text-gray-500">Experience</p>
                          <p className="text-sm font-medium">4 years</p>
                        </div>
                        <div className="bg-white/80 p-2 rounded-md">
                          <p className="text-xs text-gray-500">
                            Would Choose Again
                          </p>
                          <div className="mt-1">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">
                              No
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center text-gray-500 mt-2">
                        <span className="text-sm font-medium">
                          View details
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="h-5 w-5 ml-1 transition-transform duration-300 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
                      <div className="p-4 pt-0 border-t border-gray-200 bg-white">
                        <div className="space-y-5 pt-4">
                          <div className="bg-indigo-50/80 p-3 rounded-lg">
                            <h4 className="text-sm font-semibold mb-3 text-indigo-800">
                              Employment Details
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-white p-2 rounded">
                                <p className="text-xs text-gray-500">
                                  Hours/Week
                                </p>
                                <p className="text-sm font-medium">40 hours</p>
                              </div>
                              <div className="bg-white p-2 rounded">
                                <p className="text-xs text-gray-500">PTO</p>
                                <p className="text-sm font-medium">0 weeks</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-indigo-50/80 p-3 rounded-lg">
                            <h4 className="text-sm font-semibold mb-3 text-indigo-800">
                              Satisfaction
                            </h4>
                            <div className="flex items-center gap-2 mb-3 bg-white p-2 rounded">
                              <div className="flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="h-5 w-5 text-yellow-400"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="h-5 w-5 text-yellow-400"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="h-5 w-5 text-yellow-400"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="h-5 w-5 text-yellow-400"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                  data-slot="icon"
                                  className="h-5 w-5 text-yellow-400"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                  ></path>
                                </svg>
                              </div>
                              <span className="text-sm font-medium">4/5</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-2 rounded">
                              <p className="text-xs text-gray-500">
                                Would Choose Again
                              </p>
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">
                                No
                              </span>
                            </div>
                          </div>
                          <div className="bg-indigo-50/80 p-3 rounded-lg">
                            <h4 className="text-sm font-semibold mb-2 text-indigo-800">
                              Submission Info
                            </h4>
                            <p className="text-sm text-gray-500 bg-white p-2 rounded">
                              Submitted Feb 2025
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-6 px-4">
                  <a
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
                    href="/all-salaries"
                  >
                    View All Salaries
                    <svg
                      className="w-5 h-5 ml-1.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div> */}
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                <span style={{ color: "rgb(43, 103, 204)" }}>Salary</span>
                <span style={{ color: "rgb(233, 79, 55)" }}>Dental</span>{" "}
                Insights
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start justify-between p-4 bg-indigo-50/80 rounded-lg">
                  <div className="flex items-start min-w-0 flex-1 mr-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="text-base font-medium text-gray-700">
                      Base
                    </div>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <div className="text-xl font-bold text-gray-900">
                      ${overallSummary?.avgBaseSalary ?? 0}
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between p-4 bg-indigo-50/80 rounded-lg">
                  <div className="flex items-start min-w-0 flex-1 mr-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-base font-medium text-gray-700">
                        Bonuses/RVU
                      </div>
                      <div className="text-base font-medium text-gray-700">
                        Incentive
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <div className="text-xl font-bold text-gray-900">
                      ${overallSummary?.avgBonus ?? 0}
                    </div>
                    {/* <div className="text-sm text-gray-500">(97% received)</div> */}
                  </div>
                </div>
                <div className="flex items-start justify-between p-4 bg-indigo-50/80 rounded-lg">
                  <div className="flex items-start min-w-0 flex-1 mr-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-base font-medium text-gray-700">
                        Total
                      </div>
                      <div className="text-base font-medium text-gray-700">
                        Compensation
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <div className="text-xl font-bold text-gray-900">
                      ${overallSummary?.avgTotalCompensation ?? 0}
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between p-4 bg-indigo-50/80 rounded-lg">
                  <div className="flex items-start min-w-0 flex-1 mr-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                    <div className="text-base font-medium text-gray-700">
                      Workload
                    </div>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <div className="text-xl font-bold text-gray-900">
                      ~{overallSummary?.avgWorkload ?? 0} hrs/week
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between p-4 bg-indigo-50/80 rounded-lg">
                  <div className="flex items-start min-w-0 flex-1 mr-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-base font-medium text-gray-700">
                        Would Choose
                      </div>
                      <div className="text-base font-medium text-gray-700">
                        Specialty Again
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <div className="text-xl font-bold text-gray-900">
                      {overallSummary?.wouldChooseAgainPercent ?? 0}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Top Specialties by Job Satisfaction
                  </h2>
                  <div className="text-sm text-gray-600">Updated May 2025</div>
                </div>
                <div className="space-y-4">
                  {topSpecialitites &&
                    topSpecialitites.map((item: any, index: number) => {
                      // console.log(item, index);
                      return (
                        <SpecialityCard
                          id={index}
                          satisfactionLevel={item?.averageSatisfactionLevel}
                          submission={item?.submissionCount}
                          specialty={item?.specialty}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  How satisfied are you in your specialty?
                </h2>
                <a
                  className="inline-block px-8 py-4 bg-white text-blue-700 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-md mt-4 md:mt-0 max-w-xs w-auto"
                  href="/submit-salary"
                >
                  Submit Your Salary
                </a>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </main>
  );
};

export default SalaryExplorer;
