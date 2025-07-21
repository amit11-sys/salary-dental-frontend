import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Specialties
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  className="text-base text-gray-500 hover:text-gray-900"
                  href="/specialty/general-dentist"
                >
                  General Dentist
                </a>
              </li>
              <li>
                <a
                  className="text-base text-gray-500 hover:text-gray-900"
                  href="/specialty/orthodontics"
                >
                  Orthodontics
                </a>
              </li>
              <li>
                <a
                  className="text-base text-gray-500 hover:text-gray-900"
                  href="/specialty/pediatrics"
                >
                  Pediatrics
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Tools
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  className="text-base text-gray-500 hover:text-gray-900"
                  href="/salary-comparison"
                >
                  Salary Comparison Tool
                </a>
              </li>
              {/* <li>
                <a
                  className="text-base text-gray-500 hover:text-gray-900"
                  href="/calculator"
                >
                  Take Home Calculator
                </a>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/terms"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/feedback"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            ©2025 SalaryDental All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
