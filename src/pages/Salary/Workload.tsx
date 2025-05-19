const Workload = ({ register, watch, setValue, step, setStep, errors }: any) => {
  const selectedRating = watch("rating");

  const handleRatingClick = (value: number) => {
   setValue("rating", value, { shouldValidate: true });
  };
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-base font-semibold text-blue-600 mb-1.5">
          Average Hours Worked Per Week (Required)
        </label>
        <input
          placeholder="Hours"
          className="w-full p-2.5 border rounded-lg text-sm "
          type="text"
          {...register("hoursWorked",{valueAsNumber:true})}
        />
      </div>
      <div>
        <label className="block text-base font-semibold text-blue-600 mb-1.5">
          Paid Time Off (PTO) in Weeks Per Year (Required)
        </label>
        <input
          placeholder="Enter weeks of PTO"
          className="w-full p-2.5 border rounded-lg text-sm "
          type="number"
          {...register("ptoWeeks",{valueAsNumber:true})}
          //   name="ptoWeeks"
        />
        <p className="text-gray-500 text-sm mt-1">
          Include vacation, CME, and sick leave
        </p>
      </div>
      <div>
        <label className="block text-base font-semibold text-blue-600 mb-1.5">
          Job Satisfaction Level (Required)
        </label>
        <input
          min="1"
          max="5"
          className="w-full"
          type="range"
          //   value="3"
          //   name="satisfactionLevel"
          {...register("satisfactionLevel", {valueAsNumber:true})}
        />
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">
            Rate the Experience
          </label>

          <div className="flex justify-between text-sm text-gray-500 mt-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                onClick={() => handleRatingClick(num)}
                className={`text-center cursor-pointer p-2 rounded ${
                  selectedRating === num
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                <div>{num}</div>
                {num === 1 && <div>Low</div>}
                {num === 3 && <div>Average</div>}
                {num === 5 && <div>High</div>}
              </div>
            ))}
          </div>

          {/* Hidden input to register with RHF */}
          <input type="hidden" {...register("rating")} />

          {errors.rating && (
          <p className="text-red-500 text-sm mt-1">
            {errors.rating.message}
          </p>
        )}
        </div>
      </div>
    <div>
        <label className="block text-base font-semibold text-blue-600 mb-1.5">
          Would you choose this specialty again? (Required)
        </label>
        <select
          {...register("chooseSpecialty")}
          className="w-full p-2.5 border rounded-lg text-sm"
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        {errors.chooseSpecialty && (
          <p className="text-red-600 text-sm mt-1">
            {errors.chooseSpecialty.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-base font-semibold text-blue-600 mb-1.5">
          Email (Required)
        </label>
        <input
          placeholder="Enter your email"
          className="w-full p-2.5 border rounded-lg text-sm"
          type="email"
          {...register("email")}
        />
        <p className="text-gray-500 text-sm mt-1">
          We'll send you a thank you email and automatically subscribe you to
          our newsletter for salary trends and updates. You can unsubscribe at
          any time. Your email will never be shared with third parties.
        </p>
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="px-4 py-1.5 bg-gray-500 text-white rounded-md text-sm"
           onClick={()=>setStep(step-1)}
        >
          ← Back
        </button>
        <button
          type="submit"
          className="ml-auto px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Workload;
