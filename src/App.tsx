import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import MainPanel from "./pages/Home/index";
import NoPage from "./pages/NoPage/index";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SalaryViewer from "./pages/Salary";
import SalaryExplorer from "./pages/Explorer";
import AllSalary from "./pages/All";
import BenchmarkDetails from "./pages/Benchmark";
import SpecialityExplorer from "./pages/SpecialityExplorer";
import Thankyou from "./pages/ThankYou/page";
import Privacy from "./pages/Privacy";
import TermsPolicies from "./pages/Terms";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import SalaryComparison from "./pages/Salary/SalaryComparison";

function App() {
  const location = useLocation();
  return (
    <div className="bg-gradient-to-r from-blue-50 to-white">
      <div>
        {location.pathname === "/login" ||
          (location.pathname === "/register" ? <></> : <Header />)}
        {/* <div>
          {location.pathname === "/login" ||
            (location.pathname === "/register" ? <></> : <SpecificHeader />)}
        </div> */}
        <Routes>
          {/* <PrivateRoute path="/" component={MainPanel} /> */}
          <Route path="/" element={<MainPanel />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/submit-salary" element={<SalaryViewer />} />
          <Route path="/salaries" element={<SalaryExplorer />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsPolicies />} />
          <Route path="/all-salaries" element={<AllSalary />} />
          <Route path="/specialty/:slug" element={<SpecialityExplorer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/salary-comparison" element={<SalaryComparison />} />
          <Route
            path="/benchmark-residency-salaries-2025"
            element={<BenchmarkDetails />}
          />
          <Route path="/thank-you" element={<Thankyou />} />
        </Routes>
        {location.pathname === "/login" ||
          (location.pathname === "/register" ? "" : <Footer />)}
      </div>
    </div>
  );
}

export default App;
