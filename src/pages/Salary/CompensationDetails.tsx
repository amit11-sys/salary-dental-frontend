import CustomDropdown from "../../components/Dropdown";
import { practiceOptions } from "../../lib/constant";

const CompensationDetails = ({ setValue, register, step, setStep }: any) => {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-base font-semibold text-blue-600 mb-1.5">
          Practice Setting (Required)
        </label>
        <CustomDropdown
          setValue={setValue}
          options={practiceOptions}
          placeholder={"Select Practice"}
          fieldName="practiceSetting"
        />
      </div>
      <div>
        <label className="block text-base font-semibold text-blue-600 mb-1.5">
          Base Salary (Annual) (Required)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            $
          </span>
          <input
            placeholder="Enter base salary"
            className="w-full p-2.5 pl-8 border rounded-lg text-sm "
            type="text"
            {...register("base_salary", {valueAsNumber:true})}
          />
        </div>
      </div>
      <div>
        <label className="block text-base font-semibold text-blue-600 mb-1.5">
          Bonus/Incentives/RVUs (Annual) (Optional)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            $
          </span>
          <input
            placeholder="Enter bonus/incentives"
            className="w-full p-2.5 pl-8 border rounded-lg text-sm "
            type="text"
            {...register("bonus", {valueAsNumber:true})}
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button type="button" className="px-4 py-1.5 bg-gray-500 text-white rounded-md text-sm" onClick={()=>setStep(step-1)}>← Back</button>
        <button
          type="button"
          className="px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium"
          onClick={()=>setStep(step+1)}
        >
          Next : Workload & Contact →
        </button>
      </div>
    </div>
  );
};

export default CompensationDetails;
