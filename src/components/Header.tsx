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
        <Link
          className="text-[2.5rem] sm:text-[3.5rem] tracking-normal font-['Outfit']"
          to="/"
        >
          <span className="text-[#4169E1] font-[400]">Salary</span>
          <span className="text-[#E94E4A] font-[500]">Dental</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 lg:gap-8 items-center">
          <Link
            className="text-lg lg:text-xl font-semibold text-[#2D3748] whitespace-nowrap hover:text-blue-600 transition-colors"
            to="/salaries"
          >
            Salary Explorer
          </Link>

          <Link
            className="text-lg lg:text-xl font-semibold text-[#2D3748] whitespace-nowrap hover:text-blue-600 transition-colors"
            to="/benchmark-residency-salaries-2025"
          >
            Salary Benchmark
          </Link>

          <Link
            className="text-lg lg:text-xl font-semibold px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
            to="/submit-salary"
          >
            Add a Salary
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
              className="text-lg font-semibold px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
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
