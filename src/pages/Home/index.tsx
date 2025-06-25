import { Link } from "react-router-dom";
import PopularCard from "../../components/cards/PopularCard";
import TransparencyCard from "../../components/cards/TransparencyCard";
import Accordion from "../../components/Accordian";

const Home = () => {
  return (
    <>
      <div className="container mx-auto md:px-4 md:py-8">
        <section>
          <div className="text-center">
            <h1 className="bg-gradient-to-r from-blue-700 to-purple-900 bg-clip-text text-transparent will-change-transform [contain:layout_paint_style] px-2 leading-tight text-[4.5rem]">
              Compare Real Dentists Salaries Across All Specialties
            </h1>
            <div className="flex flex-col gap-4 p-6 text-gray-700">
              <h2 className="flex flex-wrap items-center justify-center text-2xl m-0">
                Join 2,474+ verified doctors sharing anonymous salary data.
              </h2>
              <h2>Search by specialty, state, or experience level.</h2>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              <button className="bg-green-500 btn">
                Compare Doctor Salaries
              </button>
              <button className="bg-blue-500 btn">Submit Your Salary</button>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1024px] mx-auto mt-4">
            <div className="bg-white p-8 rounded-md text-center">
              <img
                src="/images/home/submissions.svg"
                width="48"
                height="48"
                className="mx-auto mb-4"
              />
              <p className="text-blue-600 font-semibold text-4xl mb-2">2477</p>
              <p className="text-xl text-gray-700">Verified Submissions</p>
            </div>
            <div className="bg-white p-8 rounded-md text-center">
              <img
                src="/images/home/submissions.svg"
                width="48"
                height="48"
                className="mx-auto mb-4"
              />
              <p className="text-blue-600 font-semibold text-4xl mb-2">30 +</p>
              <p className="text-xl text-gray-700">Specialties</p>
            </div>
            <div className="bg-white p-8 rounded-md text-center">
              <img
                src="/images/home/submissions.svg"
                width="48"
                height="48"
                className="mx-auto mb-4"
              />
              <p className="text-blue-600 font-semibold text-4xl mb-2">
                6.5 K +
              </p>
              <p className="text-xl text-gray-700">Members</p>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-[1024px] mx-auto mb-16">
            <h2 className="text-3xl mb-8 font-bold text-center">
              Top-Paying Medical Specialties in 2025
            </h2>
            <div className="bg-white p-6">
              <h2 className="text-2xl mb-4 text-gray-900 font-bold mt-0">
                Popular Specialties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* <div className="bg-gradient-to-r from-blue-50 to-white">
            <p className="font-medium text-blue-900">Cardiology</p>
            <p className="text-sm text-blue-600">View Salaries →</p>
          </div> */}
                <PopularCard
                  title="Oral and Maxillofacial Surgery"
                  link="/salaries?speciality=oral-and-maxillofacial-surgery "
                />
                <PopularCard
                  title="Orthodontics and Dentofacial Orthopedics"
                  link="/salaries?speciality=orthodontics-and-dentofacial-orthopedics "
                />
                <PopularCard
                  title="Pediatric Dentistry"
                  link="/salaries?speciality=pediatric-dentistry "
                />
                <PopularCard
                  title="Endodontics"
                  link="/salaries?speciality=endodontics "
                />
                <PopularCard
                  title="Periodontics"
                  link="/salaries?speciality=periodontics "
                />
                <PopularCard
                  title="Prosthodontics"
                  link="/salaries?speciality=prosthodontics "
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D5F] text-center mb-12">
            Why Physician Salary Transparency Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  max-w-[1024px] mx-auto gap-6">
            {/* <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl font-bold text-[#2D2D5F] mb-2">$250K+</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Average Medical School Debt
              </h3>
              <p className="text-gray-600 leading-relaxed">
                With rising education costs, salary transparency helps
                physicians make informed decisions about their financial future
                and career path.
              </p>
            </div> */}
            <TransparencyCard
              number="$250K+"
              title="Average Medical School Debt"
              des=" With rising education costs, salary transparency helps
                physicians make informed decisions about their financial future
                and career path."
            />

            <TransparencyCard
              number="25%"
              title="Gender Pay Gap"
              des="Transparency helps identify and address pay disparities, ensuring fair compensation regardless of gender or background."
            />

            <TransparencyCard
              number="85%"
              title="Career Satisfaction"
              des="Physicians who feel fairly compensated report higher job satisfaction and better work-life balance."
            />

            <TransparencyCard
              number="40%"
              title="Negotiation Success Rate"
              des="Access to market data increases successful salary negotiations and helps physicians advocate for fair compensation."
            />

            <TransparencyCard
              number="60%"
              title="Better Career Decisions"
              des="Salary transparency helps medical students and residents make more informed decisions about their specialty choice."
            />

            <TransparencyCard
              number="3x"
              title="Salary Variation"
              des="Compensation can vary significantly between practice settings. Transparency helps physicians find the right fit."
            />
          </div>
        </section>

        <section>
          <div className="mt-12 text-center mb-16">
            <p className="text-xl text-gray-700 mb-6">
              Join thousands of physicians who are making salary transparency a
              reality
            </p>
            <Link
              to=""
              className="inline-block bg-[#31C48D] hover:bg-[#2BA97A] text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Share Your Salary
            </Link>
          </div>
        </section>

        <section className="mb-8">
          {/* Vertical Line */}
          <h2 className="text-3xl font-bold text-[#2D2D5F] text-center mb-12">
            Explore Physician Salaries by Specialty and Location
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Popular Specialties
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-3"
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
                  <a
                    className="text-blue-500 hover:text-blue-700 transition-colors text-lg"
                    href="/specialty/general-surgery"
                  >
                    General Surgery Salary Guide
                  </a>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-3"
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
                  <a
                    className="text-blue-500 hover:text-blue-700 transition-colors text-lg"
                    href="/specialty/orthopedic-surgery"
                  >
                    Orthopedic Surgery Salary Guide
                  </a>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-3"
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
                  <a
                    className="text-blue-500 hover:text-blue-700 transition-colors text-lg"
                    href="/specialty/cardiology"
                  >
                    Cardiology Salary Guide
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Top Locations
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-3"
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
                  <a
                    className="text-blue-500 hover:text-blue-700 transition-colors text-lg"
                    href="/specialty/orthopedic-surgery/california"
                  >
                    Orthopedic Surgery Salaries in California
                  </a>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-3"
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
                  <a
                    className="text-blue-500 hover:text-blue-700 transition-colors text-lg"
                    href="/specialty/general-surgery/massachusetts"
                  >
                    General Surgery Salaries in Massachusetts
                  </a>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-blue-500 mr-3"
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
                  <a
                    className="text-blue-500 hover:text-blue-700 transition-colors text-lg"
                    href="/specialty/cardiology/texas"
                  >
                    Cardiology Salaries in Texas
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <h2 className="text-3xl font-bold text-[#2D2D5F] text-center mb-8">
          Common Questions About Physician Pay
        </h2>
        <section className="py-16 bg-[#F8FAFF]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-[#2E2B6E]">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <Accordion
                heading="Why is salary transparency so important for doctors?"
                des="Salary transparency is crucial for physicians because it helps level the playing field in contract negotiations and ensures fair compensation across different practice settings. With the rising costs of medical education and increasing administrative burdens, doctors need reliable salary data to make informed career decisions and advocate for equitable compensation that reflects their expertise, training, and dedication to patient care."
              />
              <Accordion
                heading="How is this salary data collected?"
                des="Our salary data is collected through anonymous submissions from verified physicians across the United States. Each submission is reviewed for accuracy and completeness before being added to our database."
              />
              <Accordion
                heading="Is my salary information kept confidential?"
                des="Yes, all salary submissions are completely anonymous. We never collect or store any personally identifiable information with salary submissions."
              />

              <Accordion
                heading="How often is the data updated?"
                des="Our salary database is updated in real-time as new submissions are received and verified. The statistics and averages are recalculated daily."
              />
              <Accordion
                heading="How can I use this data in contract negotiations?"
                des="Our detailed salary breakdowns by specialty, location, and practice type can serve as valuable benchmarks during contract negotiations. Use the percentile data to understand your market value and negotiate fair compensation."
              />
              <Accordion
                heading="Want to get in touch?"
                des="You can reach us at"
              />
            </div>
          </div>
        </section>

        {/* <section>
        <div className="space-y-4"><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">Why is salary transparency so important for doctors?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">Salary transparency is crucial for physicians because it helps level the playing field in contract negotiations and ensures fair compensation across different practice settings. With the rising costs of medical education and increasing administrative burdens, doctors need reliable salary data to make informed career decisions and advocate for equitable compensation that reflects their expertise, training, and dedication to patient care.</div></div></div><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">How is this salary data collected?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">Our salary data is collected through anonymous submissions from verified physicians across the United States. Each submission is reviewed for accuracy and completeness before being added to our database.</div></div></div><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">Is my salary information kept confidential?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">Yes, all salary submissions are completely anonymous. We never collect or store any personally identifiable information with salary submissions.</div></div></div><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">How often is the data updated?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">Our salary database is updated in real-time as new submissions are received and verified. The statistics and averages are recalculated daily.</div></div></div><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">How can I use this data in contract negotiations?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">Our detailed salary breakdowns by specialty, location, and practice type can serve as valuable benchmarks during contract negotiations. Use the percentile data to understand your market value and negotiate fair compensation.</div></div></div><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">Want to get in touch?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">You can reach us at <a href="mailto:tyler@salarydr.com" className="text-blue-600 hover:text-blue-800 hover:underline">tyler@salarydr.com</a> </div></div></div></div>
        </section> */}

        {/* <section>
   
        <div className="flex flex-col items-center justify-center h-[200px]">
          <div className="border-l-2 border-green h-1/2"></div>

    
          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-green text-[15px] font-medium">OUR TEAM</p>
            <h3 className="text-blue text-[27px] mt-4 font-semibold text-center">
              Team of Highly Professional
            </h3>
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col items-center py-10">
          <div className="relative w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center mx-4"
                >
           
                  <div className="relative w-32 h-32">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-full border-2 border-green p-3 mt-4 md:mt-0"
                    />
 
                  </div>
                  <h3 className="text-blue font-bold mt-4">
                    {testimonial.name}
                  </h3>
                  <p className="text-green">{testimonial.role}</p>
                  <p className="mt-2 text-sm font-medium w-10/12">
                    {testimonial.feedback}
                  </p>

              
                </div>
              ))}
            </div>
   
          </div>
        </div>
      </section> */}
      </div>
    </>
  );
};

export default Home;
