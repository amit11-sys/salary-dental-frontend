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
            <div className="mt-4 flex flex-col space-y-4">
            
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/specialty/general-dentist"
                >
                  General Dentist
                </Link>
              
            
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/specialty/orthodontics-and-dentofacial-orthopedics"
                >
                  Orthodontics
                </Link>
              
            
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/specialty/pediatric-dentistry"
                >
                  Pediatrics
                </Link>
              
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Tools
            </h3>
            <div className="mt-4 space-y-4">
            
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/salary-comparison"
                >
                  Salary Comparison Tool
                </Link>
              
              {/* <li>
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/calculator"
                >
                  Take Home Calculator
                </Link>
               */}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Legal
            </h3>
            <div className=" flex flex-col mt-4 space-y-4">
            
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/privacy"
                >
                  Privacy Policy
                </Link>
              
            
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/terms"
                >
                  Terms of Service
                </Link>
              
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Company
            </h3>
            <div className=" flex flex-col mt-4 space-y-4">
            
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/contact"
                >
                  Contact
                </Link>
              
            
                <Link
                  className="text-base text-gray-500 hover:text-gray-900"
                  to="/feedback"
                >
                  Feedback
                </Link>
              
            </div>
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
