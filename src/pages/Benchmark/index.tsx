import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import CustomDropdown from "../../components/Dropdown";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { salaryBenchmarkSchema } from "../../validation";
import { practiceOptions } from "../../lib/constant";
import { colors } from "../../constant";
import { Link } from "react-router-dom";

const BenchmarkDetails = () => {
  const { request } = useAxios();

  const {
    handleSubmit,
    setValue,
    control,
    // formState: { errors },
  } = useForm({
    resolver: zodResolver(salaryBenchmarkSchema),
  });
  const [specialities, setSpecialities] = useState<any>([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [isCompare, setIsCompare] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const formValues = useWatch({ control });
  const onSubmit = () => {
    const payload = {
      ...(formValues?.speciality !== undefined && {
        specialty: formValues?.speciality,
      }),
      ...(formValues.practiceSetting !== undefined && {
        practiceSetting: formValues.practiceSetting,
      }),
    };

    const queryParams = new URLSearchParams(payload)?.toString();
    const url = `${
      import.meta.env.VITE_BASE_URL
    }salary/specialty-stats?${queryParams}`;

    request(url, {
      method: "GET",
    })
      .then((res: any) => {
        setComparisonData(res?.data);
      })
      .catch(() => {
        toast.error("Error occurred while fetching salary", {
          autoClose: 3000,
        });
      });
  };
  useEffect(() => {
    if (formValues) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSubmit();
      }, 400);
    }
  }, [formValues]);

  useEffect(() => {
    fetchSpecialities();
  }, []);
  const fetchSpecialities = () => {
    const url = `${import.meta.env.VITE_BASE_URL}speciality/all`;
    request(url, {
      method: "GET",
    })
      .then((res) => {
        const specialtiesSet = new Set(
          res?.data?.map((item: any) => item?.speciality).filter(Boolean)
        );

        const specialties = [
          // {
          //   key: 0,
          //   name: "All Specialities",
          //   value: "All Specialities",
          // },
          ...Array.from(specialtiesSet).map((spec, index) => ({
            key: index + 1,
            name: spec,
            value: spec,
          })),
        ];

        setSpecialities(specialties);
      })
      .catch(() => {
        toast.error("Error occurred while getting specialities", {
          autoClose: 3000,
        });
      });
  };
  const removeItem = (indexToRemove: number) => {
    setSelectedItems((prev: any) =>
      prev.filter((_: any, index: number) => index !== indexToRemove)
    );
  };
  const handleCheckboxChange = (item: any) => {
    setSelectedItems((prevSelected: any) => {
      const alreadySelected = prevSelected?.includes(item);
      if (alreadySelected) {
        return prevSelected.filter((i: any) => i !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };
  // console.log(selectedItems);
  console.log(selectedItems);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">
          2025 Physician &amp; Residency Salary Benchmarks
        </h1>
        <div className="max-w-3xl mb-8">
          <p className="text-lg text-gray-600 mb-4">
            Compare real-world physician and residency compensation data across
            specialties for 2025. Our interactive benchmark tool features data
            submitted directly by physicians across the United States.
          </p>
          <p className="text-gray-600 mb-4">
            Each entry includes <strong>average and median salaries</strong>,{" "}
            <strong>satisfaction scores</strong>, and{" "}
            <strong>weekly hours worked</strong>. Filter by practice type,
            specialty, and compare subspecialties for detailed career planning
            insights.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-700">
              <strong>New for 2025:</strong> Compare any two specialties
              side-by-side, view subspecialty breakdowns, and see which medical
              specialties offer the best compensation-to-satisfaction ratio.
            </p>
          </div>
        </div>
      </header>
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-700 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                ></path>
              </svg>
              Filter Benchmark Data
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="specialty-filter"
                  className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                  Specialty
                </label>
                <CustomDropdown
                  setValue={setValue}
                  options={specialities}
                  placeholder="Select Speciality"
                  fieldName="speciality"
                />
                {/* <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div> */}
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="practice-type-filter"
                  className="text-sm font-medium text-gray-700 mb-1 flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                  Practice Type
                </label>
                <div className="relative">
                  {/* <select
                    id="practice-type-filter"
                    className="appearance-none block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  > */}
                  {/* <option value="All Practice Types">
                      All Practice Types
                    </option> */}
                  <CustomDropdown
                    setValue={setValue}
                    options={practiceOptions}
                    placeholder={"Select Practice"}
                    fieldName="practiceSetting"
                  />
                  {/* </select> */}
                  {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-2 rounded flex items-start">
              <svg
                className="w-4 h-4 mr-1 text-blue-500 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p>
                Filter by specialty and practice type to narrow results. Data is
                color-coded: green indicates higher values, red indicates lower.
                Confidence scores show data reliability based on sample size.
              </p>
            </div>
          </form>
        </div>
        {isCompare ? (
          <button
            className="w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            onClick={() => setIsCompare(false)}
          >
            Exit Comparison
          </button>
        ) : (
          <button
            className="w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => setIsCompare(true)}
          >
            Compare Specialties
          </button>
        )}
      </div>
      {selectedItems?.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden p-4">
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Comparing {selectedItems?.length} Specialty
              </h3>
            </div>
            <div className="flex space-x-2">
              <button
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                title="Share this comparison"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-8m-10 0h2l2-3h3l2 3h2m2 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h2"
                  ></path>
                </svg>
                Share
              </button>
              <button
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                title="Clear all selected specialties"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
                Clear All
              </button>
            </div>
          </div>
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Salary Comparison
            </h4>
            {/* <div className="mt-8">
              {/* <div className="block md:hidden">
              <div className="space-y-6">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-sm font-medium text-gray-700 truncate"
                      title="Addiction Medicine"
                    >
                      Addiction Medicine
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      $362,143
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "100%",
                        backgroundColor: "rgb(82, 153, 224)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div> 
              <div className="hidden md:block h-60">
                <div
                  className="inline-block mx-2 text-center"
                  style={{ height: "180px" }}
                >
             <div className="flex flex-col gap-4">
  {selectedItems.map((item: any, index: number) => {
    const chartData = [
      {
        name: item?.specialty || 'N/A',
        value: item?.averageBaseSalary || 0,
      },
    ];

    return (
      <div key={index} className="w-full">
        <MiniBarChart data={chartData} />
      </div>
    );
  })}
</div>

                  <div className="mt-2 text-xs text-gray-600 flex items-center justify-center">
                    <span
                      className="block text-xs text-gray-600 whitespace-normal break-keep max-w-[120px]"
                      title="Addiction Medicine"
                    >
                      Addiction Medicine
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Comparison Metric
                  </th>
                  {selectedItems.map((item: any, index: number) => {
                    console.log(item);
                    const bgColor = colors[index % colors?.length];
                    return (
                      <th
                        key={index}
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b ${bgColor}`}
                        style={{ minWidth: "150px" }}
                      >
                        <div className="flex items-center justify-between">
                          <button
                            className="text-gray-400 hover:text-red-500 mr-2"
                            title="Remove from comparison"
                            onClick={() => removeItem(index)}
                            aria-label={`Remove ${item?.specialty} from comparison`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                          <span className="text-lg mr-2">👨‍⚕️</span>
                          <span className="text-gray-700">
                            {item.specialty}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {/* Average Salary Row */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    Average Salary
                  </td>
                  {selectedItems?.map((item: any) => (
                    <td
                      key={`${item._id}-avgSalary`}
                      className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600"
                      style={{ backgroundColor: "rgb(233, 242, 251)" }}
                    >
                      ${item.averageBaseSalary}
                    </td>
                  ))}
                </tr>

                {/* Median Salary Row */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    Median Salary
                  </td>
                  {selectedItems?.map((item: any) => (
                    <td
                      key={`${item._id}-medianSalary`}
                      className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
                      style={{ backgroundColor: "white" }}
                    >
                      ${item.medianBaseSalary}
                    </td>
                  ))}
                </tr>

                {/* Avg $/hr Row */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    Avg $/hr
                  </td>
                  {selectedItems?.map((item: any) => (
                    <td
                      key={`${item._id}-avgHourly`}
                      className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
                      style={{ backgroundColor: "white" }}
                    >
                      ${item.averageHoursWorked}
                    </td>
                  ))}
                </tr>

                {/* Job Satisfaction Row */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    Job Satisfaction
                  </td>
                  {selectedItems?.map((item: any) => (
                    <td
                      key={`${item._id}-jobSatisfaction`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      style={{ backgroundColor: "white" }}
                    >
                      <div className="flex items-center">
                        {/* Render stars */}
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.averageSatisfactionLevel
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                        <span className="ml-2 font-medium">
                          {item.averageSatisfactionLevel}
                        </span>
                        <span className="ml-1">🙂</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Hours per Week Row */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                    Hours per Week
                  </td>
                  {selectedItems?.map((item: any) => (
                    <td
                      key={`${item._id}-hoursPerWeek`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      style={{ backgroundColor: "white" }}
                    >
                      {item.averageHoursWorked}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Add more specialties
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {isCompare && (
                    <th
                      scope="col"
                      className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    >
                      {/* Specialty<span className="ml-1">↑</span> */}
                    </th>
                  )}
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Specialty<span className="ml-1">↑</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Avg Salary
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Median Salary
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Avg $/hr
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Satisfaction
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    Salary Submissions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comparisonData &&
                Array.isArray(comparisonData) &&
                comparisonData?.length > 0 ? (
                  comparisonData.map((item: any, index: number) => (
                    <tr
                      className="hover:bg-gray-50 cursor-pointer "
                      key={index}
                    >
                      {isCompare && (
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                          />
                        </td>
                      )}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <span className="mr-2">👨‍⚕️</span>
                          {item?.specialty}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item?.averageBaseSalary}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item?.medianBaseSalary}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${item?.averageHoursWorked}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <svg
                            className="h-4 w-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg
                            className="h-4 w-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg
                            className="h-4 w-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg
                            className="h-4 w-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg
                            className="h-4 w-4 text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <span className="ml-2">🙂</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-gray-900">7</span>
                          <div
                            className="flex items-center group"
                            title="Confidence is based on the number of salary submissions for this specialty."
                          >
                            {/* <svg
                          className="w-4 h-4 mr-1 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="2"
                            y="12"
                            width="2"
                            height="6"
                            rx="1"
                            fill="currentColor"
                            className="text-gray-300"
                          ></rect>
                          <rect
                            x="6"
                            y="8"
                            width="2"
                            height="10"
                            rx="1"
                            fill="currentColor"
                            className="text-gray-400"
                          ></rect>
                          <rect
                            x="10"
                            y="4"
                            width="2"
                            height="14"
                            rx="1"
                            fill="currentColor"
                            className="text-gray-500"
                          ></rect>
                          <rect
                            x="14"
                            y="2"
                            width="2"
                            height="16"
                            rx="1"
                            fill="currentColor"
                            className="text-gray-600"
                          ></rect>
                        </svg> */}
                            <div className="flex space-x-0.5">
                              <div className="w-2 h-3 rounded-sm bg-red-400"></div>
                              <div className="w-2 h-3 rounded-sm bg-gray-200"></div>
                              <div className="w-2 h-3 rounded-sm bg-gray-200"></div>
                              <div className="w-2 h-3 rounded-sm bg-gray-200"></div>
                              <div className="w-2 h-3 rounded-sm bg-gray-200"></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                      colSpan={6}
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
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Data last refreshed: 5/20/2025. The confidence score indicates the
          reliability of the data based on sample size.
        </p>
        <div className="mt-2 flex items-center">
          <span className="text-xs text-gray-500 mr-2">
            Confidence Score Key:
          </span>
          <div className="flex items-center">
            <div className="flex h-2.5 w-14 rounded-full bg-gray-200 overflow-hidden">
              <div className="flex-1 bg-red-500"></div>
              <div className="flex-1 bg-gray-200"></div>
              <div className="flex-1 bg-gray-200"></div>
              <div className="flex-1 bg-gray-200"></div>
              <div className="flex-1 bg-gray-200"></div>
            </div>
            <span className="ml-2 text-xs text-gray-500">Very Low</span>
          </div>
          <span className="text-xs text-gray-500 mx-2">to</span>
          <div className="flex items-center">
            <div className="flex h-2.5 w-14 rounded-full bg-gray-200 overflow-hidden">
              <div className="flex-1 bg-green-600"></div>
              <div className="flex-1 bg-green-600"></div>
              <div className="flex-1 bg-green-600"></div>
              <div className="flex-1 bg-green-600"></div>
              <div className="flex-1 bg-green-600"></div>
            </div>
            <span className="ml-2 text-xs text-gray-500">Very High</span>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            to="/salaries"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition-colors text-base"
          >
            🔎 Explore More Detailed Salary Data in the Salary Explorer
          </Link>
        </div>
      </div>
      <section className="mb-16 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Popular Medical Specialty Salaries
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            className="text-indigo-600 hover:text-indigo-800"
            to="/specialty/EmergencyMedicine"
          >
            Emergency Medicine Physician Salary
          </Link>
          <Link
            className="text-indigo-600 hover:text-indigo-800"
            to="/specialty/FamilyMedicine"
          >
            Family Medicine Physician Salary
          </Link>
          <Link
            className="text-indigo-600 hover:text-indigo-800"
            to="/specialty/InternalMedicine"
          >
            Internal Medicine Physician Salary
          </Link>
          <Link
            className="text-indigo-600 hover:text-indigo-800"
            to="/specialty/Cardiology"
          >
            Cardiology Physician Salary
          </Link>
          <Link
            className="text-indigo-600 hover:text-indigo-800"
            to="/specialty/OrthopedicSurgery"
          >
            Orthopedic Surgeon Salary
          </Link>
          <Link
            className="text-indigo-600 hover:text-indigo-800"
            to="/specialty/anesthesiology"
          >
            Anesthesiology Physician Salary
          </Link>
          <Link
            className="text-indigo-600 hover:text-indigo-800"
            to="/specialty/pediatrics"
          >
            Pediatrics Physician Salary
          </Link>
          <Link
            className="text-indigo-600 hover:text-indigo-800"
            to="/specialty/psychiatry"
          >
            Psychiatry Physician Salary
          </Link>
          <Link
            className="text-indigo-600 hover:text-indigo-800"
            to="/specialty/neurology"
          >
            Neurology Physician Salary
          </Link>
        </div>
      </section>
      <section
        className="mb-16 bg-white rounded-lg p-8 shadow-sm border border-gray-100"
        id="faq"
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="text-2xl font-semibold text-gray-800 mb-6"
        >
          Frequently Asked Questions About Physician Salaries
        </h2>
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              What's the average physician salary in 2025?
            </h3>
            <div className="text-base text-gray-600">
              <p>
                Based on our data, the national average physician salary across
                all specialties in 2025 varies significantly by specialty,
                practice type, and experience level. Surgical specialties tend
                to offer higher compensation, with neurosurgery and orthopedics
                at the top end of the scale.
              </p>
            </div>
          </div>
          <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              How do satisfaction scores get calculated?
            </h3>
            <div className="text-base text-gray-600">
              <p>
                Satisfaction scores are based on anonymous physician ratings on
                a scale of 1-5, where 5 represents the highest satisfaction.
                These scores incorporate multiple factors including work-life
                balance, administrative burden, compensation fairness, practice
                autonomy, and whether physicians would choose the same specialty
                again.
              </p>
            </div>
          </div>
          <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              What does the confidence score mean?
            </h3>
            <div className="text-base text-gray-600">
              <p>
                The confidence score indicates the reliability of the data based
                on sample size. A higher confidence score (shown in green) means
                we have more data points for that specialty or practice type,
                making the averages more reliable. Lower confidence scores
                (shown in yellow or red) indicate fewer submissions, suggesting
                you should interpret those figures with caution.
              </p>
            </div>
          </div>
          <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              How can I compare specialties?
            </h3>
            <div className="text-base text-gray-600">
              <p>
                Click the "Compare Specialties" button at the top of the table,
                then select up to two specialties you'd like to compare. This
                will present a side-by-side comparison of key metrics including
                average salary, satisfaction scores, hours worked, and more.
                This feature is particularly useful when deciding between
                different career paths.
              </p>
            </div>
          </div>
          <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              How often is the data updated?
            </h3>
            <div className="text-base text-gray-600">
              <p>
                The benchmark data is updated weekly based on ongoing physician
                submissions. The "Last Updated" date shown for each specialty
                indicates when that particular data point was last revised. We
                continuously collect new submissions to ensure our data remains
                accurate and reflects current market conditions.
              </p>
            </div>
          </div>
          <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              How are the 'Top Paid' and 'Highest Satisfaction' badges
              determined?
            </h3>
            <div className="text-base text-gray-600">
              <p>
                The "Top Paid" and "Highest Satisfaction" badges are awarded to
                the top three specialties by average salary and job
                satisfaction, respectively. Only specialties with at least 5
                salary submissions are eligible for these badges to ensure
                rankings are based on a reliable sample size.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 rounded-lg p-6 mb-16">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          2025 Physician Salary Trends
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          In 2025, the physician compensation landscape continues to evolve with
          notable trends. Surgical specialties like orthopedics and neurosurgery
          command the highest salaries, while primary care specialties often
          report higher satisfaction scores despite lower compensation. Practice
          type differences remain significant, with private practice and
          academic settings showing distinct compensation patterns.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Satisfaction scores correlate strongly with autonomy and work-life
          balance rather than just compensation. Our comprehensive benchmark
          table reflects anonymized, verified submissions from practicing
          physicians across the United States, providing a reliable resource for
          career planning and compensation negotiations.
        </p>
      </section>
      <section className="mt-16 bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Contribute to the Benchmark Data
        </h2>
        <p className="text-gray-600 mb-6">
          Our salary benchmark data is only as strong as the community that
          contributes to it. Help your fellow physicians by anonymously sharing
          your compensation details. Each submission improves the accuracy of
          our benchmark data.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/submit-salary"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Your Salary
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BenchmarkDetails;
