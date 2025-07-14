import CustomDropdown from "../../components/Dropdown";
import {
  SatisfactionLevel,
  satisfactionMap,
  workloadTypes,
} from "../../lib/constant";

const Workload = ({
  register,
  watch,
  setValue,
  step,
  setStep,
  errors,
  formValues
}: any) => {
  // const selectedRating = watch("rating");
  const satisfactionRaw = watch("satisfactionLevel");
  const satisfaction = Math.min(
    Math.max(Number(satisfactionRaw) || 3, 1),
    5
  ) as SatisfactionLevel;

  // Now you can safely use:
  const { emoji, label } = satisfactionMap[satisfaction];
  const percent = ((satisfaction - 1) / 4) * 100;
  // const handleRatingClick = (value: number) => {
  //   setValue("rating", value, { shouldValidate: true });
  // };
  // console.log(formValues)
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-4 md:p-5">
        <div className="space-y-5">
          <div className="text-center mb-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Work-Life Balance & Contract
            </h2>
            <p className="text-gray-600">
              Final details about your work schedule and contact info
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Paid Time Off (Weeks/Year) (Include vacation, CE, sick leave)
              <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter hours per week"
              className="w-full pl-6 pr-2 py-3 border-2 rounded-xl text-base transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 border-gray-200 hover:border-gray-300  "
              type="text"
              {...register("hoursWorked", { valueAsNumber: true })}
            />
          </div>
          <div>
            {/* <label className="block text-base font-semibold text-blue-600 mb-1.5">
              Paid Time Off (PTO) in Weeks Per Year (Required)
            </label> */}
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Average Hours Worked Per Week
              <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter weeks of PTO"
              className="w-full pl-6 pr-2 py-3 border-2 rounded-xl text-base transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 border-gray-200 hover:border-gray-300"
              type="number"
              {...register("ptoWeeks", { valueAsNumber: true })}
              //   name="ptoWeeks"
            />
            <p className="text-gray-500 text-sm mt-1">
              Include vacation, CME, and sick leave
            </p>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">
              Job Satisfaction Level <span className="text-red-500">*</span>
            </label>

            <div className="bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 rounded-xl p-6 border border-gray-200">
              <div className="mb-4 text-center">
                <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-bold min-w-[120px]">
                  {emoji} {label}
                </span>
              </div>

              <div className="relative">
                <input
                  min="1"
                  max="5"
                  step="1"
                  value={satisfaction}
                  type="range"
                  {...register("satisfactionLevel", {
                    valueAsNumber: true,
                  })}
                  onChange={(e) =>
                    setValue("satisfactionLevel", Number(e.target.value), {
                      shouldValidate: true,
                    })
                  }
                  className="w-full h-4 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-200"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percent}%, #E5E7EB ${percent}%, #E5E7EB 100%)`,
                  }}
                />

                <div className="flex justify-between mt-3 px-1">
                  {[
                    { label: "Very Low", color: "bg-red-400" },
                    { label: "Low", color: "bg-yellow-400" },
                    { label: "Moderate", color: "bg-blue-400" },
                    { label: "High", color: "bg-green-400" },
                    { label: "Very High", color: "bg-green-500" },
                  ].map((item) => (
                    <div className="text-center" key={item.label}>
                      <div
                        className={`w-2 h-2 ${item.color} rounded-full mx-auto mb-1`}
                      />
                      <div className="text-xs font-medium text-gray-600">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* <div> */}
          {/* <label className="block text-base font-semibold text-blue-600 mb-1.5">
              Job Satisfaction Level (Required)
            </label>
            <input
              min="1"
              max="5"
              className="w-full"
              type="range"
              //   value="3"
              //   name="satisfactionLevel"
              {...register("satisfactionLevel", { valueAsNumber: true })}
            /> */}
          {/* <div>
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

         
            <input type="hidden" {...register("rating")} />

            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div> */}
          {/* </div> */}
          <div>
            {/* <label className="block text-base font-semibold text-blue-600 mb-1.5">
              Would you choose this specialty again? (Required)
            </label> */}
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Would you choose this specialty again?
              <span className="text-red-500">*</span>
            </label>
            {/* <select
              {...register("chooseSpecialty")}
              className="w-full p-2.5 border rounded-lg text-sm"
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select> */}
            <CustomDropdown
              setValue={setValue}
              options={workloadTypes}
              placeholder={"Select compensation type"}
              fieldName="chooseSpecialty"
            />
            {errors.chooseSpecialty && (
              <p className="text-red-600 text-sm mt-1">
                {errors.chooseSpecialty.message}
              </p>
            )}
          </div>
          <div
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6"
            data-section="insights"
          >
            <button type="button" className="w-full text-left pl-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-900 flex items-center">
                      💬 Share Your Insights (Optional)
                    </h3>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-blue-700 transition-transform rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </button>
            <div className="space-y-4 p-2">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg pl-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <h4 className="font-semibold text-green-900">
                    💡 What other {formValues?.specialty + " "} physicians are saying:
                  </h4>
                </div>
                {/* <div className="space-y-3">
                  <div className="bg-white/80 rounded-lg p-3 border border-green-100">
                    <div className="mb-2">
                      <p className="text-sm text-green-800 italic">
                        "Good variety. Decent work life balance"
                      </p>
                      <span className="text-xs text-green-600 font-medium">
                        - Hospital Medicine physician
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-green-800 italic">
                        "Working 146 shifts per year. Sometimes 5-10 more per
                        year."
                      </p>
                      <span className="text-xs text-green-600 font-medium">
                        - Hospital Medicine physician
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3 border border-green-100">
                    <div className="mb-2">
                      <p className="text-sm text-green-800 italic">
                        "Almost every shift I work I see something different and
                        interesting, keeps me on my toes. "
                      </p>
                      <span className="text-xs text-green-600 font-medium">
                        - Hospital Medicine physician
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-green-800 italic">
                        "Predictable since I get my yearly schedule in advance,
                        have a ton of time off, work 108 shifts a yea..."
                      </p>
                      <span className="text-xs text-green-600 font-medium">
                        - Hospital Medicine physician
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-green-700 font-medium">
                      Your insights help future doctors make informed decisions!
                      👩‍⚕️👨‍⚕️
                    </p>
                  </div>
                </div> */}
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <p className="text-blue-800 text-sm flex items-start">
                  <svg
                    className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Since you're sharing your compensation data, why not help
                    future physicians with your specialty insights too?
                    <strong> These fields are completely optional</strong> but
                    incredibly valuable to medical students and residents.
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-900 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2">
                    1
                  </span>
                  What could be improved in your current role?
                </label>
                <textarea
                  name="insight1"
                  placeholder="e.g., 'Better work-life balance' or 'Less administrative burden'"
                  className="w-full p-3 border-2 border-blue-200 rounded-lg text-sm resize-none transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-blue-300"
                  rows={3}
                  maxLength={500}
                  {...register("insight1")}
                ></textarea>
                <div className="flex justify-between items-center text-xs text-blue-600">
                  <span className="flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                    Anonymous • Helps future doctors
                  </span>
                  {/* <span className="transition-colors ">0/500</span> */}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-900 flex items-center">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2">
                    2
                  </span>
                  Describe your typical work-life balance as a {formValues?.speciality && formValues?.specialty + " "}
                  physician
                </label>
                <textarea
                  name="insight2"
                  placeholder="e.g., 'Predictable 9-5 schedule with rare call' or 'Busy but rewarding, some weekend work'"
                  className="w-full p-3 border-2 border-blue-200 rounded-lg text-sm resize-none transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-blue-300"
                  rows={3}
                  maxLength={500}
                  {...register("insight2")}
                ></textarea>
                <div className="flex justify-between items-center text-xs text-blue-600">
                  <span className="flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                    Anonymous • Helps future doctors
                  </span>
                  {/* <span className="transition-colors ">0/500</span> */}
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address  <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter your email"
              className="w-full pl-6 pr-2 py-3 border-2 rounded-xl text-base transition-all duration-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 border-gray-200 hover:border-gray-300"
              type="email"
              {...register("email")}
            />
            <p className="text-gray-500 text-sm mt-1">
              Required for account creation and to receive salary insights
            </p>
          </div>
          <div className="flex md:flex-row flex-col gap-3 justify-between mt-6">
            <button
              type="button"
              className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
              onClick={() => setStep(step - 1)}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Submit My Data{" "}
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workload;
