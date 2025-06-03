import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../../components/StarRating";
import StateCard from "../../components/cards/StateCard";

const SpecialityExplorer = () => {
  const { request } = useAxios();
  const { slug } = useParams();
  const [stats, setStats] = useState<any>([]);
  const [downStats, setDownStats] = useState<any>([]);
  useEffect(() => {
    if (slug) {
      onSubmit();
      getDownData();
    }
  }, [slug]);
  // console.log(stats);

  const onSubmit = () => {
    if (!slug) return;
    const payload = {
      specialty: slug,
    };

    const queryParams = new URLSearchParams(payload)?.toString();
    const url = `${
      import.meta.env.VITE_BASE_URL
    }salary/stats-by-speciality?${queryParams}`;

    request(url, {
      method: "GET",
    })
      .then((res: any) => {
        setStats(res.data[0]);
        // console.log(res);
      })
      .catch(() => {
        toast.error("Error occurred while fetching salary", {
          autoClose: 3000,
        });
      });
  };

  const getDownData = () => {
    if (!slug) return;
    const payload = {
      specialty: slug,
    };

    const queryParams = new URLSearchParams(payload)?.toString();
    const url = `${
      import.meta.env.VITE_BASE_URL
    }salary/speciality-insights?${queryParams}`;

    request(url, {
      method: "GET",
    })
      .then((res: any) => {
        setDownStats(res.data);
        // console.log(res);
      })
      .catch(() => {
        toast.error("Error occurred while fetching salary", {
          autoClose: 3000,
        });
      });
  };
  console.log(stats);
  // console.log(downStats);

function insertSpaceBeforeSecondCapital(str: string | undefined): string | undefined {
  if (!str) return;

  // Capitalize first letter if not
  str = str.charAt(0).toUpperCase() + str.slice(1);

  // Insert space before second capital letter
  let match = str.match(/[A-Z]/g);
  if (!match || match.length < 2) return str;

  let count = 0;
  return str.replace(/[A-Z]/g, (char) => {
    count++;
    if (count === 2) {
      return " " + char;
    }
    return char;
  });
}

console.log(stats, downStats);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        {insertSpaceBeforeSecondCapital(slug)} Salary Data
      </h1>
      {downStats?.reportsByPractice?.length > 0 ? (
        <>
          <div className="bg-white rounded-xl p-4 md:p-8 mb-8 md:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              <div className="col-span-1 md:col-span-2 lg:col-span-3 mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-sm font-medium text-gray-500">
                      Median Salary
                    </h3>
                    <p className="text-3xl md:text-4xl font-bold text-gray-900">
                      ${stats?.medianSalary}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Average Salary
                    </h3>
                    <p className="text-2xl md:text-3xl font-semibold text-gray-800">
                      ${stats?.avgSalary}
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 bg-gray-50 inline-block px-3 py-1.5 rounded-lg">
                  Based on {stats?.totalSubmissions} physician salaries
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Salary Range
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Minimum</span>
                    <span className="font-medium text-gray-900">
                      {" "}
                      ${stats?.avgSalary}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Maximum</span>
                    <span className="font-medium text-gray-900">
                      ${stats?.medianSalary}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Percentiles
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">25th</span>
                    <span className="font-medium text-gray-900">$375,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">75th</span>
                    <span className="font-medium text-gray-900">$440,000</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Breakdown
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly</span>
                    <span className="font-medium text-gray-900">$34,167</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Hourly</span>
                    <span className="font-medium text-gray-900">$197</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-12 bg-white rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How much does an {insertSpaceBeforeSecondCapital(slug)} make?
            </h2>
            <div className="space-y-6 text-gray-600">
              <div className="flex items-center gap-4">
                <p className="text-lg">
                  As of May 27, 2025, an {insertSpaceBeforeSecondCapital(slug)}{" "}
                  in the United States earns an average of $410,000 per year
                  ($34,167 monthly). Based on an average 36-hour work week, this
                  translates to approximately $222 per hour.
                </p>
                <div className="hidden md:flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Based on</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {stats?.totalSubmissions} salaries
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mt-8">
                Salary Range and Distribution
              </h3>
              <p className="text-lg">
                Based on {stats?.totalSubmissions} verified physician salary
                submissions, SalaryDr is seeing total compensation ranging from
                $375,000 to $440,000, with top performers (90th percentile)
                earning up to 700,000 annually. The majority of{" "}
                {insertSpaceBeforeSecondCapital(slug)} salaries fall between
                $375,000 (25th percentile) and $440,000 (75th percentile).
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-8">
                Career Growth and Advancement
              </h3>
              <p className="text-lg">
                The salary difference between early-career and experienced
                Emergency Medicine physicians is significant. Entry-level
                positions start at $378,732, while those with 6+ years of
                experience earn an average of $445,061 - a 18% increase. This
                substantial growth reflects the value of experience and skill
                development in the field.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-8">
                Practice Settings and Compensation Structure
              </h3>
              <p className="text-lg">
                Base salary makes up 84% of total compensation ($347,340), with
                the remainder coming from bonuses, profit sharing, and other
                incentives.{" "}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-8">
                Job Satisfaction and Work-Life Balance
              </h3>
              <p className="text-lg">
                {insertSpaceBeforeSecondCapital(slug)} physicians report high
                career satisfaction, rating their specialty 3.6 out of 5, with
                89% saying they would choose this specialty again.{" "}
              </p>
            </div>
          </div>

          <section className="bg-white rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Physician Satisfaction
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Would Choose Again
                </h3>
                <div className="flex items-center gap-4">
                  <div className="relative w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                      style={{ width: "89.1891891891892%" }}
                    ></div>
                  </div>
                  <span className="text-xl font-bold text-blue-600">
                    {stats?.satisfactionPercentage}%
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Percentage of {insertSpaceBeforeSecondCapital(slug)}{" "}
                  physicians who would choose this specialty again if starting
                  their career over.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Satisfaction Rating
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {/* <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <defs>
                    <linearGradient id="half-star">
                      <stop offset="50%" stop-color="currentColor"></stop>
                      <stop offset="50%" stop-color="#E5E7EB"></stop>
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#half-star)"
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg
                  className="w-6 h-6 text-gray-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg> */}
                    <StarRating rating={stats?.avgSatisfactionRating} />
                  </div>
                  {/* <span className="text-xl font-bold text-blue-600">3.6/5</span> */}
                </div>
                <p className="text-sm text-gray-600">
                  Average satisfaction rating reported by{" "}
                  {insertSpaceBeforeSecondCapital(slug)}
                  physicians (1-5 scale).
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-gray-200">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Career Satisfaction
                </h3>
                <p className="text-gray-600">
                  Physicians cite the variety of cases and patient relationships
                  as most rewarding aspects of this specialty.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Primary Challenges
                </h3>
                <p className="text-gray-600">
                  On-call demands, administrative burden, and work-life balance
                  are cited as the top challenges.
                </p>
              </div>
            </div>
          </section>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Salary Comparison
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Location Statistics
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Average Salary</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {" "}
                      ${stats?.avgSalary}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Median Salary</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${stats?.medianSalary}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Salary Range</p>
                    <p className="text-lg text-gray-800">
                      ${stats?.avgSalary} - ${stats?.medianSalary}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  National Comparison
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">National Average</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {" "}
                      ${stats?.avgSalary}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Difference</p>
                    <p className="text-lg font-semibold text-green-600">
                      +0% vs National Average
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sample Size</p>
                    <p className="text-lg text-gray-800">
                      {stats?.totalSubmissions} local /{" "}
                      {stats?.totalSubmissions} national reports
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
              Salary by Practice Type
            </h2>
            <div className="md:hidden space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-2">
                  Private Practice
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">Average Salary</div>
                    <div className="font-medium text-gray-900">$488,583</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Sample Size</div>
                    <div className="font-medium text-gray-900">
                      12 submissions
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-2">
                  Hospital-employed
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">Average Salary</div>
                    <div className="font-medium text-gray-900">$409,258</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Sample Size</div>
                    <div className="font-medium text-gray-900">
                      51 submissions
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-2">Academic</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">Average Salary</div>
                    <div className="font-medium text-gray-900">$364,591</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Sample Size</div>
                    <div className="font-medium text-gray-900">
                      11 submissions
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Practice Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Average Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sample Size
                    </th>
                  </tr>
                </thead>

                {Array.isArray(downStats?.reportsByPractice) &&
                  downStats?.reportsByPractice?.length > 0 &&
                  downStats?.reportsByPractice?.map(
                    (item: any, index: number) => (
                      <tbody
                        key={index}
                        className="bg-white divide-y divide-gray-200"
                      >
                        <tr className="bg-white">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item?.practiceSetting}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${item?.avgYearSalary}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item?.totalSubmissions} submissions
                          </td>
                        </tr>
                      </tbody>
                    )
                  )}

                {/* <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Hospital-employed
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $409,258
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  51 submissions
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Academic
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  $364,591
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  11 submissions
                </td>
              </tr> */}
                {/* </tbody> */}
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                * Practice types with fewer than 3 submissions may be omitted
                for privacy.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {insertSpaceBeforeSecondCapital(slug)} Salary by State
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(downStats?.reportsByState) &&
                downStats?.reportsByState?.length > 0 &&
                downStats?.reportsByState?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <StateCard
                      state={item?.state}
                      salary={item?.avgYearSalary}
                      submission={item?.totalSubmissions}
                    />
                  </div>
                ))}
              {/* <a
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            href="/specialty/emergency-medicine/alabama"
          >
            <h3 className="font-semibold text-gray-900">Alabama</h3>
            <p className="text-gray-600">$360,000 year</p>
            <p className="text-sm text-gray-500">4 reports</p>
          </a> */}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              See How Residency Salaries Compare
            </h2>
            <p className="text-gray-700 mb-6">
              Planning your career path? Check out our comprehensive residency
              salary benchmarks to see how PGY compensation compares across
              different specialties and regions.
            </p>
            <a
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              href="/benchmark-residency-salaries-2025"
            >
              View Residency Benchmarks
            </a>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl p-4 md:p-8 mb-8 md:mb-12">
          No data found for this speciality
        </div>
      )}
    </div>
  );
};

export default SpecialityExplorer;
