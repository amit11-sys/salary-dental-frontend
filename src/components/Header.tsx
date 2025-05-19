const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-50 to-white p-4 sm:p-6">
      <div className="container mx-auto flex justify-between items-center">
        <a
          className="text-[2.5rem] sm:text-[3.5rem] tracking-normal font-['Outfit']"
          href="/"
        >
          <span className="text-[#4169E1] font-[400]">Salary</span>
          <span className="text-[#E94E4A] font-[500]">Dental</span>
        </a>
        <div className="hidden md:flex gap-4 lg:gap-8 items-center">
          <a
            className="text-lg lg:text-xl font-semibold text-[#2D3748] whitespace-nowrap hover:text-blue-600 transition-colors"
            href="/salaries"
          >
            Salary Explorer
          </a>
          {/* <a
            className="text-lg lg:text-xl font-semibold text-[#2D3748] whitespace-nowrap hover:text-blue-600 transition-colors"
            href="/calculator"
          >
            Take Home Pay Calculator
          </a> */}
          {/* <a
            className="text-lg lg:text-xl font-semibold text-[#2D3748] whitespace-nowrap hover:text-blue-600 transition-colors"
            href="/feedback"
          >
            Feedback
          </a> */}
          <a
            className="text-lg lg:text-xl font-semibold px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
            href="/submit-salary"
          >
            Add a Salary
          </a>
        </div>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          aria-expanded="false"
        >
          <div className="w-6 h-6 relative transform transition-transform duration-200 ">
            <span className="absolute w-6 h-0.5 bg-gray-600 transform transition-transform duration-200 -translate-y-2"></span>
            <span className="absolute w-6 h-0.5 bg-gray-600 transition-opacity duration-200 opacity-100"></span>
            <span className="absolute w-6 h-0.5 bg-gray-600 transform transition-transform duration-200 translate-y-2"></span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
