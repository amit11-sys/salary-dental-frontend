import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function handleOpenMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  return (
    <header className="bg-gradient-to-r from-blue-50 to-white p-4 sm:p-6">
      <div className="container relative mx-auto flex justify-between items-center">
        <div className="">

        <Link
          className="text-[2.5rem] flex items-center gap-2 sm:text-[3.5rem] tracking-normal font-['Outfit']"
          to="/"
        >
          <span className="text-[#4F8FF9] font-montserrat font-[400]">Salary</span>
          <span className="text-[#00BFAE] font-montserrat font-[500]">Dental</span>
        <img className="w-1h-16 h-16" src="/images/home/salarylogo.webp" alt="salarylogo" />
        </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 lg:gap-8 items-center">
          <Link
            className="text-lg lg:text-xl font-Lato font-semibold text-[#2D3748] whitespace-nowrap hover:text-blue-600 transition-colors"
            to="/salaries"
          >
            Salary Explorer
          </Link>

          <Link
            className="text-lg lg:text-xl  font-Lato font-semibold text-[#2D3748] whitespace-nowrap hover:text-blue-600 transition-colors"
            to="/benchmark-residency-salaries-2025"
          >
            Salary Benchmark
          </Link>

          <Link
            className="text-lg lg:text-xl font-semibold   bg-gradient-to-r from-[#4F8FF9] to-[#00BFAE] text-white rounded-full hover:from-[#00BFAE] hover:to-[#4F8FF9] transition-all transform hover:scale-105 shadow-lg"
            to="/submit-salary"
          >
            <button className="btn">Add a Salary</button>
           
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50"
          aria-label="Toggle menu"
          onClick={handleOpenMenu}
        >
          <div className=" flex justify-center items-center relative">
            
            
            <Menu size={40} />

          </div>
        </button>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-0 right-0  h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isOpenMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-6 gap-6">
            <button
              className="self-end text-xl font-bold text-gray-600"
              onClick={handleOpenMenu}
            >
              ✕
            </button>

            <Link
              className="text-lg font-semibold text-[#2D3748] hover:text-blue-600"
              to="/salaries"
              onClick={handleOpenMenu}
            >
              Salary Explorer
            </Link>

            <Link
              className="text-lg font-semibold text-[#2D3748] hover:text-blue-600"
              to="/benchmark-residency-salaries-2025"
              onClick={handleOpenMenu}
            >
              Salary Benchmark
            </Link>

            <Link
              className="text-lg font-semibold px-4 py-2 from-[#4F8FF9] to-[#00BFAE] text-white rounded-full hover:bg-blue-700"
              to="/submit-salary"
              onClick={handleOpenMenu}
            >
              Add a Salary
            </Link>
          </div>
        </div>

        {/* Backdrop overlay */}
        {isOpenMenu && (
          <div
            className="fixed inset-0 backdrop-blur-md bg-opacity-30 z-30 md:hidden"
            onClick={handleOpenMenu}
          ></div>
        )}
      </div>
    </header>
  );
};

export default Header;
