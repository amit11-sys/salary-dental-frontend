import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterSalarySchema } from "../../validation";
import { debounce, practiceOptions } from "../../lib/constant";
import CustomDropdown from "../../components/Dropdown";

const AllSalary = () => {
  const { request } = useAxios();
  const { register, handleSubmit, setValue, control, watch, getValues, reset } =
    useForm({
      resolver: zodResolver(filterSalarySchema),
    });
  const watchSpecialty = watch("specialty");
  const formValues = useWatch({ control });
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [salary, setSalary] = useState<any>([]);
  const [currPage, setCurrPage] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (watchSpecialty && watchSpecialty.length > 1) {
      fetchSuggestions(watchSpecialty);
    }
  }, [watchSpecialty]);
  const [suggestions, setSuggestions] = useState([]);

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
  // watch all form fields

  useEffect(() => {
    if (formValues) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSubmit();
      }, 400);
    }
  }, [formValues, page]);
  const onSubmit = () => {
    const formValues = getValues(); // get all form data

    const payload: Record<string, string> = {
      ...formValues,
      page: page?.toString(),
    };

    // Optional: Remove specialty_raw if you don't want to send it
    delete payload.specialty_raw;

    // Ensure all values are strings to satisfy URLSearchParams
    const cleanedPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, v]) => v !== "" && v !== undefined)
    );

    const queryParams = new URLSearchParams(cleanedPayload).toString();
    const url = `${
      import.meta.env.VITE_BASE_URL
    }salary/all-salaries?${queryParams}`;

    request(url, { method: "GET" })
      .then((res: any) => {
        setSalary(res?.data);
        setCurrPage(res?.data?.page);
        setTotalRecords(res?.data?.total);
        setTotalPages(res?.data?.totalPages);
      })
      .catch(() => {
        toast.error("Error occurred while fetching salary", {
          autoClose: 3000,
        });
      });
  };

  const handleSuggestionClick = () => {
    setSuggestions([]);
  };
  const satisfactionOptions = [
    {
      key: "5",
      name: (
        <span className="flex items-center">
          <span className="text-yellow-500">★★★★★</span>
          <span className="ml-2 text-black">5 - Excellent</span>
        </span>
      ),
      value: "5",
    },
    {
      key: "4",
      name: (
        <span className="flex items-center">
          <span className="text-yellow-500">★★★★</span>
          <span className="ml-2 text-black">4 - (or higher)</span>
        </span>
      ),
      value: "4",
    },
    {
      key: "3",
      name: (
        <span className="flex items-center">
          <span className="text-yellow-500">★★★</span>
          <span className="ml-2 text-black">3 - (or higher)</span>
        </span>
      ),
      value: "3",
    },
    {
      key: "2",
      name: (
        <span className="flex items-center">
          <span className="text-yellow-500">★★</span>
          <span className="ml-2 text-black">2 - (or higher)</span>
        </span>
      ),
      value: "2",
    },
    {
      key: "1",
      name: (
        <span className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-2 text-black">1 - (or higher)</span>
        </span>
      ),
      value: "1",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            All Physician Salaries
          </h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
          >
            <div className="flex-1 min-w-[200px] relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
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
                          handleSuggestionClick();
                          setValue(
                            "specialty",
                            item?.speciality && item?.sub_specialty
                              ? `${item.speciality} - ${item.sub_specialty}`
                              : item?.speciality || ""
                          );
                          setValue("sub_speciality", item?.sub_specialty || "");
                          setValue("specialty_raw", item?.speciality || "");
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Practice Type
              </label>
              <CustomDropdown
                setValue={setValue}
                options={practiceOptions}
                placeholder={"Select Practice"}
                fieldName="practiceSetting"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <select
                {...register("experience")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Experience Levels</option>
                <option value="0-5 years">0-5 years</option>
                <option value="6-10 years">6-10 years</option>
                <option value="11-15 years">11-15 years</option>
                <option value="16-20 years">16-20 years</option>
                <option value="21-25 years">21-25 years</option>
                <option value="26+ years">26+ years</option>
              </select>
              {/* {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>} */}
            </div>

            {/* Min Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Salary
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  placeholder="200,000"
                  {...register("minSalary")}
                  className="w-full py-2 pl-7 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* {errors.minSalary && <p className="text-red-500 text-sm">{errors.minSalary.message}</p>} */}
            </div>

            {/* Max Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Salary
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  placeholder="500,000"
                  {...register("maxSalary")}
                  className="w-full py-2 pl-7 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* {errors.maxSalary && (
                <p className="text-red-500 text-sm">
                  {errors.maxSalary.message}
                </p>
              )} */}
            </div>

            {/* Satisfaction */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Satisfaction Score
              </label>
              <CustomDropdown
                setValue={setValue}
                options={satisfactionOptions}
                placeholder="Select Satisfaction Score"
                fieldName="satisfaction"
              />
            </div>
          </form>
        </div>
        <div className="flex justify-end mb-6">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2" onClick={() => reset()}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Reset Filters
          </button>
        </div>
        <div className="mt-8 bg-white rounded-lg shadow-sm">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              All Salary Submissions
            </h2>
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#F1F5FF]">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      Posted<span className="ml-1">↓</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      Specialty
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      Practice Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      Annual Salary
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salary?.data &&
                  Array.isArray(salary?.data) &&
                  salary?.data?.length > 0 ? (
                    salary?.data.map((item: any) => (
                      <tr
                        className="hover:bg-gray-50 cursor-pointer "
                        key={item?._id}
                      >
                        <td className="px-6 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {" "}
                            {item?.createdAt &&
                            !isNaN(new Date(item.createdAt).getTime())
                              ? new Date(item.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                  }
                                )
                              : ""}
                          </div>
                        </td>
                        <td className="px-6 py-3">
                          <div className="text-sm text-gray-900">
                            {item?.specialty}
                            <div className="text-xs text-gray-500">
                              {item?.sub_specialty}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item?.state}, {item?.city}
                          </div>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          <div className="inline-flex px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                            {item?.practiceSetting}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {item?.yearsOfExperience} years experience
                          </div>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
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
                      <td colSpan={5}>No records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{currPage}</span> to{" "}
                  <span className="font-medium">{totalPages}</span> of{" "}
                  <span className="font-medium">{totalRecords}</span> results
                </p>
              </div>
              <div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    {/* Previous */}
                    <button
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50"
                    >
                      <span className="sr-only">Previous</span>
                      {/* Left Arrow Icon */}
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNumber = idx + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setPage(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0 ${
                            page === pageNumber
                              ? "z-10 bg-indigo-600 text-white"
                              : "text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    {/* Next */}
                    <button
                      onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={page == totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 disabled:opacity-50"
                    >
                      <span className="sr-only">Next</span>
                      {/* Right Arrow Icon */}
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AllSalary;
