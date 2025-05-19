import { useEffect, useState } from "react";
import { debounce, usStates } from "../../lib/constant";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const BasicDetails = ({
  watch,
  register,
  setValue,
  step,
  setStep,
  errors,
}: any) => {
  const { request } = useAxios();
  const watchSpecialty = watch("specialty");
  const stateInput = watch("state");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [filteredStates, setFilteredStates] = useState<typeof usStates>([]);
  const experience = watch("yearsOfExperience");
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

  const handleSuggestionClick = () => {
    // setValue("specialty", item?.speciality);
    setSuggestions([]);
  };

  const handleStateSuggestion = (state: (typeof usStates)[number]) => {
    setValue("state", state.name);
    setFilteredStates([]);
  };
  
  return (
    <div>
      <div className="space-y-5">
        <div>
          <label className="block text-base font-semibold text-blue-600 mb-1.5">
            Specialty Type (Required)
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for specialty or subspecialty..."
              className="w-full p-2.5 border rounded-lg text-sm"
              {...register("specialty")}
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
        </div>
        <div className="relative">
          <label className="block text-base font-semibold text-blue-600 mb-1.5">
            State (Required)
          </label>
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
        <div>
          <label className="block text-base font-semibold text-blue-600 mb-1.5">
            City (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter your city"
            className="w-full p-2.5 border rounded-lg text-sm"
            {...register("city")}
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium"
          onClick={() => setStep(step + 1)}
        >
          Next: Compensation Details →
        </button>
      </div>
    </div>
  );
};

export default BasicDetails;
