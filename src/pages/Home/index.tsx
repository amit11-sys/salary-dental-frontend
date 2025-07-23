import { Link } from "react-router-dom";
import PopularCard from "../../components/cards/PopularCard";
import TransparencyCard from "../../components/cards/TransparencyCard";
import Accordion from "../../components/Accordian";
import { useState } from "react";

const Home = () => {
  const [showAll, setShowAll] = useState(false);

  const cards = [
    {
      title: "General Dentists",
      link: "/salaries?speciality=general-dentist",
    },
    {
      title: "Orthodontics and Dentofacial Orthopedics",
      link: "/salaries?speciality=orthodontics-and-dentofacial-orthopedics",
    },
    {
      title: "Pediatric Dentistry",
      link: "/salaries?speciality=pediatric-dentistry",
    },
    {
      title: "Endodontics",
      link: "/salaries?speciality=endodontics",
    },
    {
      title: "Periodontics",
      link: "/salaries?speciality=periodontics",
    },
    {
      title: "Prosthodontics",
      link: "/salaries?speciality=prosthodontics",
    },
    {
      title: "Oral and Maxillofacial Pathology",
      link: "/salaries?speciality=oral-and-maxillofacial-pathology",
    },
    {
      title: "Oral and Maxillofacial Radiology",
      link: "/salaries?speciality=oral-and-maxillofacial-radiology",
    },
    {
      title: "Oral and Maxillofacial Surgery",
      link: "/salaries?speciality=oral-and-maxillofacial-surgery",
    },
    {
      title: "Dental Anesthesiology",
      link: "/salaries?speciality=dental-anesthesiology",
    },
    {
      title: "Oral Medicine",
      link: "/salaries?speciality=oral-medicine",
    },
    {
      title: "Public Health Dentist",
      link: "/salaries?speciality=public-health-dentist",
    },
    {
      title: "Resident Dentists",
      link: "/salaries?speciality=resident-dentists",
    },
  ];

  const visibleCards = showAll ? cards : cards.slice(0, 6);

  return (
    <>
      <div className="container mx-auto md:px-4 md:py-8">
        <section>
          <div className="text-center flex flex-col  h-[70vh]">
            <h1 className=" text-black w-[70%] mx-auto bg-clip-text text-transparent will-change-transform [contain:layout_paint_style] px-2  text-[2.6rem]">
              Compare Real Dentists Salaries Across All Specialties
            </h1>
            <div className="flex justify-center flex-col gap-4 p-0 text-gray-700">
              <h2 className="flex flex-wrap text-[1.2rem] items-center justify-center text-2xl m-0">
                Join a fast growing community of verified dentists sharing
                anonymous salary data.
              </h2>
              <h2 className=" text-[1rem] w-[70%] mx-auto mt-0">Search by specialty, state, or experience level. Discover what your peers are earning and contributing to a transparent dental profession.</h2>
            </div>
            <div className="flex flex-row items-center justify-center mt-4 gap-4">
              
               
                <Link to="/salaries">
                <button className="bg-[#00BFAE]  btn">

                 Compare Dentist Salaries
                </button>
                </Link>
             
              <Link to="/submit-salary">
              <button className=" bg-[#4F8FF9] btn">Submit Your Salary
              </button>
              </Link>
              
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
              <p className="text-blue-600 font-semibold text-4xl mb-2">Daily</p>
              <p className="text-xl text-gray-700">Verified Submissions</p>
            </div>
            <div className="bg-white p-8 rounded-md text-center">
              <img
                src="/images/home/submissions.svg"
                width="48"
                height="48"
                className="mx-auto mb-4"
              />
              <p className="text-blue-600 font-semibold text-4xl mb-2">12</p>
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
                Fast-Growing
              </p>
              <p className="text-xl text-gray-700">Community</p>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-[1024px] mx-auto mb-16">
            <h2 className="text-3xl mb-8 font-bold text-center">
              View Data for Dental Practitioners in 2025
            </h2>
            <div className="bg-white p-6">
              <h2 className="text-2xl mb-4 text-gray-900 font-bold mt-0">
                Top Dental Professions
              </h2>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleCards.map((card, index) => (
                    <PopularCard
                      key={index}
                      title={card.title}
                      link={card.link}
                    />
                  ))}
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {showAll ? "Show Less" : "Show More"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D5F] text-center mb-12">
            Why Dental Salary Transparency Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  max-w-[1024px] mx-auto gap-6">
            {/* <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl font-bold text-[#2D2D5F] mb-2">$250K+</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Average Medical School Debt
              </h3>
              <p className="text-gray-600 leading-relaxed">
                With rising education costs, salary transparency helps
                dentist make informed decisions about their financial future
                and career path.
              </p>
            </div> */}
            <TransparencyCard
              number="$300K+"
              title="Average Dental School Debt"
              des=" With rising education costs, salary transparency helps
                dentist make informed decisions about their financial future
                and career path."
            />

            <TransparencyCard
              number="22%"
              title="Gender Pay Gap"
              des="Transparency helps identify and address pay disparities, ensuring fair compensation regardless of gender or background."
            />

            <TransparencyCard
              number="77%"
              title="Career Satisfaction"
              des="Dentists who feel fairly compensated report higher job satisfaction and better work-life balance."
            />

            <TransparencyCard
              number="40%"
              title="Negotiation Success Rate"
              des="Access to market data increases successful salary negotiations and helps dentist advocate for fair compensation."
            />

            <TransparencyCard
              number="60%"
              title="Better Career Decisions"
              des="Salary transparency helps medical students and residents make more informed decisions about their specialty choice."
            />

            <TransparencyCard
              number="3x"
              title="Salary Variation"
              des="Compensation can vary significantly between practice settings. Transparency helps dentist find the right fit."
            />
          </div>
        </section>

        <section>
          <div className="mt-12 text-center mb-16">
            <p className="text-xl text-gray-700 mb-6">
              Join thousands of dentist who are making salary transparency a
              reality
            </p>
            <Link
              to="/salaries"
              className="inline-block bg-[#31C48D] hover:bg-[#2BA97A] text-white font-semibold   rounded-full transition-colors"
            >
              <button className="btn">

              Share Your Salary
              </button>
            </Link>
          </div>
        </section>

        <section className="mb-8">
          {/* Vertical Line */}
          <h2 className="text-3xl font-bold text-[#2D2D5F] text-center mb-12">
            Explore Dentist Salaries by Specialty and Location
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
                    href="/specialty/general-dentist"
                  >
                    General Dentist Salary Guide
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
                    href="/specialty/orthodontics-and-dentofacial-orthopedics"
                  >
                    Orthodontics Salary Guide
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
                    href="/specialty/pediatric-dentistry"
                  >
                    Pediatrics Salary Guide
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
                    href="/specialty/orthodontics-and-dentofacial-orthopedics"
                  >
                    Orthodontics Salaries in New York
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
                    href="/specialty/general-dentist"
                  >
                    General Dentistry Salaries in Massachusetts
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
                    href="/specialty/pediatric-dentistry"
                  >
                    Pediatrics Salaries in Florida
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <h2 className="text-3xl font-bold text-[#2D2D5F] text-center mb-8">
          Common Questions About Dentists Pay
        </h2>
        <section className="py-16 bg-[#F8FAFF]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-[#2E2B6E]">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <Accordion
                heading="Why is salary transparency so important for dentists?"
                des="Salary transparency is crucial for dentist because it helps level the playing field in contract negotiations and ensures fair compensation across different practice settings. With the rising costs of medical education and increasing administrative burdens, doctors need reliable salary data to make informed career decisions and advocate for equitable compensation that reflects their expertise, training, and dedication to patient care."
              />
              <Accordion
                heading="How is this salary data collected?"
                des="Our salary data is collected through anonymous submissions from verified dentist across the United States. Each submission is reviewed for accuracy and completeness before being added to our database."
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
                des="You can reach us at info@salarydental.com"
              />
            </div>
          </div>
        </section>

        {/* <section>
        <div className="space-y-4"><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">Why is salary transparency so important for doctors?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">Salary transparency is crucial for dentist because it helps level the playing field in contract negotiations and ensures fair compensation across different practice settings. With the rising costs of medical education and increasing administrative burdens, doctors need reliable salary data to make informed career decisions and advocate for equitable compensation that reflects their expertise, training, and dedication to patient care.</div></div></div><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">How is this salary data collected?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">Our salary data is collected through anonymous submissions from verified dentist across the United States. Each submission is reviewed for accuracy and completeness before being added to our database.</div></div></div><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">Is my salary information kept confidential?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">Yes, all salary submissions are completely anonymous. We never collect or store any personally identifiable information with salary submissions.</div></div></div><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">How often is the data updated?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">Our salary database is updated in real-time as new submissions are received and verified. The statistics and averages are recalculated daily.</div></div></div><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">How can I use this data in contract negotiations?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">Our detailed salary breakdowns by specialty, location, and practice type can serve as valuable benchmarks during contract negotiations. Use the percentile data to understand your market value and negotiate fair compensation.</div></div></div><div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"><button className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"><h3 className="text-lg font-semibold text-[#2E2B6E]">Want to get in touch?</h3><svg className="w-6 h-6 transform transition-transform " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div className="transition-all duration-300 ease-in-out overflow-hidden max-h-0"><div className="px-6 pb-5 text-gray-600">You can reach us at <a href="mailto:tyler@salarydr.com" className="text-blue-600 hover:text-blue-800 hover:underline">tyler@salarydr.com</a> </div></div></div></div>
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
