import { useEffect, useState } from "react";
import { debounce, usCity, usStates } from "../../lib/constant";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const BasicDetails = ({
  watch,
  register,
  setValue,
  step,
  setStep,
  errors,
  trigger,
}: any) => {
  const { request } = useAxios();
  const [specialities, setSpecialities] = useState<any>([]);
  const [filteredStates, setFilteredStates] = useState<typeof usStates>([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [allCities, setAllCities] = useState<any>([]);
  const [shouldShowStateSuggestions, setShouldShowStateSuggestions] =
    useState(true);
  const [shouldShowCitySuggestions, setShouldShowCitySuggestions] =
    useState(true);
  const years = watch("yearsOfExperience");
  const percent = ((years - 1) / 39) * 100;
  const handleStateChange = (e: any) => {
    const input = e.target.value;
    setValue("state", input);

    if (!shouldShowStateSuggestions) return;

    const filtered = usStates.filter((state: any) =>
      state.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredStates(filtered);
  };

  useEffect(() => {
  const cityOptions = usCity
    .split("\n")
    .map((city) => city.trim())
    .filter((city) => city?.length > 0)
    .map((city, index) => ({
      key: index + 1,
      value: city,
      label: city,
    }));

  setAllCities(cityOptions);
}, []);

  const handleCityChange = (e: any) => {
    // console.log(e.target.value);

    const input = e.target.value;
    // setValue("city", input);

    if (!shouldShowCitySuggestions) return;

    const filtered = allCities.filter((city: any) =>
      city.label?.toLowerCase()?.includes(input?.toLowerCase())
    );
    setFilteredCities(filtered);
  };
// console.log(filteredCities);

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
        setSpecialities(res?.data);
      })
      .catch(() => {
        toast.error("Error occurred while getting specialities", {
          autoClose: 3000,
        });
      });
  }, 300); // 300ms debounce

  const handleStateSuggestion = (item: any) => {
    setShouldShowStateSuggestions(false);
    setValue("state", item.name);
    setFilteredStates([]);

    setTimeout(() => setShouldShowStateSuggestions(true), 300);
  };
  // console.log(allCities);

  const handleCitySuggestion = (item: any) => {
    setShouldShowCitySuggestions(false);
    setValue("city", item.value);
    setFilteredCities([]);

    setTimeout(() => setShouldShowCitySuggestions(true), 300);
  };

  const handleNext = async () => {
    const isValid = await trigger(["specialty", "state"]);

    if (isValid) {
      setStep(step + 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-4 md:p-5">
        <div className="space-y-5">
          <div className="text-center mb-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Basic Information
            </h2>
            <p className="text-gray-600">
              Tell us about your specialty and location
            </p>
          </div>
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
                        setValue("sub_speciality", item.sub_specialty || "");
                        setValue("specialty_raw", item.speciality || "");

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
          {/* <div>
          <label className="block text-base font-semibold text-blue-600 mb-1.5">
            Years of Experience (Required)
          </label>
          <input
            type="range"
            min="1"
            max="40"
            className="w-full"
            {...register("yearsOfExperience", {
              valueAsNumber: true,
            })}
            onChange={(e) =>
              setValue("yearsOfExperience", Number(e.target.value), {
                shouldValidate: true,
              })
            }
          />
          <div className="text-gray-600 mt-1">
            {experience} {experience === 1 ? "year" : "years"}
          </div>
          {errors.yearsOfExperience && (
            <p className="text-red-600 text-sm mt-1">
              {errors.yearsOfExperience.message}
            </p>
          )}
        </div> */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Years of Experience <span className="text-red-500">*</span>
            </label>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="mb-3">
                <div className="text-center">
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-base font-bold min-w-[70px]">
                    {years} {years === 1 ? "year" : "years"}
                  </span>
                </div>
              </div>

              <input
                min="1"
                max="40"
                value={years}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-200"
                type="range"
                {...register("yearsOfExperience", {
                  valueAsNumber: true,
                })}
                onChange={(e) =>
                  setValue("yearsOfExperience", Number(e.target.value), {
                    shouldValidate: true,
                  })
                }
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percent}%, #E5E7EB ${percent}%, #E5E7EB 100%)`,
                }}
              />

              <div className="flex justify-between text-xs text-gray-600 mt-2 px-1">
                <span className="font-medium">1 year</span>
                <span className="font-medium">40+ years</span>
              </div>
            </div>
          </div>

          {/* State Field */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Search State..."
              className="w-full px-2 py-3 border-2 rounded-xl text-base transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 border-gray-200 hover:border-gray-300"
              {...register("state")}
              autoComplete="off"
              onChange={handleStateChange}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
            {filteredStates?.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow text-sm max-h-60 overflow-auto">
                {filteredStates.map((item:any) => (
                  <li
                    key={item.key}
                    onMouseDown={() => handleStateSuggestion(item)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* City Field */}
          <div className="relative mt-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              City (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter your city"
              className="w-full px-2 py-3 border-2 rounded-xl text-base transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 border-gray-200 hover:border-gray-300"
              {...register("city")}
              autoComplete="off"
              onChange={handleCityChange}
            />
            {filteredCities?.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow text-sm max-h-60 overflow-auto">
                {filteredCities.map((item: any) => (
                  <li
                    key={item.key}
                    onMouseDown={() => handleCitySuggestion(item)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex  justify-center mt-6">
          <button
            type="button"
            className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
            onClick={handleNext}
          >
            Continue to Compensation{" "}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
