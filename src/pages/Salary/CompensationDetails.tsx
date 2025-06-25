import CustomDropdown from "../../components/Dropdown";
import { compensationType, practiceOptions } from "../../lib/constant";



const CompensationDetails = ({ setValue, register, step, setStep, trigger, errors }: any) => {
    const handleNext = async () => {
    const isValid = await trigger(["practiceSetting", "compensationType"]);

    if (isValid) {
      setStep(step + 1);
    }
  };
  return (
  <main className="container mx-auto md:px-4 md:py-8">
      <div className="max-w-2xl  mx-auto">
        <div className=" bg-white my-9 shadow-lg rounded-2xl p-6">
        <div className="space-y-5">
         <div className="text-center mb-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Practice & Compensation
            </h2>
            <p className="text-gray-600">
              Tell us about your work setting and salary
            </p>
          </div>
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Practice Setting <span className="text-red-500">*</span>
        </label>
        <CustomDropdown
          setValue={setValue}
          options={practiceOptions}
          placeholder={"Select your practice setting"}
          fieldName="practiceSetting"
        />
         {errors.practiceSetting && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.practiceSetting?.message}
                </p>
              )}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900">
          Compensation Type <span className="text-red-500">*</span>
        </label>
        {/* <select
          name="compensationType"
          className="w-full p-3 border-2 rounded-xl text-base transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 border-gray-200 hover:border-gray-300"
          required
        >
          <option value="">Select compensation type</option>
          <option value="annual">Annual</option>
          <option value="hourly">Hourly</option>
        </select> */}
          <CustomDropdown
          setValue={setValue}
          options={compensationType}
          placeholder={"Select compensation type"}
          fieldName="compensationType"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Annual Base Salary
        </label>
        <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            $
          </span>
        <input
          placeholder="Enter base salary"
          className="w-full pl-6 pr-2 py-3 border-2 rounded-xl text-base transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 border-gray-200 hover:border-gray-300 "
          type="text"
          {...register("base_salary", { valueAsNumber: true })}
        />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Bonus (Optional)
        </label>
        <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            $
          </span>
        <input
          placeholder="Enter bonus/incentives"
          className="w-full pl-6 pr-2 py-3 border-2 rounded-xl text-base transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 border-gray-200 hover:border-gray-300 "
          type="text"
          {...register("bonus", { valueAsNumber: true })}
        />
        </div>
      </div>
       <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Production Percentage (Optional)
        </label>
        <input
          placeholder="Enter percentage"
          className="w-full pl-6 pr-2 py-3 border-2 rounded-xl text-base transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 border-gray-200 hover:border-gray-300 "
          type="text"
          {...register("prod_per")}
        />
      </div>
      <div className="flex md:flex-row gap-3 flex-col justify-between mt-6 space-y-2">
        <button
          type="button"
          className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
          onClick={() => setStep(step - 1)}
        >
          ← Back
        </button>
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
          onClick={handleNext}
        >
          Next : Workload & Contact →
        </button>
      </div>
      </div>
      </div>
    </div>
    </main>
  );
};

export default CompensationDetails;
